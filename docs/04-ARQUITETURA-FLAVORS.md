# Arquitetura e flavorização — Flutter multi-cliente/unidade

## Visão geral

```
┌─────────────────────────────────────────────────────────────┐
│                     Whiskey Club OS                          │
├──────────────┬──────────────────────┬───────────────────────┤
│ Flutter App  │   API (Backend)      │   Admin Web           │
│ (iOS/Android │   NestJS / Go        │   Flutter Web ou      │
│  + Web)      │   PostgreSQL         │   React (fase 1 web)  │
└──────┬───────┴──────────┬───────────┴───────────┬───────────┘
       │                  │                       │
       │    flavors       │  tenant_id + unit_id  │
       ▼                  ▼                       ▼
┌──────────────┐   ┌──────────────────────────────────┐
│ client_a     │   │ Row-Level Security (PostgreSQL)   │
│ client_a_sp  │   │ Schema: tenants, units, members...  │
│ client_b     │   └──────────────────────────────────┘
└──────────────┘
```

## Estratégia de flavors (Flutter)

### Dimensões

| Dimensão | Exemplo | O que muda |
|----------|---------|------------|
| **Cliente (tenant)** | `client_a` | Logo, cores, nome app, API tenant slug, bundle base |
| **Unidade** | `client_a_sp`, `client_a_rj` | Sub-branding opcional, `unit_id` default, telefone/endereço |

### Abordagem recomendada: `flutter_flavorizr` + `--dart-define`

```
app/flutter/
├── lib/
│   ├── main.dart              # entry comum
│   ├── app.dart
│   ├── config/
│   │   └── flavor_config.dart # lê String.fromEnvironment
│   └── ...
├── flavors/
│   ├── client_a/
│   │   ├── app_icon/
│   │   └── env.json
│   └── client_a_sp/
│       └── env.json
├── android/app/src/
│   ├── client_a/
│   └── client_a_sp/
└── ios/Flutter/
    └── *.xcconfig por flavor
```

### Comandos de build (referência)

```bash
# Cliente A — app geral da marca
flutter build apk --flavor client_a -t lib/main.dart \
  --dart-define=FLAVOR=client_a \
  --dart-define=TENANT_SLUG=clube-malte \
  --dart-define=API_BASE=https://api.whiskeyclub.os/v1

# Unidade SP — mesma marca, unidade default
flutter build apk --flavor client_a_sp -t lib/main.dart \
  --dart-define=FLAVOR=client_a_sp \
  --dart-define=TENANT_SLUG=clube-malte \
  --dart-define=UNIT_ID=unit-sp \
  --dart-define=API_BASE=https://api.whiskeyclub.os/v1
```

### Config em runtime

```dart
class FlavorConfig {
  final String tenantSlug;
  final String? defaultUnitId;
  final String apiBaseUrl;
  final ThemeData theme;

  static FlavorConfig fromEnvironment() {
    return FlavorConfig(
      tenantSlug: const String.fromEnvironment('TENANT_SLUG'),
      defaultUnitId: const String.fromEnvironment('UNIT_ID', defaultValue: ''),
      apiBaseUrl: const String.fromEnvironment('API_BASE'),
      theme: ThemeData(/* cores por flavor */),
    );
  }
}
```

## Backend multi-tenant

- Header `X-Tenant-Id` + JWT com claims `tenant_id`, `unit_ids[]`, `role`
- PostgreSQL RLS: `USING (tenant_id = current_setting('app.tenant_id')::uuid)`
- Tabela `tenant_branding` para white-label dinâmico (futuro: sem rebuild)

## Feature flags

- **Estáticas:** compile-time por flavor (módulo leilão on/off)
- **Dinâmicas:** LaunchDarkly / Flagsmith / tabela `feature_flags` (Should)

## Segurança

- Secrets por flavor apenas em CI (GitHub Actions secrets `CLIENT_A_KEYSTORE`)
- Nunca commitar `env.json` com chaves reais — usar `.example`

## Decisões arquiteturais (ADRs pendentes)

| ADR | Decisão | Status |
|-----|---------|--------|
| ADR-001 | Flutter único codebase mobile + web | Proposto |
| ADR-002 | API em NestJS (TypeScript) alinhado ao time | Proposto |
| ADR-003 | PostgreSQL + RLS para multi-tenant | Proposto |
| ADR-004 | BLoC ou Riverpod para estado | A definir com Tech Lead |
