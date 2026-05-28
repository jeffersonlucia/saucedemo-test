# 04 - Time, chapeus e orquestracao multi-agente

## Objetivo

Organizar um time completo e uma rede de agentes especialistas para planejar, validar, construir, testar, documentar e lancar o produto em paralelo com baixo conflito.

## Time humano recomendado

| Papel | Responsabilidade |
| --- | --- |
| Sponsor/Founder | Decisoes de negocio, orcamento, priorizacao final |
| Product Manager | Estrategia, roadmap, metricas, go-to-market |
| Product Owner | Backlog, criterios de aceite, refinamento e aceite de entregas |
| Analista de Requisitos | Descoberta, regras de negocio, fluxos e documentacao funcional |
| UX Researcher | Entrevistas, jornadas, testes de usabilidade |
| UX/UI Designer | Wireframes, design system, prototipos e handoff |
| Tech Lead | Arquitetura, padroes, revisao tecnica e integracao |
| Mobile Flutter Dev | App member/admin, flavorizacao, testes Flutter |
| Backend Dev | APIs, dominio, integracoes e seguranca |
| Front/Admin Dev | Painel admin web, se separado do Flutter |
| DBA/Data Engineer | Modelo de dados, indices, migrations e analytics |
| DevOps/SRE | CI/CD, ambientes, deploy, observabilidade |
| QA Automation | Estrategia de testes, E2E, regressao e qualidade |
| Technical Writer | Documentacao tecnica, user guides e release notes |
| Customer Success | Onboarding de clubes piloto, feedback e suporte |

## Agentes especialistas

Cada agente deve receber contexto, entregaveis, limites e criterio de saida.

### Agente PM

- Define posicionamento, mercado, personas e metricas.
- Mantem roadmap e estrategia de pricing.
- Produz PRDs e business cases.
- Saida esperada: PRD, roadmap, metricas e decisores de escopo.

### Agente PO

- Quebra roadmap em epicos, historias e tarefas.
- Escreve criterios de aceite.
- Mantem backlog pronto para desenvolvimento.
- Saida esperada: backlog priorizado e historias testaveis.

### Agente Analista de Requisitos

- Mapeia regras de negocio.
- Cria fluxos, casos de uso e estados.
- Identifica dependencias e ambiguidades.
- Saida esperada: requisitos funcionais, nao funcionais e perguntas abertas.

### Agente UX Research

- Simula entrevistas com donos, gerentes e membros.
- Cria matriz de dores e oportunidades.
- Define roteiros de teste de usabilidade.
- Saida esperada: insights, jornadas e riscos de experiencia.

### Agente UX/UI Designer

- Cria wireframes, design system e mockups.
- Define tokens de marca para white-label.
- Valida acessibilidade visual.
- Saida esperada: telas, componentes, tokens e especificacoes.

### Agente Tech Lead

- Define arquitetura, padroes e contratos.
- Revisa PRs e decisoes tecnicas.
- Coordena integracao entre front, back e dados.
- Saida esperada: ADRs, padroes, diagramas e revisoes.

### Agente Flutter Front

- Implementa app Flutter.
- Configura flavors, rotas, temas e state management.
- Cria testes unitarios/widget/golden.
- Saida esperada: telas funcionais e builds por flavor.

### Agente Backend

- Implementa APIs modulares.
- Define DTOs, validacoes, RBAC e webhooks.
- Cria testes unitarios/integracao.
- Saida esperada: endpoints versionados e documentados.

### Agente DBA/Data

- Modela entidades, indices, migrations e seed data.
- Garante isolamento multi-tenant.
- Apoia dashboards e metricas.
- Saida esperada: ERD, migrations, politica de dados e queries.

### Agente DevOps

- Cria pipelines, ambientes e deploy.
- Configura secrets, observabilidade e rollback.
- Automatiza builds Flutter e backend.
- Saida esperada: CI/CD, IaC inicial e runbooks.

### Agente QA Automation

- Define piramide de testes.
- Automatiza fluxos criticos.
- Gera plano de regressao.
- Saida esperada: suites automatizadas e relatorios.

### Agente Documentacao

- Mantem docs tecnicas e de usuario.
- Cria guia de onboarding e ajuda operacional.
- Saida esperada: docs versionadas e release notes.

### Agente Cliente Simulado - Dono do clube

- Avalia valor, linguagem e operacao.
- Questiona ROI, relatorios, controle de equipe e unidades.
- Saida esperada: feedback de negocio e aceite operacional.

### Agente Cliente Simulado - Membro final

- Avalia experiencia, facilidade e desejo de uso.
- Questiona reservas, beneficios, comunicacao e perfil.
- Saida esperada: feedback de UX e aceite de jornada.

## Orquestracao paralela

### Trilhas de trabalho

| Trilha | Agentes principais | Entregaveis |
| --- | --- | --- |
| Produto | PM, PO, Requisitos, Cliente Simulado | PRD, backlog, criterios |
| Experiencia | UX Research, UX/UI, Cliente Final | Jornadas, prototipos, design system |
| Plataforma | Tech Lead, Backend, DBA, DevOps | Arquitetura, dados, APIs, ambientes |
| App | Flutter, UX/UI, QA | Flavors, telas, testes |
| Qualidade | QA, DevOps, Tech Lead | Test strategy, CI, E2E |
| Lancamento | PM, CS, Docs, DevOps | Onboarding, runbooks, materiais |

### Contratos para evitar conflito

- Backend publica OpenAPI antes da implementacao completa.
- DBA publica ERD e convencoes de tenant_id.
- UX/UI publica design tokens e componentes.
- Flutter consome mocks primeiro e troca para API real depois.
- QA escreve cenarios a partir dos criterios de aceite.
- Documentacao acompanha cada modulo entregue.

## Cerimonias assicronas

- Daily async: bloqueios, progresso e proximo passo.
- Refinamento: historias que entram na fila de desenvolvimento.
- Design review: telas e fluxos antes de build.
- Architecture review: ADRs e contratos.
- QA gate: criterios de aceite e testes minimos.
- Release readiness: checklist antes de piloto.

## Definition of Ready

Uma historia esta pronta quando:

- Tem persona, objetivo e valor.
- Tem criterios de aceite.
- Tem dependencia explicita.
- Tem impacto em tenant/unidade descrito.
- Tem design ou estado visual suficiente.
- Tem contrato de API ou mock.
- Tem estrategia minima de teste.

## Definition of Done

Uma historia esta pronta para release quando:

- Codigo revisado.
- Testes automatizados relevantes passando.
- Sem vazamento entre tenants.
- Logs e erros tratados.
- Documentacao atualizada.
- Feature flag configurada quando necessario.
- Aceite do PO ou cliente simulado.

## Exemplo de prompt para agentes

```text
Voce e o agente [PAPEL] do produto Whiskey Club OS.
Leia os documentos em docs/.
Seu objetivo e entregar [ENTREGAVEL].
Respeite o modelo multi-tenant com tenant_id e unit_id.
Nao implemente fora do seu modulo sem registrar dependencia.
Ao final, entregue: decisoes, arquivos alterados, riscos, perguntas abertas e proximas tarefas.
```

## Quando usar mais de um especialista da mesma area

- UX/UI: quando houver muitas telas ou marcas white-label.
- Backend: separar Identity/Tenant, Events/Reservations, Inventory/Billing.
- Flutter: separar app shell/design system, member journeys e admin journeys.
- QA: separar API tests, mobile/widget tests e E2E.
- DBA/Data: separar modelo transacional e analytics.
