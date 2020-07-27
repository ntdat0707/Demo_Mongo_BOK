import { BotBooking } from './botbooking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { MessageRasaDTO } from './middleware/getmessage-rasa-dto';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { response } from 'express';

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<any> {
    const { message } = requestFE;
    const data = "";
    console.log('Message from FE', message);
    switch (message.state) {
      case 'chatbot_wellcome': 
      await this.helloToFE('hello rasa');
      break;
      case 'select_location':
        'function array city';
        break;
      case 'nearest_branches':
        'function get address of serviceprovider';
        break;
      case 'select_service':
        'function get product';
        break;
    }
  }

  async helloToFE(state: string): Promise<void> {
    console.log('Data Rasa', await this.sendReplyToRasa(state));
    // return await this.sendReplyToRasa(state);
  }

  async sendReplyToRasa(mess: string):Promise<any>{
    const axios = require('axios').create({
      baseURL: 'http://192.168.1.101:5005',
    });
    return await axios
      .post('webhooks/restnew/webhook', { message: mess })
      .then(response => {
        console.log(response.data);      
        return response.data;
      })
      .catch(error => {

        console.log(error);
      });


    // this.axiosRasa(mess)
    //   .then(data => {
    //     response.json({ message: 'Data received', data });
    //   })
    //   .catch(err => console.log('Error', err));
  }

  axiosRasa(mess: string) {
    const axios = require('axios').create({
      baseURL: 'http://192.168.1.101:5005',
    });
    return axios
      .post('webhooks/restnew/webhook', { message: mess })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getMessageFromRasa(messageRasa: MessageRasaDTO): Promise<object> {
    const { message_rasa } = messageRasa;
    let dataRasa = message_rasa;
    return dataRasa;
  }
}
