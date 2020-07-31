import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateSelectService extends State {
  constructor() {
    super();
    this.name = "select_service";
    this.hashMessage = "select_service";
  }

  async getDataReply(requestFE: MessageFEDTO) {
    return this.getProducts(70, requestFE.message);
  }

  async getProducts(provider_id: number, kind: string): Promise<any> {
    return await this.service['serviceproviderService'].getProducts(provider_id, kind);
  }
}
