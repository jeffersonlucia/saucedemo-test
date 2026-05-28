import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

const demoUsers = [
  {
    id: 'usr_jao_owner',
    email: 'jao.owner@example.com',
    name: 'Jao',
    role: 'owner',
    tenantSlug: 'bar-do-jao',
    unitId: 'unit_bar_do_jao_matriz',
  },
  {
    id: 'usr_bar_member',
    email: 'membro@example.com',
    name: 'Bruno Almeida',
    role: 'member',
    tenantSlug: 'bar-do-jao',
    unitId: 'unit_bar_do_jao_matriz',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    // Temporary demo auth until Prisma-backed identity is wired.
    const user = demoUsers.find(
      (candidate) =>
        candidate.email === dto.email.toLowerCase() &&
        candidate.tenantSlug === (dto.tenantSlug ?? 'bar-do-jao'),
    );

    if (!user || dto.password !== 'demo1234') {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      tenantSlug: user.tenantSlug,
      role: user.role,
      unitId: user.unitId,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: 900,
      user,
    };
  }

  getMe() {
    return {
      id: 'usr_jao_owner',
      email: 'jao.owner@example.com',
      name: 'Jao',
      activeTenant: {
        slug: 'bar-do-jao',
        name: 'Bar do Jao',
      },
      roles: ['owner'],
      units: [
        {
          id: 'unit_bar_do_jao_matriz',
          name: 'Bar do Jao - Matriz',
        },
      ],
      features: {
        events: true,
        reservations: true,
        checkin: true,
        inventory: false,
        notifications: false,
      },
    };
  }
}
