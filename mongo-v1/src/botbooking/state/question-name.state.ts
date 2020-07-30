import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';

export class StateQuestionName extends State {
  constructor() {
    super();
    this.name = "question_name";
    this.hashMessage = "";
  }

  getDataRely(requestFE: MessageFEDTO) {
    return [];
  }
}
