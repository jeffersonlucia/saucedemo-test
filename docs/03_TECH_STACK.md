# 03 — Stack Tecnológica: WhiskeyCLUB

**Responsável**: Tech Lead (agent-tl)  
**Status**: Aprovado v1.0

---

## 1. Visão Geral da Stack

```
┌─────────────────────────────────────────────────┐
│              CLIENTS (Frontend)                  │
│  Flutter (iOS) │ Flutter (Android) │ Flutter (Web)│
└──────────────────────┬──────────────────────────┘
                       │ HTTPS / WSS
┌──────────────────────▼──────────────────────────┐
│              API GATEWAY                         │
│         (Nginx / AWS API Gateway)                │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              BACKEND SERVICES                    │
│  Node.js + TypeScript + Fastify                  │
│  ┌──────────┐ ┌─────────┐ ┌──────────────────┐  │
│  │Auth Svc  │ │Club Svc │ │Catalog Svc       │  │
│  │Member Svc│ │Event Svc│ │Order/Payment Svc │  │
│  │Notif Svc │ │Report Sc│ │                  │  │
│  └──────────┘ └─────────┘ └──────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              DATA LAYER                          │
│  PostgreSQL 16   │  Redis 7   │  S3/R2 (media)  │
│  (primary store) │  (cache)   │  (files/images) │
└─────────────────────────────────────────────────┘
```

---

## 2. Frontend — Flutter

### Versões e Dependências Principais

```yaml
# pubspec.yaml base
environment:
  sdk: ">=3.2.0 <4.0.0"
  flutter: ">=3.16.0"

dependencies:
  flutter:
    sdk: flutter

  # State Management
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5

  # Navigation
  go_router: ^13.0.0

  # Network
  dio: ^5.4.0
  retrofit: ^4.1.0         # Code generation para API calls
  json_annotation: ^4.8.1

  # Local Storage
  hive_flutter: ^1.1.0     # Offline cache
  flutter_secure_storage: ^9.0.0  # Tokens seguros

  # Firebase
  firebase_core: ^2.27.0
  firebase_messaging: ^14.7.10
  firebase_analytics: ^10.8.9

  # Auth
  google_sign_in: ^6.2.1
  sign_in_with_apple: ^6.1.0

  # Payments
  flutter_stripe: ^10.1.1  # Stripe SDK

  # UI Components
  cached_network_image: ^3.3.1
  flutter_svg: ^2.0.9
  shimmer: ^3.0.0
  lottie: ^3.0.0           # Animações Lottie

  # Utils
  intl: ^0.19.0
  logger: ^2.2.0
  get_it: ^7.6.7           # Dependency injection

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.4.8
  retrofit_generator: ^8.1.0
  json_serializable: ^6.7.1
  flutter_lints: ^3.0.0
  mocktail: ^1.0.2
```

### Arquitetura Flutter (Clean Architecture)

```
lib/
├── core/
│   ├── config/
│   │   ├── app_config.dart         # Configurações por flavor
│   │   └── env.dart                # Variáveis de ambiente
│   ├── di/
│   │   └── injection.dart          # Dependency injection (GetIt)
│   ├── network/
│   │   ├── api_client.dart         # Dio client configurado
│   │   └── interceptors/
│   ├── error/
│   │   ├── failures.dart
│   │   └── exceptions.dart
│   ├── utils/
│   └── constants/
│
├── features/
│   ├── auth/
│   │   ├── data/                   # Repositórios, datasources, models
│   │   ├── domain/                 # Entities, use cases, interfaces
│   │   └── presentation/           # Pages, widgets, BLoC
│   ├── catalog/
│   ├── events/
│   ├── members/
│   ├── orders/
│   └── dashboard/
│
├── shared/
│   ├── widgets/                    # Componentes compartilhados
│   ├── theme/                      # Tema base + tokens
│   └── extensions/
│
└── flavors/
    ├── main_clube_a.dart
    ├── main_clube_b.dart
    └── flavor_config.dart          # Configuração por flavor
```

### Padrão Adotado: Clean Architecture + BLoC

```
Presentation Layer (UI)
    ↓ Events
BLoC Layer (State Management)
    ↓ Use Cases
Domain Layer (Business Logic)
    ↓ Repository Interface
Data Layer (APIs + Local DB)
```

