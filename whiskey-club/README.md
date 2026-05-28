# Whiskey Club — Plataforma de Gestão de Clubes de Whiskey

App **Flutter multiplataforma** (iOS, Android, Web) com **flavorização por cliente/unidade** (white-label), backend headless e operação orquestrada por **múltiplos agentes de IA**.

> Status: **Discovery + Plano de Execução**. Nada de código de produção ainda — esta pasta contém **toda a base de planejamento, documentação, arquitetura, design system, backlog e plano multi-agente** necessária para começar a executar.

---

## Sumário do Plano

| Pasta | O que tem |
|---|---|
| `docs/` | Documentação viva: visão, requisitos, arquitetura, UX/UI, DevOps, QA, lançamento, manual do usuário |
| `planning/` | Roadmap, backlog (épicos / stories / tasks), estrutura de time, RACI, pacote para importar no Notion |
| `agents/` | Orquestração multi-agente: 14 personas com chapéus definidos, workflows e contratos de hand-off |
| `mocks/` | `index.html` — mock visual navegável que serve de base de referência para o time |

## Como ler este plano (ordem sugerida)

1. [`docs/00-vision-and-strategy.md`](docs/00-vision-and-strategy.md) — porque existimos
2. [`docs/01-requirements/personas.md`](docs/01-requirements/personas.md) e [`user-journeys.md`](docs/01-requirements/user-journeys.md) — pra quem
3. [`docs/01-requirements/functional.md`](docs/01-requirements/functional.md) e [`non-functional.md`](docs/01-requirements/non-functional.md) — o quê
4. [`docs/02-architecture/`](docs/02-architecture/) — como
5. [`planning/roadmap.md`](planning/roadmap.md) e [`planning/backlog/`](planning/backlog/) — quando
6. [`agents/README.md`](agents/README.md) — quem (chapéus de IA) faz o quê
7. [`mocks/index.html`](mocks/index.html) — abra no navegador pra "ver" o produto

## Princípios

- **White-label de verdade**: um único codebase, múltiplos clubes (marcas), múltiplas unidades por clube.
- **Headless first**: backend API-first, app é só uma cara possível (vamos ter PWA, eventualmente tablets em loja).
- **Vertical slices**: cada release entrega valor ponta-a-ponta para pelo menos uma persona.
- **Multi-agente desde o dia 0**: roles bem definidas, hand-offs documentados em `agents/`.
- **Documentação como código**: tudo em Markdown versionado, sincronizado com Notion via import.

## Próximos passos imediatos

1. Revisar e validar a visão (`docs/00-vision-and-strategy.md`) com o sponsor.
2. Importar `planning/notion-import/` no Notion (criar workspace "Whiskey Club").
3. Spin up dos agentes seguindo `agents/orchestration.md` na ordem do Fase 0 do roadmap.
4. Provisionar repositório real (extrair esta pasta) e infra inicial conforme `docs/04-devops/environments.md`.
