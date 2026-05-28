# 05 — Fases e Marcos do Projeto: WhiskeyCLUB

**Responsável**: PM (agent-pm)  
**Metodologia**: Scrum (sprints de 2 semanas)

---

## Visão Macro das Fases

```
FASE 0          FASE 1              FASE 2              FASE 3
Discovery       MVP                 Escala              Produto Maduro
(Planejamento)  (Clube Piloto)      (B2B Growth)        (Plataforma)
   
Sprints 0-1     Sprints 2-8         Sprints 9-18        Sprints 19+
~4 semanas      ~12 semanas         ~20 semanas         Contínuo
```

---

## FASE 0 — Discovery & Setup (Sprints 0-1)

**Objetivo**: Validar pressupostos, estruturar time e preparar ambiente

### Sprint 0 (Semanas 1-2) — Estruturação

| Task | Responsável | Critério de Conclusão |
|------|------------|----------------------|
| Setup do repositório e monorepo | DevOps | Repo criado, branch strategy definida |
| Setup de ambientes (dev, staging) | DevOps | Ambientes funcionando |
| Configuração CI/CD base | DevOps | Pipeline de CI rodando |
| Entrevistas com dono do clube piloto | PM + PO | 3 entrevistas realizadas, insights documentados |
| Criação do Design System base | UI | Cores, tipografia, grid definidos no Figma |
| Setup do banco de dados | DBA | PostgreSQL provisionado, migrations rodando |
| Definição de Arquitetura | Tech Lead | ADRs documentados |
| Setup Notion/Linear | PM | Projeto criado, backlog importado |

**Marco 0**: ✅ Ambiente pronto, time alinhado, produto compreendido

---

### Sprint 1 (Semanas 3-4) — Fundamentos

| Task | Responsável | Critério de Conclusão |
|------|------------|----------------------|
| Schema de banco de dados v1 | DBA | ERD completo, migrations criadas |
| API de autenticação (JWT) | Back-1 | POST /auth/register, /login, /refresh funcionando |
| Sistema de flavors Flutter | Flutter-1 | 2 flavors configurados e buildando |
| Wireframes de onboarding e home | UX | Flows aprovados pelo PO |
| Design das telas de auth | UI | Telas no Figma em alta fidelidade |
| Telas de Auth no Flutter | Flutter-1 | Login, Register, Forgot Password funcionando |
| Setup Firebase (push notifications) | DevOps | App registrado, token gerado |

**Marco 1**: ✅ Fundação técnica pronta — auth funcional, flavors configurados

---

## FASE 1 — MVP / Clube Piloto (Sprints 2-8)

**Objetivo**: Produto funcional para 1 clube piloto com membros reais

### Sprint 2 (Semanas 5-6) — Gestão de Clube e Membros

| Task | Responsável | Pontos |
|------|------------|--------|
| API: CRUD de clube (create, update, config) | Back-1 | 8 |
| API: CRUD de membros | Back-1 | 5 |
| API: Gestão de planos de assinatura | Back-1 | 8 |
| Flutter: Dashboard do dono do clube | Flutter-2 | 8 |
| Flutter: Tela de membros com lista e filtros | Flutter-2 | 5 |
| Flutter: Perfil do membro | Flutter-1 | 5 |
| UI: Componentes do dashboard | UI | 5 |
| Testes: Auth e members | QA | 5 |

**Velocidade Planejada**: 49 pontos

---

### Sprint 3 (Semanas 7-8) — Catálogo de Whiskies

| Task | Responsável | Pontos |
|------|------------|--------|
| API: CRUD de whiskies (ficha técnica completa) | Back-2 | 8 |
| API: Upload de imagens (S3) | Back-2 | 5 |
| API: Busca full-text no catálogo | Back-2 | 8 |
| API: Filtros do catálogo (tipo, região, nota) | Back-2 | 5 |
| Flutter: Tela do catálogo (grid + lista) | Flutter-1 | 8 |
| Flutter: Tela de detalhe do whiskey | Flutter-1 | 8 |
| Flutter: Barra de busca e filtros | Flutter-1 | 5 |
| Flutter: Cache offline do catálogo (Hive) | Flutter-1 | 8 |
| UI: Cards e telas de catálogo | UI | 5 |
| Testes: API do catálogo | QA | 5 |

