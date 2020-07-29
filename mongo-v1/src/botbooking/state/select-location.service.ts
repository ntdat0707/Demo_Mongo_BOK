import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateSelectLocation extends State {
  constructor() {
    super();
    this.name = "select_location";
    this.hashMessage = "select_location";
  }
}
