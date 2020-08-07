import { BotBooking } from './botbooking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {
  setStateToFE(requestFE: MessageFEDTO): string {
    let message_Rasa = '';
    switch (requestFE.state) {
      case 'start':
        message_Rasa = 'hello rasa';
        break;

      case 'follow_information':
        message_Rasa = requestFE.message;
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

      case 'select_specific_service':
        message_Rasa = 'select_specific_service';
        break;

      case 'question_name':
        message_Rasa = requestFE.message;
        break;

      case 'question_phone_number':
        message_Rasa = requestFE.message;
        break;

      case 'question_email':
        message_Rasa = requestFE.message;
        break;

      case 'select_doctor':
        message_Rasa = 'select_doctor';
        break;

      case 'date_booking':
        message_Rasa = 'choice_date_booking';
        break;

      case 'thankyou_booking':
        message_Rasa = 'submitted';
        break;

      case 'thankyou_confirm':
        message_Rasa = requestFE.message;
        break;

      case 'my_appointment':
        message_Rasa = requestFE.message;
        break;
    }
    return message_Rasa;
  }

  async sendReplyToRasa(requestFE: MessageFEDTO,mess:string): Promise<BotBooking> {
    const axios = require('axios').create({
      baseURL: 'http://192.168.94.100:5005',
    });
    return await axios
      .post('webhooks/restnew/webhook', { sender:requestFE.sender || "123", message: mess })
      .then(response => {
        //console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
