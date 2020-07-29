import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateNeartesBranch extends State {
  constructor() {
    super();
    this.name = "nearest_branch";
    this.hashMessage = "selected_nearest_branches";
  }
}
