# App Flutter — Arquitetura

## Princípios

- **Clean Architecture light**: presentation → application (use cases) → domain → infra.
- **State**: Riverpod 2 (providers tipados, sem singletons globais).
- **Roteamento**: go_router com rotas declarativas; deep links por flavor.
- **HTTP**: Dio com interceptors (auth, telemetry, retry).
- **Persistência local**: Hive (preferências e cache leve) + Drift/SQLite (carteirinha offline, fila offline).
- **Tipagem**: freezed + json_serializable para modelos.

## Estrutura de pastas

```
lib/
├── main_clube_demo.dart            # entry-point flavor "demo"
├── main_clube_piloto.dart          # entry-point flavor "piloto"
├── bootstrap.dart                  # init compartilhado (DI, theming, logging)
├── core/
│   ├── http/
│   ├── auth/
│   ├── theming/
│   ├── i18n/
│   ├── analytics/
│   └── errors/
├── design_system/
│   ├── tokens/                     # tokens (cores, espacamentos, raio, fontes)
│   ├── primitives/                 # Button, Card, Tag, Avatar...
│   └── patterns/                   # EventCard, MembershipBadge, BottleCard...
├── flavor/
│   ├── flavor_config.dart          # carrega FlavorConfig (cor, copy, assets) por flavor
│   └── flavors/
│       ├── clube_demo/
│       │   ├── flavor.json
│       │   └── assets/
│       └── clube_piloto/
│           ├── flavor.json
│           └── assets/
└── features/
    ├── auth/{data,domain,application,presentation}
    ├── membership/...
    ├── events/...
    ├── cellar/...
    ├── profile/...
    └── public/...
```

## Camadas por feature

- **presentation/**: widgets, screens, controllers (Riverpod Notifiers).
- **application/**: use cases (orquestração, sem Flutter).
- **domain/**: entidades e contratos de repositórios.
- **data/**: implementações (HTTP, cache, mappers).

## Estado e navegação

- Cada feature expõe seus `Provider`s.
- `AuthState` é global, expõe `Stream<AuthStatus>`.
- `go_router` reage ao `AuthState` para redirects (login → home).

## Theming dirigido por flavor

- O `FlavorConfig` é carregado em `bootstrap.dart` antes do `runApp`.
- Lê `assets/flavor.json` do flavor atual (definido por `--dart-define=FLAVOR=clube_demo`).
- Constrói `ThemeData` (cores, fontes) e injeta no `ProviderScope`.
- Strings de copy do clube vão num `Map<String,String>` exposto via `ref.read(copyProvider)`.

## Offline

- **Carteirinha digital**: gerada localmente a partir de chave assinada pelo backend; QR rotativo via TOTP-like usando segredo do sócio (armazenado em Secure Storage).
- **Check-in offline (PDV)**: registros vão pra fila Drift; sync por background isolate quando reconecta.

## Testes

- **Unit** (use cases, mappers, controllers): `flutter_test`.
- **Widget**: golden tests por flavor (catalog em `test/goldens/<flavor>/`).
- **Integration**: `integration_test` + Patrol para fluxos críticos.
- **Mocks**: Mocktail.

## Performance

- `--obfuscate --split-debug-info` em release.
- Lazy load de features (deferred imports onde possível em web).
- Imagens via `cached_network_image` com fallback shimmer.

## Segurança

- Tokens em `flutter_secure_storage`.
- Certificate pinning configurável por flavor.
- Sem logs sensíveis em release (lint custom + interceptor sanitiza).
