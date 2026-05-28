# Backend

## Visão geral

- **Linguagem**: TypeScript (Node 20).
- **Framework**: NestJS (modular, DI nativo, suporte a tsoa/openapi).
- **Estilo**: Clean / Hexagonal — controllers finos, use cases puros, adapters de infra.
- **Contrato**: OpenAPI 3.1 versionado, publicado como SDK consumido pelo app (gerado via openapi-generator).

## Módulos (Bounded Contexts)

| Módulo | Responsabilidade |
|---|---|
| `iam` | Auth, usuários, roles, permissões, 2FA |
| `tenants` | Clubes, unidades, configuração de flavor, feature flags |
| `membership` | Sócios, planos, ciclos de cobrança, carteirinha |
| `events` | Eventos, presenças, waitlist, check-in |
| `cellar` | Garrafas (catálogo do clube), cellar pessoal |
| `commerce` | Pedidos, ingressos, pagamentos avulsos (F2+) |
| `billing` | Cobrança recorrente, faturas, integração com gateways |
| `notifications` | Push, email, WhatsApp, inbox |
| `audit` | Audit log imutável |
| `reports` | Materializações pra dashboard |

## Multi-tenancy

- Toda tabela com dado de clube tem `tenant_id UUID NOT NULL`.
- Middleware injeta `tenant_id` no contexto a partir do JWT.
- Postgres **Row-Level Security** ligado em todas as tabelas:
  ```sql
  CREATE POLICY tenant_isolation ON members
    USING (tenant_id = current_setting('app.tenant_id')::uuid);
  ```
- Connection pool seta `SET LOCAL app.tenant_id` por request.
- Admin global (nós) usa role que bypassa RLS, com audit obrigatório.

## Padrões de API

- REST + JSON, recursos plurais.
- Versionada por path: `/v1/...`.
- Paginação cursor-based para listas grandes.
- Erros: RFC 7807 (Problem Details).
- Auth: `Authorization: Bearer <jwt>`.
- Idempotência: `Idempotency-Key` header em escritas de cobrança/inscrição.
- Rate limit por tenant + por user.

## Webhooks (out)

Para integrar clubes Enterprise com sistemas próprios:
- `member.created`, `event.checked_in`, `payment.failed`, etc.
- Assinados com HMAC (SHA-256), retry exponencial.

## Webhooks (in)

- Pagamentos (Stripe, Asaas, Pix).
- Validação de assinatura + idempotência.

## Filas e jobs

BullMQ (Redis) com filas:
- `mail` — envio de e-mail transacional.
- `push` — notificações.
- `whatsapp` — mensagens.
- `billing` — tentativas de cobrança.
- `reports` — materialização de dashboards.
- `flavors` — provisionamento de assets (gerar splash em N tamanhos, etc.).

Cron via BullMQ Repeatable Jobs.

## Caching

- Cache de leitura (catálogo de garrafas, configuração de clube) em Redis com TTL curto e **invalidation por evento** (publish/subscribe interno).
- ETag + Cache-Control em endpoints públicos (landing).

## Segurança

- Helmet, CORS por tenant, CSRF onde aplicável.
- Senhas com Argon2id.
- Tokens JWT curtos (15min) + refresh tokens revogáveis.
- Rotação de chave de assinatura.
- Dependabot + scan SAST em CI.

## Observabilidade

- Logger Pino estruturado com `trace_id`, `tenant_id`, `user_id`.
- OpenTelemetry SDK plugado no Nest (auto-instrumentation de HTTP, Postgres, Redis).
- Métricas Prometheus expostas em `/metrics` (interna).
- Health checks `/health` (liveness) e `/ready` (readiness, checa DB + Redis).
