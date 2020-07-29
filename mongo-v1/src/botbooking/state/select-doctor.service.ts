import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateSelectDoctor extends State {
  constructor() {
    super();
    this.name = "select_doctor";
    this.hashMessage = "select_doctor";
  }
}
