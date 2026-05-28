# 07 - QA, DevOps, dados e seguranca

## Decisao atual para o MVP Bar do Jao

- PostgreSQL compartilhado com `tenant_id` obrigatorio.
- Entidades P0: tenants, units, brand configs, feature flags, users, memberships, refresh tokens, members, tags, plans, benefits, subscriptions, events, reservations, checkins e audit_logs.
- Entidades P1: estoque basico e notificacoes.
- Testes obrigatorios: login, RBAC, reserva, check-in, concorrencia de capacidade e cross-tenant.
- Release piloto exige seed `bar-do-jao`, logs, backup, runbook e smoke test.

## Estrategia de qualidade

### Piramide de testes

| Nivel | Escopo | Dono |
| --- | --- | --- |
| Unitarios | Regras de dominio, validadores, services | Backend/Flutter |
| Widget/component | Componentes Flutter e design system | Flutter |
| Integracao | API + banco, repositorios, auth | Backend |
| Contrato | OpenAPI, DTOs e mocks | Tech Lead/QA |
| E2E | Login, reserva, check-in, admin | QA Automation |
| Smoke | Build, healthcheck, fluxos minimos | DevOps/QA |

## Fluxos criticos para regressao

1. Login com tenant ativo.
2. Manager cadastra membro.
3. Owner cria plano.
4. Manager cria evento.
5. Membro reserva evento.
6. Staff faz check-in.
7. Estoque recebe movimentacao.
8. Dashboard exibe dados por unidade.
9. Usuario sem permissao recebe bloqueio.
10. Usuario de outro tenant nao acessa dados.

## CI/CD recomendado

### Pull request

- Verificar formatacao.
- Rodar lint.
- Rodar testes unitarios.
- Rodar testes de contrato.
- Build smoke Flutter.
- Build backend container.

### Merge na branch principal

- Deploy automatico para dev/staging.
- Aplicar migrations.
- Rodar smoke tests.
- Publicar artefatos.

### Release

- Gerar tag.
- Publicar backend.
- Gerar builds Flutter.
- Rodar regressao principal.
- Atualizar release notes.

## Ambientes e secrets

| Ambiente | Secrets |
| --- | --- |
| local | .env local sem dados reais |
| dev | credenciais de baixa criticidade |
| staging | dados parecidos com producao, anonimizados |
| production | secrets em vault/secret manager |

Nunca versionar:

- Tokens de gateway.
- Chaves FCM.
- Senhas de banco.
- Certificados.
- Dumps com dados pessoais.

## Modelo de dados inicial

Entidades principais:

- tenants
- units
- users
- tenant_memberships
- roles/permissions
- members
- plans
- plan_benefits
- subscriptions
- events
- event_allowed_plans
- reservations
- checkins
- whiskey_labels
- inventory_items
- inventory_movements
- notifications
- audit_logs

## Regras de dados multi-tenant

- Toda tabela operacional deve possuir `tenant_id`.
- Tabelas por unidade devem possuir `unit_id`.
- Indices devem comecar por `tenant_id` quando a consulta for tenant-scoped.
- IDs publicos podem usar UUID.
- Soft delete apenas quando houver necessidade de historico.
- Auditoria para mudancas em plano, assinatura, reserva, estoque e permissao.

## Exemplo de padrao de colunas

```sql
id uuid primary key,
tenant_id uuid not null,
unit_id uuid null,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
created_by uuid null,
updated_by uuid null
```

## LGPD e privacidade

- Coletar apenas dados necessarios.
- Informar finalidade no onboarding.
- Permitir exportacao de dados do membro.
- Permitir exclusao/anomizacao quando legalmente possivel.
- Separar observacoes internas de dados visiveis ao membro.
- Registrar consentimento de comunicacao.
- Manter logs de acesso a dados sensiveis.

## Seguranca

### Autenticacao

- Senhas com algoritmo forte.
- Refresh tokens rotacionaveis.
- Revogacao de sessao.
- MFA para owner/platform admin em fase posterior.

### Autorizacao

- RBAC no backend.
- Escopo por tenant e unidade.
- Testes negativos obrigatorios.
- UI nao substitui autorizacao de servidor.

### API

- Rate limit em login e endpoints publicos.
- Validacao de input.
- Sanitizacao de upload.
- CORS restrito.
- Correlation ID por request.
- Logs sem dados sensiveis.

## Observabilidade

Metricas minimas:

- Erros por endpoint.
- Latencia p95.
- Taxa de login.
- Reservas criadas.
- Check-ins realizados.
- Falhas de pagamento.
- Jobs de notificacao.
- Uso por tenant.

Alertas minimos:

- API indisponivel.
- Erro 5xx elevado.
- Fila acumulada.
- Falha em migration.
- Falha em gateway de pagamento.
- Erros mobile por release.

## Runbooks iniciais

### App nao abre para um tenant

1. Verificar status do tenant.
2. Verificar config remota de branding.
3. Verificar release/flavor.
4. Verificar erros Sentry por tenant.
5. Aplicar rollback se afetar varios clientes.

### Reserva duplicada ou capacidade excedida

1. Verificar transacao do endpoint de reserva.
2. Conferir locks/constraints.
3. Identificar reservas criadas no mesmo periodo.
4. Corrigir dados com script auditado.
5. Criar teste de concorrencia se inexistente.

### Dados de outro tenant aparecem

1. Tratar como incidente critico.
2. Bloquear endpoint ou feature.
3. Identificar query sem tenant_id.
4. Auditar acessos.
5. Corrigir, testar isolamento e notificar conforme politica legal.

## Documentacao tecnica obrigatoria

- ADRs para decisoes estruturais.
- OpenAPI sempre atualizada.
- ERD versionado.
- Guia de setup local.
- Guia de deploy.
- Guia de criacao de tenant.
- Guia de criacao de flavor.
- Guia de resposta a incidente.
