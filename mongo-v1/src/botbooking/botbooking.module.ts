import { Module } from '@nestjs/common';
import { BotbookingController } from './botbooking.controller';
import { BotbookingService } from './botbooking.service';

@Module({
  controllers: [BotbookingController],
  providers: [BotbookingService]
})
export class BotbookingModule {}
