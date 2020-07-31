import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateNeartestBranch extends State {
  constructor() {
    super();
    this.name = "nearest_branch";
    this.hashMessage = "selected_nearest_branches";
  }
  
  getDataReply(requestFE: MessageFEDTO): any {
    return [
        'Whitening',
        'Checks-up',
        'Braces',
        'Implant',
        'Fillings',
    ];
  }
}
