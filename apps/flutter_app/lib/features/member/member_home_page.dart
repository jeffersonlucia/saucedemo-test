import 'package:flutter/material.dart';

class MemberHomePage extends StatelessWidget {
  const MemberHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Text(
              'Hoje no Bar do Jao',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Carteirinha Black', style: Theme.of(context).textTheme.labelLarge),
                    const SizedBox(height: 8),
                    Text('Bruno Almeida', style: Theme.of(context).textTheme.headlineSmall),
                    const SizedBox(height: 20),
                    FilledButton(
                      onPressed: () {},
                      child: const Text('Ver QR Code'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            _EventCard(
              title: 'Degustacao Bourbon da Casa',
              subtitle: 'Reserva confirmada para a proxima semana',
              action: 'Ver detalhes',
              onPressed: () {},
            ),
            _EventCard(
              title: 'Speyside Single Malt',
              subtitle: '18 vagas restantes',
              action: 'Reservar minha vaga',
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _EventCard extends StatelessWidget {
  const _EventCard({
    required this.title,
    required this.subtitle,
    required this.action,
    required this.onPressed,
  });

  final String title;
  final String subtitle;
  final String action;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 6),
            Text(subtitle),
            const SizedBox(height: 12),
            FilledButton(onPressed: onPressed, child: Text(action)),
          ],
        ),
      ),
    );
  }
}
