import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';
import {ServiceproviderService} from 'src/serviceprovider/serviceprovider.service';

export class StateSelectDoctor extends State {
  constructor(
      private serviceproviderService: ServiceproviderService
  ) {
    super();
    this.name = "select_doctor";
    this.hashMessage = "select_doctor";
  }

  async getDataRely(requestFE: MessageFEDTO) {
    return await this.getDentists(71);
  }

  async getDentists(provider_id: number): Promise<any> {
    return await this.serviceproviderService.getDentists(provider_id);
  }
}
