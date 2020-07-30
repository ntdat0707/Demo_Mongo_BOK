import { BotBooking } from './botbooking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { StateService } from "./state.service"

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {

  stateService: StateService = new StateService();

  setStateToFE(requestFE: MessageFEDTO): string {
    let state = this.stateService.getState(requestFE.state)
    console.log("namestate: ", state.getMessage(requestFE)); 
    return state.getMessage(requestFE);
  }

  async sendReplyToRasa(mess: string): Promise<BotBooking> {
    const axios = require('axios').create({
      baseURL: 'http://192.168.1.104:5005',
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
