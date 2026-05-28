# 08 — Guia de Flavorização Flutter: WhiskeyCLUB

**Responsável**: Tech Lead (agent-tl) + Flutter Devs  
**Stack**: Flutter 3.x, Dart 3.x

---

## 1. O que é Flavorização?

Flavors permitem que o mesmo código Flutter gere **múltiplas versões do app**, cada uma com:
- Nome de app diferente
- Bundle ID/Package Name diferente
- Ícone e splash screen diferentes
- Cores e tema diferente
- URL da API diferente
- App publicado separadamente nas lojas

Isso permite que cada clube tenha **seu próprio app** na App Store e no Google Play, com sua identidade visual, mas rodando o **mesmo código base**.

---

## 2. Estrutura de Arquivos por Flavor

```
android/
├── app/
│   └── src/
│       ├── main/           ← Código compartilhado
│       ├── dev/            ← Flavor: desenvolvimento
│       │   ├── res/
│       │   │   └── values/
│       │   │       └── strings.xml  ← app_name: "WhiskeyCLUB Dev"
│       │   └── google-services.json ← Firebase config dev
│       ├── clubeAlpha/     ← Flavor: Clube Alpha
│       │   ├── res/
│       │   │   ├── values/
│       │   │   │   └── strings.xml  ← app_name: "Alpha Whiskey Club"
│       │   │   └── mipmap-*/
│       │   │       └── ic_launcher.png ← Ícone do Clube Alpha
│       │   └── google-services.json ← Firebase config Clube Alpha
│       └── clubeBeta/      ← Flavor: Clube Beta
│           └── ...

ios/
├── Runner/
│   ├── Assets.xcassets/
│   │   ├── AppIcon-dev.appiconset/
│   │   ├── AppIcon-clubeAlpha.appiconset/
│   │   └── AppIcon-clubeBeta.appiconset/
│   └── GoogleService-Info-dev.plist
│   └── GoogleService-Info-clubeAlpha.plist

lib/
├── flavors/
│   ├── flavor_config.dart          ← Configurações do flavor
│   ├── main_dev.dart               ← Entry point: desenvolvimento
│   ├── main_clube_alpha.dart       ← Entry point: Clube Alpha
│   └── main_clube_beta.dart        ← Entry point: Clube Beta
```

---

## 3. Configuração por Flavor

### flavor_config.dart

```dart
import 'package:flutter/material.dart';

enum Flavor { dev, clubeAlpha, clubeBeta }

class FlavorConfig {
  final Flavor flavor;
  final String appName;
  final String apiBaseUrl;
  final String wsUrl;           // WebSocket URL
  final ColorScheme colorScheme;
  final String logoAssetPath;
  final String splashAssetPath;
  final String bundleId;

  // Feature flags
  final bool enableLoja;
  final bool enableGamificacao;
  final bool enableMultiUnidade;
  final bool enableRelatoriosAvancados;
  final bool enableApiPublica;

  // Contato e suporte
  final String supportEmail;
  final String privacyPolicyUrl;
  final String termsOfServiceUrl;

  FlavorConfig._({
    required this.flavor,
    required this.appName,
    required this.apiBaseUrl,
    required this.wsUrl,
    required this.colorScheme,
    required this.logoAssetPath,
    required this.splashAssetPath,
    required this.bundleId,
    this.enableLoja = false,
    this.enableGamificacao = true,
    this.enableMultiUnidade = false,
    this.enableRelatoriosAvancados = false,
    this.enableApiPublica = false,
    this.supportEmail = 'suporte@whiskeyclub.app',
    this.privacyPolicyUrl = 'https://whiskeyclub.app/privacy',
    this.termsOfServiceUrl = 'https://whiskeyclub.app/terms',
  });

  static FlavorConfig? _instance;

  static void initialize(FlavorConfig config) => _instance = config;

  static FlavorConfig get instance {
    assert(_instance != null, 'FlavorConfig não inicializado. Chame initialize() na main.');
    return _instance!;
  }

  bool get isDev => flavor == Flavor.dev;
  bool get isProd => flavor != Flavor.dev;
  bool get isAlpha => flavor == Flavor.clubeAlpha;
}
```

---

### main_dev.dart

