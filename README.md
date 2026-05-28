# Whiskey Club OS

Repositorio de planejamento, prototipacao e orquestracao multi-agente para um produto de gerenciamento de clubes de whiskey com app Flutter flavorizado por cliente/unidade.

## Objetivo

Criar a base para lancar um produto B2B2C onde cada clube de whiskey possa operar com identidade propria, unidades, membros, assinaturas, eventos, degustacoes, estoque, reservas e comunicacao com clientes finais.

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
│   └── notion/
│       └── workspace-notion.md
└── cypress/
```

## Como usar agora

1. Leia `docs/00-visao-produto.md` para alinhar o produto.
2. Use `docs/notion/workspace-notion.md` para criar os databases no Notion.
3. Abra `index.html` no navegador para revisar o mock base.
4. Distribua os documentos de agentes em `docs/04-time-agentes.md` para orquestrar especialistas em paralelo.
5. Transforme as historias de `docs/06-backlog-historias-tarefas.md` em issues/boards.

## Principios de execucao

- Comecar com um MVP multi-tenant simples, mas preparado para white-label.
- Separar claramente produto, app Flutter, backend, dados, DevOps, QA e operacao.
- Usar flavorizacao por cliente/unidade para identidade visual, configuracao, features e endpoints.
- Validar cedo com dois simuladores de cliente: dono do clube e cliente final.
- Documentar decisoes tecnicas para reduzir retrabalho entre agentes.

## Mock

O arquivo `index.html` e um prototipo estatico para alinhar UX/UI, linguagem visual e principais jornadas antes da implementacao Flutter.

## Notion

Nao ha credenciais de API do Notion neste ambiente. Por isso, foi criada uma estrutura importavel/copiavel em `docs/notion/workspace-notion.md`, com databases, propriedades, templates e views sugeridas.

## Testes existentes

O repositorio ja possuia automacao Cypress. Ela foi mantida como base futura para testes E2E do mock/produto, mas ainda aponta para o exemplo anterior e deve ser reconfigurada quando a aplicacao real comecar.
