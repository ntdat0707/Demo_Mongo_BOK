import { IState } from "../interface/IState.interface"
import {MessageFEDTO} from "src/botbooking/middleware/getmessage-fe-dto";

export class State implements IState {
  public name: string;
  public hashMessage: string;
  public service: object; 
  
  constructor() {
    this.name = "";
    this.hashMessage = "";
  }

  getMessage (data: MessageFEDTO) {
    if (this.hashMessage) {
      return this.hashMessage;
    } 
    return data.message;
  }
  
  excute (data: MessageFEDTO) {
    console.log("excute")
  }

  getDataReply (data: MessageFEDTO) {
    console.log('getRely')
    return;
  }
}
