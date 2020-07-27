import { BotBookingService } from './botbooking.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { BotBooking } from './botbooking.entity';

@Controller('botbooking')
export class BotbookingController {
  constructor(private botService: BotBookingService) {}

  @Post()
  async sendReplyToFE(
    @Body(ValidationPipe) requestFE: MessageFEDTO,
  ): Promise<any> {
    console.log("Controller:",await this.botService.sendReplyToFE(requestFE))
    return this.botService.sendReplyToFE(requestFE);
  }
}
