# 09 - MVP fechado: Bar do Jao

## Decisao do usuario

O MVP sera um **app Flutter unico** para:

- Administracao do clube.
- Operacao de gerente/staff.
- Cliente final/membro.
- Web responsivo.

Cliente piloto: **Bar do Jao**.

O escopo dos modulos foi fechado pelo time de produto/engenharia nesta primeira rodada multi-agente.

## Declaracao do MVP

O MVP do Whiskey Club OS deve provar que o Bar do Jao consegue operar um clube de whiskey com menos planilha, menos WhatsApp operacional e mais clareza para dono, equipe e membros.

O MVP precisa permitir que o Bar do Jao:

1. Tenha uma identidade propria no app.
2. Cadastre equipe, membros, planos e beneficios.
3. Publique eventos e degustacoes.
4. Permita que membros reservem eventos.
5. Valide entrada/beneficios por QR Code ou busca rapida.
6. Veja indicadores basicos de operacao.
7. Rode em mobile e web no mesmo app Flutter.

## Modulos fechados

### P0 - MVP obrigatorio

| Modulo | Escopo fechado |
| --- | --- |
| Multi-tenant | Tenant `bar-do-jao`, unidade principal, isolamento por `tenant_id` e `unit_id` |
| Branding/flavor | Config remota com nome, cores, logo, textos e feature flags do Bar do Jao |
| Auth/RBAC | Login email/senha, roles owner, manager, staff e member |
| Membros | Cadastro, lista, detalhe, status, tags, observacoes internas e LGPD basica |
| Planos/beneficios | Planos simples, beneficios, associacao de membro a plano e status manual |
| Eventos | Criacao de degustacoes, capacidade, unidade, status e restricao por plano |
| Reservas | Reserva pelo membro, validacao de capacidade/elegibilidade e lista de espera |
| Check-in | QR Code por reserva, busca manual, bloqueio de duplicidade e presenca/no-show |
| Carteirinha | Plano, status, QR Code e beneficios do membro |
| Dashboard | Membros ativos, inadimplentes, proximos eventos, reservas, no-show e alertas |
| Seeds/demo | Dados iniciais do Bar do Jao para demo e testes |
| Testes P0 | Login, reserva, check-in, RBAC e isolamento tenant |
| Documentacao | Guias de uso para owner, manager, staff e membro |

### P1 - Piloto controlado

| Modulo | Escopo |
| --- | --- |
| Estoque basico | Rotulos, saldo por unidade, entrada/saida/ajuste e alerta de minimo |
| Comunicados | Comunicacao simples por unidade/plano/tag, historico e opt-out |
| Recuperacao de senha | Fluxo completo para usuarios |
| Avaliacao pos-evento | Feedback simples de membros apos degustacao |
| Relatorios operacionais | Presenca por evento, reservas vs check-ins e lista de espera |
| Importacao CSV | Importacao simples de membros para reduzir friccao de onboarding |

### P2 - Pos-MVP

- Gateway de pagamento real.
- Billing recorrente automatizado.
- Marketplace de garrafas/produtos.
- Estoque por dose individual.
- App white-label publicado por cliente.
- Multiunidade avancado.
- ERP/fiscal.
- Recomendacoes por IA.
- Analytics avancado de cohort/retencao.
- CRM/campanhas avancadas.

## Fora do primeiro MVP

- Pagamento real integrado.
- App separado na loja para Bar do Jao.
- Permissoes muito granulares.
- Marketplace.
- Feed social.
- Chat interno.
- Integracao profunda com WhatsApp.
- Estoque financeiro/custo medio/dose individual.

## Ordem de execucao das historias P0

1. Provisionar tenant `bar-do-jao`.
2. Criar unidade principal.
3. Configurar branding/flavor remoto.
4. Criar auth e login.
5. Aplicar RBAC.
6. Criar planos do clube.
7. Cadastrar membros.
8. Associar membro a plano/beneficios.
9. Criar evento/degustacao.
10. Reservar evento como membro.
11. Fazer check-in por QR Code/busca manual.
12. Exibir dashboard operacional.
13. Criar guias de uso do Bar do Jao.
14. Cobrir fluxos criticos com testes.

## Personas e jornadas MVP

### Owner - Jao

Objetivo: entender se o clube esta saudavel e agir rapido.

Jornada:

1. Login.
2. Abre dashboard.
3. Ve membros ativos, inadimplentes, eventos proximos e no-show.
4. Entra em membros, planos ou eventos conforme alerta.
5. Ajusta plano, acompanha reservas ou cobra pendencias fora da plataforma.

Sucesso: em poucos minutos sabe o que precisa fazer no clube.

### Manager

Objetivo: operar a rotina da unidade.

Jornada:

1. Login.
2. Ve agenda da semana.
3. Cria evento.
4. Acompanha reservas/lista de espera.
5. Cadastra membro ou ajusta status/plano.

Sucesso: cria e opera eventos sem planilha externa.

### Staff

Objetivo: validar membros e reservas no bar.

Jornada:

1. Abre modo staff.
2. Acessa check-in como primeira acao.
3. Le QR Code ou busca por nome/telefone.
4. Recebe resposta clara: confirmado, duplicado, invalido, pendente ou fora da lista.

Sucesso: validacao em poucos segundos.

### Membro

Objetivo: entender beneficios, reservar eventos e acessar carteirinha.

Jornada:

1. Login.
2. Ve home do Bar do Jao.
3. Consulta plano/beneficios.
4. Reserva evento elegivel.
5. Usa QR Code no bar.

Sucesso: reserva sem ajuda e confia no status/beneficios exibidos.

## Navegacao do app unico

### Entrada

```text
Splash
-> Carrega flavor local
-> Busca config remota do tenant
-> Login
-> Resolve roles/unidades/features
-> Abre shell conforme papel principal
```

### Shell admin

- Dashboard.
- Agenda/Eventos.
- Reservas.
- Check-in.
- Membros.
- Planos.
- Estoque, se P1 ativo.
- Comunicados, se P1 ativo.
- Configuracoes.

### Shell staff

- Check-in.
- Reservas do evento.
- Busca de membro.
- Estoque rapido, se P1 ativo.

### Shell membro

- Home.
- Eventos.
- Carteirinha.
- Clube/beneficios.
- Perfil.

Se um usuario tiver mais de um papel, o app deve oferecer troca clara de modo: Admin, Staff ou Membro.

## Marca Bar do Jao

Direcao visual: boteco premium brasileiro, madeira, ambar, couro, calor e proximidade.

### Tokens sugeridos

```text
background: #120D0A
surface: #1F1610
surfaceSoft: #2A1D14
card: #2E2118
primary: #C47A2C
primarySoft: #F5C978
accent: #9F4F24
textPrimary: #FFF8ED
textSecondary: #C8AA82
success: #60C18C
warning: #F09A77
danger: #D86B62
```

### Microcopy

- Hoje no Bar do Jao.
- Sua mesa no clube.
- Reservar minha vaga.
- Carteirinha Black.
- Beneficios disponiveis.
- Check-in liberado.
- Estoque em atencao.

## Modelo tecnico fechado

| Camada | Decisao |
| --- | --- |
| App | Flutter unico mobile + web |
| Backend | NestJS + TypeScript |
| API | REST `/v1` + OpenAPI |
| Banco | PostgreSQL compartilhado com `tenant_id` |
| ORM | Prisma |
| Auth | JWT access/refresh + RBAC |
| State | Riverpod |
| Rotas | GoRouter |
| HTTP | Dio |
| Jobs | Redis + BullMQ quando necessario |
| Storage | S3 compativel para logo/imagens |
| Billing | Manual/simulado no piloto |
| Push | Fora do caminho critico inicial |

## Modelo de dados P0

Entidades obrigatorias:

- tenants
- units
- tenant_brand_configs
- tenant_feature_flags
- users
- tenant_memberships
- refresh_tokens
- members
- member_tags
- member_tag_assignments
- plans
- plan_benefits
- subscriptions
- events
- event_allowed_plans
- reservations
- checkins
- audit_logs

P1:

- whiskey_labels
- inventory_items
- inventory_movements
- notifications

## Seeds do Bar do Jao

Seed minimo:

- Tenant `bar-do-jao`.
- Unidade `Bar do Jao - Matriz`.
- Branding ambar/madeira.
- Usuarios:
  - owner: jao.owner@example.com
  - manager: gerente@example.com
  - staff: staff@example.com
  - member: membro@example.com
- Planos:
  - Silver
  - Gold
  - Black
- Membros demo.
- Evento futuro: Degustacao Bourbon da Casa.
- Reserva confirmada.
- QR demo.

## Testes P0 obrigatorios

1. Login owner, manager, staff e member.
2. Manager cadastra membro.
3. Owner cria plano.
4. Manager cria evento.
5. Membro reserva evento.
6. Staff faz check-in.
7. Check-in duplicado e bloqueado.
8. Usuario sem permissao recebe 403.
9. Usuario de outro tenant nao acessa dados do Bar do Jao.
10. Dashboard mostra dados corretos.

## Metricas de sucesso do piloto

| Metrica | Sinal esperado |
| --- | --- |
| Ativacao admin | Bar do Jao configurado com planos, membros e evento inicial |
| Ativacao membro | Membros conseguem acessar carteirinha e reservar |
| Operacao | Check-in feito pelo sistema no evento piloto |
| Confianca | Dono confia nos dados de membros/beneficios |
| Valor | Dono identifica menos trabalho manual e menos erro |
| Qualidade | Sem bug critico em login, reserva, check-in ou tenant isolation |

## Perguntas de validacao com o Bar do Jao

1. O admin no Flutter web atende ou o Jao espera painel web tradicional?
2. O controle de estoque precisa entrar no primeiro piloto ou pode ser P1?
3. Planos e pagamentos podem ser controlados manualmente no MVP?
4. Quais status reais de membro o Bar do Jao usa?
5. Convidados contam na capacidade dos eventos?
6. Lista de espera precisa ser automatica ou manual?
7. Check-in sera por celular, tablet ou notebook?
8. Quais indicadores fazem o Jao pagar pelo produto?
9. Membros aceitariam app, PWA ou link web?
10. Quais beneficios precisam de saldo/historico desde o primeiro dia?

## Go/no-go do MVP

Go para piloto apenas se:

- Fluxos P0 passarem em staging.
- Tenant isolation estiver validado.
- Seeds do Bar do Jao estiverem funcionando.
- App web/mobile estiver usavel nos papeis admin, staff e member.
- Check-in for rapido e claro.
- Documentacao minima estiver pronta.
- Suporte e runbook de incidente estiverem definidos.