---

## 3. Backend — Node.js

### Stack Backend

```
Runtime:      Node.js 20 LTS
Language:     TypeScript 5.x
Framework:    Fastify 4.x (mais rápido que Express, melhor TypeScript)
ORM:          Prisma 5.x
Validation:   Zod
Testing:      Jest + Supertest
Docs:         Swagger (fastify-swagger)
Auth:         JWT + bcrypt
Queue:        Bull (Redis-backed) para jobs assíncronos
Logging:      Pino (structured JSON logs)
```

### Estrutura de Pastas (Backend)

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.schema.ts      # Zod schemas
│   │   │   └── auth.test.ts
│   │   ├── clubs/
│   │   ├── members/
│   │   ├── catalog/
│   │   ├── events/
│   │   ├── orders/
│   │   ├── payments/
│   │   └── notifications/
│   ├── shared/
│   │   ├── middleware/
│   │   ├── plugins/
│   │   ├── errors/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── app.ts
├── tests/
├── Dockerfile
└── package.json
```

### Package.json Backend (main dependencies)

```json
{
  "dependencies": {
    "fastify": "^4.26.0",
    "@fastify/cors": "^9.0.0",
    "@fastify/jwt": "^8.0.0",
    "@fastify/multipart": "^8.0.0",
    "@fastify/swagger": "^8.14.0",
    "@fastify/swagger-ui": "^4.0.0",
    "@prisma/client": "^5.10.0",
    "zod": "^3.22.4",
    "bcrypt": "^5.1.1",
    "bull": "^4.12.2",
    "ioredis": "^5.3.2",
    "nodemailer": "^6.9.12",
    "@sendgrid/mail": "^8.1.1",
    "firebase-admin": "^12.0.0",
    "stripe": "^14.20.0",
    "pino": "^8.19.0",
    "uuid": "^9.0.1"
  }
}
```

---

## 4. Banco de Dados

### PostgreSQL 16

**Estratégia Multi-Tenant**: Schema compartilhado com Row-Level Security (RLS)

```sql
-- Cada tabela tem club_id para isolamento
-- RLS garante que queries só retornam dados do clube da sessão atual
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON members
  USING (club_id = current_setting('app.current_club_id')::uuid);
```

**Por que PostgreSQL:**
- ACID compliant para transações financeiras
- RLS nativo para multi-tenancy
- JSON/JSONB para dados flexíveis (fichas técnicas de whiskey)
- Full-text search nativo
- Excelente suporte em Prisma
- Custo menor que soluções managed (PlanetScale, Neon)

### Redis 7

**Usos:**
- Cache de sessão (JWT blacklist)
- Cache de catálogo (listas de whiskies)
- Rate limiting
- Queue de jobs (Bull)
- Pub/Sub para notificações real-time

---

## 5. Infrastructure

### Cloud Provider: AWS (ou Railway para MVP)

**MVP (Railway — custo baixo, zero ops):**
```
railway.app
├── whiskey-backend (Node.js service)
├── whiskey-db (PostgreSQL managed)
└── whiskey-redis (Redis managed)
```

**Produção (AWS — escalável):**
```
AWS
├── ECS Fargate (backend containers)
├── RDS PostgreSQL (Multi-AZ)
├── ElastiCache Redis
├── S3 + CloudFront (assets e mídias)
├── Route 53 (DNS)
├── ACM (certificados SSL)
├── ECR (Docker registry)
└── CloudWatch (logs e alertas)
```

### CI/CD: GitHub Actions

```yaml
# Fluxo de CI/CD
Feature Branch → Pull Request → CI (lint, test, build)
                               ↓ Aprovado
                      Merge para develop → Deploy Staging
                               ↓ QA Pass
                      Merge para main → Deploy Production
