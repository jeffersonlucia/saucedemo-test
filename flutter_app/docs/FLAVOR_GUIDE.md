# Flutter Flavor Guide — WhiskeyCLUB

Guia prático para criar e configurar um novo flavor para um clube cliente.

## Checklist Rápido

### 1. Backend
- [ ] Criar registro do clube: `POST /admin/clubs`
- [ ] Configurar domínio: `nomedoclube.whiskeyclub.app`
- [ ] Criar projeto Firebase para o clube
- [ ] Obter credenciais do gateway de pagamento

### 2. Flutter
- [ ] Criar `lib/flavors/main_[clube].dart`
- [ ] Adicionar assets em `assets/flavors/[clube]/` (logo.svg, splash.png)
- [ ] Configurar `FlavorConfig` com cores, URL e feature flags

### 3. Android
- [ ] Adicionar `productFlavor` no `android/app/build.gradle`
- [ ] Criar pasta `android/app/src/[clube]/res/mipmap-*/` com ícones
- [ ] Adicionar `google-services.json` do Firebase do clube

### 4. iOS
- [ ] Criar App ID no Apple Developer
- [ ] Criar Scheme no Xcode
- [ ] Adicionar `GoogleService-Info-[clube].plist`
- [ ] Configurar provisioning profile

### 5. CI/CD
- [ ] Adicionar GitHub Secrets para o novo clube
- [ ] Testar build localmente
- [ ] Push para branch → CI executa

## Comandos de Build

```bash
# Android APK (teste)
flutter build apk --flavor [clube] --target lib/flavors/main_[clube].dart

# Android AAB (Play Store)
flutter build appbundle --flavor [clube] --target lib/flavors/main_[clube].dart --release

# iOS IPA
flutter build ipa --flavor [clube] --target lib/flavors/main_[clube].dart --release

# Web
flutter build web --dart-define=FLAVOR=[clube]
```

Consulte `docs/08_FLUTTER_FLAVORS.md` para documentação completa.
