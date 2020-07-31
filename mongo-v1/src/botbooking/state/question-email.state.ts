import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateQuestionEmail extends State {
  constructor() {
    super();
    this.name = "question_email";
    this.hashMessage = "";
  }

  getDataReply(requestFE: MessageFEDTO) {
    return [];
  }
}
