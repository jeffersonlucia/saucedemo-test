# Notion Import — Whiskey Club Workspace

> Esta pasta contém uma **estrutura de páginas em Markdown** pronta para importar no Notion. O Notion importa arquivos `.md` mantendo títulos, listas, tabelas e links internos como subpáginas.

## Como importar

1. No Notion, crie um novo workspace (ou um espaço de equipe chamado **Whiskey Club**).
2. `Settings & Members → Settings → Import → Markdown & CSV`.
3. Selecione **todos** os arquivos `.md` desta pasta de uma vez.
4. O Notion cria uma página por arquivo, na ordem da numeração. Você arruma a hierarquia arrastando.

## Hierarquia sugerida no Notion

```
🥃 Whiskey Club (workspace)
├── 01 — Home (start here)
├── 02 — Roadmap & OKRs
├── 03 — Backlog
│   ├── Épicos (database)
│   ├── Histórias (database)
│   └── Tasks (database)
├── 04 — Sprints / Ciclos
├── 05 — Documentação
│   ├── Estratégia
│   ├── Requisitos
│   ├── Arquitetura
│   ├── Design
│   ├── DevOps
│   ├── QA
│   └── Help Center (espelho)
├── 06 — Equipe & Agentes
└── 07 — Operação
    ├── Rituais
    ├── Sim Reports (database)
    └── Incidentes (database)
```

## Databases sugeridos (cria depois do import)

- **Épicos** — propriedades: nome, fase, valor (persona), status, KPIs.
- **Histórias** — propriedades: épico (relation), persona, pontos, status (Backlog/Ready/Doing/Review/Done), DoR ✅, DoD ✅, mocks (URL), PR (URL).
- **Tasks** — propriedades: história (relation), trilha (Back/Front/QA/...), agente atribuído, status, PR.
- **Sim Reports** — propriedades: história, persona-sim, fricção (0–5), decisão (aceitar / refazer), data.
- **Incidentes** — propriedades: severidade, status, descobertor, postmortem (URL), root cause.

## Sincronização com este repo

Para evitar drift:
- Documentação **viva** (estratégia, arquitetura, requisitos) → mantém **versão canônica no Git**. Notion espelha por link.
- Operação **ativa** (backlog, sprints, reports, incidentes) → vive **no Notion**.

Convenção: cada PR que mexer em `docs/` precisa ter checkbox "Notion atualizado: N/A | Sim | Link".
