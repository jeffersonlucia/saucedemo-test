# Estratégia de Testes

## Pirâmide

```
        /-\
       /E2E\     ← poucos, fluxos críticos, em todos flavors do MVP
      /-----\
     /  API  \   ← integração backend (supertest), webhooks
    /---------\
   / Component \ ← widget tests Flutter, integração de service
  /-------------\
 /     Unit      \← maior volume, use cases, mappers, regras
/-----------------\
```

## Tipos e responsáveis

| Tipo | Tooling | Quem escreve | Onde roda |
|---|---|---|---|
| Unit backend | Vitest | Dev Back + agente QA | CI |
| Integração backend | Vitest + supertest + testcontainers (PG/Redis) | Dev Back | CI |
| Unit Flutter | flutter_test + mocktail | Dev Front | CI |
| Widget Flutter | flutter_test | Dev Front | CI |
| Golden por flavor | flutter_test | Dev UI + agente UI | CI |
| Integration Flutter | integration_test + patrol | QA Automation | CI nightly |
| E2E web (PWA + backoffice) | Playwright | QA Automation | CI |
| Contract | Schemathesis sobre OpenAPI | Back + QA | CI |
| Load | k6 | DevOps + Back | manual/release |
| Acessibilidade | axe-core (web), Flutter `SemanticsTester` | QA + Designer | CI |
| Segurança | Trivy (imagens), npm audit, gitleaks | DevOps | CI |
| Visual regression mobile | golden + Chromatic-like setup | UI + QA | PR |
| Exploratório | Sessões 1×/semana | Time + agente Cliente-Sim | Manual |

## Gates por release

- Cobertura backend ≥ 70%, app ≥ 60%.
- Todos os fluxos críticos com E2E verde.
- Zero CVE crítico nas imagens.
- Smoke test em prod logo após deploy (15 cenários, < 5 min).

## Ambientes de teste

- **CI**: containers efêmeros.
- **Sandbox cliente**: tenant de demo em prod, povoado por seeder, usado para demos e exploratório.

## Test data

- Faker BR (CPF/CNPJ válido sintético, endereços, nomes).
- Cellar inicial com 50 garrafas de referência (público), reusada entre testes.
- Reseed automatizado em dev/staging por job noturno.

## Bug taxonomy

`Sev1` (caiu, perde dado, vaza dado) → fix em ≤ 4h, postmortem.
`Sev2` (feature core quebrada, workaround custoso) → ≤ 2 dias.
`Sev3` (cosmético, baixa frequência) → backlog priorizado.

## Critérios de aceite (formato)

Toda história usa:
```
Dado <contexto>
Quando <ação>
Então <resultado observável>
E <efeito colateral verificável>
```
Cada critério é coberto por **ao menos um teste automatizado**.
