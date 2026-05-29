class AppConfig {
  const AppConfig({
    required this.flavor,
    required this.environment,
    required this.tenantSlug,
    required this.apiBaseUrl,
    required this.brand,
    required this.features,
  });

  final String flavor;
  final String environment;
  final String tenantSlug;
  final String apiBaseUrl;
  final BrandConfig brand;
  final FeatureConfig features;

  factory AppConfig.barDoJaoStaging() {
    return const AppConfig(
      flavor: 'bar_do_jao_staging',
      environment: 'staging',
      tenantSlug: 'bar-do-jao',
      apiBaseUrl: 'http://localhost:3000/v1',
      brand: BrandConfig(
        name: 'Bar do Jao',
        displayName: 'Bar do Jao Whiskey Club',
        primaryColor: 0xFFC47A2C,
        primarySoftColor: 0xFFF5C978,
        secondaryColor: 0xFF1D120C,
        accentColor: 0xFF9F4F24,
      ),
      features: FeatureConfig(
        events: true,
        reservations: true,
        checkin: true,
        memberBenefits: true,
        inventory: false,
        notifications: false,
        billing: false,
      ),
    );
  }
}

class BrandConfig {
  const BrandConfig({
    required this.name,
    required this.displayName,
    required this.primaryColor,
    required this.primarySoftColor,
    required this.secondaryColor,
    required this.accentColor,
  });

  final String name;
  final String displayName;
  final int primaryColor;
  final int primarySoftColor;
  final int secondaryColor;
  final int accentColor;
}

class FeatureConfig {
  const FeatureConfig({
    required this.events,
    required this.reservations,
    required this.checkin,
    required this.memberBenefits,
    required this.inventory,
    required this.notifications,
    required this.billing,
  });

  final bool events;
  final bool reservations;
  final bool checkin;
  final bool memberBenefits;
  final bool inventory;
  final bool notifications;
  final bool billing;
}
