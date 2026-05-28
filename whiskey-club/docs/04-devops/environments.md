# Ambientes

| Ambiente | Propósito | Dados | URL backend | App / build |
|---|---|---|---|---|
| **local** | Dev na máquina | seed mínimo | `http://localhost:3000` | flavor `clube_demo` |
| **dev** | Integração contínua | fake data, reset diário | `dev-api.whiskeyclub.app` | builds internos |
| **staging** | Pré-produção, espelho de prod | dump anonimizado de prod | `staging-api.whiskeyclub.app` | TestFlight + Internal Track |
| **prod** | Produção | dados reais | `api.whiskeyclub.app` | App Store + Play Store, por flavor |
| **sandbox-cliente** | Demo pra prospects | dados fictícios | mesmo prod, tenant separado | flavor `clube_demo` |

## Provisionamento

- IaC com Terraform em `infra/terraform/`.
- Estado remoto em S3 + lock em DynamoDB (ou GCS + Firestore).
- Workspaces por ambiente.

## Secrets

- **Doppler** ou **AWS Secrets Manager** como source of truth.
- Sync automático para o runtime via sidecar/init.
- Rotação semestral mínima.
- Cada flavor tem set próprio de secrets (push, payment).

## Recursos por ambiente (F1)

| Recurso | dev | staging | prod |
|---|---|---|---|
| Backend (Render service) | 1× 0.5 CPU | 2× 0.5 CPU | 2× 1 CPU autoscale 2-6 |
| Postgres | 1GB | 4GB | 16GB com réplica de leitura |
| Redis | 256MB | 512MB | 1GB |
| Workers | 1 | 1 | 2 autoscale 2-4 |

## Migração de schema

- `prisma migrate` (ou `kysely` + `node-pg-migrate`).
- **Forward only**, com janela de compatibilidade (n e n-1).
- Migrations rodam em job dedicado **antes** do rollout do app.

## Promoção entre ambientes

`dev` → `staging` → `prod`, sempre via merge na branch `main` + tag semver.
Hotfix: branch `hotfix/*` direto pra `prod`, com cherry-pick para `main`.
