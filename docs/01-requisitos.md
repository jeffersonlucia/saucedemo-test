# 01 - Requisitos

## Escopo funcional inicial

### Autenticacao e acesso

- Login por email/senha.
- Login social opcional em fase posterior.
- Recuperacao de senha.
- Perfis: platform admin, owner, manager, staff, member.
- Convite de equipe por email.
- Politicas de permissao por tenant e unidade.

### Clientes, tenants e unidades

- Cadastro de cliente/tenant.
- Cadastro de unidades vinculadas ao tenant.
- Configuracao de marca: nome, logo, cores, tipografia, textos e links.
- Configuracao de features por tenant/unidade.
- Selecionar unidade ativa no app.

### Membros

- Cadastro de membro.
- Status: lead, ativo, pausado, inadimplente, cancelado, convidado.
- Dados pessoais, preferencias e restricoes.
- Plano associado.
- Historico de eventos, check-ins, compras e beneficios.
- Segmentacao por tags.

### Planos e assinaturas

- Cadastro de planos.
- Periodicidade mensal, trimestral, anual.
- Beneficios por plano.
- Limites de reservas, convidados e descontos.
- Status da assinatura.
- Registro de cobrancas e pagamentos.
- Integracao com gateway em fase posterior do MVP.

### Eventos e degustacoes

- Criar evento por unidade.
- Capacidade, lista de espera, preco e visibilidade.
- Garrafas/rotulos associados ao evento.
- Reservas de membros e convidados.
- Check-in por QR Code.
- Comunicacao para inscritos.
- Avaliacao pos-evento.

### Estoque

- Cadastro de garrafas e rotulos.
- Quantidade por unidade.
- Entrada, saida e ajuste manual.
- Associar consumo a eventos.
- Alerta de estoque baixo.
- Historico de movimentacoes.

### App do cliente final

- Home com identidade do clube.
- Carteirinha de membro.
- Agenda de eventos.
- Reservas e check-in.
- Beneficios do plano.
- Historico de degustacoes.
- Comunicados.
- Perfil e preferencias.

### Painel admin

- Dashboard com membros, receita, eventos, no-show e estoque.
- Gestao de membros.
- Gestao de eventos.
- Gestao de estoque.
- Gestao de planos.
- Configuracao de unidade e marca.

## Requisitos nao funcionais

| Categoria | Requisito |
| --- | --- |
| Multi-tenant | Dados sempre segregados por tenant_id e, quando aplicavel, unit_id |
| Seguranca | RBAC, logs de auditoria, tokens seguros, criptografia em repouso quando suportada |
| Performance | Telas principais devem carregar com paginacao e cache local |
| Disponibilidade | Backend stateless e banco gerenciado no lancamento |
| Observabilidade | Logs estruturados, tracing basico e metricas de erro |
| LGPD | Consentimento, exportacao e exclusao/anomizacao de dados pessoais |
| Acessibilidade | Contraste, tamanhos de fonte e navegacao por leitores em telas principais |
| Internacionalizacao | Portugues-BR no MVP, arquitetura preparada para i18n |
| Testabilidade | Cobertura automatizada em regras criticas e fluxos E2E principais |

## Regras de negocio iniciais

1. Um usuario pode pertencer a mais de um tenant, mas sempre opera em um tenant ativo.
2. Um membro pode ter beneficios diferentes por unidade.
3. Eventos podem ser exclusivos para um plano ou abertos a todos os membros ativos.
4. Reservas devem respeitar capacidade e status da assinatura.
5. Check-in deve ser permitido apenas para reservas confirmadas ou convidados autorizados.
6. Estoque consumido em evento deve gerar movimentacao rastreavel.
7. Comunicados devem respeitar opt-in/opt-out do usuario.
8. Configuracoes de flavor nao podem vazar dados entre clientes.

## Requisitos por papel

### Platform admin

- Criar tenants.
- Ativar/desativar modulos.
- Ver saude operacional agregada.
- Gerenciar planos comerciais da plataforma.

### Owner

- Ver dashboard financeiro e operacional.
- Gerenciar unidades, equipe, planos e marca.
- Acessar dados consolidados.

### Manager

- Operar unidade.
- Gerenciar eventos, estoque e membros da unidade.
- Ver indicadores da unidade.

### Staff

- Fazer check-in.
- Consultar reserva e beneficios.
- Registrar movimentacao simples de estoque.

### Member

- Ver beneficios.
- Reservar eventos.
- Apresentar carteirinha/QR Code.
- Atualizar preferencias.

## Perguntas abertas

- O app admin sera Flutter tambem ou painel web separado?
- Gateway prioritario: Stripe, Mercado Pago, Pagar.me ou outro?
- Notificacoes: Firebase Cloud Messaging no MVP?
- Clube vende garrafas/produtos ou apenas experiencia/assinatura?
- O controle fiscal sera integrado no MVP ou tratado fora da plataforma?
- Havera app publicado por cliente ou app unico com selecao/codigo do clube?

## Criterios de aceite globais

- Cada funcionalidade deve respeitar tenant_id.
- Cada historia deve ter criterios de aceite claros.
- Cada fluxo critico deve ter teste unitario ou E2E.
- Cada decisao tecnica relevante deve ser registrada em ADR.
- Cada entrega deve ter documentacao de usuario quando impactar operacao.
