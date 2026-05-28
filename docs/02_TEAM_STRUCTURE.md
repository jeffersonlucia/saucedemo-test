# 02 — Estrutura do Time: WhiskeyCLUB

**Modelo**: Squads Ágeis + Especialistas Cross-funcionais  
**Metodologia**: Scrum + Shape Up híbrido  
**Sprints**: 2 semanas  
**Cerimônias**: Planning, Daily (assíncrona), Review, Retro

---

## 1. Organização por Squad

```
┌─────────────────────────────────────────────────────────────────┐
│                     LEADERSHIP LAYER                             │
│  CEO/Founder → CPO (Product) + CTO (Tech) + CDO (Design)       │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   SQUAD CORE    │  │  SQUAD PLATFORM │  │   SQUAD GROWTH  │
│ (MVP & Produto) │  │ (Infra & DevOps)│  │ (Escala & B2B)  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │
┌────────┴────────┐
│ Product Manager │ ← Orquesta o squad
│ Product Owner   │ ← Dono do backlog
│ Tech Lead       │ ← Decisões técnicas
│ Backend Dev x2  │ ← APIs e regras
│ Flutter Dev x2  │ ← App mobile/web
│ UX Designer     │ ← Jornadas e fluxos
│ UI Designer     │ ← Visual e design system
│ QA Engineer     │ ← Testes e qualidade
│ DevOps/SRE      │ ← CI/CD e infra
│ DBA             │ ← Banco de dados
│ Req. Analyst    │ ← Documentação
│ Tech Writer     │ ← Docs técnica e usuário
└─────────────────┘
```

---

## 2. Papéis Detalhados — Equipe Completa

### 2.1 Product Manager (PM) — `agent-pm`

**Responsabilidades:**
- Definir e comunicar a visão do produto
- Gerenciar roadmap de curto, médio e longo prazo
- Coordenar sprints e cerimônias ágeis
- Reportar métricas de produto para stakeholders
- Gerenciar trade-offs e prioridades de negócio
- Comunicação com clientes/clubes

**Entregáveis:**
- Roadmap trimestral
- Sprint planning sessions
- Release notes
- Métricas de produto (OKRs)

**Ferramentas:** Notion, Linear, Mixpanel, Slack

---

### 2.2 Product Owner (PO) — `agent-po`

**Responsabilidades:**
- Gerenciar e priorizar o backlog do produto
- Escrever histórias de usuário com critérios de aceite
- Representar a voz do cliente nas decisões técnicas
- Validar entregas com base nos critérios de aceite
- Aplicar framework MoSCoW para priorização
- Fazer grooming do backlog semanalmente

**Entregáveis:**
- Backlog refinado e priorizado
- User Stories com Acceptance Criteria
- Sprint Backlog validado
- Definition of Done (DoD)
- Definition of Ready (DoR)

**Ferramentas:** Notion, Linear/Jira, Miro

---

### 2.3 Analista de Requisitos (RA) — `agent-ra`

**Responsabilidades:**
- Levantar, documentar e validar requisitos funcionais e não-funcionais
- Criar especificações técnicas para features complexas
- Manter rastreabilidade dos requisitos
- Identificar conflitos e ambiguidades entre requisitos
- Documentar regras de negócio
- Participar de entrevistas com stakeholders

**Entregáveis:**
- Documento de Requisitos (este arquivo)
- Especificações Funcionais (EF)
- Matriz de Rastreabilidade
- Glossário do domínio
- Casos de Uso detalhados

**Ferramentas:** Notion, Confluence, Miro, draw.io

---

### 2.4 Tech Lead — `agent-tl`

**Responsabilidades:**
- Definir arquitetura técnica do sistema
- Tomar decisões de stack e padrões de código
- Revisar PRs críticos e garantir qualidade técnica
- Mentoriar desenvolvedores
- Gerenciar débito técnico
- Avaliar e integrar novas tecnologias
- Coordenação técnica entre Backend, Flutter e DevOps

**Entregáveis:**
- Architecture Decision Records (ADRs)
- Coding Standards
- Revisão de PRs críticos
- Spike de investigações técnicas
- Mapa de débito técnico

**Ferramentas:** GitHub, draw.io, Notion, Slack

---

### 2.5 UX Designer — `agent-ux`

**Responsabilidades:**
- Mapear jornadas de usuário para cada persona
- Criar wireframes de baixa e média fidelidade
- Conduzir (ou simular) testes de usabilidade
- Definir Information Architecture (IA)
- Criar user flows e protótipos interativos
- Garantir consistência de experiência entre módulos

**Entregáveis:**
- Mapa de jornada por persona
- Sitemap e IA do app
- Wireframes (Figma)
- Protótipos interativos
- Relatório de usabilidade
- Heurísticas avaliadas

