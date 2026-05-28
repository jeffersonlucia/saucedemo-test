# Notion Setup - Gestao do Projeto Whiskey Club

Este guia define um workspace Notion pronto para gerenciar planejamento, execucao e operacao do produto.

## 1) Estrutura de paginas

Pagina raiz: **Whiskey Club Program**

Subpaginas:

1. `00 - Visao e Metas`
2. `01 - Roadmap`
3. `02 - Product Backlog`
4. `03 - Sprint Board`
5. `04 - Arquitetura e ADRs`
6. `05 - Qualidade e Testes`
7. `06 - Operacao e DevOps`
8. `07 - Riscos e Dependencias`
9. `08 - Documentacao Usuario`
10. `09 - Reunioes e Decisoes`

## 2) Bancos de dados (tabelas)

## 2.1 Database: Roadmap

Propriedades:
- `Iniciativa` (title)
- `Fase` (select: F0/F1/F2/F3/F4)
- `Objetivo`
- `Owner`
- `Status` (Not started / In progress / Done / Blocked)
- `Dependencias`
- `KPI alvo`

## 2.2 Database: Epicos

Propriedades:
- `Epico` (title)
- `Area` (Produto, Mobile, Backend, Dados, Infra, QA)
- `Prioridade` (P0/P1/P2)
- `Status`
- `Historias` (relation -> Historias)

## 2.3 Database: Historias

Propriedades:
- `Historia` (title)
- `Epico` (relation -> Epicos)
- `Persona` (Dono, Operador, Membro, Admin)
- `Criterios de aceite`
- `Story points` (number)
- `Sprint` (relation -> Sprints)
- `Status`

## 2.4 Database: Tasks

Propriedades:
- `Task` (title)
- `Historia` (relation -> Historias)
- `Especialidade` (PM, PO, UX, UI, Flutter, Frontend, Backend, DBA, DevOps, QA, Docs)
- `Responsavel`
- `Estimativa` (S/M/L)
- `Status`
- `Bloqueadores`

## 2.5 Database: Sprints

Propriedades:
- `Sprint` (title)
- `Objetivo`
- `Inicio`
- `Fim`
- `Status`

## 2.6 Database: Riscos

Propriedades:
- `Risco` (title)
- `Impacto` (Baixo/Medio/Alto)
- `Probabilidade` (Baixa/Media/Alta)
- `Mitigacao`
- `Owner`
- `Status`

## 2.7 Database: ADRs (Architecture Decision Records)

Propriedades:
- `ADR` (title)
- `Contexto`
- `Decisao`
- `Consequencias`
- `Status`

---

## 3) Templates prontos

## 3.1 Template de historia

Campos:
- Contexto
- Historia (Como ... quero ... para ...)
- Criterios de aceite (Given/When/Then)
- Regras de negocio
- Dependencias
- Plano de teste
- Checklist DoD

## 3.2 Template de task tecnica

Campos:
- Objetivo tecnico
- Escopo
- Passos de implementacao
- Riscos
- Evidencias (PR, logs, dashboards)

## 3.3 Template de reuniao

Campos:
- Objetivo
- Participantes
- Decisoes
- Acoes e donos
- Pendencias

---

## 4) Views recomendadas

- **Roadmap por Fase**
- **Backlog por Prioridade**
- **Kanban por Status (Tasks)**
- **Board por Especialidade**
- **Calendario de Sprints**
- **Riscos por criticidade**
- **ADRs aprovadas**

---

## 5) Governanca operacional

- Ritual semanal de priorizacao (PM + PO + Tech Lead).
- Daily tecnica por trilha (Produto/Plataforma/Apps).
- Review quinzenal com stakeholders.
- Atualizacao obrigatoria de status no Notion ao fim de cada ciclo.

---

## 6) Importacao inicial

Arquivo seed disponivel:

- `docs/notion-backlog-seed.csv`

Passos:
1. Criar database `Tasks` no Notion.
2. Importar CSV.
3. Ajustar propriedades de select e relation.
4. Vincular tarefas as historias/epicos.
