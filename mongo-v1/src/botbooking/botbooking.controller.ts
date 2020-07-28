import { BotBookingService } from './botbooking.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';

@Controller('botbooking')
export class BotbookingController {
  constructor(private botService: BotBookingService) {}

  @Post()
  async sendReplyToFE(
    @Body(ValidationPipe) requestFE: MessageFEDTO,
  ): Promise<BotBooking> {
    return this.botService.sendReplyToFE(requestFE);
  }
}
