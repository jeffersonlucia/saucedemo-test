# API e modelo de dados (DBA)

## Stack de dados

- **SGBD:** PostgreSQL 16+
- **Cache:** Redis (sessões, rate limit, filas leves)
- **Object storage:** S3-compatible (fotos de rótulos)
- **Migrations:** Flyway ou Prisma Migrate

## Modelo entidade-relacionamento (resumo)

```
tenants ──┬── units ──┬── members
          │           └── staff_assignments
          ├── subscription_plans
          ├── bottles ── inventory_movements
          └── events ── event_reservations ── tasting_notes
```

## Tabelas principais

### tenants
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | UUID PK | |
| slug | VARCHAR UNIQUE | usado no flavor / subdomain |
| name | VARCHAR | |
| branding_json | JSONB | cores, logos URLs |
| created_at | TIMESTAMPTZ | |

### units
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | UUID PK | |
| tenant_id | UUID FK | |
| name | VARCHAR | ex. "Unidade SP" |
| address | JSONB | |
| timezone | VARCHAR | America/Sao_Paulo |

### members
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | UUID PK | |
| tenant_id | UUID FK | RLS |
| unit_id | UUID FK nullable | unidade preferida |
| email | VARCHAR | |
| role | ENUM | member |
| subscription_status | ENUM | active, past_due, canceled |

### bottles
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | UUID PK | |
| tenant_id | UUID FK | |
| name | VARCHAR | |
| distillery | VARCHAR | |
| style | VARCHAR | single_malt, blend, bourbon... |
| abv | DECIMAL | |
| metadata | JSONB | país, idade, notas |

### events
| Coluna | Tipo | Notas |
|--------|------|-------|
| id | UUID PK | |
| unit_id | UUID FK | |
| title | VARCHAR | |
| starts_at | TIMESTAMPTZ | |
| capacity | INT | |
| bottle_ids | UUID[] | garrafas da degustação |

## Endpoints REST (v1) — amostra

| Método | Path | Descrição |
|--------|------|-----------|
| POST | /auth/login | Login |
| GET | /me | Perfil autenticado |
| GET | /bottles | Lista catálogo (tenant) |
| POST | /bottles | Cria garrafa (staff+) |
| POST | /inventory/movements | Movimentação |
| GET | /events | Lista eventos (filtro unit) |
| POST | /events/:id/reservations | Reserva |
| GET | /dashboard/kpis | KPIs dono |
| POST | /subscriptions/checkout | Inicia checkout |

## RLS (exemplo)

```sql
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON members
  USING (tenant_id = current_setting('app.tenant_id', true)::uuid);
```

## Índices recomendados

- `members(tenant_id, email)` UNIQUE
- `events(unit_id, starts_at)`
- `inventory_movements(bottle_id, created_at DESC)`

## Backups

- Snapshot diário PostgreSQL, retenção 30 dias
- PITR habilitado em produção
