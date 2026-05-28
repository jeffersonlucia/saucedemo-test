# 00 - Visao do produto

## Nome de trabalho

Whiskey Club OS.

## Proposta

Uma plataforma white-label para clubes de whiskey gerenciarem membros, unidades, assinaturas, eventos, degustacoes, estoque, reservas, beneficios e comunicacao com clientes finais.

## Decisao atual do MVP

- Cliente piloto: Bar do Jao.
- App: Flutter unico para admin, staff, membro final e web responsivo.
- Escopo P0 fechado em `docs/09-mvp-bar-do-jao.md`.
- Primeira rodada multi-agente consolidada em `docs/10-primeira-rodada-multi-agente.md`.
- Pagamento real e estoque completo nao entram no primeiro MVP.

O produto deve atender dois publicos ao mesmo tempo:

1. Dono/operador do clube: precisa controlar operacao, receita, membros, estoque, agenda, unidades e indicadores.
2. Cliente final do clube: precisa descobrir eventos, confirmar presenca, acessar beneficios, consultar garrafas, acompanhar assinatura e comprar experiencias.

## Problema

Clubes de whiskey costumam operar com planilhas, WhatsApp, sistemas de pagamento isolados e controle manual de estoque. Isso gera:

- Baixa previsibilidade de receita.
- Dificuldade de controlar membros ativos, inadimplentes e VIP.
- Falta de rastreabilidade sobre garrafas, doses, eventos e reservas.
- Experiencia fragmentada para o cliente final.
- Dificuldade de replicar o modelo em varias unidades ou marcas.

## Hipoteses principais

- Clubes pagariam por um sistema que reduza operacao manual e melhore retencao.
- A flavorizacao por cliente/unidade e essencial para vender como produto premium white-label.
- Um app Flutter unico, com configuracao por flavor/tenant, reduz custo de manutencao.
- Donos de clube valorizam dashboards simples de receita, ocupacao, estoque e membros.
- Clientes finais engajam mais quando podem reservar eventos, acompanhar beneficios e receber comunicacao segmentada.

## Personas

### Persona A - Dono do clube

- Nome ficticio: Rafael, 42 anos.
- Opera um clube premium com 2 unidades.
- Dores: inadimplencia, eventos lotados sem controle, dificuldade para prever estoque e receita.
- Objetivos: vender mais assinaturas, reduzir trabalho manual, ter visao de performance por unidade.

### Persona B - Gerente de unidade

- Nome ficticio: Camila, 35 anos.
- Cuida de agenda, estoque, atendimento e check-in.
- Dores: falta de informacao centralizada e retrabalho com listas manuais.
- Objetivos: saber quem vem ao evento, quais garrafas usar, quais membros tem beneficios.

### Persona C - Cliente final

- Nome ficticio: Bruno, 31 anos.
- Assina o clube e frequenta degustacoes.
- Dores: nao sabe quais beneficios tem, perde eventos por falta de aviso, quer historico de degustacoes.
- Objetivos: reservar facil, receber recomendacoes, acompanhar plano e beneficios.

## Produto B2B2C

| Camada | Usuario | Valor entregue |
| --- | --- | --- |
| B2B Admin | Dono, gerente, equipe | Operacao, receita, estoque, agenda e CRM |
| B2C App | Membro final | Reservas, eventos, beneficios, assinatura e conteudo |
| Plataforma | Time do produto | Multi-tenant, white-label, billing, suporte e analytics |

## MVP recomendado

O MVP deve provar operacao basica, receita recorrente e experiencia do membro.

### Modulos do MVP

1. Autenticacao e perfis.
2. Tenant/cliente/unidade.
3. Membros e planos.
4. Eventos e reservas.
5. Check-in por QR Code.
6. Estoque basico de garrafas.
7. Dashboard operacional.
8. Comunicados/push basico.
9. Flavorizacao visual por cliente/unidade.
10. Painel administrativo web responsivo ou app admin simplificado.

### Fora do MVP inicial

- Marketplace publico complexo.
- Recomendacao por IA.
- Programa completo de afiliados.
- Integracoes fiscais profundas.
- ERP completo.
- App offline total.

## Diferenciais

- Produto criado especificamente para clube de whiskey, nao um CRM generico.
- White-label por marca e unidade.
- Experiencia premium para cliente final.
- Controle de estoque orientado a garrafas, doses e eventos.
- Arquitetura pronta para multi-agentes desenvolverem em paralelo.

## Metricas de sucesso

| Metrica | Por que importa |
| --- | --- |
| Membros ativos por clube | Mede valor B2B e adocao |
| Receita recorrente mensal do clube | Mostra impacto no negocio do cliente |
| Taxa de reserva em eventos | Mede engajamento B2C |
| No-show em eventos | Mede eficiencia operacional |
| Inadimplencia | Impacta previsibilidade de receita |
| Giro de estoque | Controla custo e planejamento |
| Retencao de membros | Valida valor continuo |

## Premissas de negocio

- O produto pode ser vendido por assinatura mensal por clube/unidade.
- Pode existir cobranca adicional por membro ativo, modulo premium ou volume de notificacoes.
- O app do cliente final pode ser publicado como app unico multi-tenant ou apps white-label separados para clientes maiores.
- A plataforma precisa nascer com segregacao de dados por tenant.

## Decisoes a validar com clientes reais

- Donos aceitam operar eventos e membros pelo app ou exigem painel web completo?
- Cliente final prefere app instalado ou PWA para interacoes simples?
- Qual gateway de pagamento e mais comum no publico alvo?
- Controle de estoque precisa chegar ate dose individual no MVP?
- O clube trabalha com unidades independentes ou uma carteira de membros compartilhada?