**Velocidade Planejada**: 65 pontos

---

### Sprint 4 (Semanas 9-10) — Eventos e Degustações

| Task | Responsável | Pontos |
|------|------------|--------|
| API: CRUD de eventos | Back-2 | 8 |
| API: Inscrição em eventos (com capacidade) | Back-2 | 5 |
| API: Roteiro de degustação | Back-2 | 8 |
| Flutter: Listagem de eventos | Flutter-1 | 5 |
| Flutter: Tela de detalhe do evento | Flutter-1 | 8 |
| Flutter: Flow de inscrição | Flutter-1 | 5 |
| Flutter: QR Code de check-in | Flutter-1 | 5 |
| Flutter: Tela de criação de evento (admin) | Flutter-2 | 8 |
| Notificação: Lembrete de evento (24h antes) | Back-2 | 5 |
| Testes: Flow de eventos completo | QA | 5 |

**Velocidade Planejada**: 62 pontos

---

### Sprint 5 (Semanas 11-12) — Assinaturas e Pagamentos

| Task | Responsável | Pontos |
|------|------------|--------|
| Integração Stripe/Asaas (backend) | Back-1 | 13 |
| API: Criar assinatura e webhook de confirmação | Back-1 | 8 |
| API: Cancelamento e pausa de assinatura | Back-1 | 5 |
| API: Histórico de faturas | Back-1 | 3 |
| Flutter: Flow de checkout de assinatura | Flutter-2 | 13 |
| Flutter: Tela de gerenciar assinatura | Flutter-2 | 5 |
| Flutter: Histórico de pagamentos | Flutter-2 | 5 |
| Notificação: Falha no pagamento | Back-1 | 3 |
| Notificação: Confirmação de pagamento | Back-1 | 3 |
| Testes: Flow de pagamento completo | QA | 8 |

**Velocidade Planejada**: 66 pontos

---

### Sprint 6 (Semanas 13-14) — Avaliações e Gamificação

| Task | Responsável | Pontos |
|------|------------|--------|
| API: Avaliação de whiskey (nota + review) | Back-2 | 5 |
| API: Sistema de pontos (earn e redeem) | Back-1 | 8 |
| API: Badges e conquistas | Back-1 | 5 |
| Flutter: Tela de review do whiskey | Flutter-1 | 5 |
| Flutter: Perfil com pontos e conquistas | Flutter-1 | 8 |
| Flutter: Passaporte de whiskies provados | Flutter-1 | 8 |
| Flutter: Ranking do clube | Flutter-2 | 5 |
| Testes: Sistema de pontos | QA | 5 |

**Velocidade Planejada**: 49 pontos

---

### Sprint 7 (Semanas 15-16) — Notificações e Comunicação

| Task | Responsável | Pontos |
|------|------------|--------|
| Sistema completo de push notifications | Back-2 | 8 |
| API: Broadcast de mensagens para membros | Back-1 | 5 |
| API: Configuração de preferências de notificação | Back-1 | 3 |
| Flutter: Central de notificações (in-app) | Flutter-2 | 8 |
| Flutter: Configurações de notificação | Flutter-2 | 3 |
| E-mail: Templates de onboarding | Back-2 | 5 |
| E-mail: Templates de newsletter do clube | Back-2 | 5 |
| Testes: Fluxos de notificação | QA | 5 |

**Velocidade Planejada**: 42 pontos

---

### Sprint 8 (Semanas 17-18) — Hardening e Lançamento Piloto

| Task | Responsável | Pontos |
|------|------------|--------|
| Testes E2E completos (fluxos críticos) | QA | 13 |
| Testes de carga (k6, 100 usuários simultâneos) | QA + DevOps | 8 |
| Revisão de segurança (OWASP checklist) | Tech Lead + Back | 8 |
| Otimização de performance (queries lentas) | DBA | 5 |
| App Store e Google Play (setup e submit) | DevOps | 8 |
| Onboarding do clube piloto | PM + PO | 5 |
| Documentação de usuário v1 | Docs | 5 |
| Coleta de feedback pós-lançamento | PM | 3 |

