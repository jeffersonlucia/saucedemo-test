import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClubService } from './club.service';

@ApiTags('members')
@Controller({ path: 'admin/members', version: '1' })
export class MembersController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista membros do Bar do Jao.' })
  listMembers() {
    return this.clubService.listMembers();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Cria membro demo.' })
  createMember(@Body() body: Record<string, unknown>) {
    return this.clubService.createMember(body);
  }
}

@ApiTags('plans')
@Controller({ path: 'plans', version: '1' })
export class PlansController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista planos Silver, Gold e Black.' })
  listPlans() {
    return this.clubService.listPlans();
  }
}

@ApiTags('events')
@Controller({ path: 'events', version: '1' })
export class EventsController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista eventos publicados e suas vagas.' })
  listEvents() {
    return this.clubService.listEvents();
  }

  @Post(':eventId/reservations')
  @ApiCreatedResponse({ description: 'Reserva evento para um membro.' })
  reserveEvent(@Param('eventId') eventId: string, @Body() body: { memberId?: string; guests?: number }) {
    return this.clubService.reserveEvent(eventId, body ?? {});
  }
}

@ApiTags('events')
@Controller({ path: 'admin/events', version: '1' })
export class AdminEventsController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cria evento demo administrativo.' })
  createEvent(@Body() body: Record<string, unknown>) {
    return this.clubService.createEvent(body);
  }
}

@ApiTags('reservations')
@Controller({ path: 'admin/reservations', version: '1' })
export class ReservationsController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista reservas, opcionalmente filtrando por evento.' })
  listReservations(@Query('eventId') eventId?: string) {
    return this.clubService.listReservations(eventId);
  }

  @Post(':reservationId/check-in')
  @ApiOkResponse({ description: 'Faz check-in por id da reserva ou token QR demo.' })
  checkIn(@Param('reservationId') reservationId: string) {
    return this.clubService.checkIn(reservationId);
  }
}

@ApiTags('reports')
@Controller({ path: 'admin/reports', version: '1' })
export class ReportsController {
  constructor(private readonly clubService: ClubService) {}

  @Get('overview')
  @ApiOkResponse({ description: 'Dashboard operacional do Bar do Jao.' })
  overview() {
    return this.clubService.overview();
  }
}
