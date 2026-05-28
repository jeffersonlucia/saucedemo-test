# Whiskey Club OS — Flutter App

Esqueleto para implementação na **Fase 1**. Ver `docs/04-ARQUITETURA-FLAVORS.md`.

## Pré-requisitos

- Flutter SDK 3.24+
- `flutter_flavorizr` (dev dependency, a adicionar)

## Flavors planejados

| Flavor | Tenant | Unidade |
|--------|--------|---------|
| `client_a` | clube-malte | — |
| `client_a_sp` | clube-malte | sp |
| `client_b` | highland-society | curitiba |

## Inicializar projeto (próximo passo do agente flutter-dev)

```bash
cd app/flutter
flutter create . --org com.whiskeyclub --project-name whiskey_club_os
# Depois: configurar flavorizr conforme docs/04
```

## Build (referência)

```bash
flutter run --flavor client_a_sp \
  --dart-define=FLAVOR=client_a_sp \
  --dart-define=TENANT_SLUG=clube-malte \
  --dart-define=UNIT_ID=sp \
  --dart-define=API_BASE=https://api.staging.whiskeyclub.os/v1
```

## Estrutura alvo

```
lib/
  main.dart
  app.dart
  config/flavor_config.dart
  features/
    auth/
    events/
    inventory/
    subscriptions/
```
