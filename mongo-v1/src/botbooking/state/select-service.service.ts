import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateSelectService extends State {
  constructor() {
    super();
    this.name = "select_service";
    this.hashMessage = "select_service";
  }
}
