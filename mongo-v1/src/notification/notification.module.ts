import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { BookingModule } from 'src/booking/booking.module';
import { NotificationRepository } from './notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[BookingModule,TypeOrmModule.forFeature([NotificationRepository])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
