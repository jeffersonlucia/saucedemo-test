# 11 - Execucao tecnica dia 1

## Papel do gerente do projeto

O usuario delegou a conducao do projeto. A decisao tomada foi avancar da fase de planejamento para uma primeira base executavel, mantendo o escopo fechado do MVP Bar do Jao.

## Objetivo do dia

Criar a fundacao tecnica para a primeira fatia vertical:

```text
tenant + unidade + branding + auth
```

Essa fatia destrava:

- Flutter carregar identidade do Bar do Jao.
- API responder tenant/config.
- Login demo para owner e membro.
- Banco modelado para substituir mocks.
- Seed do tenant piloto.

## Entregas criadas

### Monorepo

```text
apps/
  api/
  flutter_app/
packages/
  api_contracts/
infra/
  docker/
```

### API NestJS

Criado scaffold em `apps/api` com:

- NestJS.
- Config module.
- Swagger em `/docs`.
- Versionamento URI `/v1`.
- Healthcheck.
- Auth demo.
- Tenant/config demo.
- Prisma schema.
- Seed Bar do Jao.

### Banco e seed

Criado `apps/api/prisma/schema.prisma` com entidades P0:

- tenants
- units
- tenant_brand_configs
- tenant_feature_flags
- users
- tenant_memberships
- refresh_tokens
- members
- member_tags
- member_tag_assignments
- plans
- plan_benefits
- subscriptions
- events
- event_allowed_plans
- reservations
- checkins
- audit_logs

Criado `apps/api/prisma/seed.ts` com:

- Tenant `bar-do-jao`.
- Unidade `Bar do Jao - Matriz`.
- Branding ambar/madeira.
- Usuarios demo owner, manager, staff e member.
- Planos Silver, Gold e Black.
- Membro demo.
- Evento futuro.
- Reserva confirmada.

### Contrato OpenAPI

Criado `packages/api_contracts/openapi.yaml` com endpoints iniciais:

- health
- auth
- tenant/config
- members
- plans
- events
- reservations
- check-in
- dashboard

### Flutter skeleton

Criado skeleton manual em `apps/flutter_app` com:

- `pubspec.yaml`.
- Config `bar_do_jao_staging`.
- Tema dinamico inicial.
- Rotas com GoRouter.
- Riverpod.
- Shell/telas iniciais:
  - member home
  - admin dashboard
  - staff check-in

Flutter nao esta instalado neste ambiente, entao a validacao do app depende de setup posterior.

### DevOps local

Criado `infra/docker/docker-compose.yml` com PostgreSQL 16.

## Validacao tecnica executada

- `npm run db:generate`: OK.
- `npm run api:build`: OK.
- `npm run api:test`: OK, ainda sem testes implementados.
- `npm audit --omit=dev`: OK, 0 vulnerabilidades.
- `npm audit`: OK, 0 vulnerabilidades.

## Decisao de dependencias

O Prisma foi fixado em `6.19.3` nesta base inicial. O Prisma 7 foi testado primeiro, mas trouxe uma dependencia de tooling com alerta de seguranca transitivo no audit. A versao 6.19.3 manteve o schema tradicional, passou nas validacoes e deixou a auditoria limpa.

## Decisoes de gestao

1. Nao criar app admin separado.
2. Nao implementar billing real agora.
3. Nao bloquear o backend esperando Prisma estar conectado em todos endpoints.
4. Criar respostas demo para destravar Flutter e contrato.
5. Preparar schema/seed real para a proxima fatia.

## Proximas tarefas tecnicas

### API

1. Conectar PrismaService ao NestJS.
2. Trocar auth demo por usuarios do banco.
3. Trocar tenant/config demo por queries Prisma.
4. Implementar endpoints P0 de members, plans, events, reservations e check-in.
5. Adicionar guards de tenant/RBAC.

### Flutter

1. Instalar Flutter no ambiente.
2. Rodar `flutter create .` dentro de `apps/flutter_app`.
3. Rodar `flutter pub get`.
4. Conectar Dio ao endpoint `/v1/tenants/current/config`.
5. Implementar login demo.
6. Criar switch de modo admin/staff/member.

### QA/DevOps

1. Rodar Postgres local.
2. Rodar Prisma generate/migrate/seed.
3. Rodar build da API.
4. Criar smoke test de health/auth/config.
5. Atualizar CI para API.

## Riscos atuais

| Risco | Estado | Mitigacao |
| --- | --- | --- |
| Flutter ausente no ambiente | Aberto | Setup de ambiente ou env setup agent |
| Endpoints demo ainda sem banco | Controlado | Prisma schema/seed ja criados |
| Suite Cypress/SauceDemo legada | Resolvido | Removida por nao pertencer ao Whiskey Club OS |
| CI do produto ainda nao existe | Aberto | Adicionar workflow API/Flutter depois da base validar |

## Proximo marco

Rodar a API local com Postgres e seed, depois conectar tenant/config real ao Flutter skeleton.
