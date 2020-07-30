import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateFollowInformation extends State {
  constructor(
  ) {
    super();
    this.name = "follow_information";
    this.hashMessage = "";
  }

  async getDataRely(requestFE: MessageFEDTO) {
    return await this.welcome(requestFE.message); 
  }

  async welcome(message: string): Promise<any> {
    let data = [];
    if (message == "That's great") {
      return this.service['globalcityService'].getCities();
    } else {
      return data;
    }
  }
}
