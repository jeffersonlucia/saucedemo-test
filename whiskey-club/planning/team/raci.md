# Matriz RACI

> R = Responsible (faz) · A = Accountable (responde por) · C = Consulted · I = Informed

| Atividade | PM | PO | BA | Tech Lead | UX | UI | Back | FE | DBA | DevOps | QA | TW | ClienteSim |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Visão & Estratégia | A/R | C | C | C | C | I | I | I | I | I | I | I | C |
| Roadmap & Priorização | A/R | R | C | C | I | I | C | C | I | I | I | I | C |
| Refinamento de história | A | R | R | C | C | C | C | C | C | I | C | I | C |
| ADR | I | I | I | A/R | C | I | C | C | C | C | C | I | — |
| Modelagem de dados | I | C | C | C | — | — | R | I | A/R | C | C | I | — |
| Design (jornada, IA) | I | C | I | C | A/R | C | I | C | I | I | I | I | C |
| Design (visual, DS) | I | C | I | C | C | A/R | I | C | I | I | I | I | — |
| Implementação Back | I | I | I | C | I | I | A/R | C | C | C | C | I | — |
| Implementação Front | I | I | I | C | I | C | C | A/R | I | I | C | I | — |
| Pipeline CI/CD | I | I | I | C | I | I | C | C | I | A/R | C | I | — |
| Estratégia de testes | I | C | I | C | I | I | C | C | C | C | A/R | I | C |
| Release / Deploy prod | A | C | I | C | I | I | C | C | C | R | C | I | — |
| Documentação técnica | I | I | C | C | I | I | C | C | C | C | C | A/R | — |
| Documentação de usuário | I | C | C | I | C | C | I | I | I | I | I | A/R | C |
| Comunicação a clientes (clube) | A/R | C | I | I | I | I | I | I | I | I | I | C | — |
| Simulação de aceite | C | C | I | I | C | C | I | I | I | I | C | I | A/R |
| On-call incidente | A | I | I | C | I | I | C | C | C | R | C | I | — |
| LGPD/compliance | A | C | R | C | I | I | C | C | C | C | C | C | — |

**Regra de ouro**: cada atividade tem **um único A**. R pode ser múltiplo.
