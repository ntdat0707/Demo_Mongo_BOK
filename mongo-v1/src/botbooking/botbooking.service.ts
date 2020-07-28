import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';

import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';


@Injectable()
export class BotBookingService {
  constructor(private botRepository: BotBookingRepository) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<any> {
     return this.botRepository.helloToFE(requestFE);
  }
  
}
