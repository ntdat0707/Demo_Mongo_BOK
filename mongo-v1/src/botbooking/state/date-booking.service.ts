import { Injectable } from '@nestjs/common';
import { State } from './state.class';

export class StateDateBooking extends State {
  constructor() {
    super();
    this.name = "date_booking";
    this.hashMessage = "choice date booking";
  }
}
