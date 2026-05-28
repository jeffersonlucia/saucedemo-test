import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/config/app_config.dart';
import '../core/routing/app_router.dart';
import '../core/theme/app_theme.dart';

final appConfigProvider = Provider<AppConfig>((ref) {
  return AppConfig.barDoJaoStaging();
});

class WhiskeyClubApp extends ConsumerWidget {
  const WhiskeyClubApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final config = ref.watch(appConfigProvider);
    final router = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: config.brand.displayName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.fromBrand(config.brand),
      routerConfig: router,
    );
  }
}