**Ferramentas:** Figma, Maze, Miro, Notion

---

### 2.6 UI Designer — `agent-ui`

**Responsabilidades:**
- Criar e manter o Design System do produto
- Desenvolver telas em alta fidelidade
- Definir tokens de design (cores, tipografia, espaçamento)
- Criar assets (ícones, ilustrações, animações)
- Garantir consistência visual entre flavors
- Entregar specs handoff para desenvolvedores

**Entregáveis:**
- Design System (Figma)
- Biblioteca de componentes
- Screens em alta fidelidade
- Tokens de design (JSON para Flutter)
- Assets SVG/PNG para produção
- Guias de flavorização visual

**Ferramentas:** Figma, Zeplin/Storybook, Adobe Illustrator

---

### 2.7 Backend Developers (x2) — `agent-back-1`, `agent-back-2`

**Responsabilidades:**
- Desenvolver APIs REST seguindo OpenAPI 3.0
- Implementar regras de negócio nos serviços
- Gerenciar integrações com gateways de pagamento
- Implementar sistema de autenticação e autorização
- Escrever testes unitários e de integração
- Revisar código do par

**Stack:**
- Node.js + TypeScript + Express/Fastify
- PostgreSQL + Prisma ORM
- Redis para cache
- Docker para containerização
- Jest para testes

**Divisão de Responsabilidades:**
- `Back-1`: Auth, Clubs, Members, Subscriptions, Payments
- `Back-2`: Catalog, Events, Orders, Notifications, Reports

**Entregáveis:**
- APIs documentadas (Swagger/OpenAPI)
- Cobertura de testes ≥ 80%
- Migrations de banco de dados
- Integrações com serviços externos

---

### 2.8 Flutter Developers (x2) — `agent-flutter-1`, `agent-flutter-2`

**Responsabilidades:**
- Desenvolver o app Flutter multiplataforma
- Implementar flavorização por cliente
- Consumir APIs do backend
- Implementar state management (Bloc/Riverpod)
- Garantir performance em todas as plataformas
- Implementar testes de widget e integração

**Stack:**
- Flutter 3.x + Dart 3.x
- Bloc/Cubit para state management
- Dio para HTTP
- Hive/Isar para offline storage
- Firebase para push notifications
- Flavor configuration por cliente

**Divisão de Responsabilidades:**
- `Flutter-1`: Auth, Perfil, Catálogo, Eventos, Favoritos
- `Flutter-2`: Dashboard Admin, Loja, Pagamentos, Notificações, Configurações

**Entregáveis:**
- App Flutter funcional por flavor
- Cobertura de testes de widget ≥ 70%
- Assets configurados por flavor
- Build pipelines por flavor

---

### 2.9 DevOps/SRE — `agent-devops`

**Responsabilidades:**
- Configurar e manter CI/CD pipelines
- Provisionar infraestrutura cloud (IaC com Terraform)
- Monitorar saúde do sistema (observabilidade)
- Gerenciar segredos e variáveis de ambiente
- Configurar ambientes (dev, staging, prod)
- Gerenciar deploy de apps nas lojas (Google Play, App Store)
- Configurar backups automáticos

**Stack:**
- GitHub Actions para CI/CD
- AWS ECS (Fargate) ou Railway para backend
- Terraform para IaC
- Datadog ou Grafana/Prometheus para monitoramento
- Docker Hub para registry
- AWS S3 para assets

**Entregáveis:**
- Pipeline CI/CD funcional
- Infraestrutura como código (IaC)
- Dashboard de monitoramento
- Runbooks de operação
- SLOs/SLAs documentados

---

### 2.10 DBA (Database Administrator) — `agent-dba`

**Responsabilidades:**
- Projetar schema do banco de dados
- Escrever e otimizar queries complexas
- Gerenciar migrations e versionamento do schema
- Implementar estratégia multi-tenant (row-level security)
- Criar índices e otimizar performance
- Planejar estratégia de backup e recuperação

**Stack:**
- PostgreSQL 16
- Prisma ORM (geração de migrations)
- pgAdmin para administração
- pg_stat_statements para análise de queries

**Entregáveis:**
- Schema ERD completo
- Migrations versionadas
- Query performance report
- Estratégia de backup e RTO/RPO
- Guia de Row Level Security (multi-tenant)

---

### 2.11 QA Engineer — `agent-qa`

**Responsabilidades:**
- Criar e executar plano de testes
- Escrever testes automatizados (E2E, integração, unitários)
- Testar cada user story contra critérios de aceite
- Reportar e acompanhar bugs
- Definir Definition of Done (DoD)
- Realizar testes de regressão antes de releases
- Conduzir testes de carga/performance

