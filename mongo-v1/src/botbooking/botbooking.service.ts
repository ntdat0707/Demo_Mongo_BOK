import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { BotBooking } from './botbooking.entity';

@Injectable()
export class BotBookingService {
    constructor(private botRepository: BotBookingRepository){}

    async sendReplyToFE(requestFE: MessageFEDTO):Promise<any>{
        console.log("Service",await this.botRepository.sendReplyToFE(requestFE));
        return this.botRepository.sendReplyToFE(requestFE);
    }
}
