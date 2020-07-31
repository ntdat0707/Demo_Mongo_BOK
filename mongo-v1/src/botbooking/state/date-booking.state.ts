import { State } from './class/state.class';
import { MessageFEDTO } from '../middleware/getmessage-fe-dto';

export class StateDateBooking extends State {
  constructor() {
    super();
    this.name = 'date_booking';
    this.hashMessage = 'choice date booking';
  }

  getDataReply(requestFE: MessageFEDTO) {
    return [];
  }
}
