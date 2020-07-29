import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateQuestionName extends State {
  constructor() {
    super();
    this.name = "question_name";
    this.hashMessage = "";
  }
}
