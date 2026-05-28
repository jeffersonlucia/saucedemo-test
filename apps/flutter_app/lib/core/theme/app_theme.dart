import 'package:flutter/material.dart';

import '../config/app_config.dart';

class AppTheme {
  static ThemeData fromBrand(BrandConfig brand) {
    final primary = Color(brand.primaryColor);
    final secondary = Color(brand.secondaryColor);

    return ThemeData(
      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        brightness: Brightness.dark,
        primary: primary,
        secondary: Color(brand.accentColor),
        surface: secondary,
      ),
      scaffoldBackgroundColor: const Color(0xFF120D0A),
      cardTheme: CardTheme(
        color: const Color(0xFF2E2118),
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: const Color(0xFF21140D),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
        ),
      ),
      useMaterial3: true,
    );
  }
}
