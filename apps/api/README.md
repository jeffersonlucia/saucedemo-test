# Whiskey Club OS API

API NestJS do MVP Bar do Jao.

## Rodar localmente

```bash
cp apps/api/.env.example apps/api/.env
docker compose -f infra/docker/docker-compose.yml up -d postgres
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run api:dev
```

## Endpoints iniciais

- `GET /v1/health`
- `POST /v1/auth/login`
- `GET /v1/auth/me`
- `GET /v1/tenants/current`
- `GET /v1/tenants/current/config`
- Swagger: `GET /docs`

## Login demo

```json
{
  "email": "jao.owner@example.com",
  "password": "demo1234",
  "tenantSlug": "bar-do-jao"
}
```

## Observacao

Os endpoints atuais de auth/tenant usam resposta demo para destravar a fatia vertical `tenant + branding + auth`. O schema Prisma e o seed ja estao prontos para conectar persistencia real nos proximos passos.
