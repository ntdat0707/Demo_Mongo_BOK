import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingRepository])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