```dart
import 'package:flutter/material.dart';
import 'package:whiskey_club/core/app.dart';
import 'package:whiskey_club/flavors/flavor_config.dart';

void main() {
  FlavorConfig.initialize(FlavorConfig._(
    flavor: Flavor.dev,
    appName: 'WhiskeyCLUB Dev',
    apiBaseUrl: 'http://localhost:3000/api/v1',
    wsUrl: 'ws://localhost:3000',
    bundleId: 'app.whiskeyclub.dev',
    logoAssetPath: 'assets/flavors/dev/logo.svg',
    splashAssetPath: 'assets/flavors/dev/splash.png',
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFF795548), // Brown
      brightness: Brightness.dark,
    ),
    enableLoja: true,
    enableGamificacao: true,
    enableMultiUnidade: true,
  ));

  runApp(const WhiskeyClubApp());
}
```

---

### main_clube_alpha.dart

```dart
import 'package:flutter/material.dart';
import 'package:whiskey_club/core/app.dart';
import 'package:whiskey_club/flavors/flavor_config.dart';

void main() {
  FlavorConfig.initialize(FlavorConfig._(
    flavor: Flavor.clubeAlpha,
    appName: 'Alpha Whiskey Club',
    apiBaseUrl: 'https://api.alpha.whiskeyclub.app/api/v1',
    wsUrl: 'wss://api.alpha.whiskeyclub.app',
    bundleId: 'com.whiskeyclub.alpha',
    logoAssetPath: 'assets/flavors/clube_alpha/logo.svg',
    splashAssetPath: 'assets/flavors/clube_alpha/splash.png',
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFFD4A843), // Gold/Amber
      brightness: Brightness.dark,
    ),
    enableLoja: true,
    enableGamificacao: true,
    enableMultiUnidade: false,
    supportEmail: 'contato@alphawhiskeyclub.com.br',
    privacyPolicyUrl: 'https://alphawhiskeyclub.com.br/privacidade',
    termsOfServiceUrl: 'https://alphawhiskeyclub.com.br/termos',
  ));

  runApp(const WhiskeyClubApp());
}
```

---

## 4. Configuração Android (build.gradle)

```groovy
// android/app/build.gradle
android {
    flavorDimensions "version"

    productFlavors {
        dev {
            dimension "version"
            applicationId "app.whiskeyclub.dev"
            versionNameSuffix "-dev"
            resValue "string", "app_name", "WhiskeyCLUB Dev"
        }
        clubeAlpha {
            dimension "version"
            applicationId "com.whiskeyclub.alpha"
            resValue "string", "app_name", "Alpha Whiskey Club"
        }
        clubeBeta {
            dimension "version"
            applicationId "com.whiskeyclub.beta"
            resValue "string", "app_name", "Beta Whiskey Club"
        }
    }
}
```

---

## 5. Configuração iOS (Xcode Schemes)

No Xcode, criar um Scheme por flavor:
- `WhiskeyCLUB-dev` → target: Runner, configuração: Debug-dev
- `WhiskeyCLUB-clubeAlpha` → target: Runner, configuração: Release-clubeAlpha
- `WhiskeyCLUB-clubeBeta` → target: Runner, configuração: Release-clubeBeta

Cada scheme usa o `GoogleService-Info-[flavor].plist` correspondente.

```ruby
# ios/Runner/Runner.xcodeproj/xcshareddata/xcschemes/
# Configuração via Xcode GUI ou fastlane
```

---

## 6. Comandos de Build por Flavor

```bash
# === DESENVOLVIMENTO ===
flutter run --flavor dev --target lib/flavors/main_dev.dart

# === BUILD ANDROID POR FLAVOR ===
# APK para teste
flutter build apk --flavor clubeAlpha --target lib/flavors/main_clube_alpha.dart

# App Bundle para Play Store
flutter build appbundle \
  --flavor clubeAlpha \
  --target lib/flavors/main_clube_alpha.dart \
  --release

# === BUILD iOS POR FLAVOR ===
flutter build ipa \
  --flavor clubeAlpha \
  --target lib/flavors/main_clube_alpha.dart \
  --export-options-plist ios/ExportOptions-clubeAlpha.plist

# === BUILD WEB POR FLAVOR ===
flutter build web \
  --dart-define=FLAVOR=clubeAlpha \
  --dart-define=API_URL=https://api.alpha.whiskeyclub.app/api/v1
```

---

## 7. CI/CD — GitHub Actions por Flavor

