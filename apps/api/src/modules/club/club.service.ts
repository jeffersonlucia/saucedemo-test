import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

type MemberStatus = 'active' | 'past_due' | 'cancelled';
type ReservationStatus = 'confirmed' | 'waitlisted' | 'cancelled' | 'checked_in';

export interface Plan {
  id: string;
  name: string;
  price: number;
  benefits: string[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: MemberStatus;
  visits: number;
  benefitsUsed: number;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  capacity: number;
  plans: string[];
  status: 'draft' | 'published';
  description: string;
}

export interface Reservation {
  id: string;
  eventId: string;
  memberId: string;
  status: ReservationStatus;
  guests: number;
  qr: string;
}

@Injectable()
export class ClubService {
  private plans: Plan[] = [
    { id: 'silver', name: 'Silver', price: 149, benefits: ['Carteirinha', 'Agenda de eventos'] },
    { id: 'gold', name: 'Gold', price: 249, benefits: ['Reserva prioritaria', '1 convidado por mes'] },
    { id: 'black', name: 'Black', price: 399, benefits: ['2 convidados', 'Degustacoes premium', '15% off'] },
  ];

  private members: Member[] = [
    {
      id: 'm1',
      name: 'Bruno Almeida',
      email: 'membro@example.com',
      phone: '11988880000',
      plan: 'black',
      status: 'active',
      visits: 8,
      benefitsUsed: 3,
    },
    {
      id: 'm2',
      name: 'Ana Martins',
      email: 'ana@example.com',
      phone: '11977770000',
      plan: 'gold',
      status: 'active',
      visits: 5,
      benefitsUsed: 1,
    },
    {
      id: 'm3',
      name: 'Luiz Braga',
      email: 'luiz@example.com',
      phone: '11966660000',
      plan: 'silver',
      status: 'past_due',
      visits: 2,
      benefitsUsed: 0,
    },
  ];

  private events: ClubEvent[] = [
    {
      id: 'e1',
      title: 'Degustacao Bourbon da Casa',
      date: '2026-06-04',
      time: '20:30',
      capacity: 32,
      plans: ['gold', 'black'],
      status: 'published',
      description: 'Primeira experiencia piloto do Bar do Jao.',
    },
    {
      id: 'e2',
      title: 'Speyside Single Malt',
      date: '2026-06-12',
      time: '20:00',
      capacity: 24,
      plans: ['black'],
      status: 'published',
      description: 'Selecao premium para membros Black.',
    },
  ];

  private reservations: Reservation[] = [
    { id: 'r1', eventId: 'e1', memberId: 'm1', status: 'confirmed', guests: 1, qr: 'BDJ-R1-BRUNO' },
    { id: 'r2', eventId: 'e1', memberId: 'm2', status: 'confirmed', guests: 0, qr: 'BDJ-R2-ANA' },
    { id: 'r3', eventId: 'e2', memberId: 'm1', status: 'confirmed', guests: 0, qr: 'BDJ-R3-BRUNO' },
  ];

  listMembers() {
    return { data: this.members };
  }

  createMember(input: Partial<Member>) {
    if (!input.name || !input.email || !input.phone || !input.plan) {
      throw new BadRequestException('Nome, email, telefone e plano sao obrigatorios');
    }
    if (!this.plans.some((plan) => plan.id === input.plan)) {
      throw new BadRequestException('Plano invalido');
    }
    const member: Member = {
      id: `m${Date.now()}`,
      name: input.name,
      email: input.email,
      phone: input.phone,
      plan: input.plan,
      status: 'active',
      visits: 0,
      benefitsUsed: 0,
    };
    this.members.push(member);
    return member;
  }

  listPlans() {
    return { data: this.plans };
  }

  listEvents() {
    return {
      data: this.events.map((event) => ({
        ...event,
        seatsUsed: this.seatsUsed(event.id),
        seatsAvailable: Math.max(event.capacity - this.seatsUsed(event.id), 0),
      })),
    };
  }

