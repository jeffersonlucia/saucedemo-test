import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantsService {
  getCurrentTenant() {
    return {
      id: 'tenant_bar_do_jao',
      slug: 'bar-do-jao',
      name: 'Bar do Jao',
      status: 'active',
      units: [
        {
          id: 'unit_bar_do_jao_matriz',
          name: 'Bar do Jao - Matriz',
          timezone: 'America/Sao_Paulo',
          status: 'active',
        },
      ],
    };
  }

  getCurrentConfig() {
    return {
      tenantSlug: 'bar-do-jao',
      unitId: 'unit_bar_do_jao_matriz',
      brand: {
        name: 'Bar do Jao',
        displayName: 'Bar do Jao Whiskey Club',
        primaryColor: '#C47A2C',
        primarySoftColor: '#F5C978',
        secondaryColor: '#1D120C',
        accentColor: '#9F4F24',
        textPrimaryColor: '#FFF8ED',
        textSecondaryColor: '#C8AA82',
        logoUrl: null,
      },
      copy: {
        welcome: 'Hoje no Bar do Jao',
        reserveCta: 'Reservar minha vaga',
        memberCardTitle: 'Carteirinha do Clube',
      },
      features: {
        events: true,
        reservations: true,
        checkin: true,
        memberBenefits: true,
        inventory: false,
        notifications: false,
        billing: false,
      },
    };
  }
}
