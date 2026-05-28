# 03 — Backlog

Estrutura para criar **3 databases ligados** no Notion: Épicos → Histórias → Tasks.

## Como criar no Notion

1. Crie 3 databases (em Full Page): `Épicos`, `Histórias`, `Tasks`.
2. Adicione as propriedades sugeridas abaixo.
3. Importe os CSVs equivalentes (se quiser bootstrap inicial — você pode gerar a partir de `planning/backlog/`).

## Database — Épicos

| Propriedade | Tipo |
|---|---|
| Nome | Título |
| Código | Texto (E1, E2, ...) |
| Fase | Select (Fase 0/1/2/3) |
| Status | Select (Planned / In progress / Done) |
| Persona principal | Multi-select |
| Módulos | Multi-select |
| KPIs | Texto |
| Link doc | URL (aponta pra `planning/backlog/epics.md` no GitHub) |

Bootstrap: ver [`planning/backlog/epics.md`](../backlog/epics.md).

## Database — Histórias

| Propriedade | Tipo |
|---|---|
| Nome | Título |
| ID | Texto (US-X.n) |
| Épico | Relation → Épicos |
| Persona | Select |
| Pontos | Number |
| Status | Select (Backlog / Ready / Doing / Review / Sim / Done) |
| DoR | Multi-select de checklist |
| DoD | Multi-select de checklist |
| Mocks | URL (Figma) |
| PR | URL (GitHub) |
| Sprint | Relation → Sprints |

Bootstrap: ver [`planning/backlog/user-stories.md`](../backlog/user-stories.md).

## Database — Tasks

| Propriedade | Tipo |
|---|---|
| Nome | Título |
| ID | Texto (Trilha-X.n.m) |
| Trilha | Select (D / B / DB / F / Q / OP / DOC / SIM) |
| História | Relation → Histórias |
| Agente | Person (humano) ou Tag (agente) |
| Status | Select (To do / Doing / Blocked / Review / Done) |
| PR | URL |
| Estimativa (h) | Number |

Exemplo de granularização: ver [`planning/backlog/tasks.md`](../backlog/tasks.md).
