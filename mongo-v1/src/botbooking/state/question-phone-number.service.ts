import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateQuestionPhoneNumber extends State {
  constructor() {
    super();
    this.name = "quesiton_phone_number";
    this.hashMessage = "";
  }
}
