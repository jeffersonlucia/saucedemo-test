# Agentes — Whiskey Club OS

Cada arquivo define um **agente especialista** para orquestração paralela no Cursor / Cloud Agents.

## Como usar

1. Abra o arquivo do agente (ex. `product-owner.md`).
2. Copie o bloco **System prompt** para um novo agent/chat.
3. Informe os **Inputs obrigatórios** listados no arquivo.
4. Valide o **Output esperado** antes de marcar a tarefa como done no Notion.

## Índice de agentes

| ID | Arquivo | Papel |
|----|---------|-------|
| project-manager | [project-manager.md](project-manager.md) | Cronograma, riscos, stakeholders |
| product-owner | [product-owner.md](product-owner.md) | Backlog, priorização, aceite |
| requirements-analyst | [requirements-analyst.md](requirements-analyst.md) | RF/RNF, rastreabilidade |
| ux-ui-designer | [ux-ui-designer.md](ux-ui-designer.md) | UX/UI, design system, mock |
| tech-lead | [tech-lead.md](tech-lead.md) | Arquitetura, ADRs, review |
| flutter-dev | [flutter-dev.md](flutter-dev.md) | App mobile/web, flavors |
| backend-dev | [backend-dev.md](backend-dev.md) | API, integrações |
| dba | [dba.md](dba.md) | Schema, RLS, performance |
| devops | [devops.md](devops.md) | CI/CD, infra, observabilidade |
| qa-automation | [qa-automation.md](qa-automation.md) | Testes automatizados |
| technical-writer | [technical-writer.md](technical-writer.md) | Docs usuário e técnica |
| client-club-owner | [client-club-owner.md](client-club-owner.md) | Simula dono do clube |
| client-end-member | [client-end-member.md](client-end-member.md) | Simula membro final |

## Escalar agentes

Duplicar instâncias quando a fila crescer:

- `flutter-dev-2` — módulo de eventos
- `backend-dev-2` — módulo de pagamentos
- `qa-automation-2` — regressão de flavors

Regra: **um agente = um escopo de arquivos** por branch.

## Outputs compartilhados

Salvar feedback e artefatos transitórios em `agents/outputs/` (gitkeep).
