# 05 - Roadmap, fases e entregas

## Estado atual

Estamos na transicao entre a Fase 0 e a Fase 2:

- Fase 0: plano, requisitos, backlog, mock e primeira rodada multi-agente concluidos.
- Decisao de MVP: app Flutter unico para admin, membro e web.
- Cliente piloto: Bar do Jao.
- Proximo foco: base tecnica executavel e primeira fatia vertical `tenant + unidade + branding + auth`.

## Fase 0 - Fundacao do produto

### Objetivo

Transformar a ideia em um plano executavel com escopo, riscos, arquitetura e backlog.

### Entregas

- Visao de produto.
- Personas e jornadas.
- Requisitos funcionais e nao funcionais.
- Arquitetura inicial.
- Estrategia de flavorizacao.
- Modelo de dados inicial.
- Backlog priorizado.
- Mock navegavel.
- Workspace de gestao no Notion.

### Gate de saida

- PM/PO conseguem explicar o MVP.
- Tech Lead consegue iniciar arquitetura.
- UX/UI consegue desenhar telas.
- QA consegue escrever cenarios.
- Cliente simulado entende o valor.

## Fase 1 - Descoberta validada

### Objetivo

Validar com donos/gerentes/membros se o MVP resolve dores reais.

### Entregas

- Roteiro de entrevistas.
- Mapa de jornada do dono, gerente e membro.
- Prototipo de baixa/media fidelidade.
- Matriz de priorizacao.
- Ajuste de escopo do MVP.

### Gate de saida

- Dores priorizadas confirmadas.
- Fluxo de eventos/reservas aprovado.
- Fluxo de membros/planos aprovado.
- Estoque basico validado ou rebaixado de prioridade.

## Fase 2 - Fundacao tecnica

### Objetivo

Criar base de codigo, CI/CD, ambientes e contratos para desenvolvimento paralelo.

### Entregas

- Monorepo ou repos separados definidos.
- App Flutter bootstrapado.
- Backend bootstrapado.
- Banco PostgreSQL com migrations iniciais.
- CI com lint/test/build smoke.
- OpenAPI inicial.
- Design system base.
- Seeds de demo.

### Gate de saida

- Flutter roda local e em CI.
- Backend roda local e em staging.
- Migrations aplicam limpas.
- Login mock/real definido.
- Theme/flavor default funcionando.

## Fase 3 - MVP operacional

### Objetivo

Entregar os fluxos essenciais para um clube piloto operar.

### Entregas

- Auth e RBAC.
- Tenant e unidades.
- Membros e planos.
- Eventos e reservas.
- Check-in por QR Code.
- Estoque basico.
- Dashboard admin.
- App do membro.
- Documentacao de usuario.
- Testes de regressao principais.

### Gate de saida

- Clube piloto consegue cadastrar membros.
- Membro consegue reservar evento.
- Staff consegue fazer check-in.
- Gerente consegue ver lotacao e estoque.
- Dono consegue ver indicadores basicos.

## Fase 4 - Piloto controlado

### Objetivo

Rodar com um ou mais clubes reais em ambiente controlado.

### Entregas

- Onboarding do clube.
- Configuracao de marca/unidades.
- Treinamento da equipe.
- Canal de suporte.
- Monitoramento de erros.
- Relatorio de feedback.
- Ajustes de usabilidade.

### Gate de saida

- Operacao real completa pelo sistema.
- Problemas criticos resolvidos.
- Indicadores de engajamento coletados.
- Decisao de lancamento ou iteracao.

## Fase 5 - Lancamento comercial

### Objetivo

Preparar venda, suporte, escalabilidade e operacao para mais clubes.

### Entregas

- Pricing e planos comerciais.
- Site/landing page.
- Materiais de venda.
- Termos, privacidade e LGPD.
- Playbook de onboarding.
- Runbook de incidentes.
- Esteira de publicacao de app.
- Analytics de funil.

### Gate de saida

- Novo cliente pode ser provisionado com checklist.
- Suporte sabe operar incidentes comuns.
- Produto tem metricas de uso e receita.
- Contratos e documentos legais revisados.

## Sequenciamento tecnico recomendado

1. Modelagem tenant/unidade/usuario.
2. Auth/RBAC.
3. Design system + flavor default.
4. Membros/planos.
5. Eventos/reservas.
6. Check-in.
7. Estoque basico.
8. Dashboard.
9. Notificacoes.
10. Billing real.

## Entregas por trilha

| Trilha | Entrega inicial | Entrega MVP |
| --- | --- | --- |
| Produto | PRD e backlog | Roadmap pos-piloto |
| UX/UI | Mock e design tokens | Fluxos aprovados e handoff |
| Flutter | App shell flavorizado | App member/admin funcional |
| Backend | API scaffold e OpenAPI | Modulos core implementados |
| Dados | ERD e migrations base | Indices, seeds e auditoria |
| DevOps | CI local/staging | Deploy, monitoramento, rollback |
| QA | Test strategy | Regressao automatizada |
| Docs | Estrutura Notion | Guias de usuario e tecnica |

## Riscos de faseamento

- Comecar por UI sem modelo multi-tenant pode gerar retrabalho.
- Implementar pagamento real antes de validar planos pode travar MVP.
- Criar muitos flavors cedo pode dificultar CI/CD.
- Ignorar onboarding do clube reduz chance de piloto bem-sucedido.
