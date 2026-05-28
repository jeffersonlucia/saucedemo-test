# Orquestracao Multiagente - Prompts e Contratos

Este documento define como rodar multiplos agentes em paralelo, cada um com seu chapeu, com entregas claras e sincronizacao.

## 1) Regras de colaboracao entre agentes

1. Cada agente recebe escopo, saidas esperadas e criterio de pronto.
2. Toda entrega precisa ter rastreabilidade para Epico/Historia/Task.
3. Decisoes arquiteturais devem virar ADR.
4. Nenhum agente altera requisito sem alinhamento PM + PO.
5. Fluxo principal: Descoberta -> Design -> Build -> Teste -> Go-live.

---

## 2) Contrato padrao por agente

- **Input:** links de contexto (PRD, backlog, arquitetura).
- **Output:** artefatos objetivos (docs, codigo, testes, dashboards).
- **KPIs:** metricas de qualidade da propria trilha.
- **Handoffs:** para quais agentes envia resultado.

---

## 3) Agentes e prompts iniciais

## PM Agent

Objetivo: priorizar roadmap por valor e risco.
Prompt base:
"Revise PRD e backlog, proponha priorizacao P0/P1/P2 com justificativa de valor, dependencia tecnica e risco operacional."

Entrega:
- Roadmap por fase.
- Definicao de metas/KPIs por trimestre de produto.

## PO Agent

Objetivo: quebrar epicos em historias testaveis.
Prompt base:
"Transforme os epicos em historias com criterios de aceite Given/When/Then, dependencias e definicao de pronto."

Entrega:
- Historias detalhadas no Notion.
- Priorizacao pronta para sprint planning.

## Requisitos Agent

Objetivo: garantir consistencia de regras.
Prompt base:
"Consolide requisitos funcionais e nao funcionais, regras de negocio por tenant/unidade, e matriz de rastreabilidade requisito->historia->teste."

Entrega:
- Documento de requisitos v1.
- Matriz de rastreabilidade.

## UX Agent

Objetivo: validar experiencia ponta a ponta.
Prompt base:
"Mapeie jornadas de dono e membro, desenhe wireflows e identifique friccoes prioritarias para o MVP."

Entrega:
- Fluxos de navegacao.
- Hipoteses de teste de usabilidade.

## UI Agent

Objetivo: traduzir UX em interface consistente.
Prompt base:
"Crie design system inicial, tokens por tenant e telas-chave do MVP (assinatura, catalogo, checkout, eventos, dashboard)."

Entrega:
- Biblioteca de componentes.
- Guia visual por tema.

## Tech Lead Agent

Objetivo: decompor arquitetura em pacotes executaveis.
Prompt base:
"Defina arquitetura alvo, modulos, contratos de API e estrategia de rollout para MVP multi-tenant."

Entrega:
- Blueprint tecnico.
- ADRs de decisoes criticas.

## Flutter Agent

Objetivo: construir app com flavorizacao.
Prompt base:
"Implemente bootstrap de flavors com ENV/TENANT/UNIT, modularizacao por feature e base de testes de widget/integracao."

Entrega:
- App scaffold + modulos base.
- Testes automatizados mobile.

## Frontend Admin Agent

Objetivo: criar painel operacional.
Prompt base:
"Construa painel web para gestor de clube e operador de unidade, com views de estoque, pedidos, membros e eventos."

Entrega:
- Web admin MVP.
- Testes E2E do fluxo principal.

## Backend Agent

Objetivo: entregar APIs robustas.
Prompt base:
"Implemente APIs para auth, catalogo, pedidos, eventos e fidelidade, com isolamento por tenant e seguranca RBAC."

Entrega:
- APIs versionadas.
- Testes de integracao e contrato.

## DBA Agent

Objetivo: modelagem e performance de dados.
Prompt base:
"Projete schema multi-tenant, indices criticos, politicas de retencao e auditoria para operacao segura."

Entrega:
- Modelo de dados.
- Plano de tuning e observabilidade SQL.

## DevOps Agent

Objetivo: confiabilidade e deploy.
Prompt base:
"Crie pipelines CI/CD, estrategia de ambientes e observabilidade fim a fim, com alertas e rollback seguro."

Entrega:
- Pipelines e IaC.
- Runbooks de deploy/incidentes.

## QA Agent

Objetivo: qualidade continua.
Prompt base:
"Defina estrategia de testes por piramide (unitario, integracao, E2E), quality gates e criterios de release."

Entrega:
- Plano de testes.
- Automacao dos fluxos criticos.

## Cliente Simulado - Dono do clube

Objetivo: validar valor para operador.
Prompt base:
"Avalie se o sistema resolve dores de gestao (receita, estoque, equipe, eventos) e proponha ajustes de alto impacto."

Entrega:
- Feedback priorizado de negocio.

## Cliente Simulado - Membro final

Objetivo: validar experiencia de consumo.
Prompt base:
"Percorra onboarding, assinatura, compra e reserva de eventos. Identifique friccao, confianca e motivadores."

Entrega:
- Feedback de UX e confianca.

## Documentacao Agent

Objetivo: manter base viva.
Prompt base:
"Atualize documentacao tecnica e de usuario a cada release, incluindo changelog, runbooks e guias de onboarding."

Entrega:
- Base documental versionada.

---

## 4) Roteiro de execucao paralela (wave planning)

## Wave 1 - Framing
PM + PO + Requisitos + UX + Cliente Simulado.

## Wave 2 - Arquitetura
Tech Lead + Backend + DBA + DevOps + QA.

## Wave 3 - Entrega MVP
Flutter + Frontend + Backend + QA + Documentacao.

## Wave 4 - Piloto
Todos os agentes + simuladores para validacao final.

---

## 5) Cadencia de sincronizacao

- Daily por trilha (15 min).
- Sync cross-trilha 3x por semana.
- Sprint review com dono do produto e clientes simulados.
- Retro com plano de acao objetivo.
