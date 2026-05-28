# 06 - Backlog, historias e tarefas

## Priorizacao

Legenda:

- P0: indispensavel para MVP.
- P1: importante para piloto.
- P2: evolucao pos-MVP.

## Escopo fechado do MVP Bar do Jao

O backlog abaixo continua como base ampla do produto. Para execucao imediata, o escopo fechado esta em `docs/09-mvp-bar-do-jao.md` e a ordem P0 consolidada e:

1. Provisionar tenant Bar do Jao.
2. Criar unidade principal.
3. Configurar branding/flavor remoto.
4. Login e RBAC.
5. Planos e beneficios.
6. Membros.
7. Eventos.
8. Reservas.
9. Check-in.
10. Dashboard.
11. Documentacao.
12. Testes P0.

## Epico 1 - Fundacao multi-tenant

### US-001 - Criar tenant

Como platform admin, quero cadastrar um clube para que ele tenha ambiente isolado na plataforma.

Prioridade: P0.

Criterios de aceite:

- Tenant tem nome, slug, status e configuracao inicial.
- Slug e unico.
- Tenant inativo bloqueia acesso operacional.
- Auditoria registra criacao e alteracao.

Tarefas:

- Modelar tabela tenants.
- Criar endpoints CRUD restritos a platform admin.
- Criar validacao de slug.
- Criar seed de tenant demo.
- Criar testes de permissao.

### US-002 - Criar unidade

Como owner, quero cadastrar unidades do clube para separar agenda, estoque e equipe.

Prioridade: P0.

Criterios de aceite:

- Unidade pertence a um tenant.
- Unidade tem endereco, timezone, status e capacidade default.
- Manager pode operar apenas unidades autorizadas.

Tarefas:

- Modelar tabela units.
- Criar endpoints de unidade.
- Implementar permissao por unit_id.
- Adicionar seletor de unidade no app/admin.

### US-003 - Configurar branding

Como owner, quero configurar marca do clube para que o app reflita minha identidade.

Prioridade: P0.

Criterios de aceite:

- Permite nome, logo, cores e textos basicos.
- App aplica tema sem rebuild quando config remota muda.
- Configuracao tem fallback default.

Tarefas:

- Criar modelo brand_config.
- Criar endpoint de leitura publica autenticada.
- Criar upload de logo.
- Implementar ThemeData dinamico no Flutter.
- Criar teste visual/golden do tema default.

## Epico 2 - Autenticacao e perfis

### US-004 - Login de usuario

Como usuario, quero entrar no app com email e senha para acessar minhas funcionalidades.

Prioridade: P0.

Criterios de aceite:

- Login retorna access token e refresh token.
- Token contem tenant ativo quando aplicavel.
- Erros nao revelam se email existe.
- Usuario inativo nao acessa.

Tarefas:

- Criar modelo users.
- Implementar hash de senha.
- Criar endpoint login/refresh/logout.
- Implementar tela Flutter de login.
- Criar testes unitarios de auth.

### US-005 - RBAC

Como owner, quero controlar o acesso da equipe para proteger operacoes sensiveis.

Prioridade: P0.

Criterios de aceite:

- Roles: platform_admin, owner, manager, staff, member.
- Backend bloqueia operacoes sem permissao.
- UI esconde acoes sem permissao.

Tarefas:

- Modelar roles e memberships.
- Criar middleware/guard.
- Criar matriz de permissoes.
- Cobrir testes de isolamento.

## Epico 3 - Membros e planos

### US-006 - Cadastrar membro

Como manager, quero cadastrar membros para operar o clube.

Prioridade: P0.

Criterios de aceite:

- Membro pertence a tenant e opcionalmente unidade principal.
- Status inicial configuravel.
- Tags e observacoes internas sao suportadas.
- Dados pessoais seguem LGPD.

Tarefas:

- Modelar members.
- Criar CRUD paginado.
- Criar tela/lista de membros.
- Criar filtros por status e tags.
- Criar teste E2E basico.

### US-007 - Criar planos

Como owner, quero definir planos de assinatura para vender beneficios.

Prioridade: P0.

Criterios de aceite:

- Plano tem nome, preco, periodicidade, beneficios e status.
- Plano inativo nao pode ser vendido.
- Beneficios aparecem no app do membro.

Tarefas:

- Modelar plans e plan_benefits.
- Criar CRUD de planos.
- Criar UI de planos.
- Criar card de beneficios no app member.

### US-008 - Associar membro a plano

Como manager, quero associar um membro a um plano para controlar beneficios e status.

Prioridade: P0.

Criterios de aceite:

- Assinatura tem status e datas.
- Membro inadimplente nao reserva eventos restritos.
- Historico de mudanca de plano e mantido.

Tarefas:

- Modelar subscriptions.
- Criar endpoints de associacao.
- Criar regra de elegibilidade.
- Criar testes de status.

## Epico 4 - Eventos, reservas e check-in

### US-009 - Criar evento

Como manager, quero criar degustacoes para publicar agenda aos membros.

Prioridade: P0.

Criterios de aceite:

- Evento tem unidade, capacidade, data, status e descricao.
- Pode restringir por plano.
- Capacidade controla reservas.

Tarefas:

- Modelar events.
- Criar CRUD de eventos.
- Criar tela de agenda admin.
- Criar lista de eventos no app member.

### US-010 - Reservar evento

Como membro, quero reservar uma degustacao para garantir minha vaga.

Prioridade: P0.

Criterios de aceite:

- Reserva respeita status do membro, plano e capacidade.
- Lista de espera e criada quando lotado.
- Membro recebe confirmacao visual.

Tarefas:

- Modelar reservations.
- Criar endpoint de reserva com transacao.
- Criar tela de detalhe do evento.
- Criar testes de concorrencia de capacidade.

### US-011 - Check-in por QR Code

Como staff, quero validar entrada por QR Code para controlar presenca.

Prioridade: P0.

Criterios de aceite:

- QR Code representa reserva valida.
- Check-in duplicado e bloqueado.
- No-show pode ser apurado apos evento.

Tarefas:

- Gerar token/QR da reserva.
- Criar leitor no app/admin.
- Criar endpoint de check-in idempotente.
- Criar relatorio de presenca.

## Epico 5 - Estoque

### US-012 - Cadastrar rotulo

Como manager, quero cadastrar rotulos de whiskey para organizar o acervo.

Prioridade: P1.

Criterios de aceite:

- Rotulo tem nome, destilaria, regiao, idade, teor e imagem opcional.
- Rotulos podem ser reutilizados entre unidades do mesmo tenant.

Tarefas:

- Modelar labels/products.
- Criar CRUD.
- Criar upload de imagem.
- Criar busca por nome/destilaria.

### US-013 - Movimentar estoque

Como staff, quero registrar entradas e saidas para manter estoque confiavel.

Prioridade: P1.

Criterios de aceite:

- Movimentacao registra tipo, quantidade, unidade e responsavel.
- Saldo nao pode ficar negativo sem permissao especial.
- Historico e imutavel.

Tarefas:

- Modelar inventory_items e inventory_movements.
- Criar endpoint transacional.
- Criar tela de estoque.
- Criar alerta de estoque baixo.

## Epico 6 - Dashboard e analytics

### US-014 - Dashboard do owner

Como owner, quero ver indicadores para tomar decisoes.

Prioridade: P0.

Criterios de aceite:

- Mostra membros ativos, eventos proximos, reservas, no-show e estoque baixo.
- Filtra por unidade.
- Dados respeitam permissao.

Tarefas:

- Definir queries agregadas.
- Criar endpoint de dashboard.
- Criar cards no admin.
- Criar testes de agregacao por tenant.

## Epico 7 - Comunicacao

### US-015 - Enviar comunicado

Como manager, quero enviar comunicado para membros de uma unidade ou segmento.

Prioridade: P1.

Criterios de aceite:

- Segmenta por unidade, plano e tags.
- Respeita opt-out.
- Registra historico de envio.

Tarefas:

- Modelar notifications.
- Integrar FCM/email.
- Criar templates.
- Criar tela de campanha simples.

## Epico 8 - Qualidade, docs e operacao

### US-016 - Documentacao de usuario

Como gerente, quero guias simples para aprender a usar o sistema.

Prioridade: P0.

Criterios de aceite:

- Guias para membros, eventos, check-in e estoque.
- Linguagem operacional.
- Atualizados a cada release relevante.

Tarefas:

- Criar guia de onboarding.
- Criar FAQ.
- Criar checklist de primeiro clube.

### US-017 - Testes automatizados do fluxo critico

Como time de produto, quero testes automatizados para evitar regressao.

Prioridade: P0.

Criterios de aceite:

- Login, reserva e check-in cobertos.
- Testes rodam no CI.
- Falhas bloqueiam merge em branch principal.

Tarefas:

- Criar plano de testes.
- Configurar testes unitarios backend.
- Configurar testes Flutter.
- Configurar E2E Cypress/Playwright.

## Fatias verticais sugeridas

1. Tenant + brand default + login.
2. Unidade + membro + plano.
3. Evento + reserva.
4. Check-in + relatorio de presenca.
5. Estoque basico + dashboard.
6. Notificacao + piloto.

## Backlog de pesquisa

- Entrevistar donos de clubes.
- Entrevistar gerentes operacionais.
- Entrevistar membros finais.
- Mapear ferramentas atuais usadas por clubes.
- Validar preco e modelo de cobranca.
- Validar necessidade de app white-label publicado.
