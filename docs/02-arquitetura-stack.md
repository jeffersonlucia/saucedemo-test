# 02 - Arquitetura e stack

## Direcao tecnica

Arquitetura recomendada: Flutter para apps mobile e web, backend modular API-first, banco relacional multi-tenant e infraestrutura cloud com CI/CD desde o inicio.

## Stack recomendada

| Camada | Escolha recomendada | Motivo |
| --- | --- | --- |
| Mobile/B2C | Flutter | Base unica iOS/Android, boa experiencia visual e flavorizacao madura |
| Admin web | Flutter Web no MVP ou Next.js em fase posterior | Reuso rapido no MVP; Next.js se o admin crescer muito |
| Backend | NestJS ou FastAPI | APIs modulares, produtividade, testes e boa integracao com OpenAPI |
| Banco | PostgreSQL | Modelo relacional, multi-tenant, consistencia para assinaturas/estoque |
| Cache/filas | Redis + BullMQ/Celery | Jobs, notificacoes, emails e processamento assinc |
| Storage | S3 compativel | Logos, documentos, imagens de rotulos |
| Auth | Auth propria com JWT + refresh ou Supabase/Auth0 | Controle B2B e RBAC; avaliar custo e velocidade |
| Push | Firebase Cloud Messaging | Padrao para Flutter |
| Analytics | PostHog ou Firebase Analytics | Produto e funis |
| Observabilidade | Sentry + OpenTelemetry | Erros, tracing e performance |
| CI/CD | GitHub Actions | Simples, integrado ao repositorio |
| IaC | Terraform em fase posterior | Reprodutibilidade de ambientes |

## Visao macro

```text
Flutter App/Admin
  |
  | HTTPS + JWT
  v
API Gateway / Backend Modular
  |
  |-- Auth/RBAC
  |-- Tenants/Units
  |-- Members/Subscriptions
  |-- Events/Reservations
  |-- Inventory
  |-- Notifications
  |-- Billing
  |
  +--> PostgreSQL
  +--> Redis/Queue
  +--> Object Storage
  +--> Payment Gateway
  +--> FCM/Email/SMS
```

## Modulos backend

1. Identity: usuarios, sessoes, roles e permissoes.
2. Tenant: clientes, unidades, configuracoes e branding.
3. Members: membros, perfis, tags e preferencias.
4. Plans: planos, beneficios e assinaturas.
5. Events: eventos, degustacoes, reservas e check-in.
6. Inventory: rotulos, garrafas, estoque e movimentacoes.
7. Notifications: push, email, templates e campanhas.
8. Billing: cobrancas, invoices e webhooks de pagamento.
9. Audit: logs de acoes sensiveis.
10. Reporting: dashboards e metricas.

## Modelo multi-tenant

Recomendacao inicial: banco compartilhado com coluna `tenant_id` obrigatoria nas tabelas de negocio.

Vantagens:

- Menor custo operacional no MVP.
- Facilidade para relatorios agregados.
- Menos complexidade de provisioning.

Cuidados:

- Middleware obrigatorio de tenant no backend.
- Testes de isolamento de dados.
- Indices compostos com tenant_id.
- Auditoria de queries sensiveis.

Evolucao possivel:

- Separar schema ou banco para clientes enterprise.
- Criptografia por tenant em dados sensiveis.
- Apps white-label publicados separadamente.

## Ambientes

| Ambiente | Uso |
| --- | --- |
| local | Desenvolvimento de cada agente/dev |
| dev | Integracao continua de features |
| staging | Validacao com clientes piloto e QA |
| production | Clientes reais |

## Padroes de API

- REST com OpenAPI no MVP.
- DTOs versionados.
- Erros padronizados: code, message, details, correlation_id.
- Paginacao cursor ou page/limit conforme consulta.
- Idempotencia em webhooks e pagamentos.
- Webhooks assinados para gateways.

## Estrategia de app Flutter

- Monorepo futuro com `apps/member_app`, `apps/admin_app`, `packages/design_system`, `packages/core`.
- Clean Architecture pragmatico: presentation, application, domain, data.
- State management: Riverpod ou Bloc. Recomendada: Riverpod pela produtividade.
- Rotas: GoRouter.
- HTTP: Dio.
- Modelos: freezed/json_serializable.
- Testes: flutter_test, mocktail, golden tests para design system.
- Flavorizacao: dart-define, config JSON por tenant/flavor, assets por cliente.

## Estrategia DevOps

- CI em pull request: lint, format check, testes unitarios, build smoke.
- CD para staging em merge na branch principal.
- Deploy backend containerizado.
- Migrations versionadas.
- Seeds de dados para demos.
- Feature flags por tenant.

## Primeira arquitetura minima viavel

Para acelerar validacao:

1. Flutter app unico com modo member e admin basico.
2. Backend NestJS/FastAPI com PostgreSQL.
3. Auth JWT.
4. Deploy staging em cloud gerenciada.
5. Notificacoes via FCM apenas depois do fluxo de reserva/check-in.
6. Pagamento simulado primeiro, gateway real depois.

## Riscos tecnicos

| Risco | Mitigacao |
| --- | --- |
| Vazamento entre tenants | Middleware, RLS opcional no Postgres, testes automatizados |
| Flavorizacao virar fork por cliente | Configuracao declarativa e design system comum |
| Admin Flutter Web nao atender operacao | Validar com dono/gerente cedo; migrar admin para web dedicado se necessario |
| Estoque complexo demais | MVP com movimentacao simples e evolucao para dose/custo |
| Pagamentos e inadimplencia | Modelar assinaturas de forma independente do gateway |
| Multi-agentes conflitarem | Contratos de API, ADRs, ownership por modulo e PRs pequenos |
