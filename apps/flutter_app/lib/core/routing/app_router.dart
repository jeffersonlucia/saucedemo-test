import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/admin/admin_home_page.dart';
import '../../features/member/member_home_page.dart';
import '../../features/staff/staff_checkin_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/member',
    routes: [
      GoRoute(
        path: '/',
        redirect: (_, __) => '/member',
      ),
      GoRoute(
        path: '/admin',
        builder: (context, state) => const AdminHomePage(),
      ),
      GoRoute(
        path: '/staff',
        builder: (context, state) => const StaffCheckinPage(),
      ),
      GoRoute(
        path: '/member',
        builder: (context, state) => const MemberHomePage(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Text('Rota nao encontrada: ${state.uri}'),
      ),
    ),
  );
});
