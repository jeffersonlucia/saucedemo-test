# Workflows Canônicos

Fluxos repetíveis. Sempre que um trabalho cai em uma dessas categorias, segue o playbook.

## W1 — Feature nova (do zero ao prod)

1. **Discovery** (PM + PO + BA + UX + Cliente-Sim Dono)
   - Brief → personas → jornadas → critérios.
2. **Design** (UX → UI)
   - Wireframe → mocks → handoff visual.
3. **Arquitetura** (Tech Lead + Back + DBA + DevOps)
   - ADR se necessário, definição de contratos, dados, infra.
4. **Implementação** (Back + Front + DBA, paralelos)
   - PRs pequenos, behind feature flag.
5. **QA** (QA Automation)
   - Automatiza critérios; libera gate.
6. **Validação** (Cliente-Sim Dono + Cliente-Sim Sócio)
   - Joga jornada real em staging; reporta achados.
7. **Documentação** (Tech Writer)
   - Doc técnica + doc de usuário.
8. **Release** (DevOps + Tech Lead, com aprovação PM + humano)
   - Habilita flag gradualmente.
9. **Métricas** (PM + DevOps)
   - Observa dashboards de adoção e saúde por 7 dias.

## W2 — Bug em produção

1. **Triage** (DevOps + Tech Lead) → severidade.
2. **Sev1**: incident response: corrigir > comunicar > postmortem.
3. **Sev2/3**: vira história priorizada por PO.
4. **Cliente-Sim** reproduz após fix em staging.
5. **Postmortem** (Tech Lead + envolvidos) com lição → adicionada ao Notion.

## W3 — Provisionamento de novo flavor (clube novo)

1. **Sales/PM** registra contrato.
2. **PM → DevOps**: ticket de provisionamento.
3. **UI**: kit de marca → assets.
4. **DevOps**: roda `tools/new_flavor.dart`, configura stores.
5. **QA**: smoke matrix.
6. **Cliente-Sim Dono** (do clube novo) faz tour.
7. **PM → cliente real**: handoff.

## W4 — Refatoração / dívida técnica

1. **Tech Lead** propõe ADR ou ticket de "tech debt".
2. **PM** orça impacto.
3. **PO** prioriza vs. features novas (% por sprint).
4. **Implementação** sem feature funcional nova, com plano de regressão.
5. **QA** garante regressão zero.

## W5 — Mudança de regulação / compliance

1. **BA + Tech Lead** levantam impacto.
2. **PM** decide janela.
3. Workflow vira W1 para implementar mudanças.
4. **Tech Writer** atualiza políticas brandadas por clube.

## W6 — Onboarding de novo agente (humano ou IA) no time

1. Lê `README.md`, `docs/00-vision-and-strategy.md`, persona dele.
2. Pareia com um par sênior por 1 ciclo (shadow).
3. Pega 1 task simples sob revisão dupla.
4. Vira regular a partir da próxima.

## W7 — Ritual semanal de "health check"

Toda semana, async, no Notion:
- **PM**: status do roadmap (RAG por épico).
- **Tech Lead**: dívida técnica + risks.
- **DevOps**: SLOs do período.
- **QA**: flaky tests + cobertura.
- **Cliente-Sim**: top 3 fricções percebidas.
- **PM** consolida em "Weekly Pulse" e compartilha com sponsor.
