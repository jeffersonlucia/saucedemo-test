# 10 — Estrutura do Workspace Notion: WhiskeyCLUB

**Responsável**: PM (agent-pm)  
**Objetivo**: Replicar esta estrutura no Notion para gestão completa do projeto

---

## 1. Workspace Raiz: WhiskeyCLUB

```
🥃 WhiskeyCLUB
├── 📋 Home (Dashboard)
├── 🗺️ Roadmap
├── 🏃 Sprints
├── 📦 Backlog
├── 🐛 Bugs & Issues
├── 👥 Time
├── 📐 Design
├── ⚙️ Engenharia
├── 📊 Analytics & Métricas
├── 📝 Reuniões
└── 📚 Documentação
```

---

## 2. Home (Dashboard)

**Tipo**: Página com embeds e linked views

### Seções:
- **Sprint Atual** (embed de Sprint view)
  - Sprint goal
  - Progresso (barra)
  - Tasks por status
- **Métricas de Produto** (embed de tabela)
  - MRR, Membros Ativos, NPS, Churn
- **Próximos Eventos** (eventos da equipe)
- **Links Rápidos** (Figma, GitHub, Staging, Docs)
- **Alertas** (bloqueios, PRs aguardando review)

---

## 3. Roadmap

**Tipo**: Timeline View + Board View

### Database Schema:
```
Nome: [texto]
Tipo: [Épico / Feature / Milestone]
Status: [Planejado / Em Andamento / Concluído / Cancelado]
Fase: [Fase 0 / Fase 1 / Fase 2 / Fase 3]
Sprint: [relation → Sprints]
Data Início: [date]
Data Fim: [date]
Prioridade: [Must Have / Should Have / Could Have / Won't Have]
Responsável: [person]
Agente: [select → lista de agentes]
Tags: [multi-select → Backend, Flutter, DevOps, Design, etc.]
Notas: [texto longo]
```

### Views:
1. **Timeline** — visualização de linha do tempo por fase
2. **Board por Fase** — kanban com colunas: Fase 0, 1, 2, 3
3. **Board por Status** — kanban: Planejado, Em Andamento, Concluído
4. **Table** — visualização completa com filtros

---

## 4. Sprints

**Tipo**: Database + Sub-pages por sprint

### Database Schema:
```
Sprint #: [número]
Nome: [Sprint X — Foco Principal]
Status: [Planejado / Ativo / Revisão / Concluído]
Data Início: [date]
Data Fim: [date]
Sprint Goal: [texto]
Velocidade Planejada: [número] pontos
Velocidade Realizada: [número] pontos
% Concluído: [fórmula]
Bloqueios: [texto]
Retrospectiva: [relation → Reuniões]
Tasks: [relation → Backlog]
```

### Template de Sub-page de Sprint:

```markdown
# Sprint 3 — Catálogo de Whiskies

**Período**: 03/03 → 16/03
**Goal**: Membros podem navegar, buscar e ver detalhes de whiskies

## Tasks do Sprint
[linked view do Backlog filtrado por sprint=3]

## Daily Standups
[tabela: Data | O que foi feito | O que será feito | Bloqueios]

## Burndown
[embed gráfico]

## Review
[o que foi entregue vs planejado]

## Retrospectiva
- 🟢 O que funcionou bem:
- 🔴 O que não funcionou:
- 🔵 O que vamos tentar na próxima:
```

---

## 5. Backlog

**Tipo**: Database principal — centro de tudo

### Database Schema (COMPLETO):
```
ID: [fórmula: auto-incremento com prefixo]
Título: [texto] ← obrigatório
Tipo: [Épico / Feature / User Story / Task / Bug / Spike]
Status: [Backlog / Refinado / Sprint / Em Dev / Em Review / Em Teste / Done / Cancelado]
Sprint: [relation → Sprints]
Responsável: [person]
Agente: [select → agent-back-1, agent-back-2, agent-flutter-1, etc.]
Estimativa: [select → 1, 2, 3, 5, 8, 13, 21 pontos]
Prioridade: [select → P0 Crítico, P1 Alto, P2 Médio, P3 Baixo]
Épico Pai: [relation → Backlog (self)]
User Story: [relation → Backlog (self)]
Plataforma: [multi-select → Backend, Flutter iOS, Flutter Android, Web]
Tags: [multi-select → Auth, Catálogo, Eventos, Pagamentos, etc.]
Data de Criação: [date]
Data Conclusão: [date]
Bloqueado Por: [relation → Backlog (self)]
PR Link: [URL]
Figma Link: [URL]
Notas Técnicas: [texto longo]
Critérios de Aceite: [texto longo]
```

