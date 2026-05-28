# 07 — Operação

## Rituais (cadência)

Ver detalhes em [`planning/team/team-structure.md`](../team/team-structure.md#rituais).

## Database — Sim Reports

Validações dos Cliente-Sim antes de aceite.

| Propriedade | Tipo |
|---|---|
| História | Relation → Histórias |
| Persona | Select (Dono / Sócio Premium / Sócio Aspiracional) |
| Cenário | Texto |
| Resultado esperado | Texto |
| Resultado obtido | Texto |
| Fricção (0–5) | Number |
| Decisão | Select (Aceitar / Refazer / Nova história) |
| Link evidência | URL |
| Data | Date |

## Database — Incidentes

| Propriedade | Tipo |
|---|---|
| Título | Título |
| Severidade | Select (Sev1 / Sev2 / Sev3) |
| Status | Select (Aberto / Mitigado / Resolvido / Postmortem) |
| Descobertor | Person/Tag |
| On-call | Person |
| Início / Fim | Date range |
| Postmortem | URL |
| Root cause | Texto |
| Action items | Multi-relation → Tasks |

## Runbooks (linkar)

- Deploy / rollback backend
- Rotação de segredo
- Provisionamento de novo flavor
- Recuperação de PG (PITR)
- Tratamento de webhook de cobrança falhada

## On-call

- Rotação semanal entre DevOps + Tech Lead.
- Pager: PagerDuty (futuro: Better Stack).
- SLO de resposta Sev1: 15 min.
