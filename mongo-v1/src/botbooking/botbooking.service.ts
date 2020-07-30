import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';
import {BookingService} from 'src/booking/booking.service';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private serviceproviderService: ServiceproviderService,
    private globalCityService: GlobalCityService,
    private bookingService: BookingService
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    let mess = await this.botRepository.setStateToFE(requestFE);
     let botbooking = new BotBooking();    
    botbooking = await this.botRepository.sendReplyToRasa(mess);
    botbooking.data = await this.setDataToFE(requestFE);
    console.log('Bot Booking state', botbooking);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO): Promise<any> {
    // let state = this.botRepository.stateService.getState(requestFE.state)
    // state.service = {
    //   serviceproviderService: this.serviceproviderService,
    //   globalCityService: this.globalCityService,
    //   bookingservice: this.bookingService
    // }
    // state.excute(requestFE);
    // let data = await state.getDataRely(requestFE);
    // return data;
    return [];
  }
}
