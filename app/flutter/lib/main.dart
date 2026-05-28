import 'package:flutter/material.dart';
import 'package:whiskey_club_os/config/flavor_config.dart';

void main() {
  final config = FlavorConfig.fromEnvironment();
  runApp(WhiskeyClubApp(config: config));
}

class WhiskeyClubApp extends StatelessWidget {
  const WhiskeyClubApp({super.key, required this.config});

  final FlavorConfig config;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: config.appName,
      theme: config.theme,
      home: Scaffold(
        appBar: AppBar(title: Text(config.appName)),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('🥃', style: TextStyle(fontSize: 48)),
                const SizedBox(height: 16),
                Text(
                  'Whiskey Club OS',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const SizedBox(height: 8),
                Text('Flavor: ${config.flavor}'),
                Text('Tenant: ${config.tenantSlug}'),
                if (config.defaultUnitId != null)
                  Text('Unit: ${config.defaultUnitId}'),
                const SizedBox(height: 24),
                const Text(
                  'Esqueleto — ver mock/index.html e docs/',
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
