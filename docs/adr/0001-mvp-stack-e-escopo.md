# ADR 0001 - Stack e escopo tecnico do MVP

## Status

Aceita para o MVP.

## Contexto

O usuario definiu que o MVP do Whiskey Club OS sera um app Flutter unico para administracao, cliente final e web. O cliente piloto sera o Bar do Jao. O produto precisa provar operacao de clube de whiskey sem dividir codigo em apps separados no inicio.

## Decisao

Usar a seguinte stack para o MVP:

- Flutter unico para mobile e web.
- Shells por modo: admin, staff e membro.
- Backend NestJS + TypeScript.
- API REST versionada em `/v1` com OpenAPI.
- PostgreSQL compartilhado com `tenant_id` obrigatorio.
- Prisma para ORM e migrations.
- JWT access/refresh e RBAC por tenant/unidade.
- Riverpod, GoRouter e Dio no Flutter.
- Billing manual/simulado no piloto.
- FCM/notificacoes fora do caminho critico inicial.

## Consequencias positivas

- Menor custo de implementacao inicial.
- Reuso de componentes e design system.
- Produto preparado para web e mobile desde o inicio.
- Contratos REST facilitam trabalho paralelo entre Flutter, backend e QA.
- Prisma acelera schema, migrations e seed do Bar do Jao.

## Consequencias negativas

- Flutter web pode exigir cuidado especial em UX de painel administrativo.
- App unico precisa separar muito bem os modos para nao confundir usuarios.
- Tenant isolation em banco compartilhado exige disciplina, testes e revisao.
- Billing manual reduz automacao financeira no piloto.

## Como validar

- Criar seed do tenant `bar-do-jao`.
- Rodar fluxos P0: login, membros, planos, eventos, reserva e check-in.
- Validar app em mobile e web.
- Rodar testes cross-tenant.
- Fazer simulacao de check-in com staff.

## Decisoes relacionadas

- `docs/09-mvp-bar-do-jao.md`
- `docs/10-primeira-rodada-multi-agente.md`
