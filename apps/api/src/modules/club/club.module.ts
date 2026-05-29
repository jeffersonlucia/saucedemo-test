import { Module } from '@nestjs/common';
import {
  AdminEventsController,
  EventsController,
  MembersController,
  PlansController,
  ReportsController,
  ReservationsController,
} from './club.controller';
import { ClubService } from './club.service';

@Module({
  controllers: [
    MembersController,
    PlansController,
    EventsController,
    AdminEventsController,
    ReservationsController,
    ReportsController,
  ],
  providers: [ClubService],
})
export class ClubModule {}
