# Whiskey Club OS

Repositorio de planejamento, prototipacao e orquestracao multi-agente para um produto de gerenciamento de clubes de whiskey com app Flutter unico para admin, cliente final e web.

## Objetivo

Criar a base para lancar um produto B2B2C onde cada clube de whiskey possa operar com identidade propria, unidades, membros, assinaturas, eventos, degustacoes, reservas, check-in e comunicacao com clientes finais.

## Decisao atual do MVP

- App Flutter unico para admin, staff, cliente final e web.
- Cliente piloto: **Bar do Jao**.
- P0 fechado: multi-tenant, branding, auth/RBAC, membros, planos/beneficios, eventos, reservas, check-in, carteirinha, dashboard, seeds, testes e documentacao.
- Pagamento real e estoque completo ficam fora do primeiro MVP.
- Estoque basico, comunicados, recuperacao de senha e importacao CSV ficam em P1 para piloto controlado.

Este repositorio contem:

- Plano de produto e requisitos iniciais.
- Arquitetura sugerida para Flutter, backend, dados e DevOps.
- Estrutura de time e agentes especialistas para execucao paralela.
- Backlog com epicos, historias e tarefas granularizadas.
- Modelo de workspace Notion para gestao do projeto.
- Mock HTML inicial em `index.html`.

## Estrutura

```text
.
├── index.html
├── apps/
│   ├── api/
│   └── flutter_app/
├── docs/
│   ├── 00-visao-produto.md
│   ├── 01-requisitos.md
│   ├── 02-arquitetura-stack.md
│   ├── 03-flutter-flavorizacao.md
│   ├── 04-time-agentes.md
│   ├── 05-roadmap-entregas.md
│   ├── 06-backlog-historias-tarefas.md
│   ├── 07-qa-devops-dados-seguranca.md
│   ├── 08-operacao-lancamento.md
│   ├── 09-mvp-bar-do-jao.md
│   ├── 10-primeira-rodada-multi-agente.md
│   ├── 11-execucao-tecnica-dia-1.md
│   ├── 12-browser-demo.md
│   ├── 13-runbook-amanha.md
│   ├── adr/
│   │   ├── 0001-mvp-stack-e-escopo.md
│   │   └── 0002-app-flutter-unico.md
│   └── notion/
│       └── workspace-notion.md
├── infra/
│   └── docker/
└── packages/
    └── api_contracts/
```

## Como usar agora

```bash
npm install
npm start
```

Abra `http://localhost:8080`.

Para validar tudo:

```bash
npm run check
```

Runbook completo: `docs/13-runbook-amanha.md`.

Leituras principais:

1. `docs/09-mvp-bar-do-jao.md` para entender o MVP fechado.
2. `docs/10-primeira-rodada-multi-agente.md` para decisoes e prompts da proxima rodada.
3. `docs/notion/workspace-notion.md` para criar os databases no Notion.

## Demo no navegador

O `index.html` virou uma SPA estatica com estado em `localStorage`.

Ela permite:

- alternar entre modo Admin, Staff e Membro;
- cadastrar membros;
- criar eventos;
- reservar como membro;
- fazer check-in por token QR demo;
- exportar o estado atual em JSON;
- visualizar uma API fake do browser.

Detalhes em `docs/12-browser-demo.md`.

## Apresentacao

`apresentacao.html` e uma apresentacao simples, mobile-friendly, explicando o produto para o dono do local e para o cliente final.

## Base tecnica iniciada

- API NestJS em `apps/api`.
- Schema e seed Prisma do Bar do Jao em `apps/api/prisma`.
- Contrato OpenAPI inicial em `packages/api_contracts/openapi.yaml`.
- Skeleton manual do app Flutter unico em `apps/flutter_app`.
- PostgreSQL local em `infra/docker/docker-compose.yml`.

Com Node instalado:

```bash
npm install
npm run check
```

Com Docker/Postgres:

```bash
docker compose -f infra/docker/docker-compose.yml up -d postgres
npm run db:migrate
npm run db:seed
npm run api:dev
```

## Principios de execucao

- Comecar com um MVP multi-tenant simples para o Bar do Jao, mas preparado para white-label.
- Separar claramente produto, app Flutter, backend, dados, DevOps, QA e operacao.
- Usar app Flutter unico com shells por persona e flavorizacao por cliente/unidade.
- Validar cedo com dois simuladores de cliente: dono do clube e cliente final.
- Documentar decisoes tecnicas para reduzir retrabalho entre agentes.

## Mock

O arquivo `index.html` e um prototipo estatico para alinhar UX/UI, linguagem visual e principais jornadas antes da implementacao Flutter.

## Notion

Nao ha credenciais de API do Notion neste ambiente. Por isso, foi criada uma estrutura importavel/copiavel em `docs/notion/workspace-notion.md`, com databases, propriedades, templates e views sugeridas.

## Testes

O legado Cypress/SauceDemo do repositorio anterior foi removido para evitar CI e dependencias irrelevantes. A nova estrategia de testes deve nascer em torno dos fluxos P0 do Whiskey Club OS: login, tenant isolation, reservas, check-in e dashboard.
