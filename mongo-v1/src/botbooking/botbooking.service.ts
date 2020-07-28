import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';

import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';
import { Rasa } from 'src/rasa/rasa.entity';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private globalcityService: GlobalCityService,
    private serviceproviderService: ServiceproviderService,
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    let rasa = new Rasa();
    rasa = await this.botRepository.responseRasa(requestFE);

    let botbooking = new BotBooking();
    botbooking.reply_fe = {
      state: rasa.message_rasa['state'],
      data: await this.setDataToFE(requestFE),
    };
    console.log('Bot Booking state', botbooking.reply_fe);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO): Promise<any> {
   let data = [];
    switch (requestFE.message_fe.state) {
      case 'start': data = ((requestFE.message_fe.data['message'])!="")?await this.getUserLoggedInfo(requestFE.message_fe.data['message']):[];
        break;
      case 'follow_information':
        data = await this.stateWelcome();
        break;
      case 'select_location':
        data =  await this.stateSelectLocation(
          requestFE.message_fe.data['message'],
        );
        break;
    }
    return data;
  }

  async getUserLoggedInfo(token:string):Promise<any>{
    const token_access = token;
    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QgMiIsImlhdCI6MTU5NTgxODY3MiwiZXhwIjoxNTk1ODIyMjcyfQ.YptTb1FYHYfPOu5pX7mm4VNCabiBjWAePxEoykz1NEc';
  //get token  -- return user details
  const axios = require('axios').create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${token_access}`,
    },
  });
  axios
    .post('/customer/logged')
    .then(response => {
      console.log("User Logged",response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  async stateWelcome(): Promise<object[]> {
    return await this.globalcityService.getCities();
  }

  async stateSelectLocation(city: string): Promise<string[]> {
    console.log('City', city);
    console.log(
      'response_FE.Data',
      await this.serviceproviderService.getAddresses(city),
    );
    return await this.serviceproviderService.getAddresses(city);
  }

}
