# Whiskey Club OS API

API NestJS do MVP Bar do Jao.

## Rodar localmente

npm install
npm run api:dev
```

O banco e opcional neste momento porque os endpoints P0 usam dados em memoria. Para validar tudo:

```bash
npm run check
```

## Endpoints iniciais

- `GET /v1/health`
- `POST /v1/auth/login`
- `GET /v1/auth/me`
- `GET /v1/tenants/current`
- `GET /v1/tenants/current/config`
- `GET /v1/admin/members`
- `POST /v1/admin/members`
- `GET /v1/plans`
- `GET /v1/events`
- `POST /v1/admin/events`
- `POST /v1/events/:eventId/reservations`
- `GET /v1/admin/reservations`
- `POST /v1/admin/reservations/:reservationId/check-in`
- `GET /v1/admin/reports/overview`
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

Os endpoints atuais usam dados em memoria para destravar a fatia vertical P0 sem depender do banco. O schema Prisma e o seed ja estao prontos para conectar persistencia real nos proximos passos.
