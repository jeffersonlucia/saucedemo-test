# Backlog — Épicos e histórias de usuário

Formato para importação no Notion (ver `notion/csv/stories.csv`).

---

## Épico E1 — Fundação e flavors
**Objetivo:** Repo Flutter + API + CI com 2 flavors piloto.

| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-1.1 | Como dev, quero flavors `client_a` e `client_a_sp` para builds isolados | 5 | RF-001 |
| US-1.2 | Como admin plataforma, quero cadastrar tenant com domínio e tema | 8 | RF-001 |
| US-1.3 | Como dev, quero injetar config por flavor em runtime (API URL, cores) | 5 | RF-001 |

## Épico E2 — Autenticação
| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-2.1 | Como membro, quero criar conta e fazer login | 5 | RF-002 |
| US-2.2 | Como dono, quero convidar staff por e-mail | 5 | RF-002 |
| US-2.3 | Como sistema, quero aplicar RBAC por unidade | 8 | RF-002 |

## Épico E3 — Catálogo e estoque
| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-3.1 | Como staff, quero cadastrar garrafa com atributos whiskey | 5 | RF-003 |
| US-3.2 | Como staff, quero registrar entrada/saída de estoque | 8 | RF-003 |
| US-3.3 | Como dono, quero ver alertas de estoque baixo | 3 | RF-003 |

## Épico E4 — Eventos
| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-4.1 | Como dono, quero criar evento com capacidade e garrafas | 8 | RF-004 |
| US-4.2 | Como membro, quero reservar vaga em evento | 5 | RF-004 |
| US-4.3 | Como membro, quero registrar notas após degustação | 5 | RF-004 |

## Épico E5 — Assinaturas
| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-5.1 | Como dono, quero configurar planos Silver/Gold | 5 | RF-005 |
| US-5.2 | Como membro, quero assinar e pagar mensalmente | 13 | RF-005 |
| US-5.3 | Como membro, quero cancelar ou trocar de plano | 8 | RF-005 |

## Épico E6 — Dashboard e relatórios
| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-6.1 | Como dono, quero dashboard com KPIs principais | 8 | RF-007 |
| US-6.2 | Como dono, quero exportar membros e eventos em CSV | 5 | RF-007 |

## Épico E7 — Qualidade e lançamento
| ID | História | Pontos | RF |
|----|----------|--------|-----|
| US-7.1 | Como QA, quero suite E2E crítica (login, reserva, estoque) | 8 | — |
| US-7.2 | Como devops, quero pipeline deploy staging/prod | 8 | RNF |
| US-7.3 | Como membro, quero receber push de lembrete de evento | 5 | RF-008 |

---

## Priorização MVP (ordem sugerida)

1. E1 → E2 → E3 → E4 → E5 (parcial US-5.2) → E6 (US-6.1) → E7

## Definição de Pronto (DoD) — história

- [ ] Código revisado (PR aprovado)
- [ ] Testes unitários / integração conforme pirâmide
- [ ] Documentação técnica atualizada se API mudou
- [ ] Critérios de aceite validados pelo agente QA ou PO
- [ ] Sem regressão em flavors piloto
