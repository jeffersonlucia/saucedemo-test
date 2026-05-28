import 'package:flutter/material.dart';

class AdminHomePage extends StatelessWidget {
  const AdminHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final stats = [
      ('Membros ativos', '248'),
      ('Inadimplentes', '12'),
      ('Reservas proximas', '89'),
      ('No-show', '6%'),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Bar do Jao - Admin')),
      body: GridView.builder(
        padding: const EdgeInsets.all(20),
        gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 260,
          mainAxisExtent: 150,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: stats.length,
        itemBuilder: (context, index) {
          final stat = stats[index];
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(stat.$1),
                  Text(
                    stat.$2,
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
