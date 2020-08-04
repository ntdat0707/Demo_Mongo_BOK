import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from '../globalcity/globalcity.service';
import { ServiceproviderService } from '../serviceprovider/serviceprovider.service';
import { CreateBookingDTO } from '../booking/middleware/create-booking-dto';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/booking.entity';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private globalcityService: GlobalCityService,
    private serviceproviderService: ServiceproviderService,
    private bookingService: BookingService,
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    const mess = await this.botRepository.setStateToFE(requestFE);
    let botbooking = new BotBooking();
    botbooking = await this.botRepository.sendReplyToRasa(mess);

    if (botbooking.state == 'select_specific_service') {
      botbooking.message = [`Which kind of ${requestFE.message} in specific?`];
    }

    let dataRes = await this.setDataToFE(requestFE);

    botbooking.data = dataRes['data'];
    botbooking.type = dataRes['type'];

    console.log('Bot Booking state', botbooking);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO): Promise<any> {
    let dataRes = {};
    let data = [];
    switch (requestFE.state) {
      case 'start':
        if (!requestFE.message) {
          dataRes['data'] = data;
        } else {
          dataRes['data'] = await this.getUserLoggedInfo(requestFE.message);
        }
        dataRes['type'] = 'button';
        return dataRes;

      case 'follow_information':
        data = await this.stateWelcome(requestFE.message);
        dataRes['type'] = 'select_locations';
        dataRes['data'] = data;
        return dataRes;

      case 'select_location':
        data = await this.stateSelectLocation(requestFE['message']);
        dataRes['type'] = 'select_address';
        dataRes['data'] = data;
        return dataRes;

      case 'nearest_branch':
        data = ['Whitening', 'Checks-up', 'Braces', 'Implant', 'Fillings'];

        dataRes['type'] = 'tags_service';
        dataRes['data'] = data;
        return dataRes;

      case 'select_service':
        data = await this.getProducts(70, requestFE['message']);
        dataRes['type'] = 'select_service';
        dataRes['data'] = data;
        return dataRes;

      case 'question_name':
        dataRes['type'] = 'text_name';
        dataRes['data'] = data;
        return dataRes;

      case 'question_phone_number':
        dataRes['type'] = 'text_phone_number';
        dataRes['data'] = data;
        return dataRes;

      case 'question_email':
        dataRes['type'] = 'text_email';
        dataRes['data'] = data;
        return dataRes;

      case 'select_specific_service':
        dataRes['type'] = 'text_service';
        dataRes['data'] = data;
        return dataRes;

      case 'select_doctor':
        data = await this.getDentists(71);
        dataRes['type'] = 'select_doctor';
        dataRes['data'] = data;
        return dataRes;

      case 'date_booking':
        dataRes['type'] = 'select_date_booking';
        dataRes['data'] = data;
        return dataRes;

      case 'thankyou_booking':
        dataRes['type'] = 'send_email';
        dataRes['data'] = data;
        await this.generateBooking(requestFE['data']);
        this.sendEmailNotification(requestFE['data']);
        return dataRes;
    }
  }

  //Use Token to validation and get data of User with Axios
  async getUserLoggedInfo(token: string): Promise<any> {
    const token_access = token;
    const axios = require('axios').create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${token_access}`,
      },
    });

    return await axios
      .post('/customer/logged')
      .then(response => {
        console.log('User Logged', response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async stateWelcome(message: string): Promise<any> {
    const data = [];
    if (message == "That's great") {
      return this.globalcityService.getCities();
    } else {
      return data;
    }
  }

  async stateSelectLocation(city: string): Promise<string[]> {
    console.log('City', city);
    console.log(
      'response_FE.Data',
      await this.serviceproviderService.getAddresses(city),
    );
    return await this.serviceproviderService.getAddresses(city);
  }

  async getDentists(provider_id: number): Promise<any> {
    return await this.serviceproviderService.getDentists(provider_id);
  }

  async getProducts(provider_id: number, kind: string): Promise<any> {
    return await this.serviceproviderService.getProducts(provider_id, kind);
  }

  async generateBooking(booking: CreateBookingDTO): Promise<Booking> {
    return await this.bookingService.generateBooking(booking);
  }

  //use nodemailer for send email notifications with parameters Data
  async sendEmailNotification(data: CreateBookingDTO): Promise<any> {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'nguyentandat.email07@gmail.com', // generated ethereal user
        pass: '091392134112', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    const services = this.setServices(data.products['product_price_quote']);
    console.log('Services', services);

    try {
      await transporter.sendMail({
        from: 'nguyentandat.email07@gmail.com', // sender address
        to: data.user['email'], // list of receivers
        subject: 'This is your appointment ✔', // Subject line
        text: '', // plain text body
        html:
          '<p>Hi,Mr/Ms:&nbsp;<strong>' +
          data.user['name'] +
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
    } catch (err) {
      console.log('Err mail', err);
    }
  }

  setServices(products: Array<Object>): string {
    let services = '';
    for (const product of products) {
      services =
        services == '' ? product['name'] : services + ' & ' + product['name'];
    }
    return services;
  }
}
