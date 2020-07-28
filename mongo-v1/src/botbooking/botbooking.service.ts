import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';

import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';
import { Rasa } from 'src/rasa/rasa.entity';
import { DentistService } from 'src/dentist/dentist.service';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private globalcityService: GlobalCityService,
    private serviceproviderService: ServiceproviderService,
    private dentistService: DentistService,
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    let rasa = new Rasa();
    rasa = await this.botRepository.responseRasa(requestFE);

    let botbooking = new BotBooking();
    botbooking.reply_fe = {
      state: rasa.message_rasa['state'],
      data: await this.setDataToFE(requestFE, rasa),
    };

    if (botbooking.reply_fe['state'] == 'follow_infomation') {
      if (botbooking.reply_fe['data'].length == 0) {
        botbooking.reply_fe['data'] = rasa.message_rasa;
      } else {
        botbooking.reply_fe['message_rasa'] = rasa.message_rasa;
      }
    }
    console.log('Bot Booking state', botbooking.reply_fe);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO, rasa: Rasa): Promise<any> {
    let data = [];

    switch (requestFE.message_fe.state) {
      case 'start':
        var user_infor =
          requestFE.message_fe.message == null
            ? []
            : await this.getUserLoggedInfo(requestFE.message_fe.message);
        break;

      case 'follow_information':
        data = await this.stateWelcome(requestFE.message_fe.message);
        break;

      case 'select_location':
        data = await this.stateSelectLocation(
          requestFE.message_fe.data['message'],
        );
        break;
      
      case 'nearest_branch':
        return rasa.message_rasa;

      case 'select_service':
       return data = ["Whitening","Checks-up","Braces","Implant","Fillings"];  

      case 'question_name':
        return rasa.message_rasa;

      case 'question_phone_number':
        return rasa.message_rasa;

      case 'question_email':
        return rasa.message_rasa;
      
      case 'select_doctor':
        return await this.getDentists();
    }
    return !user_infor ? data : user_infor;
  }

  async getUserLoggedInfo(token: string): Promise<any> {
    const token_access = token;
    const axios = require('axios').create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${token_access}`,
      },
    });
    return await axios
      .post('/customer/logged')
      .then(response => {
        console.log('User Logged', response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async stateWelcome(message: string): Promise<any> {
    let data = [];
    if (message == "That's great") {
      return this.globalcityService.getCities();
    } else {
      return data;
    }
  }

  async stateSelectLocation(city: string): Promise<string[]> {
    console.log('City', city);
    console.log(
      'response_FE.Data',
      await this.serviceproviderService.getAddresses(city),
    );
    return await this.serviceproviderService.getAddresses(city);
  }

  async getDentists():Promise<any>{
    return this.dentistService.getDentists();
  }
}
