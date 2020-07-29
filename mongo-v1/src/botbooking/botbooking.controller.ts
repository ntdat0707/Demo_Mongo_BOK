import { BotBookingService } from './botbooking.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bot Booking')
@Controller('botbooking')
export class BotbookingController {
  constructor(private botService: BotBookingService) {}

  @ApiCreatedResponse({ description: 'ChatBot conversation' })
  @Post()
  async sendReplyToFE(
    @Body(ValidationPipe) requestFE: MessageFEDTO,
  ): Promise<BotBooking> {
    return this.botService.sendReplyToFE(requestFE);
  }
}