```

**Pipelines:**
- `ci-backend.yml` — lint, test, build da imagem Docker
- `ci-flutter.yml` — lint, test, build por flavor
- `cd-staging.yml` — deploy automático em staging
- `cd-production.yml` — deploy com aprovação manual em prod
- `cd-flutter-store.yml` — submit automático para lojas

---

## 6. Mobile DevOps (CI/CD Flutter)

### Ferramentas

```
Fastlane        → Automação de build e release
GitHub Actions  → Trigger de pipelines
Firebase App Distribution → Distribuição de builds de teste
Google Play API → Upload automático de APK/AAB
App Store Connect API → Upload automático para iOS
```

### Fluxo por Flavor

```bash
# Build por flavor
flutter build apk --flavor clube_a --target lib/flavors/main_clube_a.dart
flutter build appbundle --flavor clube_a --target lib/flavors/main_clube_a.dart
flutter build ipa --flavor clube_a --target lib/flavors/main_clube_a.dart
flutter build web --dart-define=FLAVOR=clube_a
```

---

## 7. Observabilidade

### Stack de Monitoramento

```
Logs:        Pino → CloudWatch Logs / Datadog
Métricas:    Prometheus → Grafana (dashboards)
Tracing:     OpenTelemetry → Jaeger (distributed tracing)
Alertas:     PagerDuty (on-call) ou Slack alerts
Uptime:      Better Uptime ou UptimeRobot
Errors:      Sentry (frontend e backend)
```

### Métricas de Negócio (Analytics)

```
Firebase Analytics    → Mobile behavior
Mixpanel              → Funnel analysis, retention
Metabase (self-hosted)→ Dashboards para o dono do clube
```

---

## 8. Segurança

### Implementações de Segurança

```
Auth:          JWT (access 15min) + Refresh Token (7 dias, httpOnly cookie)
Passwords:     bcrypt com 12 rounds de salt
HTTPS:         TLS 1.3 obrigatório (enforced no nginx)
Rate Limiting: 100 req/min por IP (Redis-backed)
CORS:          Whitelist de domínios por flavor
SQL Injection: Prisma ORM (parameterized queries)
XSS:           Sanitização via Zod + escape de HTML
LGPD:          Encryption at rest para dados PII
Secrets:       AWS Secrets Manager / GitHub Secrets
```

---

## 9. Decisões Arquiteturais (ADRs Resumidas)

| ADR | Decisão | Alternativa Considerada | Rationale |
|-----|---------|------------------------|-----------|
| ADR-001 | Flutter para mobile/web | React Native | Melhor perf., única codebase, flavorização nativa |
| ADR-002 | BLoC para state management | Riverpod | Mais maduro, melhor tooling, time familiar |
| ADR-003 | Fastify em vez de Express | Express, NestJS | Performance +30%, melhor TypeScript nativo |
| ADR-004 | Prisma ORM | TypeORM, Drizzle | Melhor DX, migrations nativas, type-safety |
| ADR-005 | PostgreSQL + RLS | MongoDB, MySQL | ACID, RLS para multi-tenant, full-text search |
| ADR-006 | Railway para MVP | Heroku, Render | Melhor custo-benefício, sem cold starts |
| ADR-007 | Monorepo (pnpm workspaces) | Repos separados | Facilita code sharing, CI único |
| ADR-008 | GitHub Actions para CI/CD | GitLab CI, CircleCI | Integrado ao repo, bom ecossistema Flutter |

---

## 10. Tamanho da Stack de Desenvolvimento

### Fase 1 — MVP (3 meses)
| Papel | Quantidade | Dedicação |
|-------|-----------|-----------|
| Tech Lead | 1 | 100% |
| Backend Dev | 2 | 100% |
| Flutter Dev | 2 | 100% |
| UX/UI Designer | 1 | 80% |
| DevOps | 1 | 50% |
| QA | 1 | 80% |
| PM/PO | 1 | 100% |
| **Total** | **9 pessoas** | |

### Fase 2 — Escala (6 meses)
| Papel | Quantidade | Adição |
|-------|-----------|--------|
| Backend Dev | +1 | Time total: 3 |
| Flutter Dev | +1 | Time total: 3 |
| DevOps | +0.5 | Time total: 1 |
| DBA | +1 | Novo |
| Analista de Dados | +1 | Novo |
| **Adição** | **+3.5** | **Total: 12.5** |

### Fase 3 — Produto Maduro (12 meses)
- Crescimento por squads dedicados (Squad Core, Platform, Growth)
- Time total estimado: 20-25 pessoas

---

*Documento mantido pelo Tech Lead (agent-tl). Versão 1.0.*