**Stack:**
- Flutter Widget Tests + Integration Tests
- Jest + Supertest para APIs
- Playwright ou Cypress para E2E web
- k6 para load tests
- TestRail ou Linear para gestão de casos

**Entregáveis:**
- Plano de Testes
- Casos de teste por feature
- Relatório de cobertura de testes
- Relatório de testes de performance
- Bug reports detalhados

---

### 2.12 Technical Writer — `agent-docs`

**Responsabilidades:**
- Escrever documentação técnica para desenvolvedores
- Criar guias de integração e onboarding de novos devs
- Manter documentação de APIs (Swagger/Postman)
- Criar documentação de usuário final
- Escrever FAQs e help center do produto
- Documentar runbooks operacionais

**Entregáveis:**
- Developer Guide (setup, arquitetura, padrões)
- API Reference (Swagger atualizado)
- Guia do Usuário Final
- FAQ e Central de Ajuda
- Runbooks Operacionais
- Changelogs por versão

---

### 2.13 Simulador de Cliente — Dono do Clube — `agent-client-owner`

**Responsabilidades (Simulação de Stakeholder):**
- Representar as necessidades e expectativas do dono do clube
- Validar features do painel administrativo
- Questionar viabilidade financeira e operacional
- Dar feedback sobre UX do dashboard
- Identificar gaps entre produto e realidade do negócio
- Simular cenários de uso real

**Perspectiva:**
> "Eu preciso saber quantos membros tenho, quanto estou faturando, e conseguir enviar o kit do mês sem virar TI. O app tem que ser simples."

---

### 2.14 Simulador de Cliente — Membro Final — `agent-client-user`

**Responsabilidades (Simulação de Usuário Final):**
- Representar a experiência do membro consumidor
- Validar UX de onboarding, catálogo, eventos e compras
- Identificar fricções na jornada de uso
- Avaliar valor percebido vs. preço pago
- Sugerir features baseadas em necessidades reais
- Testar acessibilidade e usabilidade

**Perspectiva:**
> "Eu quero descobrir novos whiskies, ver o que está no meu kit do mês chegando, me inscrever nos eventos e mostrar minha coleção para os amigos. Precisa ser bonito e rápido."

---

## 3. Matriz RACI por Entregável

| Entregável | PM | PO | RA | TL | UX | UI | Back | Flutter | DevOps | DBA | QA | Docs |
|-----------|----|----|----|----|----|----|------|---------|--------|-----|----|------|
| Requisitos | I | A | R | C | C | I | C | C | I | C | I | I |
| Arquitetura | I | I | C | R | I | I | A | A | C | C | I | I |
| Design System | I | I | I | I | C | R | I | A | I | I | I | I |
| API Design | I | C | C | A | I | I | R | C | I | C | I | I |
| Schema DB | I | I | C | A | I | I | C | I | I | R | I | I |
| App Flutter | I | C | I | A | C | C | C | R | I | I | C | I |
| CI/CD | I | I | I | A | I | I | C | C | R | I | C | I |
| Testes | I | A | I | C | I | I | C | C | I | I | R | I |
| Documentação | I | I | C | C | I | I | C | C | C | C | C | R |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

---

## 4. Onboarding de Novos Agentes

Quando um novo agente/desenvolvedor entra no time, o fluxo é:

```
1. Leitura de docs/00_PROJECT_OVERVIEW.md
2. Leitura de docs/03_TECH_STACK.md
3. Setup do ambiente de desenvolvimento (dev guide)
4. Par programming com membro sênior (1 sprint)
5. Primeira tarefa: bug fix ou feature pequena
6. Code review obrigatório nas 2 primeiras semanas
```

---

## 5. Processos de Desenvolvimento

### Definition of Ready (DoR) — para entrar no sprint
- [ ] História escrita no formato "Como [persona], quero [ação], para [benefício]"
- [ ] Critérios de aceite definidos e validados pelo PO
- [ ] Mockup ou wireframe disponível (quando aplicável)
- [ ] Dependências técnicas identificadas
- [ ] Estimativa de pontos feita (Planning Poker)
- [ ] Não há bloqueadores conhecidos

### Definition of Done (DoD) — para fechar a task
- [ ] Código implementado e funcional
- [ ] Testes unitários escritos (cobertura ≥ 80%)
- [ ] Code review aprovado por ≥ 1 par
- [ ] Documentação atualizada
- [ ] Deploy em staging realizado
- [ ] QA validou contra critérios de aceite
- [ ] Sem bloqueadores de acessibilidade críticos
- [ ] Feature flag configurada (se aplicável)

---

*Documento mantido pelo PM (agent-pm). Versão 1.0.*
