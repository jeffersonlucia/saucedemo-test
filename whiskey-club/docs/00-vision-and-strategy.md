# Visão e Estratégia — Whiskey Club

## 1. Problema

Clubes de whiskey (presenciais e por assinatura) hoje operam com ferramentas fragmentadas: planilhas para sócios, Sympla/Eventbrite para eventos, WhatsApp para curadoria, maquininha avulsa para pagamento, e nenhum produto digital com a marca do clube na mão do sócio.

Resultados: **baixa retenção**, **zero dado de consumo**, **experiência pobre** para o sócio premium e **operação cara** para o dono.

## 2. Visão (3 anos)

> Ser a **plataforma white-label padrão** para clubes de whiskey na América Latina, do clube boutique de 50 sócios ao clube multi-unidade com milhares.

## 3. Missão (12 meses)

Colocar em produção um app Flutter white-label que permita a um clube de whiskey:
- gerenciar sócios, planos e renovações,
- curar e vender garrafas (cellar + e-commerce),
- programar e ingressar eventos (degustações, masterclasses),
- ter um app de marca própria nos celulares dos sócios,
- e operar tudo via um backoffice único.

E permitir ao **sócio final** ter na mão da marca do **seu** clube: carteirinha digital, agenda de eventos, histórico de degustações, recomendações, cellar pessoal.

## 4. Personas-chave (resumo)

| Persona | Quem é | Job-to-be-done principal |
|---|---|---|
| **Dono / Operador do clube** | Empresário do nicho premium | "Quero rodar meu clube com a minha marca sem virar empresa de tecnologia." |
| **Gerente de unidade** | Op. day-to-day em uma loja/casa | "Quero check-in de evento, controle de bar, e relatório mensal." |
| **Sócio final premium** | Apreciador, ticket alto, busca status e curadoria | "Quero acesso fácil aos meus benefícios e às experiências exclusivas." |
| **Sócio aspiracional / pay-per-use** | Curioso, ainda não é membro | "Quero entrar em eventos avulsos e talvez virar sócio." |

Detalhes em [`01-requirements/personas.md`](01-requirements/personas.md).

## 5. Proposta de valor

- **Para o dono**: SaaS chave-na-mão, com o app saindo com **a marca dele** (não com a nossa). Plano por unidade.
- **Para o sócio**: experiência digital à altura do produto premium (degustação, curadoria, eventos, cellar).

## 6. Modelo de negócio

- **Setup fee** por clube novo (configuração de marca, flavor, publicação nas stores).
- **Mensalidade SaaS** por unidade ativa, com tiers:
  - **Boutique** (até X sócios) — features core.
  - **Pro** — multi-unidade, e-commerce, analytics.
  - **Enterprise** — SSO, customizações, SLA.
- **Take rate** opcional sobre transações de e-commerce e ingressos.
- **Serviços profissionais** (one-off) para onboarding, migração de base, integração com ERP/PDV existente.

## 7. Diferenciais defensáveis

1. **Flavor profundo**: não é só logo e cor — cada clube tem seu *tone of voice*, sua árvore de categorias de whiskey, sua nomenclatura de níveis de membership.
2. **Vertical-specific data model**: nascemos sabendo o que é *single malt*, *cask strength*, *age statement*, *region*, *distillery*, *flight*, *tasting notes* — não somos um "app genérico de clube".
3. **Operação multi-agente**: time virtual pequeno entrega como se fosse grande, com qualidade.

## 8. Métricas de sucesso

### North Star
**Sócios ativos mensais transacionando no app** (login + ação de valor em 30 dias).

### Métricas de produto (por clube)
- Adoção do app entre os sócios existentes (% que ativa em 30 dias do launch).
- Repeat rate em eventos (% que aparece em ≥2 eventos no trimestre).
- NPS do sócio (≥ 60).

### Métricas de negócio
- Nº de clubes ativos.
- MRR e ARPU por unidade.
- Churn mensal de clubes (alvo < 3%).
- CAC payback por clube (alvo < 6 meses).

## 9. Escopo do MVP (Fase 1)

Detalhado em [`../planning/roadmap.md`](../planning/roadmap.md). Resumo:

✅ **Dentro do MVP**
- Cadastro/login de sócio
- Carteirinha digital + QR code
- Catálogo de eventos + inscrição
- Listagem de garrafas (cellar do clube), sem checkout
- Backoffice web mínimo (sócios, eventos)
- 2 flavors funcionando (clube-piloto + clube-demo)

❌ **Fora do MVP** (entra em fases posteriores)
- E-commerce / cellar pessoal do sócio
- Programa de pontos / gamificação
- Integração com PDV
- Push notifications segmentadas
- Multi-unidade no mesmo flavor

## 10. Riscos & mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Custo de manter N flavors explodir | Alta | Alto | Disciplina rígida de "tudo configurável, nada forkado" + lint contra hardcode no flavor |
| Apple/Google rejeitarem builds white-label | Média | Alto | Cada flavor publica como app próprio do clube (conta dele), com nosso bundle. Documentar processo. |
| Curadoria de conteúdo (notas de whiskey) virar bottleneck | Média | Médio | Base curada própria + import de fontes públicas + crowdsourcing controlado |
| Time pequeno + escopo grande | Alta | Alto | Operação multi-agente, vertical slices, brutal priorização |
| Mudança regulatória sobre venda de bebida online | Baixa | Alto | E-commerce só na Fase 3, com revisão jurídica antes |

## 11. Decisões estratégicas tomadas

- **Flutter** ao invés de nativo ou React Native: um único codebase iOS/Android/Web, ecossistema maduro, ótimo para flavorização via build flavors do próprio Flutter.
- **Headless backend** ao invés de monolito acoplado: permite trocar app por web/PWA/Telegram bot no futuro.
- **Multi-tenant por tenant_id** no banco (não DB por clube) no MVP. Reavalia em Fase 3 se algum cliente Enterprise exigir isolamento.
- **Português Brasil first**, i18n preparado mas só PT-BR ativo no MVP.
