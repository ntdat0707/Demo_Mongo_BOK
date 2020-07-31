import { Injectable } from '@nestjs/common';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';
import { BookingService } from 'src/booking/booking.service';
import { StateService } from "./state.service"

@Injectable()
export class BotBookingService {
  constructor(
    private serviceproviderService: ServiceproviderService,
    private globalCityService: GlobalCityService,
    private bookingService: BookingService,
    private stateService: StateService
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    const mess = await this.setStateToFE(requestFE);
    let botbooking = new BotBooking();    
    botbooking = await this.sendReplyToRasa(mess);
    botbooking.data = await this.setDataToFE(requestFE);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO): Promise<any> {
    const state = this.stateService.getState(requestFE.state)
    state.service = {
      serviceproviderService: this.serviceproviderService,
      globalCityService: this.globalCityService,
      bookingservice: this.bookingService
    }
    state.excute(requestFE);
    const data = await state.getDataReply(requestFE);
    return data;
  }

  setStateToFE(requestFE: MessageFEDTO): string {
    const state = this.stateService.getState(requestFE.state)
    console.log("namestate: ", state.getMessage(requestFE)); 
    return state.getMessage(requestFE);
  }

  async sendReplyToRasa(mess: string): Promise<BotBooking> {
    const axios = require('axios').create({
      baseURL: 'http://192.168.1.104:5005',
    });
    return await axios
      .post('webhooks/restnew/webhook', { sender: '123', message: mess })
      .then((response: any) => {
        //console.log(response.data);
        return response.data;
      })
      .catch((error : any) => {
        console.log(error);
      });
  }
}
