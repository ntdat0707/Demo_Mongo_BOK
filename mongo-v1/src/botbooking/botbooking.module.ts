import { Module } from '@nestjs/common';
import { BotbookingController } from './botbooking.controller';
import { BotBookingService } from './botbooking.service';
import { BotBookingRepository } from './botbooking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BotBookingRepository])],
  controllers: [BotbookingController],
  providers: [BotBookingService]
})
export class BotbookingModule {}
