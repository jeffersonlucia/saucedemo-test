# 🥃 WhiskeyCLUB — App de Gerenciamento de Clube de Whiskey

> **Repositório de Planejamento Estratégico & Orquestração Multi-Agente**

[![Status](https://img.shields.io/badge/status-planejamento-blue)]()
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter)]()
[![Dart](https://img.shields.io/badge/Dart-3.x-0175C2?logo=dart)]()
[![Stack](https://img.shields.io/badge/Backend-Node.js%20%2B%20PostgreSQL-green)]()

---

## Visão Geral

**WhiskeyCLUB** é uma plataforma SaaS white-label para gestão completa de clubes de whiskey, construída em Flutter com flavorização por cliente/unidade. Permite que cada clube tenha sua própria identidade visual, configurações e funcionalidades, rodando na mesma base de código.

---

## Estrutura do Repositório

```
whiskey-club/
├── README.md                          ← Este arquivo
├── mock/
│   └── index.html                     ← Protótipo HTML do app (base visual)
├── docs/
│   ├── 00_PROJECT_OVERVIEW.md         ← Visão geral e objetivos
│   ├── 01_REQUIREMENTS.md             ← Requisitos funcionais e não-funcionais
│   ├── 02_TEAM_STRUCTURE.md           ← Time completo + papéis dos agentes
│   ├── 03_TECH_STACK.md               ← Stack tecnológica detalhada
│   ├── 04_ARCHITECTURE.md             ← Arquitetura do sistema
│   ├── 05_PHASES_MILESTONES.md        ← Fases, marcos e cronograma
│   ├── 06_USER_STORIES.md             ← Histórias de usuário completas
│   ├── 07_TASKS_BREAKDOWN.md          ← Granularização de tasks (épicos → tasks)
│   ├── 08_FLUTTER_FLAVORS.md          ← Guia de flavorização Flutter
│   ├── 09_MULTI_AGENT_ORCHESTRATION.md← Orquestração de múltiplos agentes
│   ├── 10_NOTION_STRUCTURE.md         ← Estrutura do workspace Notion
│   ├── 11_DATABASE_SCHEMA.md          ← Schema do banco de dados
│   ├── 12_API_DESIGN.md               ← Design das APIs REST
│   └── 13_EXECUTION_PLAN.md           ← Plano de execução final
└── flutter_app/
    └── docs/
        ├── FLAVOR_GUIDE.md            ← Guia prático de flavors
        └── CODING_STANDARDS.md        ← Padrões de código Flutter/Dart
```

---

## Produto

| Dimensão | Detalhe |
|---|---|
| **Tipo** | SaaS B2B2C — White-label por clube |
| **Plataforma** | iOS, Android, Web (Flutter) |
| **Modelo de Negócio** | Assinatura mensal por clube + transações |
| **Usuários** | Dono de Clube, Admin, Sommelier, Membro Premium, Membro Free |
| **Flavorização** | Por cliente (marca, cores, funcionalidades, domínio) |

---

## Personas Principais

| Persona | Descrição |
|---|---|
| **Dono do Clube** | Gerencia operações, financeiro, membros, estoque |
| **Sommelier/Curador** | Cadastra whiskies, cria degustações, escreve notas |
| **Membro Premium** | Assina plano, recebe kits, participa de eventos |
| **Membro Free** | Navega catálogo, participa de eventos públicos |
| **Admin SaaS** | Gerencia todos os clubes na plataforma |

---

## Orquestração Multi-Agente

Este repositório foi projetado para ser executado por múltiplos agentes de IA trabalhando em paralelo, cada um com seu papel especializado:

| Agente | Chapéu | Responsabilidade |
|---|---|---|
| `agent-pm` | Product Manager | Roadmap, sprints, métricas |
| `agent-po` | Product Owner | Backlog, critérios de aceite, priorização |
| `agent-ux` | UX Designer | Jornadas, wireframes, usabilidade |
| `agent-ui` | UI Designer | Design system, componentes visuais |
| `agent-ra` | Req. Analyst | Documentação de requisitos |
| `agent-tl` | Tech Lead | Decisões arquiteturais |
| `agent-back` | Backend Dev | APIs, regras de negócio |
| `agent-flutter` | Flutter Dev | App mobile/web |
| `agent-devops` | DevOps/SRE | CI/CD, infra, deploy |
| `agent-dba` | DBA | Schema, queries, otimização |
| `agent-qa` | QA/Test | Testes automatizados |
| `agent-docs` | Tech Writer | Documentação técnica e de usuário |
| `agent-client-owner` | Simulador: Dono | Valida do ponto de vista de negócio |
| `agent-client-user` | Simulador: Membro | Valida UX do consumidor final |

---

## Quick Start (Planejamento)

1. Leia [`docs/00_PROJECT_OVERVIEW.md`](docs/00_PROJECT_OVERVIEW.md) para contexto
2. Veja o mock visual em [`mock/index.html`](mock/index.html)
3. Consulte [`docs/09_MULTI_AGENT_ORCHESTRATION.md`](docs/09_MULTI_AGENT_ORCHESTRATION.md) para orquestrar agentes
4. Use [`docs/10_NOTION_STRUCTURE.md`](docs/10_NOTION_STRUCTURE.md) para montar o Notion
5. Siga [`docs/13_EXECUTION_PLAN.md`](docs/13_EXECUTION_PLAN.md) para iniciar

---

## Contato & Governança

- **Product Owner**: A definir
- **Tech Lead**: A definir
- **Design Lead**: A definir
- **Repositório**: Este repositório é a **source of truth** para planejamento

---

*Gerado pelo sistema de orquestração multi-agente — WhiskeyCLUB Planning v1.0*
