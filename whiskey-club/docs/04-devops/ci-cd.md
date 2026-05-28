# CI/CD

## Pipelines

### Pipeline backend (GitHub Actions)

```
on: pull_request, push to main
jobs:
  lint:        eslint + prettier check
  typecheck:   tsc --noEmit
  test:        vitest --coverage (gate: ≥ 70%)
  build:       docker buildx (cache layers)
  contract:    valida OpenAPI gerado contra schema esperado
  e2e:         docker-compose up + supertest
  publish:    [se main] push imagem para registry
  deploy:     [se main] terraform apply (staging) → smoke → manual approve → prod
```

### Pipeline app Flutter (GitHub Actions + Codemagic)

```
on: pull_request, push to main
matrix: flavor = [clube_demo, clube_piloto]
jobs:
  format:      dart format --set-exit-if-changed
  analyze:     flutter analyze (gate: 0 warnings)
  lint_custom: custom_lint (regras anti-flavor-hardcode)
  test_unit:   flutter test --coverage (gate: ≥ 60%)
  test_golden: por flavor, em CI
  build_apk:   apk debug por flavor (smoke)
  [main]
  build_release_android: AAB assinado por flavor (Codemagic)
  build_release_ios:     IPA assinado por flavor (Codemagic)
  publish:     internal track + TestFlight
```

### Pipeline de release stores

Trigger manual via tag `release/<flavor>/<semver>`:
- Promove o último build verde para "Production" no Play (release gradual 10/50/100).
- Submete pra App Review na App Store.
- Cria release notes a partir dos commits convencionais.

## Convenções

- **Conventional Commits** (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `perf`).
- **Semantic versioning** por flavor.
- **Trunk-based** com branches curtas, feature flags pra coisa em construção.
- PR sem testes não merge. PR sem reviewer humano + reviewer-agente (`agents/personas/qa-automation.md`) não merge.

## Quality Gates

| Gate | Onde | Quem bloqueia |
|---|---|---|
| Cobertura mínima | CI | Tech Lead (regra automática) |
| OpenAPI sem breaking change não documentado | CI | Agente Back |
| Golden test passa em todos os flavors | CI | Agente UI |
| LGPD impact review | PR template checkbox | PM + Tech Lead |
| Sem `TODO`/`FIXME` novos em prod | Lint custom | Tech Lead |

## Rollbacks

- Backend: rollback de imagem (Render/K8s) é 1 clique; migrations forward-only com janela de compat impedem corromper dado.
- App: release gradual no Play permite halt; iOS sem rollback nativo, use phased release e force_upgrade flag servida pelo backend.
