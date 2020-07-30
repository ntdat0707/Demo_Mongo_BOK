import { IState } from "../interface/IState.interface"

export class State implements IState {
  public name: string;
  public hashMessage: string
  
  constructor() {
    this.name = "";
    this.hashMessage = "";
  }

  getMessage (data: any) {
    if (this.hashMessage) {
      return this.hashMessage;
    } 
    return data.message;
  }
  
  excute (data: any) {
    console.log("excute")
  }

  getDataRely (data: any) {
    console.log('getRely')
    return;
  }
}