**Marco 2**: 🚀 MVP Lançado — Clube piloto operando

---

## FASE 2 — Escala B2B (Sprints 9-18)

**Objetivo**: Adquirir 3-10 clubes pagantes, adicionar features de diferenciação

### Épicos da Fase 2

| Épico | Descrição | Sprint Alvo |
|-------|-----------|------------|
| **E2-001** | Loja (E-commerce) de kits e produtos | Sprints 9-10 |
| **E2-002** | Painel analytics para donos de clube | Sprints 11-12 |
| **E2-003** | App de admin dedicado (separado do membro) | Sprints 12-13 |
| **E2-004** | Flavorização avançada (temas customizáveis) | Sprint 14 |
| **E2-005** | Integração com delivery (rastreamento) | Sprint 15 |
| **E2-006** | Multi-idioma (pt-BR + en-US) | Sprint 15 |
| **E2-007** | Super Admin dashboard (plataforma SaaS) | Sprints 16-17 |
| **E2-008** | API pública para integrações de terceiros | Sprint 18 |

**Marco 3**: 💼 3 Clubes Ativos — Receita recorrente validada

---

## FASE 3 — Produto Maduro (Sprints 19+)

**Objetivo**: Plataforma robusta, escalável para 20+ clubes

### Iniciativas Estratégicas

| Iniciativa | Descrição | Prioridade |
|-----------|-----------|-----------|
| **Recomendação com ML** | Sugestão de whiskies por perfil de paladar | High |
| **Degustação Virtual** | Eventos ao vivo com streaming integrado | High |
| **Marketplace** | Clubes compram/vendem entre si | Medium |
| **Programa de Afiliados** | Membros indicam e ganham pontos | Medium |
| **App Web (PWA)** | Versão web progressiva full-feature | High |
| **Integração ERP** | Exportação para sistemas de gestão | Low |
| **Módulo Fiscal** | NF-e, NFC-e para vendas | High |
| **Modo Sommelier Avançado** | Fichas técnicas com IA | Medium |

**Marco 4**: 🌍 20 Clubes Ativos — Expansão para outros mercados

---

## Resumo de Marcos (Milestones)

| Marco | Descrição | Critério de Sucesso |
|-------|-----------|-------------------|
| **M0** | Ambiente e equipe prontos | Infra funcionando, repo configurado |
| **M1** | Fundação técnica | Auth, flavors, DB schema prontos |
| **M2** | MVP Lançado | Clube piloto com membros reais usando o app |
| **M3** | Receita validada | 3 clubes pagantes, R$ 1k+ MRR |
| **M4** | Product-Market Fit | NPS > 40, churn < 5%/mês |
| **M5** | Escala | 20 clubes, 500+ membros totais |

---

## Velocidade e Capacidade do Time

### Pontos de Story por Sprint (Fase 1)
```
Tech Lead:     5 pontos (revisões, arquitetura)
Back Dev 1:   20 pontos
Back Dev 2:   20 pontos
Flutter Dev 1: 20 pontos
Flutter Dev 2: 20 pontos
QA:           10 pontos (testes)
Total:        95 pontos/sprint
```

### Fator de redução (cerimônias, impedimentos, sick days)
```
Capacidade real ≈ 70% = ~66 pontos/sprint
```

---

## Riscos por Fase

### Fase 1 — Riscos
- Integração de pagamento mais lenta que o esperado (mitigação: spike de 2 dias no Sprint 5)
- Apple Store rejeitando app por conteúdo alcoólico (mitigação: revisar guidelines antes de submit)
- Clube piloto desisindo (mitigação: contrato de piloto com incentivos)

### Fase 2 — Riscos
- Dificuldade em adquirir mais clubes (mitigação: marketing content + landing page)
- Escalabilidade do banco com múltiplos clubes (mitigação: load tests antes de escalar)

---

*Documento mantido pelo PM (agent-pm). Versão 1.0.*
