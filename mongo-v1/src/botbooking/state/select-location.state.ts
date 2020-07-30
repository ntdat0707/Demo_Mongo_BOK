import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';
import {ServiceproviderService} from 'src/serviceprovider/serviceprovider.service';

export class StateSelectLocation extends State {
  constructor(
    private serviceproviderService: ServiceproviderService
  ) {
    super();
    this.name = "select_location";
    this.hashMessage = "select_location";
  }

  async getDataRely(requestFE: MessageFEDTO) {
    return await this.selectLocation(requestFE.message);
  }

  async selectLocation(city: string): Promise<string[]> {
    console.log('City', city);
    console.log(
      'response_FE.Data',
      await this.serviceproviderService.getAddresses(city),
    );
    return await this.serviceproviderService.getAddresses(city);
  }
}
