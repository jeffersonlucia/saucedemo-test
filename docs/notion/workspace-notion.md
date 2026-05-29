# Workspace Notion - Whiskey Club OS

## Observacao

Este ambiente nao possui credenciais/API do Notion. Este arquivo e um blueprint para criar manualmente ou importar no Notion. Quando houver uma integracao Notion disponivel, este blueprint pode virar automacao.

## Pagina raiz

Nome: Whiskey Club OS - Produto, Execucao e Lancamento.

Pagina destacada recomendada: MVP Bar do Jao.

Secoes:

1. Norte do produto.
2. Roadmap.
3. Backlog.
4. Design e pesquisa.
5. Engenharia.
6. QA e releases.
7. Clientes piloto.
8. Documentacao.
9. Decisoes e riscos.

## Registro inicial recomendado

Crie uma pagina ou item fixado com:

- MVP: app Flutter unico para admin, staff, membro e web.
- Cliente piloto: Bar do Jao.
- Fonte do escopo: `docs/09-mvp-bar-do-jao.md`.
- Fonte da rodada multi-agente: `docs/10-primeira-rodada-multi-agente.md`.
- ADRs: `docs/adr/0001-mvp-stack-e-escopo.md` e `docs/adr/0002-app-flutter-unico.md`.

## Databases

### 1. Roadmap

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Nome | Title | MVP operacional |
| Fase | Select | Fundacao, Descoberta, MVP, Piloto, Lancamento |
| Status | Select | Ideia, Planejado, Em andamento, Bloqueado, Concluido |
| Objetivo | Text | Validar reservas e check-in |
| Dono | Person | PM |
| Prioridade | Select | P0, P1, P2 |
| Metric | Text | Taxa de reserva |
| Dependencias | Relation | Backlog |

Views:

- Timeline por fase.
- Board por status.
- Tabela P0.

### 2. Backlog

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Historia | Title | Membro reserva evento |
| Epico | Select | Eventos |
| Tipo | Select | Story, Task, Bug, Spike, Chore |
| Prioridade | Select | P0, P1, P2 |
| Status | Select | Inbox, Refinar, Ready, Doing, Review, QA, Done |
| Persona | Select | Owner, Manager, Staff, Member, Platform Admin |
| Valor | Text | Garantir vaga em degustacao |
| Criterios de aceite | Text | Dado/quando/entao |
| Agente dono | Select | PO, Flutter, Backend, QA |
| Tamanho tecnico | Select | S, M, L, XL |
| Dependencias | Relation | Backlog |
| Release | Relation | Releases |

Views:

- Board por status.
- Por epico.
- Ready for dev.
- Bugs abertos.
- P0 MVP.

Template de historia:

```text
Como [persona],
quero [acao],
para [beneficio].

Criterios de aceite:
- Dado...
- Quando...
- Entao...

Notas:
- Tenant/unit impact:
- API/Design:
- Testes:
```

### 3. Requisitos

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Requisito | Title | Reservas respeitam capacidade |
| Categoria | Select | Funcional, Nao funcional, Regra, LGPD |
| Modulo | Select | Eventos |
| Status | Select | Proposto, Validado, Implementado, Descartado |
| Fonte | Select | Cliente, PM, Tech, QA |
| Risco | Select | Baixo, Medio, Alto |
| Historias | Relation | Backlog |

Views:

- Por modulo.
- Regras criticas.
- Perguntas abertas.

### 4. Agentes

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Agente | Title | Agente Backend |
| Chapeu | Select | PM, PO, UX, UI, DevOps, DBA, Back, Front, QA |
| Status | Select | Disponivel, Trabalhando, Bloqueado |
| Escopo | Text | APIs de eventos |
| Entradas | Text | PRD, OpenAPI, ERD |
| Saidas | Text | Endpoints, testes, docs |
| Guardrails | Text | Nao quebrar tenant isolation |
| Tarefas | Relation | Backlog |

Views:

- Board por status.
- Por chapeu.
- Carga por agente.

