# 00 — Visão Geral do Projeto: WhiskeyCLUB

## 1. Contexto e Problema

Clubes de whiskey no Brasil e na América Latina operam hoje de forma fragmentada: planilhas Excel para controle de membros, grupos de WhatsApp para comunicação, transferências banceiras manuais para pagamentos, e catálogos físicos ou PDFs para apresentar os whiskies. Não existe uma solução dedicada, moderna e escalável para esse nicho.

**O problema central:**
> Donos de clubes de whiskey perdem tempo, dinheiro e membros por falta de uma ferramenta de gestão integrada. Membros têm uma experiência de consumo fragmentada e pouco engajante.

---

## 2. Proposta de Valor

**WhiskeyCLUB** é uma plataforma SaaS white-label que entrega:

- **Para o Dono do Clube**: Gestão 360° do negócio — membros, pagamentos, estoque, eventos, comunicação
- **Para o Membro**: Experiência premium — catálogo curado, degustações, histórico pessoal, comunidade
- **Para a Plataforma**: Receita recorrente por clube + comissão em transações

---

## 3. Objetivos de Negócio

| OKR | Key Result | Prazo |
|-----|-----------|-------|
| Lançar MVP funcional | 1 clube piloto operando na plataforma | Fase 1 (3 meses) |
| Validar modelo B2B2C | 3 clubes pagantes | Fase 2 (6 meses) |
| Escalar a plataforma | 20 clubes ativos, 500+ membros totais | Fase 3 (12 meses) |
| Monetizar transações | 15% de take rate em vendas de kits | Fase 3 (12 meses) |

---

## 4. Escopo do Produto

### 4.1 Módulos do Sistema

```
WhiskeyCLUB Platform
│
├── [APP MOBILE/WEB - Flutter]
│   ├── Módulo de Autenticação (Auth)
│   ├── Módulo de Catálogo de Whiskies
│   ├── Módulo de Membros (Perfil, Histórico)
│   ├── Módulo de Eventos e Degustações
│   ├── Módulo de Assinaturas e Pagamentos
│   ├── Módulo de Loja (Kits e Garrafas)
│   ├── Módulo de Comunidade (Feed, Reviews)
│   └── Módulo Administrativo (Dono do Clube)
│
├── [BACKEND - API REST]
│   ├── Auth Service
│   ├── Club Service
│   ├── Catalog Service
│   ├── Member Service
│   ├── Event Service
│   ├── Order Service
│   ├── Payment Service (gateway)
│   └── Notification Service
│
└── [INFRA]
    ├── API Gateway
    ├── PostgreSQL (dados transacionais)
    ├── Redis (cache, sessões)
    ├── S3/Cloudflare R2 (mídias)
    ├── SendGrid (e-mails)
    └── Firebase (push notifications)
```

### 4.2 Modelo de Flavorização (White-Label)

Cada clube cliente recebe:
- Flavor Flutter próprio com sua identidade visual
- Subdomínio próprio (nomeclub.whiskeyclub.app)
- Cores, logo, splash screen personalizados
- Funcionalidades habilitadas/desabilitadas por plano
- Notificações com nome do clube

---

## 5. Modelo de Negócio

### Planos para Clubes (B2B)

| Plano | Preço/mês | Membros | Features |
|-------|-----------|---------|---------|
| **Starter** | R$ 297 | até 50 | App básico, catálogo, eventos |
| **Growth** | R$ 697 | até 200 | + Loja, pagamentos integrados, relatórios |
| **Pro** | R$ 1.497 | até 1.000 | + White-label total, API acesso, suporte prioritário |
| **Enterprise** | Custom | ilimitado | + On-premise, SLA, integração ERP |

### Planos para Membros (B2C — configurado pelo clube)

| Plano | Exemplo de Preço | Benefícios |
|-------|-----------------|-----------|
| **Free** | Grátis | Catálogo público, acesso a eventos abertos |
| **Member** | R$ 89/mês | Kits mensais, degustações, pontos |
| **Premium** | R$ 189/mês | Kits premium, acesso antecipado, eventos VIP |
| **VIP** | R$ 390/mês | Kit curado, experiências exclusivas, sommelier pessoal |

---

## 6. Diferenciais Competitivos

1. **Flutter nativo** — performance iOS/Android/Web com código único
2. **Flavorização real** — cada clube tem seu app próprio na loja
3. **Módulo sommelier** — notas de degustação técnicas, fichas técnicas de whiskies
4. **Gamificação** — pontos, badges, conquistas para engajar membros
5. **Offline-first** — catálogo e perfil disponíveis sem internet
6. **Multi-tenant** — um backend, múltiplos clubes isolados

---

## 7. Premissas e Restrições

### Premissas
- Existe demanda validada no mercado brasileiro
- O dono do clube piloto está disposto a testar o MVP
- Flutter é aprovado como stack mobile principal
- Time consegue trabalhar em sprints de 2 semanas

### Restrições
- Orçamento inicial limitado (MVP enxuto)
- Compliance LGPD obrigatório desde o dia 1
- App nas lojas Apple/Google requer aprovação (prazo ~7 dias para review)
- Integração de pagamento via gateway brasileiro (Stripe BR, Asaas, ou PagSeguro)

---

## 8. Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|----------|
| Baixa adesão do clube piloto | Média | Alto | Envolver dono desde o início do design |
| Rejeição das lojas de apps | Baixa | Alto | Seguir guidelines Apple/Google desde dia 1 |
| Complexidade de pagamentos | Alta | Médio | Usar gateway estabelecido (Asaas/Stripe) |
| Scope creep | Alta | Médio | MoSCoW rigoroso no backlog |
| Performance com muitos whiskies | Baixa | Médio | Paginação e cache desde o início |

---

## 9. Stakeholders

| Stakeholder | Interesse | Nível de Influência |
|------------|----------|-------------------|
| Dono do Clube Piloto | Produto funcional e rentável | Alto |
| Membros do Clube | Experiência premium | Alto |
| Time de Desenvolvimento | Clareza técnica e autonomia | Médio |
| Investidores | ROI e escalabilidade | Alto |
| Reguladores (ANPD/LGPD) | Conformidade | Médio |

---

*Documento vivo — atualizado a cada sprint pela equipe de PM/PO.*
