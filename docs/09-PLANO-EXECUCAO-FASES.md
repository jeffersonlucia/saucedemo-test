# Plano de execução por fases

> Referência de calendário para planejamento humano; agentes trabalham por **dependências técnicas**, não por estimativa em dias.

## Fase 0 — Discovery e alinhamento

**Objetivo:** Validar problema, mock clicável, requisitos v1, estrutura Notion.

| # | Entrega | Responsável | DoD |
|---|---------|-------------|-----|
| 0.1 | Mock HTML aprovado | UX + PO | Dono e membro simulados validaram fluxos |
| 0.2 | Requisitos v1 | Analista | RF/RNF numerados |
| 0.3 | Backlog MVP priorizado | PO | Top 20 histórias com pontos |
| 0.4 | Workspace Notion | PM | 5 databases populadas |
| 0.5 | ADR flavors | Tech Lead | Aprovado em `docs/04` |

**Paralelo máximo:** 5 agentes (Onda 1 em `08-ORQUESTRACAO-AGENTES.md`).

---

## Fase 1 — Fundação técnica

**Objetivo:** Repo Flutter com 2 flavors, API skeleton, CI básico, DB migrado.

| # | Entrega | Agentes |
|---|---------|---------|
| 1.1 | Projeto Flutter + flavorizr | flutter-dev, tech-lead |
| 1.2 | API auth + tenant middleware | backend-dev, dba |
| 1.3 | PostgreSQL + RLS base | dba |
| 1.4 | GitHub Actions lint/test | devops |
| 1.5 | Design tokens Figma | ux-ui-designer |

**Marco:** Build `client_a` e `client_a_sp` instaláveis em dispositivo de teste.

---

## Fase 2 — MVP funcional

**Objetivo:** Fluxos críticos ponta a ponta.

| Sprint | Foco | Histórias |
|--------|------|-----------|
| S1 | Auth + perfis | US-2.x |
| S2 | Garrafas + estoque | US-3.x |
| S3 | Eventos + reservas | US-4.x |
| S4 | Assinaturas | US-5.x |
| S5 | Dashboard + polish | US-6.x, US-7.x |

**Marco:** Piloto com 1 clube real (10–30 membros).

---

## Fase 3 — Lançamento

| # | Entrega |
|---|---------|
| 3.1 | App Store + Play Store (flavor piloto) |
| 3.2 | Documentação usuário publicada |
| 3.3 | Runbook suporte e monitoramento |
| 3.4 | Onboarding playbook para novo tenant |

---

## Fase 4 — Escala

- Self-service onboarding tenant
- Feature flags dinâmicos
- Módulos premium (leilão, analytics avançado)

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| Escopo MVP inflado | PO firma congelamento após Fase 0 |
| Complexidade flavors | Apenas 2 flavors até Fase 3 |
| Pagamentos BR | Spike Mercado Pago na S4 |
| LGPD | Revisão jurídica na Fase 2 |

---

## Granularização de tasks (exemplo US-4.2)

| Task | Tipo | Est. pts |
|------|------|----------|
| API POST /reservations | Backend | 2 |
| Validação capacidade | Backend | 1 |
| Tela lista eventos | Flutter | 2 |
| Tela confirmação reserva | Flutter | 2 |
| Teste integração API | QA | 1 |
| Atualizar OpenAPI | Tech Writer | 0.5 |

Importar tasks detalhadas via `notion/csv/tasks.csv`.