### 5. Decisoes tecnicas (ADR)

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Decisao | Title | Usar PostgreSQL shared DB |
| Status | Select | Proposta, Aceita, Substituida |
| Contexto | Text | Multi-tenant MVP |
| Opcao escolhida | Text | tenant_id em tabelas |
| Consequencias | Text | Menor custo, exige testes |
| Dono | Person | Tech Lead |
| Data | Date | 2026-05-28 |

Template ADR:

```text
# ADR - [titulo]

## Contexto

## Opcoes consideradas

## Decisao

## Consequencias

## Como validar
```

### 6. Design

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Artefato | Title | Home do membro |
| Tipo | Select | Wireframe, Mock, Prototype, Design System |
| Status | Select | Draft, Review, Approved, Implemented |
| Persona | Select | Owner, Manager, Staff, Member |
| Link | URL | Figma |
| Historia | Relation | Backlog |

Views:

- Por persona.
- Aguardando review.
- Aprovado para dev.

### 7. QA

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Caso de teste | Title | Reserva evento com capacidade |
| Tipo | Select | Unit, Integration, E2E, Manual, Smoke |
| Status | Select | To write, Automated, Manual, Passing, Failing |
| Prioridade | Select | P0, P1, P2 |
| Historia | Relation | Backlog |
| Ambiente | Select | Local, Dev, Staging, Prod |
| Resultado | Text | Ultima execucao |

Views:

- Regressao MVP.
- Falhando.
- Por tipo.

### 8. Releases

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Release | Title | MVP piloto 0.1 |
| Status | Select | Planejada, Em QA, Pronta, Publicada, Rollback |
| Ambiente | Select | Dev, Staging, Production |
| Data alvo | Date | |
| Escopo | Relation | Backlog |
| Checklist | Checkbox | |
| Release notes | Text | |

Views:

- Timeline.
- Em QA.
- Publicadas.

### 9. Clientes piloto

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Cliente | Title | Bar do Jao |
| Status | Select | Prospect, Entrevista, Piloto, Ativo, Pausado |
| Unidades | Number | 2 |
| Membros | Number | 180 |
| Dores | Multi-select | Reservas, Estoque, Inadimplencia |
| Responsavel | Person | CS |
| Feedback | Relation | Feedback |

### 10. Feedback

Propriedades:

| Nome | Tipo | Exemplo |
| --- | --- | --- |
| Feedback | Title | Check-in precisa ser mais rapido |
| Fonte | Select | Dono, Gerente, Staff, Membro |
| Cliente | Relation | Clientes piloto |
| Modulo | Select | Eventos, Membros, Estoque |
| Severidade | Select | Baixa, Media, Alta, Critica |
| Status | Select | Novo, Triado, Convertido, Descartado |
| Historia criada | Relation | Backlog |

## Dashboards

### Dashboard executivo

- Roadmap por fase.
- P0 abertos.
- Riscos altos.
- Clientes piloto por status.
- Releases proximas.

### Dashboard engenharia

- Backlog Ready.
- Em review.
- Bugs falhando.
- ADRs pendentes.
- QA regressao.

### Dashboard produto/UX

- Feedback novo.
- Entrevistas.
- Designs aguardando review.
- Perguntas abertas.

## Permissoes sugeridas

| Grupo | Acesso |
| --- | --- |
| Founders | Full access |
| Produto | Roadmap, backlog, requisitos, feedback |
| Engenharia | Backlog, ADR, QA, releases |
| Design | Design, requisitos, feedback |
| CS | Clientes piloto, feedback, docs |
| Cliente piloto | Somente paginas compartilhadas especificas |

## Importacao manual rapida

1. Criar pagina raiz.
2. Criar os databases acima.
3. Copiar templates para cada database.
4. Criar views indicadas.
5. Popular backlog inicial com `docs/06-backlog-historias-tarefas.md`.
6. Popular agentes com `docs/04-time-agentes.md`.
7. Linkar releases e fases com `docs/05-roadmap-entregas.md`.
