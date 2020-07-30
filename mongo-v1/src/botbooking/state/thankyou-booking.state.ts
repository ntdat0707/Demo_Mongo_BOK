import { Injectable } from '@nestjs/common';
import { State } from './class/state.class';
import {MessageFEDTO} from '../middleware/getmessage-fe-dto';
import {CreateBookingDTO} from 'src/booking/middleware/create-booking-dto';
import {Booking} from 'src/booking/booking.entity';

export class StateThankYouBooking extends State {
  constructor(
  ) {
    super();
    this.name = "thankyou_booking";
    this.hashMessage = "";
  }

  async excute(requestFE: MessageFEDTO) {
    await this.sendEmailNotification(requestFE.data);
    await this.generateBooking(requestFE.data);
  }

  getDataRely(requestFE: MessageFEDTO) {
      return [];
  }

  async sendEmailNotification(data:object): Promise<any> {
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'nguyentandat.email07@gmail.com', // generated ethereal user
        pass: '091392134112', // generated ethereal password
      },
    });
    
    let services = await this.setServices(data['products']['product_price_quote']);
    
    let info = await transporter.sendMail({
      from: 'nguyentandat.email07@gmail.com', // sender address
      to: data['email'], // list of receivers
      subject: 'This is your appointment ✔', // Subject line
      text: '', // plain text body
      html:
        '<p>Hi,Mr/Ms:&nbsp;<strong>' +
        data['user']['name'] +
        '</strong></p><p>This is your appointment information. Please check it again:</p><table style="width: 80%;" border="5" cellpadding="5"><tbody><tr><td>Service Provider</td><td>Doctor</td><td>Service</td><td>Time</td></tr><tr><td>' +
        data['provider_name'] +
        '</td><td>' +
        data['dentist_name'] +
        '</td><td>' +
        services +
        '</td><td>' +
        data['cus_booking_time'] +
        '</td></tr></tbody></table>',
    });
    await transporter.sendMail(info);
  }

  async generateBooking(booking: CreateBookingDTO): Promise<Booking> {
    return await this.service['bookingservice'].generateBooking(booking);
  }
  
  async setServices(products: object[]): Promise<string> {
    let services = '';
    for (let product of products) {
      services =
        services == '' ? product['name'] : services + ' & ' + product['name'];
    }
    return await services;
  }
}
