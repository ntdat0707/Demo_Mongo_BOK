import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateStart extends State {
  constructor() {
    super();
    this.name = "start";
    this.hashMessage = "start";
  }
}
