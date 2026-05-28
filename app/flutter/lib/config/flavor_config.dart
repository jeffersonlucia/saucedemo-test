import 'package:flutter/material.dart';

/// Configuração injetada via --dart-define (ver docs/04-ARQUITETURA-FLAVORS.md).
class FlavorConfig {
  const FlavorConfig({
    required this.flavor,
    required this.tenantSlug,
    required this.apiBaseUrl,
    this.defaultUnitId,
    this.appName = 'Whiskey Club',
  });

  final String flavor;
  final String tenantSlug;
  final String apiBaseUrl;
  final String? defaultUnitId;
  final String appName;

  static FlavorConfig fromEnvironment() {
    const flavor = String.fromEnvironment('FLAVOR', defaultValue: 'client_a');
    const tenantSlug = String.fromEnvironment('TENANT_SLUG', defaultValue: 'demo');
    const apiBase = String.fromEnvironment(
      'API_BASE',
      defaultValue: 'http://localhost:3000/v1',
    );
    const unitId = String.fromEnvironment('UNIT_ID', defaultValue: '');
    const appName = String.fromEnvironment('APP_NAME', defaultValue: 'Whiskey Club');

    return FlavorConfig(
      flavor: flavor,
      tenantSlug: tenantSlug,
      apiBaseUrl: apiBase,
      defaultUnitId: unitId.isEmpty ? null : unitId,
      appName: appName,
    );
  }

  ThemeData get theme {
    // Cores default; white-label via assets/tema por flavor na Fase 1
    const amber = Color(0xFFC9A227);
    return ThemeData(
      brightness: Brightness.dark,
      colorScheme: const ColorScheme.dark(
        primary: amber,
        surface: Color(0xFF1A1612),
      ),
      useMaterial3: true,
    );
  }
}
