import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateFollowInformation extends State {
  constructor() {
    super();
    this.name = "follow_information";
    this.hashMessage = "";
  }
}
