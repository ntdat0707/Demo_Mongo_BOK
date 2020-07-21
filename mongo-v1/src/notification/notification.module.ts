import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  imports:[BookingModule],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