```yaml
# .github/workflows/build-flavor.yml
name: Build Flavor

on:
  workflow_dispatch:
    inputs:
      flavor:
        description: 'Flavor to build'
        required: true
        type: choice
        options: [dev, clubeAlpha, clubeBeta]
      platform:
        description: 'Platform'
        required: true
        type: choice
        options: [android, ios, web, all]

jobs:
  build-android:
    if: inputs.platform == 'android' || inputs.platform == 'all'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.19.0'

      - name: Decode Keystore
        run: |
          echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > android/app/keystore.jks

      - name: Build App Bundle
        run: |
          flutter build appbundle \
            --flavor ${{ inputs.flavor }} \
            --target lib/flavors/main_${{ inputs.flavor }}.dart \
            --release

      - name: Upload to Firebase App Distribution
        uses: wzieba/Firebase-Distribution-Github-Action@v1
        with:
          appId: ${{ secrets[format('{0}_FIREBASE_APP_ID', inputs.flavor)] }}
          serviceCredentialsFileContent: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          groups: testers
          file: build/app/outputs/bundle/${{ inputs.flavor }}Release/app-${{ inputs.flavor }}-release.aab
```

---

## 8. Adicionando um Novo Flavor (Checklist)

Quando um novo clube cliente é adquirido, siga este checklist:

### Pré-requisito: Backend
- [ ] Criar registro do clube no banco de dados
- [ ] Configurar subdomínio: `nomedoclube.whiskeyclub.app`
- [ ] Criar projeto Firebase para o novo clube
- [ ] Gerar API keys e secrets do clube

### Android
- [ ] Adicionar `productFlavor` no `build.gradle`
- [ ] Criar pasta `android/app/src/[flavorName]/res/`
- [ ] Adicionar ícone app (todos os tamanhos mipmap)
- [ ] Adicionar `google-services.json` do Firebase
- [ ] Criar conta de developer no Google Play (ou usar conta existente)

### iOS
- [ ] Criar App ID no Apple Developer Portal
- [ ] Criar Xcode Scheme e Configuration
- [ ] Adicionar `GoogleService-Info-[flavor].plist`
- [ ] Configurar provisioning profile e certificados
- [ ] Criar app no App Store Connect

### Flutter
- [ ] Criar `lib/flavors/main_[flavorName].dart`
- [ ] Adicionar assets do clube em `assets/flavors/[flavorName]/`
- [ ] Configurar cores e tema no `FlavorConfig`
- [ ] Configurar feature flags conforme plano contratado

### CI/CD
- [ ] Adicionar secrets do novo flavor no GitHub
- [ ] Testar build localmente
- [ ] Rodar pipeline de CI/CD

### Produção
- [ ] Build final assinado
- [ ] Submit para Google Play e App Store
- [ ] Aguardar aprovação (~7 dias)
- [ ] Configurar domínio e SSL
- [ ] Onboarding do dono do clube

---

## 9. Design Tokens por Flavor

Cada flavor tem seu próprio conjunto de tokens:

```dart
// shared/theme/flavor_tokens.dart
class FlavorTokens {
  final Color primaryColor;
  final Color secondaryColor;
  final Color backgroundColor;
  final Color surfaceColor;
  final Color textPrimary;
  final Color textSecondary;
  final Color accentColor;
  final String fontFamily;

  const FlavorTokens({
    required this.primaryColor,
    required this.secondaryColor,
    required this.backgroundColor,
    required this.surfaceColor,
    required this.textPrimary,
    required this.textSecondary,
    required this.accentColor,
    this.fontFamily = 'Playfair Display', // Default: elegante para whiskey
  });

  // Preset: Dark Whiskey (default)
  static const darkWhiskey = FlavorTokens(
    primaryColor: Color(0xFFD4A843),   // Amber Gold
    secondaryColor: Color(0xFF8B6914), // Deep Amber
    backgroundColor: Color(0xFF1A1A1A),// Quase Preto
    surfaceColor: Color(0xFF2C2C2C),   // Cinza Escuro
    textPrimary: Color(0xFFF5F5F5),    // Branco Quente
    textSecondary: Color(0xFFAAAAAA),  // Cinza Claro
    accentColor: Color(0xFFFF8C00),    // Laranja Âmbar
  );

  // Preset: Classic Light
  static const classicLight = FlavorTokens(
    primaryColor: Color(0xFF6B3E2E),   // Whiskey Brown
    secondaryColor: Color(0xFFA0522D), // Sienna
    backgroundColor: Color(0xFFFAF7F2),// Creme
    surfaceColor: Color(0xFFFFFFFF),   // Branco
    textPrimary: Color(0xFF1A1A1A),    // Quase Preto
    textSecondary: Color(0xFF666666),  // Cinza
    accentColor: Color(0xFFD4A843),    // Âmbar
  );
}
```

---

*Documento mantido pelo Tech Lead (agent-tl). Versão 1.0.*
