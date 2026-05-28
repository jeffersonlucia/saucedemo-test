# 10 - Primeira rodada multi-agente

## Contexto da rodada

Pedido do usuario:

- MVP com app Flutter unico para admin, cliente final e web.
- Cliente piloto: Bar do Jao.
- Modulos fechados pelo agente.
- Iniciar primeira rodada de trabalho multi-agente.

## Agentes acionados

| Agente | Foco | Saida principal |
| --- | --- | --- |
| PM/PO/Requisitos | Escopo e backlog | MVP P0/P1/P2 fechado e historias em ordem |
| UX Research/UI | Jornadas e telas | Navegacao por modo, telas obrigatorias e marca Bar do Jao |
| Tech Lead/Flutter/Backend | Arquitetura | Flutter unico, NestJS, PostgreSQL, Prisma e contratos REST |
| DBA/DevOps/QA | Dados, CI/CD e testes | Modelo de dados, migrations, pipelines e regressao P0 |
| Clientes simulados | Dono e membro | Objeções, perguntas de entrevista e ajustes de backlog |

## Consenso dos agentes

1. O MVP deve priorizar operacao real do clube, nao amplitude de features.
2. O app Flutter deve ser unico, mas com shells separados por modo: admin, staff e membro.
3. O Bar do Jao deve ser tenant demo/piloto com uma unidade inicial.
4. Pagamento real fica fora do primeiro MVP; status de assinatura pode ser manual.
5. Estoque completo fica fora do P0; estoque basico pode entrar como P1.
6. A feature central e controlar membros, planos/beneficios, eventos, reservas e check-in.
7. Check-in precisa ser extremamente rapido, com fallback por busca manual.
8. O membro precisa ver claramente plano, beneficios, eventos e QR Code.
9. Tenant isolation e RBAC sao gates obrigatorios.
10. Seeds/demo do Bar do Jao sao fundamentais para desenvolvimento, demo e QA.

## Decisoes fechadas

### Produto

- P0: multi-tenant, branding, auth/RBAC, membros, planos/beneficios, eventos, reservas, check-in, carteirinha, dashboard, seeds, testes e docs.
- P1: estoque basico, comunicados, recuperacao de senha, avaliacao pos-evento, relatorios e importacao CSV.
- P2: billing real, marketplace, app white-label separado, multiunidade avancado, IA e ERP/fiscal.

### UX

- O app deve parecer do Bar do Jao, nao de uma plataforma generica.
- Dono/gerente usam mais web/tablet.
- Staff usa mobile/tablet com check-in como acao principal.
- Membro usa mobile/PWA para eventos, beneficios e carteirinha.
- Usuarios com multiplos papeis precisam de troca clara de modo.

### Engenharia

- Flutter unico mobile + web.
- Backend NestJS + TypeScript.
- PostgreSQL com `tenant_id`.
- Prisma para ORM/migrations.
- REST `/v1` com OpenAPI.
- JWT access/refresh.
- Riverpod, GoRouter e Dio no Flutter.
- Billing manual/simulado no piloto.

### Dados/QA/DevOps

- Migrations devem iniciar por tenant/unidade/branding.
- Testes cross-tenant sao obrigatorios.
- Reserva deve ter teste de concorrencia para ultima vaga.
- Check-in deve ser idempotente.
- Pipeline deve validar lint, testes, migrations e smoke.
- Release piloto deve ter backup, logs, Sentry e runbook.

## Backlog P0 consolidado

