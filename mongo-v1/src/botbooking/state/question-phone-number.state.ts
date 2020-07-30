import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateQuestionPhoneNumber extends State {
  constructor() {
    super();
    this.name = "quesiton_phone_number";
    this.hashMessage = "";
  }

  getDataRely(requestFE: MessageFEDTO) {
    return [];
  }
}
