# Estrutura do Time

> O time é **híbrido**: um núcleo humano pequeno + **agentes especializados** trabalhando em paralelo. Cada papel humano pode ser ampliado adicionando mais instâncias do agente correspondente quando há gargalo.

## Camadas

```
                ┌─────────────────────────┐
                │     Sponsor / CEO       │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │   PM (Product Manager)  │
                └──┬────┬────────────┬────┘
                   │    │            │
       ┌───────────▼┐  ┌▼───────┐ ┌──▼──────┐
       │     PO     │  │  BA    │ │ Tech    │
       │ (Product   │  │ Req.   │ │ Lead    │
       │  Owner)    │  └────────┘ └────┬────┘
       └─────┬──────┘                  │
             │                         │
   ┌─────────┼─────────┬───────────────┼───────────┬─────────┐
   │         │         │               │           │         │
┌──▼──┐  ┌───▼───┐  ┌──▼──┐  ┌────────▼──┐  ┌────▼───┐ ┌───▼────┐
│ UX  │  │  UI   │  │ Back│  │ Frontend  │  │ DBA    │ │ DevOps │
└─────┘  └───────┘  └─────┘  │ (Flutter) │  └────────┘ └────────┘
                              └────┬──────┘
                                   │
                          ┌────────▼─────────┐
                          │ QA Automation +  │
                          │ Tech Writer      │
                          └──────────────────┘

       ┌──────────────────────────────────────────────────┐
       │ Agentes de Simulação (validação contínua)        │
       │  - Cliente-Sim Dono (Ricardo)                    │
       │  - Cliente-Sim Sócio Premium (André)             │
       │  - Cliente-Sim Sócio Aspiracional (Camila)       │
       └──────────────────────────────────────────────────┘
```

## Papéis (e nome da persona-agente em `agents/personas/`)

| Papel | Persona-agente | Foco |
|---|---|---|
| Product Manager | `pm.md` | Visão, priorização, métricas, stakeholders |
| Product Owner | `po.md` | Backlog vivo, refinamento, aceite |
| Analista de Requisitos / BA | `ba-requirements.md` | Documentar regras, decompor histórias, manter glossário |
| Tech Lead | `tech-lead.md` | Padrões, ADRs, revisão final de PR, debt |
| UX Designer | `ux-designer.md` | Pesquisa, jornadas, IA |
| UI Designer | `ui-designer.md` | Visual, design system, mocks |
| Backend Dev | `backend.md` | API, regras de negócio, integrações |
| Frontend Dev (Flutter) | `frontend-flutter.md` | App mobile + web, design system implementation |
| DBA | `dba.md` | Modelagem, índices, performance, backups |
| DevOps / SRE | `devops.md` | CI/CD, infra, observabilidade, on-call |
| QA Automation | `qa-automation.md` | Estratégia + escrita de testes em todos os níveis |
| Tech Writer | `tech-writer.md` | Docs técnicas + manual do usuário + release notes |
| Cliente-Sim Dono | `client-owner-sim.md` | Joga o papel do Ricardo nos rituais e validações |
| Cliente-Sim Sócio | `client-enduser-sim.md` | Joga papel de André e Camila |

## Sizing — quantos agentes ao mesmo tempo

Para o **MVP (Fase 1)**, com tempo apertado e escopo concentrado, a estimativa inicial é:

| Papel | Instâncias paralelas mínimas | Quando escalar |
|---|---|---|
| PM | 1 | só escala em F3 |
| PO | 1 | 2 quando tiver > 2 epics simultâneos |
| BA | 1 | 2 quando backlog > 80 histórias prontas |
| Tech Lead | 1 | 1 (papel singular) |
| UX | 1 | 2 antes de cada nova fase |
| UI | 1 | 2 quando o backlog UI > 10 telas/sprint |
| Backend | 2 | adicionar 1 por novo bounded context em paralelo |
| Frontend Flutter | 2 | adicionar 1 por feature de UI grande (cellar pessoal, e-commerce) |
| DBA | 1 (shared) | virar 2 quando entrar e-commerce |
| DevOps | 1 | 2 antes do launch público |
| QA Auto | 1 | 2 a partir da Fase 2 |
| Tech Writer | 1 | 1 |
| Cliente-Sim | 2 (1 dono + 1 sócio) | adicionar 1 sócio aspiracional na Fase 2 |

**Total inicial (Fase 1)**: ~16 instâncias paralelas em momentos de pico, com média sustentada em ~10.

## Tamanho da "stack de desenvolvimento"

A **stack de dev** (papéis que escrevem código) tem em F1:

- 1 Tech Lead
- 2 Backend
- 2 Frontend Flutter
- 1 DBA
- 1 DevOps
- 1 QA Automation
- 1 UI (implementa Cask DS junto com FE)

= **9 papéis de dev** trabalhando em paralelo, mais a camada de produto e simulação por cima.

## Rituais

| Ritual | Frequência | Quem |
|---|---|---|
| **Standup orquestrado** | diário (assíncrono em thread) | todos os agentes ativos + PM |
| **Refinamento** | 2× semana | PM + PO + BA + Tech Lead + 1 dev por trilha + Cliente-Sim |
| **Planning** | início de cada "ciclo" (2 semanas equivalentes) | PM + PO + Tech Lead + leads de trilha |
| **Review** | fim de ciclo | todos + sponsor |
| **Retro** | fim de ciclo | todos os agentes (foco: o que orquestrar diferente) |
| **Demo cliente** | fim de fase | Cliente-Sim + PM + sponsor |

## Modo de trabalho

- **Trunk-based**, branches `feature/<id-da-task>`.
- **Pair AI-with-AI**: tarefas críticas têm 2 agentes (autor + revisor) sempre.
- **Humano no loop** nas decisões irreversíveis: arquitetura, mudança de contrato público, comunicação ao cliente, deploy de produção.
