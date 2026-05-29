import { INestApplication, VersioningType } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './app.module';

describe('Whiskey Club OS API smoke', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves healthcheck', async () => {
    const response = await request(app.getHttpServer()).get('/v1/health').expect(200);
    expect(response.body.status).toBe('ok');
  });

  it('serves Bar do Jao tenant config', async () => {
    const response = await request(app.getHttpServer()).get('/v1/tenants/current/config').expect(200);
    expect(response.body.tenantSlug).toBe('bar-do-jao');
    expect(response.body.features.checkin).toBe(true);
  });

  it('logs in with demo owner credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/auth/login')
      .send({
        email: 'jao.owner@example.com',
        password: 'demo1234',
        tenantSlug: 'bar-do-jao',
      })
      .expect(201);

    expect(response.body.accessToken).toEqual(expect.any(String));
    expect(response.body.user.role).toBe('owner');
  });

  it('lists P0 club resources', async () => {
    const members = await request(app.getHttpServer()).get('/v1/admin/members').expect(200);
    const plans = await request(app.getHttpServer()).get('/v1/plans').expect(200);
    const events = await request(app.getHttpServer()).get('/v1/events').expect(200);
    const overview = await request(app.getHttpServer()).get('/v1/admin/reports/overview').expect(200);

    expect(members.body.data.length).toBeGreaterThan(0);
    expect(plans.body.data.map((plan: { id: string }) => plan.id)).toContain('black');
    expect(events.body.data[0].seatsAvailable).toEqual(expect.any(Number));
    expect(overview.body.tenant).toBe('bar-do-jao');
  });

  it('performs check-in and blocks duplicate check-in', async () => {
    const first = await request(app.getHttpServer())
      .post('/v1/admin/reservations/BDJ-R1-BRUNO/check-in')
      .expect(201);

    expect(first.body.status).toBe('checked_in');

    await request(app.getHttpServer()).post('/v1/admin/reservations/BDJ-R1-BRUNO/check-in').expect(409);
  });
});
