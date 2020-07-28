import { BotBooking } from './botbooking.entity';
import { EntityRepository, Repository } from 'typeorm';

import { RasaDTO } from 'src/rasa/middleware/rasa-dto';
import { Rasa } from 'src/rasa/rasa.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { response } from 'express';

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {
  async helloToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    let response_FE = new BotBooking();

    let mess = await this.setStateToFE(requestFE);
    let response_Rasa = await this.sendReplyToRasa(mess);
    console.log('response_Rasa', await this.sendReplyToRasa(mess));

    response_FE.reply_fe.state = response_Rasa.message_rasa.state;

    //return await this.sendReplyToRasa(mess);
    return response_FE;
  }

  setStateToFE(requestFE: MessageFEDTO): string {
    const { message_fe } = requestFE;
    let message_Rasa = '';
    switch (message_fe.state) {
      case 'start':
        message_Rasa = 'hello rasa';
        break;

      case 'welcome_rasa':
        message_Rasa = message_fe.data.message;
        break;

      case 'select_location':
        message_Rasa = 'selected_location';
        break;

      case 'nearest_branches':
        message_Rasa = 'selected_nearest_branches';
        break;

      case 'select_service':
        message_Rasa = 'select_service';
        break;
    }
    return message_Rasa;
  }

  async sendReplyToRasa(mess: string): Promise<Rasa> {
    const axios = require('axios').create({
      baseURL: 'http://192.168.1.101:5005',
    });
    return await axios
      .post('webhooks/restnew/webhook', { message: mess })
      .then(response => {
        //console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async setDataToFE(response_rasa: RasaDTO): Promise<any> {
  }
}
