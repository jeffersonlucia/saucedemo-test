# Flavorização (White-label)

Estratégia para entregar **N apps de marca diferente a partir de um único codebase Flutter**.

## Dimensões da flavorização

| Dimensão | Onde mora | Mutável em runtime? |
|---|---|---|
| **Branding visual** (logo, paleta, fonte, splash, icon) | Assets por flavor + theme | Não (precisa rebuild) |
| **Copy / tone of voice** | `flavor.json` + i18n | Sim |
| **Bundle id / app name / scheme** | `pubspec` flavors + xcconfig/build.gradle | Não |
| **Feature flags por clube** | API (Unleash) | Sim |
| **Configuração funcional** (plano, regras de cancelamento, % serviço) | Backend (`/clubs/:id/config`) | Sim |
| **Domínios públicos** (landing) | Config + DNS | Não |

## Princípio de ouro

> Tudo o que muda **só por marca** = configuração.
> Tudo o que muda **por comportamento de produto** = feature flag.
> Nada de `if (flavor == 'X')` espalhado pelo código. CI bloqueia isso por lint.

## Build flavors do Flutter

Definidos em:

**`android/app/build.gradle`**
```groovy
flavorDimensions "club"
productFlavors {
    clube_demo    { dimension "club"; applicationId "com.whiskeyclub.demo" }
    clube_piloto  { dimension "club"; applicationId "com.clubepiloto.app" }
}
```

**`ios/Runner.xcodeproj`**: schemes `clube_demo`, `clube_piloto`, com xcconfig por flavor (bundle id, display name, ícone).

**Comando de build**
```bash
flutter build apk --flavor clube_demo --dart-define=FLAVOR=clube_demo -t lib/main_clube_demo.dart
```

## Provisionamento de um novo flavor

Hoje (Fase 1) é um **processo semi-automatizado** rodado pelo DevOps + agente de provisioning:

1. Cliente fecha contrato → PM cria ticket "novo flavor".
2. Designer entrega kit (logo SVG, paleta, fonte, ícone, splash).
3. Script `tools/new_flavor.dart <slug>` gera:
   - `lib/main_<slug>.dart`
   - `lib/flavor/flavors/<slug>/flavor.json`
   - pasta de assets
   - entradas no `build.gradle`, xcconfig e schemes (via xcodeproj-rb)
4. DevOps cria conta Apple/Google do clube (ou usa a nossa "managed publisher account" se ele optar pelo plano Boutique).
5. CI roda matrix com o novo flavor e publica em TestFlight/Internal.
6. Smoke test automatizado contra o novo flavor (golden tests verificam que logo e cor mudaram).
7. Submissão para stores.

**Meta de Fase 2**: provisionamento em 1 clique a partir do backoffice (admin global).

## Estrutura de `flavor.json`

```json
{
  "slug": "clube_demo",
  "displayName": "Clube Whiskey Demo",
  "primaryColor": "#1a1a1a",
  "secondaryColor": "#c0a062",
  "fontFamily": "PlayfairDisplay",
  "logoAsset": "assets/logo.svg",
  "splashAsset": "assets/splash.png",
  "appIconAsset": "assets/icon.png",
  "domain": "demo.whiskeyclub.app",
  "supportEmail": "contato@demo.whiskeyclub.app",
  "copy": {
    "memberLabel": "Sócio",
    "memberLabelPlural": "Sócios",
    "tasting": "Degustação",
    "welcomeTitle": "Bem-vindo ao seu clube"
  },
  "tenantId": "uuid-do-clube-no-backend",
  "apiBaseUrl": "https://api.whiskeyclub.app/v1"
}
```

## Web (PWA)

- Não usa flavor de build. Detecta o clube via:
  1. Subdomínio (`clube-piloto.whiskeyclub.app`) →
  2. Backend devolve `flavor.json` ao iniciar.
- App injeta o tema dinamicamente. Performance OK porque é só JSON + assets remotos.

## Backoffice

- Single app. O usuário escolhe (ou tem default) o clube e a unidade.
- Pode operar como **admin global** (nós) ou **admin do clube** (Ricardo).

## Risk control

- **Lint custom** (`dart_code_metrics` + regra própria) proíbe:
  - Strings hardcoded user-facing fora de i18n.
  - `if (flavor == ...)` em código de feature.
  - Cores hardcoded fora do design system.
- **CI matrix** roda golden tests em **todos** os flavors a cada PR.
- **Smoke E2E** no flavor demo + 1 flavor real em produção, todo merge.
