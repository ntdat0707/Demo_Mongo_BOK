import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateSelectDoctor extends State {

  constructor() {
    super();
    this.name = "select_doctor";
    this.hashMessage = "select_doctor";
  }

  async getDataReply(requestFE: MessageFEDTO) {
    return await this.getDentists(71);
  }

  async getDentists(provider_id: number): Promise<any> {
    return await this.service['serviceproviderService'].getDentists(provider_id);
  }
}
