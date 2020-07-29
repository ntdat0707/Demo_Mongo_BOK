import { BotBooking } from './botbooking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Rasa } from 'src/rasa/rasa.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {
  async responseRasa(requestFE: MessageFEDTO): Promise<Rasa> {
    let mess = await this.setStateToFE(requestFE);
    let rasa = new Rasa();
    requestFE.message_fe['sender'] = requestFE.message_fe['sender'] || "0";
    rasa.message_rasa = await this.sendReplyToRasa(mess);
    console.log('Rasa', rasa.message_rasa);
    return rasa;
  }

  setStateToFE(requestFE: MessageFEDTO): string {
    const { message_fe } = requestFE;
    let message_Rasa = '';
    switch (requestFE.message_fe.state) {
      case 'start':
        message_Rasa = 'hello rasa';
        break;

      case 'follow_information':
        message_Rasa = message_fe.message;
        break;

      case 'select_location':
        message_Rasa = 'selected_location';
        break;

      case 'nearest_branch':
        message_Rasa = 'selected_nearest_branches';
        break;

      case 'select_service':
        message_Rasa = 'select_service';
        break;

      case 'question_name':
        message_Rasa = message_fe.message;
        break;

      case 'question_phone_number':
        message_Rasa = message_fe.message;
        break;

      case 'question_email':
        message_Rasa = message_fe.message;
        break;

      case 'select_doctor':
        message_Rasa = 'select_doctor';
        break;

      case 'date_booking':
        message_Rasa = 'choice_date_booking';
        break;

      case 'thankyou_booking':
        message_Rasa = message_fe.message;
        break;
    }
    return message_Rasa;
  }

  async sendReplyToRasa(mess: string): Promise<Rasa> {
    const axios = require('axios').create({
      baseURL: 'http://192.168.1.101:5005',
    });
    return await axios
      .post('webhooks/restnew/webhook', { sender: '123', message: mess })
      .then(response => {
        //console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
