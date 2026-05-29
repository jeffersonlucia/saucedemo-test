import 'package:flutter/material.dart';

class StaffCheckinPage extends StatelessWidget {
  const StaffCheckinPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Check-in do evento')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  children: [
                    const Icon(Icons.qr_code_scanner, size: 72),
                    const SizedBox(height: 12),
                    Text(
                      'Escanear QR Code',
                      style: Theme.of(context).textTheme.headlineSmall,
                    ),
                    const SizedBox(height: 12),
                    const Text('Fallback por busca manual fica logo abaixo.'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                labelText: 'Buscar por nome ou telefone',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () {},
              child: const Text('Confirmar check-in demo'),
            ),
          ],
        ),
      ),
    );
  }
}