### Views do Backlog:
1. **Board por Status** — kanban principal do time
2. **Sprint Atual** — filtrado por sprint ativo
3. **Por Responsável** — groupBy: Agente
4. **Por Épico** — groupBy: Épico Pai
5. **Bugs Abertos** — filtrado por tipo=Bug e status≠Done
6. **Backlog Refinado** — filtrado por status=Refinado
7. **Table Completa** — todas as colunas

### Template de Task:
```markdown
## [T-03.02.02] — Tela de Catálogo (CatalogPage)

**User Story**: US-010 — Navegar o catálogo
**Épico**: EP-03 — Catálogo de Whiskies
**Agente**: agent-flutter-1
**Estimativa**: 8 pontos
**Sprint**: 3

### Critérios de Aceite
- [ ] Grid 2 colunas com lazy loading
- [ ] Barra de busca com debounce 300ms
- [ ] Bottom sheet de filtros
- [ ] Chips de filtros ativos removíveis
- [ ] Pull-to-refresh funcional
- [ ] Estado vazio com mensagem
- [ ] Widget tests cobrindo fluxos principais

### Notas Técnicas
- Usar ListView.builder para performance
- Cache de lista com Hive TTL 30min
- BLoC com estados: Loading, Loaded, Error, Empty

### Links
- Figma: [link]
- API docs: GET /catalog/whiskies
- PR: [link quando disponível]

### Sub-tasks
- [ ] CatalogBloc setup
- [ ] Grid layout
- [ ] Search bar com debounce
- [ ] Filter bottom sheet
- [ ] Pull-to-refresh
- [ ] Empty state
- [ ] Widget tests
```

---

## 6. Bugs & Issues

**Tipo**: Database filtrada do Backlog (tipo=Bug)

### Campos adicionais para bugs:
```
Severidade: [select → S1 Crítico, S2 Alto, S3 Médio, S4 Baixo]
Ambiente: [select → Produção, Staging, Dev]
Device: [texto]
Reproduzível: [checkbox]
Steps para Reproduzir: [texto longo]
Comportamento Esperado: [texto]
Comportamento Atual: [texto]
Screenshot/Video: [file upload]
```

---

## 7. Time

**Tipo**: Database

```
Nome: [texto]
Papel: [select → PM, PO, Tech Lead, Backend, Flutter, etc.]
Agente ID: [texto → agent-pm, agent-po, etc.]
E-mail: [email]
GitHub: [URL]
Figma: [URL]
Responsabilidades: [texto longo]
Status: [select → Ativo, Part-time, Inativo]
```

---

## 8. Design

**Tipo**: Página com links e embeds

### Seções:
- **Figma Links**
  - Design System
  - Wireframes (por sprint)
  - Telas em alta fidelidade (por módulo)
  - Protótipos interativos
- **Assets**
  - Logos por flavor (embed ou links)
  - Ícones e ilustrações
  - Animações Lottie
- **Decisions** (database: decisões de design)
  - Data, Decisão, Rationale, Status

---

## 9. Engenharia

**Tipo**: Página de wikis técnicos

### Sub-páginas:
```
⚙️ Engenharia
├── 🏗️ Arquitetura
│   ├── Diagrama de sistema
│   ├── ADR-001: Flutter escolhido
│   ├── ADR-002: BLoC escolhido
│   └── ADR-XXX: [nova decisão]
├── 🗄️ Banco de Dados
│   ├── ERD (embed draw.io)
│   ├── Schema atual
│   └── Histórico de migrations
├── 📡 API Reference
│   ├── Link para Swagger/OpenAPI
│   └── Exemplos de requests
├── 🔧 Setup Local
│   ├── Backend setup
│   └── Flutter setup
├── 🚀 Deploy & CI/CD
│   ├── Como fazer deploy
│   ├── Ambientes (dev, staging, prod)
│   └── Runbooks
└── 📋 Coding Standards
    ├── Flutter/Dart guide
    └── TypeScript/Node guide
```

