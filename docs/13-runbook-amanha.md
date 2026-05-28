# 13 - Runbook para amanha

## Caminho feliz

Depois de baixar/clonar o projeto no PC:

```bash
npm install
npm start
```

Abra:

```text
http://localhost:8080
```

Isso sobe a demo navegavel do Bar do Jao no browser.

## O que testar primeiro

1. Entrar no modo **Admin**.
2. Cadastrar um membro.
3. Criar um evento.
4. Entrar no modo **Membro**.
5. Reservar um evento.
6. Entrar no modo **Staff**.
7. Fazer check-in com um token QR demo.
8. Voltar ao Admin e ver dashboard/reservas atualizados.

Tokens QR demo:

- `BDJ-R1-BRUNO`
- `BDJ-R2-ANA`
- `BDJ-R3-BRUNO`

## Validar tudo

```bash
npm run check
```

Esse comando roda:

- parse do JavaScript inline da demo;
- smoke HTTP da demo;
- Prisma generate;
- build da API;
- smoke tests da API;
- audit de dependencias.

## Rodar API

```bash
npm run api:dev
```

Endpoints principais:

- `GET http://localhost:3000/v1/health`
- `GET http://localhost:3000/v1/tenants/current/config`
- `POST http://localhost:3000/v1/auth/login`
- `GET http://localhost:3000/v1/admin/members`
- `GET http://localhost:3000/v1/plans`
- `GET http://localhost:3000/v1/events`
- `GET http://localhost:3000/v1/admin/reports/overview`
- `POST http://localhost:3000/v1/admin/reservations/BDJ-R1-BRUNO/check-in`

Swagger:

```text
http://localhost:3000/docs
```

Login demo:

```json
{
  "email": "jao.owner@example.com",
  "password": "demo1234",
  "tenantSlug": "bar-do-jao"
}
```

## Rodar banco local

Opcional por enquanto, porque os endpoints P0 ainda estao mockados em memoria.

```bash
docker compose -f infra/docker/docker-compose.yml up -d postgres
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Estado atual

Pronto para demonstrar:

- produto no navegador;
- API P0 mockada;
- contrato OpenAPI;
- schema Prisma e seed;
- smoke tests da API.

Ainda pendente:

- conectar endpoints ao Prisma;
- instalar/validar Flutter no ambiente;
- criar UI Flutter real a partir do skeleton;
- criar CI oficial para API/demo.
