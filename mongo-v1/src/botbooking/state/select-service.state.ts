import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {ServiceproviderService} from 'src/serviceprovider/serviceprovider.service';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateSelectService extends State {
  constructor(
      private serviceproviderService: ServiceproviderService
  ) {
    super();
    this.name = "select_service";
    this.hashMessage = "select_service";
  }

  async getDataRely(requestFE: MessageFEDTO) {
    return this.getProducts(70, requestFE.message);
  }

  async getProducts(provider_id: number, kind: string): Promise<any> {
    return await this.serviceproviderService.getProducts(provider_id, kind);
  }
}
