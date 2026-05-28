# Equipe de desenvolvimento e stack

## Tamanho recomendado da stack

### Fase 0 — Discovery (3–4 pessoas equivalentes + agentes)
| Papel | Qtd | Foco |
|-------|-----|------|
| Product Owner | 1 | Priorização, validação |
| Analista de requisitos | 1 | RF/RNF, rastreabilidade |
| UX/UI Designer | 1 | Mock → design system |
| Tech Lead (part-time) | 0.5 | ADRs, arquitetura flavors |

### Fase 1 — MVP (8–10 FTE)
| Papel | Qtd | Foco |
|-------|-----|------|
| Tech Lead | 1 | Arquitetura, code review |
| Flutter dev | 2 | App + flavors + Web |
| Backend dev | 2 | API, integrações pagamento |
| QA / automação | 1 | E2E, regressão flavors |
| DevOps | 1 | CI/CD, infra, observabilidade |
| DBA | 0.5 | Schema, RLS, performance |
| UX/UI | 1 | Figma, handoff |
| PM | 0.5 | Cronograma, riscos |
| PO | 0.5 | Backlog, aceite |
| Technical Writer | 0.5 | Doc usuário + API |

### Fase 2 — Escala (12–15 FTE)
- +1 Flutter, +1 Backend, +1 QA, +1 SRE, +1 CS/onboarding

## Mapeamento agente IA ↔ papel humano

Ver [`../agents/README.md`](../agents/README.md) — cada agente pode substituir ou **assistir** o papel até contratar FTE.

## Stack tecnológica

| Camada | Tecnologia | Motivo |
|--------|------------|--------|
| Mobile/Web | Flutter 3.x | Um codebase, flavors nativos |
| Estado | Riverpod 2 | Testável, comum no ecossistema |
| Roteamento | go_router | Deep links por flavor |
| API | NestJS + TypeScript | Produtividade, OpenAPI |
| DB | PostgreSQL 16 + RLS | Multi-tenant seguro |
| Cache | Redis | Sessão e filas |
| Auth | JWT + refresh; Firebase Auth opcional | |
| Pagamentos | Stripe (global) / Mercado Pago (BR) | |
| CI | GitHub Actions | Já no ecossistema Git |
| Design | Figma + tokens exportados | Consistência white-label |
| Docs | Notion + Markdown no repo | Fonte da verdade dupla |
| Testes | flutter_test, integration_test, Patrón API tests | Pirâmide |

## Cerimônias ágeis (leve)

- Sprint 2 semanas
- Planning → Daily async → Review → Retro
- Refinamento contínuo com agente PO + analista

## Canais

- Notion: backlog e docs
- GitHub: código e PRs
- Slack/Discord: `#whiskey-club-dev`, `#releases`
