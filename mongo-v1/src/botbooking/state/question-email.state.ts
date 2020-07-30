import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateQuestionEmail extends State {
  constructor() {
    super();
    this.name = "question_email";
    this.hashMessage = "";
  }

  getDataRely(requestFE: MessageFEDTO) {
    return [];
  }
}
