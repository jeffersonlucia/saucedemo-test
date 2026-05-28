# Whiskey Club OS

Plataforma white-label de gerenciamento de clubes de whiskey, com **flavorização por cliente/unidade**, app Flutter multi-plataforma e orquestração de **múltiplos agentes de IA** (cada um com um “chapéu” de especialista).

## O que há neste repositório

| Pasta | Conteúdo |
|-------|----------|
| [`docs/`](docs/) | Visão de produto, requisitos, arquitetura, equipe, roadmap, orquestração |
| [`agents/`](agents/) | Personas e prompts para agentes (PM, PO, UX, DevOps, etc.) |
| [`mock/`](mock/index.html) | Protótipo HTML interativo (base de UI/UX) |
| [`notion/`](notion/) | Estrutura de databases e CSVs para importar no Notion |
| [`app/flutter/`](app/flutter/) | Esqueleto do app Flutter com flavors documentados |
| [`legacy/`](legacy/) | Projeto anterior (Cypress SauceDemo) — referência apenas |

## Como começar

1. Abra o mock: `open mock/index.html` (ou sirva com `python3 -m http.server 8080` na pasta `mock/`).
2. Leia [`docs/00-INDICE.md`](docs/00-INDICE.md) — índice de toda a documentação.
3. Configure o Notion seguindo [`notion/README.md`](notion/README.md).
4. Orquestre agentes com [`docs/08-ORQUESTRACAO-AGENTES.md`](docs/08-ORQUESTRACAO-AGENTES.md).

## Personas do produto

- **Dono do clube** — cadastro, estoque, eventos, assinaturas, relatórios.
- **Membro** — degustações, reservas, histórico, benefícios do clube.
- **Admin da plataforma** — onboarding de novos clubes (tenants), billing, suporte.

## Flavors (cliente / unidade)

Cada **cliente** (marca do clube) e cada **unidade** (filial) pode ter:

- Identidade visual (cores, logo, fontes)
- Bundle ID / applicationId distintos
- API base URL e chaves por ambiente
- Feature flags (ex.: módulo de leilão, integração iFood de harmonização)

Detalhes em [`docs/04-ARQUITETURA-FLAVORS.md`](docs/04-ARQUITETURA-FLAVORS.md).

## Próximo passo recomendado

Executar **Fase 0 — Discovery** (2 semanas de calendário de referência) com os agentes `requirements-analyst`, `product-owner` e `ux-ui-designer` em paralelo, usando o mock HTML como referência visual compartilhada.

## Licença

Proprietário — definir antes do lançamento público.
