import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';
import {GlobalCityService} from 'src/globalcity/globalcity.service';

export class StateFollowInformation extends State {
  constructor(
    private globalcityService: GlobalCityService
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
      return this.globalcityService.getCities();
    } else {
      return data;
    }
  }
}