  createEvent(input: Partial<ClubEvent>) {
    if (!input.title || !input.date || !input.time || !input.capacity) {
      throw new BadRequestException('Titulo, data, horario e capacidade sao obrigatorios');
    }
    const event: ClubEvent = {
      id: `e${Date.now()}`,
      title: input.title,
      date: input.date,
      time: input.time,
      capacity: Number(input.capacity),
      plans: input.plans?.length ? input.plans : ['silver', 'gold', 'black'],
      status: input.status ?? 'published',
      description: input.description ?? 'Evento criado pela API demo.',
    };
    this.events.push(event);
    return event;
  }

  listReservations(eventId?: string) {
    const data = eventId
      ? this.reservations.filter((reservation) => reservation.eventId === eventId)
      : this.reservations;
    return {
      data: data.map((reservation) => ({
        ...reservation,
        member: this.getMember(reservation.memberId),
        event: this.getEvent(reservation.eventId),
      })),
    };
  }

  reserveEvent(eventId: string, input: { memberId?: string; guests?: number }) {
    const event = this.getEvent(eventId);
    const member = this.getMember(input.memberId ?? 'm1');
    const activeReservation = this.reservations.find(
      (reservation) =>
        reservation.eventId === eventId &&
        reservation.memberId === member.id &&
        reservation.status !== 'cancelled',
    );

    if (activeReservation) {
      throw new ConflictException('Membro ja possui reserva ativa neste evento');
    }
    if (member.status !== 'active') {
      throw new BadRequestException('Membro nao esta ativo');
    }
    if (!event.plans.includes(member.plan)) {
      throw new BadRequestException('Plano do membro nao e elegivel para este evento');
    }

    const status: ReservationStatus = this.seatsUsed(eventId) >= event.capacity ? 'waitlisted' : 'confirmed';
    const reservation: Reservation = {
      id: `r${Date.now()}`,
      eventId,
      memberId: member.id,
      status,
      guests: Number(input.guests ?? 0),
      qr: `BDJ-${Date.now().toString(36).toUpperCase()}`,
    };
    this.reservations.push(reservation);
    return reservation;
  }

  checkIn(reservationId: string) {
    const reservation = this.reservations.find((item) => item.id === reservationId || item.qr === reservationId);
    if (!reservation) {
      throw new NotFoundException('Reserva nao encontrada');
    }
    if (reservation.status === 'checked_in') {
      throw new ConflictException('Check-in duplicado bloqueado');
    }
    if (reservation.status !== 'confirmed') {
      throw new BadRequestException('Reserva nao esta confirmada');
    }
    reservation.status = 'checked_in';
    const member = this.getMember(reservation.memberId);
    member.visits += 1;
    return {
      status: 'checked_in',
      reservation,
      member,
      checkedInAt: new Date().toISOString(),
    };
  }

  overview() {
    const activeMembers = this.members.filter((member) => member.status === 'active');
    const monthlyRevenue = activeMembers.reduce((sum, member) => {
      return sum + (this.plans.find((plan) => plan.id === member.plan)?.price ?? 0);
    }, 0);

    return {
      tenant: 'bar-do-jao',
      unit: 'Bar do Jao - Matriz',
      activeMembers: activeMembers.length,
      pastDueMembers: this.members.filter((member) => member.status === 'past_due').length,
      monthlyRevenue,
      reservations: this.reservations.length,
      checkins: this.reservations.filter((reservation) => reservation.status === 'checked_in').length,
      publishedEvents: this.events.filter((event) => event.status === 'published').length,
    };
  }

  private seatsUsed(eventId: string) {
    return this.reservations
      .filter((reservation) => reservation.eventId === eventId && reservation.status !== 'cancelled')
      .reduce((sum, reservation) => sum + 1 + reservation.guests, 0);
  }

  private getEvent(eventId: string) {
    const event = this.events.find((item) => item.id === eventId);
    if (!event) {
      throw new NotFoundException('Evento nao encontrado');
    }
    return event;
  }

  private getMember(memberId: string) {
    const member = this.members.find((item) => item.id === memberId);
    if (!member) {
      throw new NotFoundException('Membro nao encontrado');
    }
    return member;
  }
}
