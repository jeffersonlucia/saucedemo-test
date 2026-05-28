import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ids = {
  tenant: '31f16ec8-5960-4b2f-9e1d-f7dffbfce7a1',
  unit: 'a9dfd2d4-38a0-4d55-b1d2-003c93c74dd4',
  owner: '00537cf8-cd5b-4116-a7b6-4b99b8dc36e3',
  manager: '2a226970-9acd-454f-a7dd-a93434b74873',
  staff: 'bdc61699-d9fd-4045-9e29-09aeab5d6ce4',
  memberUser: '61c68920-3cc4-481e-b0f7-a38cbf57a45e',
  member: 'bb573ad3-554e-44b7-977b-8c9a9f5a78e3',
  planSilver: '716fb2e1-3688-4b06-8987-70f16c05fef6',
  planGold: '6a57f595-3061-42b8-986c-dc3a10b1de1d',
  planBlack: 'f322d0bd-46fc-4ab2-a28c-ced2dfe04512',
  event: '90d76581-ef89-4b30-8fbb-5228200e49e9',
  reservation: '2426e451-5500-4b94-b2e3-3504cf4f0cef',
};

async function upsertUser(id: string, email: string, name: string, passwordHash: string) {
  return prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, status: 'active' },
    create: {
      id,
      email,
      name,
      passwordHash,
      status: 'active',
    },
  });
}

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 10);

  await prisma.tenant.upsert({
    where: { slug: 'bar-do-jao' },
    update: {
      name: 'Bar do Jao',
      status: 'active',
    },
    create: {
      id: ids.tenant,
      name: 'Bar do Jao',
      slug: 'bar-do-jao',
      status: 'active',
    },
  });

  await prisma.unit.upsert({
    where: { id: ids.unit },
    update: {
      name: 'Bar do Jao - Matriz',
      status: 'active',
      timezone: 'America/Sao_Paulo',
      defaultCapacity: 40,
    },
    create: {
      id: ids.unit,
      tenantId: ids.tenant,
      name: 'Bar do Jao - Matriz',
      status: 'active',
      timezone: 'America/Sao_Paulo',
      defaultCapacity: 40,
      addressJson: {
        city: 'Sao Paulo',
        country: 'BR',
      },
    },
  });

  await prisma.tenantBrandConfig.upsert({
    where: { tenantId: ids.tenant },
    update: {
      displayName: 'Bar do Jao Whiskey Club',
      primaryColor: '#C47A2C',
      secondaryColor: '#1D120C',
      accentColor: '#9F4F24',
      welcomeText: 'Hoje no Bar do Jao',
    },
    create: {
      tenantId: ids.tenant,
      displayName: 'Bar do Jao Whiskey Club',
      primaryColor: '#C47A2C',
      secondaryColor: '#1D120C',
      accentColor: '#9F4F24',
      fontFamily: 'Inter',
      welcomeText: 'Hoje no Bar do Jao',
      linksJson: {
        whatsapp: 'https://wa.me/5500000000000',
      },
    },
  });

  for (const flag of [
    ['events', true],
    ['reservations', true],
    ['checkin', true],
    ['memberBenefits', true],
    ['inventory', false],
    ['notifications', false],
    ['billing', false],
  ] as const) {
    await prisma.tenantFeatureFlag.upsert({
      where: {
        tenantId_unitId_key: {
          tenantId: ids.tenant,
          unitId: ids.unit,
          key: flag[0],
        },
      },
      update: { enabled: flag[1] },
      create: {
        tenantId: ids.tenant,
        unitId: ids.unit,
        key: flag[0],
        enabled: flag[1],
      },
    });
  }

  await upsertUser(ids.owner, 'jao.owner@example.com', 'Jao', passwordHash);
  await upsertUser(ids.manager, 'gerente@example.com', 'Gerente do Bar', passwordHash);
  await upsertUser(ids.staff, 'staff@example.com', 'Staff do Bar', passwordHash);
  await upsertUser(ids.memberUser, 'membro@example.com', 'Bruno Almeida', passwordHash);

  for (const membership of [
    [ids.owner, 'owner'],
    [ids.manager, 'manager'],
    [ids.staff, 'staff'],
    [ids.memberUser, 'member'],
  ] as const) {
    await prisma.tenantMembership.upsert({
      where: {
        tenantId_userId_role_unitId: {
          tenantId: ids.tenant,
          userId: membership[0],
          role: membership[1],
          unitId: ids.unit,
        },
      },
      update: { status: 'active' },
      create: {
        tenantId: ids.tenant,
        userId: membership[0],
        role: membership[1],
        unitId: ids.unit,
        status: 'active',
      },
    });
  }

  const plans = [
    [ids.planSilver, 'Silver', 14900, 'Entrada no clube, carteira digital e agenda de eventos.'],
    [ids.planGold, 'Gold', 24900, 'Beneficios Silver mais reservas prioritarias.'],
    [ids.planBlack, 'Black', 39900, 'Experiencia completa com convidados e degustacoes premium.'],
  ] as const;

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan[0] },
      update: {
        name: plan[1],
        priceCents: plan[2],
        status: 'active',
      },
      create: {
        id: plan[0],
        tenantId: ids.tenant,
        name: plan[1],
        description: plan[3],
        priceCents: plan[2],
        billingPeriod: 'monthly',
        status: 'active',
      },
    });
  }

  await prisma.planBenefit.upsert({
    where: { id: 'd5cf49c7-c74c-48bf-91b8-3809da7c2058' },
    update: {
      title: '2 convidados mensais',
      description: 'Convide ate 2 pessoas para eventos elegiveis.',
    },
    create: {
      id: 'd5cf49c7-c74c-48bf-91b8-3809da7c2058',
      tenantId: ids.tenant,
      planId: ids.planBlack,
      type: 'guest_invites',
      title: '2 convidados mensais',
      description: 'Convide ate 2 pessoas para eventos elegiveis.',
      configJson: { monthlyLimit: 2 },
    },
  });

  await prisma.member.upsert({
    where: { id: ids.member },
    update: {
      fullName: 'Bruno Almeida',
      status: 'active',
      marketingOptIn: true,
    },
    create: {
      id: ids.member,
      tenantId: ids.tenant,
      primaryUnitId: ids.unit,
      userId: ids.memberUser,
      fullName: 'Bruno Almeida',
      email: 'membro@example.com',
      phone: '+5500000000000',
      status: 'active',
      marketingOptIn: true,
      preferencesJson: {
        favoriteStyle: 'Bourbon',
      },
    },
  });

  await prisma.subscription.upsert({
    where: { id: 'bef84940-1e55-4e15-8700-5484e0962573' },
    update: {
      status: 'active',
      planId: ids.planBlack,
    },
    create: {
      id: 'bef84940-1e55-4e15-8700-5484e0962573',
      tenantId: ids.tenant,
      memberId: ids.member,
      planId: ids.planBlack,
      status: 'active',
      startedAt: new Date(),
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.event.upsert({
    where: { id: ids.event },
    update: {
      title: 'Degustacao Bourbon da Casa',
      status: 'published',
      capacity: 32,
    },
    create: {
      id: ids.event,
      tenantId: ids.tenant,
      unitId: ids.unit,
      title: 'Degustacao Bourbon da Casa',
      description: 'Primeira experiencia piloto do Bar do Jao Whiskey Club.',
      startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      capacity: 32,
      status: 'published',
      visibility: 'restricted',
      priceCents: 0,
    },
  });

  await prisma.eventAllowedPlan.upsert({
    where: {
      tenantId_eventId_planId: {
        tenantId: ids.tenant,
        eventId: ids.event,
        planId: ids.planBlack,
      },
    },
    update: {},
    create: {
      tenantId: ids.tenant,
      eventId: ids.event,
      planId: ids.planBlack,
    },
  });

  await prisma.reservation.upsert({
    where: {
      tenantId_eventId_memberId: {
        tenantId: ids.tenant,
        eventId: ids.event,
        memberId: ids.member,
      },
    },
    update: {
      status: 'confirmed',
    },
    create: {
      id: ids.reservation,
      tenantId: ids.tenant,
      eventId: ids.event,
      memberId: ids.member,
      status: 'confirmed',
      qrTokenHash: 'demo-qr-token-hash',
    },
  });

  await prisma.auditLog.create({
    data: {
      tenantId: ids.tenant,
      actorUserId: ids.owner,
      action: 'seed.bar_do_jao',
      entityType: 'tenant',
      entityId: ids.tenant,
      afterJson: {
        seeded: true,
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
