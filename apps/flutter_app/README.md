# Whiskey Club OS Flutter App

Skeleton manual do app Flutter unico para o MVP Bar do Jao.

## Modos

- Admin: dashboard, membros, planos, eventos e configuracoes.
- Staff: check-in e busca rapida.
- Membro: home, eventos, carteirinha, beneficios e perfil.
- Web: mesmo app, com layout responsivo priorizando admin.

## Observacao de ambiente

Flutter nao esta instalado na maquina atual, entao este skeleton ainda nao foi gerado com `flutter create` nem validado com `flutter analyze`.

Quando Flutter estiver disponivel:

```bash
cd apps/flutter_app
flutter pub get
flutter run -d chrome --dart-define=APP_CONFIG=flavors/bar_do_jao_staging.json
```

## Proximo passo tecnico

Rodar `flutter create .` dentro desta pasta preservando `lib/`, `pubspec.yaml` e `flavors/`, depois ajustar plataformas web/android/ios.
