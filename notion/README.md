# Estrutura Notion — Whiskey Club OS

> **Nota:** Este repositório não cria automaticamente um workspace Notion (requer sua conta). Use este guia para montar em ~30 minutos.

## Passo a passo

### 1. Criar workspace
- Nome sugerido: **Whiskey Club OS**
- Ícone: 🥃

### 2. Criar 5 databases (linked)

| Database | Propriedades principais |
|----------|-------------------------|
| **Fases** | Nome, Status (Select), Objetivo (Text), Início, Fim |
| **Épicos** | Nome, Fase (Relation), Status, Prioridade |
| **Histórias** | Título, Épico (Relation), Pontos, RF IDs, Status, Critérios aceite |
| **Tasks** | Nome, História (Relation), Tipo, Responsável, Status, Agente (Select) |
| **Agent Runs** | Agente, Sprint, Status, Output URL, Data |

### 3. Views recomendadas

- **Board Sprints:** Kanban por Status em Histórias
- **Timeline:** Fases com datas
- **Por agente:** Tabela Tasks filtrada por `Agente`
- **Backlog MVP:** Histórias onde Fase = "MVP" e Status ≠ Done

### 4. Importar CSV

No Notion: `⋯` → **Merge with CSV** em cada database:

- `notion/csv/phases.csv`
- `notion/csv/epics.csv`
- `notion/csv/stories.csv`
- `notion/csv/tasks.csv`

Relações entre databases: vincule manualmente após import (Épico → Fase, História → Épico, etc.) ou use [Notion API](https://developers.notion.com/) em script futuro.

### 5. Páginas fixas

| Página | Conteúdo |
|--------|----------|
| Home | Links para docs GitHub, mock HTML, dashboard |
| ADRs | Embed ou link `docs/04-ARQUITETURA-FLAVORS.md` |
| Glossário | Termos whiskey + técnico |
| Rituais | Planning, review, definição de pronto |

### 6. Sincronização com Git

- **Fonte da verdade técnica:** `docs/` no repositório
- **Fonte operacional:** Notion (sprint, tasks, agent runs)
- PM atualiza Notion; analista/PO atualizam `docs/` — sync semanal

### 7. Template duplicável

Duplique este workspace para cada novo cliente piloto, mantendo databases iguais e filtrando por propriedade `Tenant`.

## Integração futura (opcional)

- GitHub Issues ↔ Notion via Zapier/Make
- PR aberto → Task em "In Review"
- Label `agent:flutter-dev` → filtro automático
