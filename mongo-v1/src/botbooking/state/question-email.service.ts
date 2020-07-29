import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateQuestionEmail extends State {
  constructor() {
    super();
    this.name = "question_email";
    this.hashMessage = "";
  }
}
