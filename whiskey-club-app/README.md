# Whiskey Club Manager - Product Blueprint

Este diretório concentra o planejamento completo para lançamento de um app Flutter de gerenciamento de clube de whiskey, com operação multi-tenant (por cliente) e segmentação por unidade.

## Objetivo

Entregar uma base de execução para um produto SaaS white-label, onde:

- Cada cliente (clube) pode ter branding e regras próprias.
- Cada unidade do cliente opera com catálogo, estoque e eventos locais.
- O app atende dois perfis principais:
  - Dono/Gestor do clube.
  - Cliente final (membro/comprador).

## Conteúdo deste pacote

- `docs/plano-produto-multiagente.md`
  - Estratégia de produto.
  - Requisitos funcionais e não funcionais.
  - Arquitetura Flutter com flavors por cliente/unidade.
  - Stack, time completo e plano de execução por fases.
  - Orquestração multiagente (PM, PO, UX/UI, DevOps, DBA, Backend, Frontend, QA, etc.).
- `docs/notion-setup.md`
  - Estrutura de Notion para gestão ponta a ponta.
  - Bases, propriedades, templates e fluxos.
- `docs/notion-backlog-seed.csv`
  - Backlog inicial granular para importação no Notion.
- `index.html`
  - Mock HTML inicial para servir de referência de UX/UI e arquitetura de navegação.

## Visão rápida do produto

### Módulos principais

1. Gestão de membros e assinaturas
2. Catálogo de garrafas e kits
3. Estoque por unidade
4. Pedidos e pagamentos
5. Eventos, degustações e reservas
6. Fidelidade, pontos e benefícios
7. Painel analítico para gestor

### Estratégia de flavorização

- **TenantFlavor (cliente):** branding, regras comerciais, integrações e temas.
- **UnitScope (unidade):** estoque, agenda, equipe e operação local.
- **EnvironmentFlavor (dev/stg/prod):** controle de ambientes e release.

## Próximo passo sugerido

Com esse material aprovado, o próximo passo é iniciar a execução com múltiplos agentes em paralelo, seguindo os prompts e trilhas definidos em `plano-produto-multiagente.md`.
