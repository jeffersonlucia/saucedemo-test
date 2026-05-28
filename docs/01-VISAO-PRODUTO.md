# Visão de produto — Whiskey Club OS

## Problema

Clubes de whiskey (associações, caves privadas, experiências por assinatura) operam com planilhas, WhatsApp e sistemas genéricos que não entendem:

- Estoque por garrafa/lote (serial, proveniência, ABV)
- Degustações guiadas e notas de paladar
- Assinaturas com cotas mensais e benefícios por tier
- Múltiplas unidades com identidade própria sob a mesma marca

## Solução

**Whiskey Club OS** — SaaS white-label + app Flutter flavorizado por **cliente** (tenant/marca) e **unidade** (filial), permitindo lançar o mesmo produto para vários clubes com branding e regras de negócio distintas.

## Missão

Digitalizar a operação do clube e a experiência do membro, da adega ao copo, com dados confiáveis e experiência premium.

## Personas

### Dono / gestor do clube
- Configura planos, preços, eventos
- Controla estoque e movimentações
- Acompanha MRR, churn, ocupação de eventos
- Precisa de relatórios e alertas (estoque baixo, inadimplência)

### Membro (cliente final)
- Reserva degustações e eventos
- Consulta histórico de degustações e notas
- Gerencia assinatura e benefícios
- Recebe recomendações baseadas em perfil de paladar

### Admin da plataforma (você, como fornecedor)
- Onboarding de novos clubes (tenant)
- Billing B2B, suporte, feature flags globais

## Proposta de valor

| Para o clube | Para o membro | Para você (SaaS) |
|--------------|---------------|------------------|
| Operação unificada | App com cara do clube | Receita recorrente por tenant |
| Menos erro de estoque | Experiência premium | Escala com flavors |
| Dados para compra de rótulos | Comunidade e eventos | Upsell de módulos |

## MVP (escopo inicial — 90 dias de produto)

1. Autenticação e perfis (dono, staff, membro)
2. Catálogo de garrafas + estoque básico
3. Eventos/degustações com reserva e capacidade
4. Assinatura com 2 tiers (ex.: Silver / Gold)
5. App Flutter com 2 flavors piloto (Cliente A + Unidade SP)
6. Painel web responsivo (pode ser Flutter Web no mesmo codebase)

## Fora do MVP (pós-lançamento)

- Leilões entre membros
- Integração ERP / nota fiscal
- Marketplace de rótulos
- IA de recomendação avançada
- Programa de pontos e gamificação

## Métricas de sucesso (North Star)

- **NSM:** Garrafas degustadas registradas por mês (engajamento + uso real)
- Secundárias: MRR por tenant, NPS membro, tempo médio de reserva de evento

## Concorrentes / alternativas

- Planilhas + WhatsApp (substituto atual)
- CRMs genéricos + e-commerce
- Apps de wine club adaptados (gap em whiskey: lotes, ABV, single malt vs blend)

## Modelo de negócio sugerido

- Setup fee por clube
- Mensalidade por unidade ativa
- % sobre transações (opcional) ou módulos premium (leilão, analytics)