---

## 10. Analytics & Métricas

**Tipo**: Dashboard + Database

### Database de Métricas (atualizada semanalmente):
```
Data: [date]
MRR: [número] R$
Clubes Ativos: [número]
Membros Totais: [número]
Novos Membros (mês): [número]
Churn Rate: [número] %
NPS: [número]
DAU (Daily Active Users): [número]
MAU (Monthly Active Users): [número]
Uptime: [número] %
Bugs Críticos Abertos: [número]
Velocidade do Time (pontos/sprint): [número]
```

### Views:
1. **Gráficos de tendência** (embed de Metabase ou Google Data Studio)
2. **Tabela histórica** — todos os períodos
3. **OKRs Progress** — cards com % de atingimento

---

## 11. Reuniões

**Tipo**: Database + Templates

### Database Schema:
```
Título: [texto]
Tipo: [select → Sprint Planning, Daily, Review, Retro, 1:1, Discovery, etc.]
Data: [date]
Participantes: [person]
Sprint: [relation → Sprints]
Ata: [texto longo]
Decisões: [texto longo]
Action Items: [relation → Backlog]
Gravação: [URL]
```

### Template de Sprint Planning:
```markdown
# Sprint Planning — Sprint X

**Data**: DD/MM/YYYY
**Participantes**: [lista]
**Sprint Goal**: [qual o objetivo do sprint?]

## Capacity do Time
| Agente | Disponibilidade | Pontos |
|--------|----------------|--------|
| agent-back-1 | 100% | 20 |
| ...          | ...  | ... |
**Total**: XX pontos

## Items Selecionados para o Sprint
[linked view backlog filtrado]

## Riscos Identificados
1. ...

## Acordos
1. ...
```

---

## 12. Documentação

**Tipo**: Página de docs consolidados

### Sub-páginas:
```
📚 Documentação
├── 📋 Produto
│   ├── Visão e Objetivos
│   ├── Personas
│   ├── Jornadas de Usuário
│   └── Glossário do Domínio
├── 📜 Requisitos
│   ├── RF (Funcionais)
│   ├── RNF (Não-funcionais)
│   └── Regras de Negócio
├── 📖 Guia do Usuário
│   ├── Onboarding
│   ├── Para o Membro
│   └── Para o Dono do Clube
└── 🔗 Links Externos
    ├── GitHub Repository
    ├── Figma
    ├── Swagger API
    └── Staging App
```

---

## 13. Como Configurar o Notion

### Passo 1: Criar Workspace
1. Criar workspace: "WhiskeyCLUB"
2. Convidar membros do time

### Passo 2: Criar Databases
Ordem de criação (algumas dependem de outras):
1. `Sprints` (base)
2. `Backlog` (depende de Sprints)
3. `Reuniões` (depende de Sprints)
4. `Time` (independente)
5. `Roadmap` (depende de Sprints)

### Passo 3: Configurar Home
1. Criar página "Home"
2. Adicionar embeds dos databases com views filtradas

### Passo 4: Importar Backlog Inicial
Importar o conteúdo de `docs/07_TASKS_BREAKDOWN.md` como tasks

### Passo 5: Configurar Templates
Criar templates de página para: Sprint, Task, Bug, Reunião

---

## 14. Integração com GitHub

Usando [GitHub Sync para Notion](https://www.notion.so/integrations) ou via GitHub Actions:

```yaml
# .github/workflows/notion-sync.yml
name: Sync PR to Notion

on:
  pull_request:
    types: [opened, closed, merged]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Update Notion Task
        uses: notion-sync-action@v1
        with:
          notion-token: ${{ secrets.NOTION_API_KEY }}
          database-id: ${{ secrets.NOTION_BACKLOG_DB_ID }}
```

---

*Documento mantido pelo PM (agent-pm). Versão 1.0.*
