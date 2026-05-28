# 04 — Arquitetura do Sistema: WhiskeyCLUB

**Responsável**: Tech Lead (agent-tl)  
**Revisado por**: DBA (agent-dba), DevOps (agent-devops)

---

## 1. Diagrama de Arquitetura Geral

```
                        ┌─────────────────────────────────────────┐
                        │           CLIENTS                        │
                        │  📱 iOS App    📱 Android App    🌐 Web  │
                        │  (Flutter Flavor A) (Flutter Flavor B)  │
                        └──────────────────┬──────────────────────┘
                                           │ HTTPS
                        ┌──────────────────▼──────────────────────┐
                        │         CLOUDFLARE / CDN                 │
                        │   DDoS Protection, WAF, CDN Assets       │
                        └──────────────────┬──────────────────────┘
                                           │
                        ┌──────────────────▼──────────────────────┐
                        │         API GATEWAY (Nginx)              │
                        │   Rate Limiting, SSL Termination,        │
                        │   Load Balancing, Routing por domínio    │
                        └──────────────────┬──────────────────────┘
                                           │
               ┌───────────────────────────┼────────────────────────┐
               │                           │                        │
    ┌──────────▼──────────┐  ┌────────────▼────────────┐  ┌────────▼──────────┐
    │    AUTH SERVICE      │  │     CORE API SERVICE    │  │  NOTIFICATION SVC │
    │  JWT + OAuth2.0      │  │  Clubs, Members,        │  │  Push, Email, SMS │
    │  bcrypt passwords    │  │  Catalog, Events,       │  │  Firebase + SG    │
    │  Refresh Tokens      │  │  Orders, Payments       │  │                   │
    └──────────┬──────────┘  └────────────┬────────────┘  └────────┬──────────┘
               │                          │                         │
               └──────────────────────────┼─────────────────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────────┐
                    │                     │                          │
          ┌─────────▼────────┐  ┌─────────▼────────┐  ┌────────────▼───────┐
          │  PostgreSQL 16   │  │    Redis 7        │  │   AWS S3 / R2      │
          │  (Primary DB)    │  │  (Cache + Queue)  │  │   (Media Files)    │
          │  Multi-tenant RLS│  │  Sessions, Cache  │  │   Images, Docs     │
          └──────────────────┘  └───────────────────┘  └────────────────────┘
```

---

## 2. Diagrama de Flavorização Flutter

```
                    [Repositório único Flutter]
                              │
              ┌───────────────┼───────────────┐
              │               │               │
    ┌─────────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │  Flavor: default│ │Flavor: clbA │ │Flavor: clbB │
    │  (desenvolvimento)│ (Club Alpha)│ │ (Club Beta) │
    │                 │ │             │ │             │
    │  Colors: default│ │Colors: amber│ │Colors: dark │
    │  Logo: default  │ │Logo: alpha  │ │Logo: beta   │
    │  API: localhost │ │API: api.a.. │ │API: api.b.. │
    │  Bundle: dev    │ │Bundle: com.a│ │Bundle: com.b│
    └─────────────────┘ └─────────────┘ └─────────────┘
              │               │               │
              ▼               ▼               ▼
      [Dev Build]     [APK/IPA Alpha]  [APK/IPA Beta]
                      [Pub na Play     [Pub na Play
                       Store do ClbA]   Store do ClbB]
```

### Configuração de Flavor (Flutter)

```dart
// lib/flavors/flavor_config.dart
enum Flavor { dev, clubeAlpha, clubeBeta }

class FlavorConfig {
  final Flavor flavor;
  final String appName;
  final String apiBaseUrl;
  final Color primaryColor;
  final Color secondaryColor;
  final String logoAsset;
  final bool enableLoja;
  final bool enableGamificacao;
  final String supportEmail;

  static FlavorConfig? _instance;

  FlavorConfig._({
    required this.flavor,
    required this.appName,
    required this.apiBaseUrl,
    required this.primaryColor,
    required this.secondaryColor,
    required this.logoAsset,
    required this.enableLoja,
    required this.enableGamificacao,
    required this.supportEmail,
  });

  static void initialize(FlavorConfig config) {
    _instance = config;
  }

  static FlavorConfig get instance {
    assert(_instance != null, 'FlavorConfig não inicializado');
    return _instance!;
  }

  bool get isDev => flavor == Flavor.dev;
  bool get isProd => flavor != Flavor.dev;
}
```

---

## 3. Modelo Multi-Tenant

### Estratégia: Schema Compartilhado + Row Level Security

```sql
-- Todas as tabelas têm club_id
-- PostgreSQL RLS garante isolamento automático

-- Configurar contexto da sessão
SET app.current_club_id = 'uuid-do-clube';

-- RLS em ação (transparente para o ORM)
SELECT * FROM members;
-- Internamente executa: WHERE club_id = 'uuid-do-clube'
```

### Por que não Schema Separado por Tenant?
- Schema separado: mais complexo de gerenciar, migrations para N schemas
- Banco separado: custo muito alto para MVP
- **Schema compartilhado + RLS**: boa performance, fácil manutenção, isolamento real

