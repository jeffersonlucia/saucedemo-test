# Arquitetura de Informação

## App do sócio (mobile)

```
[Tab 1] Início
  - Saudação personalizada
  - Próximo evento (CTA)
  - Carteirinha (botão para abrir fullscreen)
  - "Para você": destaques de cellar / artigos
[Tab 2] Eventos
  - Lista com filtros (mês, tipo, plano)
  - Detalhe → Confirmar presença / Waitlist
[Tab 3] Cellar
  - "Do Clube" / "Meu Cellar" (segmented control)
  - Detalhe da garrafa
[Tab 4] Perfil
  - Foto, plano, status
  - Histórico de eventos
  - Preferências (whiskey, comunicação)
  - Termos, privacidade, suporte, sair
```

Telas-acessórias: Login, Esqueci senha, Onboarding, Carteirinha fullscreen, Pagamento, Pré-evento (lembrete).

## Funil público (PWA / landing)

```
/[slug-do-clube]/
  - Hero + storytelling do clube
  - Próximos eventos (visíveis publicamente)
  - Como virar sócio (planos)
  - Para sócios: botão "Abrir app"
/[slug]/eventos/:id  → checkout guest
/[slug]/planos
/[slug]/sou-socio    → deep link / store
```

## Backoffice web

```
Sidebar
  - Visão geral (dashboard)
  - Sócios
  - Eventos
  - Cellar (garrafas)
  - Unidades
  - Equipe
  - Comunicação
  - Financeiro
  - Configurações (flavor, planos, integrações)
```

Header: switcher de Clube/Unidade, atalho de busca global, notificações, perfil.

## Tablet PDV

```
- Tela inicial: evento em andamento (se houver) + atalhos
- Modo evento: lista de presença + leitor QR + ficha do sócio
- Fim do evento: relatório + assinatura digital do gerente
- Lockscreen com PIN da unidade quando sai do modo
```

## Hierarquia de navegação — princípios

- **Mobile**: máximo 2 níveis até a ação. Tab → detail → action.
- **Backoffice**: máximo 3 cliques pra qualquer operação rotineira.
- **PDV**: 1 ação visível por contexto, sem labirinto.
