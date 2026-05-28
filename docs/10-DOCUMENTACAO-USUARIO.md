# Outline — Documentação de usuário

**Responsável:** Technical Writer (+ agente `technical-writer`)

## Estrutura help center (Notion ou GitBook)

### Para o dono do clube
1. Primeiros passos — criar clube, convidar staff
2. Configurar branding (cores, logo) — link para flavor
3. Cadastrar garrafas e estoque
4. Criar eventos e gerenciar reservas
5. Planos de assinatura e cobrança
6. Dashboard e relatórios
7. FAQ — inadimplência, cancelamentos

### Para o membro
1. Instalar o app (links por flavor/store)
2. Criar conta e assinar plano
3. Reservar degustação
4. Registrar notas de paladar
5. Gerenciar assinatura
6. Privacidade e dados (LGPD)

### Para admin da plataforma
1. Onboarding novo tenant
2. Feature flags
3. Suporte e escalação

## Documentação técnica (desenvolvedores)

- README monorepo
- Guia de novo flavor: `docs/04-ARQUITETURA-FLAVORS.md`
- OpenAPI em `api/openapi.yaml` (a criar na Fase 1)
- Runbooks em `docs/runbooks/` (a criar)

## Padrões

- Linguagem: pt-BR (MVP)
- Screenshots atualizados a cada release minor
- Vídeos curtos (< 2 min) para fluxos críticos

## Critérios de aceite doc

- [ ] Todo RF Must tem artigo ou seção
- [ ] Glossário whiskey (single malt, ABV, etc.)
- [ ] Busca funcional no help center