| Ordem | Historia | Dono primario | Dependencias |
| --- | --- | --- | --- |
| 1 | Provisionar tenant Bar do Jao | Backend/DBA | Modelo tenant |
| 2 | Criar unidade principal | Backend/Flutter | Tenant |
| 3 | Configurar branding/flavor remoto | Flutter/Backend/UX | Tenant |
| 4 | Login email/senha | Backend/Flutter | Users |
| 5 | RBAC por papel/unidade | Backend/QA | Auth |
| 6 | Criar planos | Backend/Flutter | RBAC |
| 7 | Cadastrar membros | Backend/Flutter | Tenant/unidade |
| 8 | Associar membro a plano | Backend/Flutter | Membros/planos |
| 9 | Criar evento | Backend/Flutter | Unidade/planos |
| 10 | Reservar evento | Backend/Flutter/QA | Evento/membro/plano |
| 11 | Check-in por QR/busca | Backend/Flutter/QA | Reserva |
| 12 | Dashboard operacional | Backend/Flutter | Eventos/membros/reservas |
| 13 | Documentacao de uso | Docs/PO | Fluxos definidos |
| 14 | Regressao P0 no CI | QA/DevOps | Fluxos implementados |

## Contratos iniciais de API

### Identity

```http
POST /v1/auth/login
POST /v1/auth/refresh
POST /v1/auth/logout
GET  /v1/auth/me
```

### Tenant e unidade

```http
GET  /v1/tenants/current
GET  /v1/tenants/current/config
GET  /v1/units
POST /v1/admin/units
PATCH /v1/admin/units/:unitId
```

### Membros

```http
GET   /v1/admin/members
POST  /v1/admin/members
GET   /v1/admin/members/:memberId
PATCH /v1/admin/members/:memberId
GET   /v1/members/me
PATCH /v1/members/me
```

### Planos e assinaturas

```http
GET   /v1/plans
POST  /v1/admin/plans
PATCH /v1/admin/plans/:planId
GET   /v1/admin/subscriptions
POST  /v1/admin/subscriptions
PATCH /v1/admin/subscriptions/:subscriptionId
GET   /v1/members/me/subscription
```

### Eventos, reservas e check-in

```http
GET    /v1/events
GET    /v1/events/:eventId
POST   /v1/admin/events
PATCH  /v1/admin/events/:eventId
POST   /v1/events/:eventId/reservations
GET    /v1/members/me/reservations
PATCH  /v1/reservations/:reservationId/cancel
GET    /v1/admin/events/:eventId/reservations
POST   /v1/admin/reservations/:reservationId/check-in
```

### Dashboard

```http
GET /v1/admin/reports/overview
```

## Proximos prompts para segunda rodada

### Agente Tech Lead

```text
Leia docs/09-mvp-bar-do-jao.md e docs/10-primeira-rodada-multi-agente.md.
Crie o desenho do monorepo executavel para Flutter unico + NestJS + PostgreSQL.
Entregue estrutura de pastas, scripts, variaveis de ambiente e ADRs necessarias.
```

### Agente DBA

```text
Leia docs/09-mvp-bar-do-jao.md.
Crie o ERD MVP e a ordem de migrations Prisma para tenant, auth, membros, planos, eventos, reservas, checkins e audit_logs.
Inclua indices e constraints de tenant isolation.
```

### Agente UX/UI

```text
Leia docs/09-mvp-bar-do-jao.md e revise index.html.
Transforme o mock em mapa de telas para Flutter, com componentes, estados vazios, erros e responsividade web/mobile.
```

### Agente Flutter

```text
Leia docs/09-mvp-bar-do-jao.md.
Proponha bootstrap do app Flutter unico com shells admin/staff/member, GoRouter, Riverpod, Dio, tema dinamico e flavor bar_do_jao.
```

### Agente Backend

```text
Leia docs/09-mvp-bar-do-jao.md e docs/10-primeira-rodada-multi-agente.md.
Proponha os DTOs e OpenAPI inicial para auth, tenant config, members, plans, events, reservations e check-in.
```

### Agente QA

```text
Leia docs/09-mvp-bar-do-jao.md.
Crie os cenarios Given/When/Then para login, RBAC, reserva, check-in, cross-tenant e dashboard.
```

## Pendencias para validacao humana

1. Confirmar se Bar do Jao precisa estoque no primeiro piloto ou fica P1.
2. Confirmar se membros aceitarao app instalado, PWA ou web link.
3. Confirmar status reais de membro e plano.
4. Confirmar como sera a importacao inicial de membros.
5. Confirmar se convidados entram no MVP.
6. Confirmar qual dispositivo sera usado no check-in.