---

## 4. Fluxo de Autenticação

```
Mobile App                   Auth Service               DB + Redis
    │                              │                         │
    │──── POST /auth/register ────►│                         │
    │     { email, password,       │                         │
    │       club_id, name }        │──── bcrypt hash ───────►│
    │                              │──── INSERT user ────────►│
    │◄─── 201 { user }  ──────────│                         │
    │                              │                         │
    │──── POST /auth/login ───────►│                         │
    │     { email, password }      │──── SELECT user ───────►│
    │                              │◄─── user data ──────────│
    │                              │──── bcrypt compare      │
    │                              │──── gen access_token    │
    │                              │──── gen refresh_token   │
    │                              │──── SAVE refresh_token ►│(Redis)
    │◄─── 200 {                   │                         │
    │       access_token (15min), │                         │
    │       refresh_token (7d)    │                         │
    │     }                        │                         │
    │                              │                         │
    │──── (after 15min expires)    │                         │
    │──── POST /auth/refresh ─────►│                         │
    │     { refresh_token }        │──── GET token ─────────►│(Redis)
    │                              │◄─── token valid ────────│
    │◄─── 200 { new_access_token }│                         │
```

---

## 5. Fluxo de Pagamento

```
App Cliente              Backend               Stripe/Asaas          Banco
    │                       │                       │                  │
    │── POST /subscriptions ►│                       │                  │
    │   { plan_id }          │──── Create Customer ─►│                  │
    │                        │◄─── customer_id ──────│                  │
    │◄── { client_secret } ──│                       │                  │
    │                        │                       │                  │
    │──(Stripe SDK handles)──►│                       │                  │
    │   Payment Intent        │                       │──── Charge ─────►│
    │                        │                       │◄─── Success ──────│
    │                        │◄── Webhook: paid ─────│                  │
    │                        │──── Activate member   │                  │
    │                        │──── Send receipt email│                  │
    │◄── Push: "Assinatura   │                       │                  │
    │    confirmada!" ───────│                       │                  │
```

---

## 6. Arquitetura de Notificações

```
Trigger Event (e.g., novo evento criado)
        │
        ▼
Backend Service
        │
        ├── Firebase FCM ──► Push Notification (iOS/Android)
        ├── SendGrid ──────► E-mail transacional
        └── Bull Queue ────► Job assíncrono
                    │
                    ▼
            Processamento assíncrono
            (não bloqueia a API)
```

---

## 7. Cache Strategy

```
Request Flow com Cache:

Client → API → Check Redis Cache
                    │
              ┌─────┴─────┐
           HIT│           │MISS
              ▼           ▼
         Return Cache   Query DB
              │           │
              │        Store in Cache
              │        (TTL by type)
              ▼           │
         Response ◄───────┘

TTL por tipo de dado:
- Catálogo de whiskies:  15 minutos
- Perfil do clube:       1 hora
- Dados do usuário:      5 minutos
- Lista de eventos:      5 minutos
- Relatórios:            30 minutos
```

---

## 8. Estratégia de Deploy

### Ambientes

| Ambiente | Branch | Trigger | URL |
|---------|--------|---------|-----|
| Local | feature/* | Manual | localhost |
| Development | develop | Auto no push | dev.whiskeyclub.app |
| Staging | staging | Auto no merge | staging.whiskeyclub.app |
| Production | main | Manual approval | api.whiskeyclub.app |

### Deploy Zero-Downtime

```
Produção (ECS Fargate):
1. Nova versão da imagem Docker é buildada
2. ECS cria novas tasks com nova imagem
3. Health checks passam nas novas tasks
4. Load balancer redireciona tráfego
5. Tasks antigas são terminadas
(Blue-Green deployment)
```

---

## 9. Resiliência e Disaster Recovery

### Circuit Breaker Pattern

```
Backend → External Service (Stripe, Firebase, etc.)
         ↓
    [Circuit Breaker]
    - Closed: chamadas normais
    - Open: fallback automático (após 5 falhas em 1min)
    - Half-Open: testa recuperação a cada 30s
```

### Backup Strategy

```
PostgreSQL:
- Snapshot diário: RDS Automated Backups
- WAL streaming: replicação contínua
- Retenção: 30 dias
- Restauração testada: mensalmente

Redis:
- RDB snapshots: a cada 15 minutos
- AOF: persistence habilitado
```

---

## 10. Segurança em Camadas

```
Camada 1: Cloudflare WAF (DDoS, bots, injeções)
    ↓
Camada 2: Nginx (rate limiting, SSL, headers de segurança)
    ↓
Camada 3: API Gateway (autenticação JWT, validação de origem)
    ↓
Camada 4: Aplicação (RBAC, validação Zod, sanitização)
    ↓
Camada 5: Banco de Dados (RLS, queries parametrizadas)
```

---

*Documento mantido pelo Tech Lead (agent-tl). Versão 1.0.*
