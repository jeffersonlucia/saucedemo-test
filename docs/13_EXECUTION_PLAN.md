# 13 — Plano de Execução: WhiskeyCLUB

**Responsável**: PM (agent-pm)  
**Objetivo**: Guia operacional para iniciar o desenvolvimento com múltiplos agentes

---

## 1. Como Usar Este Plano

Este documento é o **ponto de partida** para orquestrar o desenvolvimento. Cada seção define:
- O que fazer
- Quem faz (qual agente)
- Em que ordem
- Quais dependências existem

---

## 2. Checklist de Pré-Start

Antes de iniciar o desenvolvimento, verificar:

### Infraestrutura
- [ ] Repositório GitHub criado (monorepo ou repos separados)
- [ ] Branch strategy definida (main → develop → feature/*)
- [ ] Ambientes provisionados (dev, staging)
- [ ] Banco de dados criado e migrations rodando
- [ ] CI/CD pipeline base funcionando
- [ ] Secrets configurados (JWT_SECRET, DATABASE_URL, etc.)
- [ ] Projeto Firebase criado para o flavor dev

### Produto
- [ ] Dono do clube piloto identificado e comprometido
- [ ] Design System inicial criado no Figma
- [ ] Wireframes de autenticação e home aprovados
- [ ] Glossário do domínio documentado
- [ ] Notion workspace configurado com backlog inicial

### Time
- [ ] Todos os agentes têm contexto dos documentos de planning
- [ ] Responsabilidades de cada agente estão claras
- [ ] Canais de comunicação definidos
- [ ] Ferramentas configuradas (GitHub, Figma, Linear/Notion)

---

## 3. Ordem de Execução — Sprint 0

### Semana 1

**Dia 1-2: Setup de Infraestrutura** (agent-devops)
```bash
1. Criar repositório monorepo
   - /backend (Node.js)
   - /flutter_app (Flutter)
   - /docs (documentação)

2. Configurar GitHub branch strategy
   - main (produção)
   - develop (integração)
   - feature/* (desenvolvimento)
   - release/* (release candidates)

3. Provisionar Railway (ou AWS) 
   - PostgreSQL 16
   - Redis 7
   - Backend service (vazio por enquanto)

4. Configurar GitHub Secrets
   - DATABASE_URL
   - JWT_SECRET + JWT_REFRESH_SECRET
   - REDIS_URL
   - S3_BUCKET + AWS_KEYS
   - SENDGRID_API_KEY
   - STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET
```

**Dia 1-3: Design Foundation** (agent-ui + agent-ux)
```
1. Criar projeto no Figma: "WhiskeyCLUB - Design System"
2. Definir paleta de cores base (Dark Whiskey theme)
3. Definir tipografia (Playfair Display + Inter)
4. Criar grid e espaçamentos
5. Criar componentes base:
   - Buttons (primary, secondary, ghost)
   - Input fields
   - Cards (whiskey card, event card)
   - Navigation bar
   - Colors tokens

6. Mapear jornada do Dono do Clube
7. Mapear jornada do Membro Premium
8. Criar wireframes: Login, Cadastro, Home, Catálogo
```

**Dia 1-3: Schema de Banco** (agent-dba)
```
1. Revisar docs/11_DATABASE_SCHEMA.md
2. Criar Prisma schema inicial
3. Escrever primeira migration
4. Criar seed data (clube dev + 2 usuários de teste + 10 whiskies)
5. Documentar RLS policy
6. Testar queries críticas
```

**Dia 2-5: CI/CD Base** (agent-devops)
```
1. Criar .github/workflows/ci-backend.yml
   - lint (eslint)
   - test (jest)
   - build (Docker)

2. Criar .github/workflows/ci-flutter.yml
   - lint (flutter analyze)
   - test (flutter test)
   - build check

3. Criar docker-compose.yml para dev local
   - PostgreSQL
   - Redis
   - Backend
```

### Semana 2

**Dia 6-10: Fundação Backend** (agent-back-1)
```
1. Criar estrutura do projeto Fastify
2. Configurar TypeScript + ESLint + Prettier
3. Configurar Prisma (conectar ao DB)
4. Criar módulo de Auth completo (tasks T-01.01.01 a T-01.01.06)
5. Middleware de autenticação JWT
6. Testes de auth passando
```

**Dia 6-10: Fundação Flutter** (agent-flutter-1)
```
1. Criar projeto Flutter com estrutura Clean Architecture
2. Configurar flavors (dev, clubeAlpha)
3. Configurar GetIt (dependency injection)
4. Configurar Dio + interceptors de auth
5. Implementar telas de Auth (Login, Cadastro, Forgot Password)
6. Configurar go_router com rotas protegidas
7. Testes de widget para auth
```

---

## 4. Ordem de Execução — Sprint 1 (Membros e Clube)

### Dependências críticas (ordem)
```
1. agent-dba → migration de clubs e members
2. agent-back-1 → API clubs + members (paralelo com dba)
3. agent-ux → wireframes do dashboard admin
4. agent-ui → design do dashboard (depende de wireframes)
5. agent-flutter-2 → dashboard Flutter (depende de API + design)
6. agent-qa → testes (paralelo com desenvolvimento)
```

### Execução paralela

```
Timeline Semana 1 do Sprint 1:
  
  agent-dba:      ████████ Migration clubs/members ████████
  agent-back-1:   ████████ API clubs ████ API members ████
  agent-ux:       ████████ Wireframes dashboard ██████████
  agent-ui:       ████ (aguarda UX) ████ Design dashboard █
  agent-back-2:   ████████ API subscriptions plans █████████
  agent-qa:       ████████ Criar casos de teste ████████████
```

---

## 5. Protocolo de Sprint Planning

No início de cada sprint, o agent-pm executa:

```markdown
# Sprint Planning Protocol

1. Verificar velocidade do sprint anterior
   - Pontos planejados vs. realizados
   - Fatores que afetaram a velocidade

2. Calcular capacidade do sprint atual
   - Dias disponíveis por agente
   - Feriados/ausências previstas
   - Capacidade em pontos

3. Selecionar items do backlog (com agent-po)
   - Top prioridades do backlog refinado
   - Não exceder 70% da capacidade (buffer)
   - Garantir que DoR está atendida para cada item

4. Distribuir tasks entre agentes
   - Verificar dependências
   - Balancear carga entre agentes de mesma stack
   - Identificar riscos

5. Definir Sprint Goal
   - Uma frase clara do objetivo do sprint
   - Critério de sucesso do sprint

6. Comunicar para todos os agentes
   - Lista de tasks por agente
   - Sprint goal
   - Dependências e bloqueios conhecidos
```

---

## 6. Protocolo de Daily Standup (Assíncrono)

Cada agente responde diariamente em texto:

```markdown
# Daily — [Agent Name] — [Data]

## ✅ Ontem
- Completou: [lista de tasks]
- Métricas: [linhas de código, endpoints implementados, etc.]

## 🔨 Hoje
- Trabalhando em: [task atual]
- Objetivo do dia: [o que vai completar]

## 🚧 Bloqueios
- [bloqueio 1] — aguardando [agente/decisão]
- [bloqueio 2] — preciso de [informação/decisão]

## 📊 Sprint Progress
- Tasks concluídas: X/Y
- Pontos realizados: P/Total
- Estimativa de conclusão do sprint: No prazo / Em risco / Atrasado
```

---

## 7. Protocolo de Code Review

```markdown
# Code Review Protocol

1. PR aberto pelo dev → notifica Tech Lead (agent-tl) + par de mesma stack
2. Revisor verifica:
   - Funcionalidade atende ao critério de aceite
   - Código segue padrões (lint passando)
   - Testes escritos (cobertura adequada)
   - Sem vulnerabilidades óbvias
   - Performance: sem N+1 queries, sem renders desnecessários
   - Documentação atualizada (se necessário)
3. Se aprovado: merge para develop
4. Se reprovado: feedback específico, dev corrige
5. Após merge: trigger de CI/CD automático para staging
```

---

## 8. Protocolo de Bug Report

```markdown
# Bug Report Template

**ID**: BUG-XXX
**Severidade**: [S1 Crítico | S2 Alto | S3 Médio | S4 Baixo]
**Ambiente**: [Produção | Staging | Dev]
**Reportado por**: [agent-qa | agent-client-owner | agent-client-user]

## Descrição
[O que está errado]

## Steps para Reproduzir
1. [passo 1]
2. [passo 2]
3. [passo 3]

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Evidências
[Screenshot, log de erro, video]

## Contexto
- Device/OS: 
- Versão do App:
- Usuário (se relevante):

## Atribuído Para
[agente responsável]

## Prazo
[S1: imediato | S2: próximo sprint | S3: backlog | S4: nice-to-have]
```

---

## 9. Critérios de Release

### Checklist de Release para Produção

**Funcional:**
- [ ] Todos os critérios de aceite do sprint validados pelo QA
- [ ] 0 bugs S1 ou S2 abertos
- [ ] Testes E2E dos fluxos críticos passando
- [ ] Dono do produto validou as entregas

**Técnico:**
- [ ] Cobertura de testes ≥ 80% (backend)
- [ ] Cobertura de widget tests ≥ 70% (Flutter)
- [ ] Nenhuma vulnerabilidade crítica (security scan)
- [ ] Testes de performance OK (tempo de resposta < 500ms p95)
- [ ] Migrations de banco testadas (e rollback funcional)

**Operacional:**
- [ ] Deploy em staging bem-sucedido
- [ ] Monitoramento e alertas configurados
- [ ] Runbook de deploy atualizado
- [ ] Rollback plan definido
- [ ] Build das apps assinado e testado

**Para App Store/Google Play:**
- [ ] Screenshots atualizadas (se mudança visual)
- [ ] Release notes escritas
- [ ] Build submetido para review
- [ ] Review aprovada (aguardar 1-7 dias)

---

## 10. Roadmap de Agentes — Quando Ativar Cada Um

### Sprint 0 (agora)
✅ agent-pm → Orquestrar setup  
✅ agent-po → Refinar backlog inicial  
✅ agent-ra → Completar requisitos  
✅ agent-ux → Wireframes + jornadas  
✅ agent-ui → Design system  
✅ agent-tl → Arquitetura + ADRs  
✅ agent-dba → Schema + migrations  
✅ agent-devops → CI/CD + infra  

### Sprint 1-2 (primeiro código)
🚀 agent-back-1 → Auth + Clubs + Members  
🚀 agent-back-2 → Catalog + Events (paralelo)  
🚀 agent-flutter-1 → Auth + Catálogo  
🚀 agent-flutter-2 → Dashboard Admin  
🚀 agent-qa → Testes (paralelo)  
🚀 agent-docs → Documentação (paralelo)  

### Sprint 4-5 (validação)
🎭 agent-client-owner → Validar painel admin  
🎭 agent-client-user → Validar UX do membro  

### Sprint 8 (pré-lançamento)
🔍 agent-tl → Security review  
📦 agent-devops → App Store submit  
📖 agent-docs → Documentação de usuário final  

---

## 11. Métricas de Saúde do Projeto

Acompanhar semanalmente:

| Métrica | Meta | Alerta |
|---------|------|--------|
| Velocidade do time | 60-70 pts/sprint | < 50 pts = problema |
| Bug backlog | < 10 abertos | > 20 = parar features |
| Cobertura de testes | ≥ 80% | < 70% = parar sprint |
| Tempo de build CI | < 10 min | > 15 min = otimizar |
| Uptime staging | > 99% | < 95% = prioridade infra |
| PRs sem review | < 3 | > 5 = gargalo de review |

---

## 12. Comunicação com Stakeholders

### Weekly Update Template (PM → Stakeholders)

```markdown
# WhiskeyCLUB — Weekly Update #X

**Data**: DD/MM/YYYY  
**Sprint**: X (Dia Y/10)

## ✅ Entregue esta semana
- [feature 1] — pronta para teste
- [feature 2] — em staging

## 🔨 Em andamento
- [feature 3] — 60% concluída
- [feature 4] — em dev

## 🚧 Bloqueios/Riscos
- [bloqueio] — ação necessária: [...]

## 📊 Métricas
- Velocidade: X pontos / planejado: Y
- Bugs abertos: N
- Uptime staging: X%

## 🗓️ Próximos 7 dias
- [o que será entregue]

## 🙋 Decisões Necessárias dos Stakeholders
- [decisão 1]
- [decisão 2]
```

---

## 13. Quick Reference — Comandos Úteis

### Backend
```bash
# Desenvolvimento local
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev

# Testes
npm test
npm run test:coverage

# Build
docker build -t whiskey-backend .
```

### Flutter
```bash
# Desenvolvimento
cd flutter_app
flutter pub get

# Rodar por flavor
flutter run --flavor dev --target lib/flavors/main_dev.dart

# Testes
flutter test
flutter test --coverage

# Build
flutter build apk --flavor clubeAlpha --target lib/flavors/main_clube_alpha.dart
```

### Database
```bash
# Nova migration
cd backend
npx prisma migrate dev --name "add_feature_xyz"

# Resetar DB dev
npx prisma migrate reset

# Abrir Prisma Studio (GUI)
npx prisma studio
```

---

## 14. Definição de "Produto Pronto para Lançar" (M2)

O produto estará pronto para lançar o MVP quando:

1. **Autenticação** completa (cadastro, login, logout, reset de senha)
2. **Catálogo** com ao menos 20 whiskies cadastrados pelo sommelier
3. **1 evento** criado e com inscrições funcionando
4. **Assinatura** funcionando com cobrança real (modo de teste do gateway)
5. **Dashboard do admin** mostrando membros, MRR e próximos eventos
6. **Notificações** push funcionando para eventos e pagamentos
7. **Flavor** do clube piloto publicado na App Store e Google Play
8. **Dono do clube piloto** testou e aprovou o fluxo completo
9. **5 membros beta** cadastrados e usando o app por 1 semana
10. **Zero bugs S1** encontrados no período de beta testing

---

*Documento mantido pelo PM (agent-pm). Este é o plano vivo — atualizar a cada sprint.*
