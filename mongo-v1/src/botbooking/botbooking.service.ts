import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from '../globalcity/globalcity.service';
import { ServiceproviderService } from '../serviceprovider/serviceprovider.service';
import { CreateBookingDTO } from '../booking/middleware/create-booking-dto';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/booking.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/customer/customer.entity';
import { text } from 'express';

require('dotenv').config();
@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private globalcityService: GlobalCityService,
    private serviceproviderService: ServiceproviderService,
    private bookingService: BookingService,
    private customerService: CustomerService,
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    const mess = await this.botRepository.setStateToFE(requestFE);
    let botbooking = new BotBooking();
    botbooking = await this.botRepository.sendReplyToRasa(requestFE, mess);

    console.log('Bot-Booking', botbooking);
    // if (botbooking.state == 'select_specific_service') {
    //   botbooking.message = [`Which kind of ${requestFE.message} in specific?`];
    // }

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
        if (requestFE.message.toUpperCase() != "THAT'S GREAT") {
          dataRes['type'] = 'text';
        } else {
          dataRes['type'] = 'select_locations';
        }
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
        dataRes['type'] = 'text';
        dataRes['data'] = data;
        return dataRes;

      case 'question_phone_number':
        dataRes['type'] = 'text';
        dataRes['data'] = data;
        return dataRes;

      case 'question_phone_number_again':
        dataRes['type'] = 'text';
        dataRes['data'] = data;
        return dataRes;

      case 'question_email':
        console.log("REQ_FE state",requestFE.state);
        if (requestFE.state != null) {
          data = await this.afterRegisEmail(requestFE);
          dataRes['type'] = 'select_locations';
          dataRes['data'] = data;
        } else {
          dataRes['type'] = 'text';
          dataRes['data'] = data;
        }
        dataRes['data'] = data;

        return dataRes;

      case 'question_email':
        data = await this.afterRegisEmail(requestFE);
        dataRes['type'] = 'select_locations';
        dataRes['data'] = data;
        return dataRes;

      case 'question_email_again':
        dataRes['type'] = 'select_locations';
        dataRes['data'] = data;
        return dataRes;

      case 'select_specific_service':
        dataRes['type'] = 'select_doctor';
        dataRes['data'] = await this.getDentists(71);
        return dataRes;

      case 'select_doctor':
        //data = await this.getDentists(71);
        dataRes['type'] = 'select_date_booking';
        dataRes['data'] = data;
        return dataRes;

      case 'date_booking':
        dataRes['type'] = 'text_thankyou_booking';
        dataRes['data'] = data;
        return dataRes;

      case 'thankyou_booking':
        dataRes['type'] = 'send_email';
        dataRes['data'] = data;
        // await this.generateBooking(requestFE['data']);
        this.sendEmailNotification(requestFE['data']);
        return dataRes;

      case 'thankyou_confirm':
        data = await this.stateWelcome(requestFE.message);
        if (requestFE.message.toUpperCase() != 'ADD MORE BOOKING') {
          dataRes['type'] = 'text';
        } else {
          dataRes['type'] = 'select_locations';
        }
        dataRes['data'] = data;
        return dataRes;

      case 'my_appointment':
        dataRes['type'] = 'my_appointment';
        dataRes['data'] = data;
        return dataRes;
    }
  }

  //Use Token to validation and get data of User with Axios
  async getUserLoggedInfo(token: string): Promise<any> {
    const token_access = 'Bearer ' + token;
    const axios = require('axios').create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: token_access,
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
    if (
      message.toUpperCase() == "THAT'S GREAT" ||
      message.toUpperCase() == 'ADD MORE BOOKING'
    ) {
      return this.globalcityService.getCities();
    } else {
      return data;
    }
  }

  async signUpUser(requestFE: any) {
    const axios = require('axios').create({
      baseURL: 'http://localhost:3000',
    });
    return await axios
      .post('auth/signup', {
        username: requestFE.data.name,
        email: requestFE.message,
        password: 'abc@123',
      })
      .then(response => {
        console.log('Response SignUpAfter', response.status);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async createCustomer(requestFE: any) {
    let customer = new Customer();
    customer.name = requestFE.data.name;
    customer.phone = requestFE.data.phone;
    customer.email = requestFE.message;
    try {
      let newCustomer = await this.customerService.createUser(customer);
    } catch (error) {
      console.log('Error', error);
    }
  }

  async signIn(requestFE: any): Promise<any> {
    const axios = require('axios').create({
      baseURL: 'http://localhost:3000',
    });
    return await axios
      .post('auth/signin', {
        username: requestFE.data.name,
        password: 'abc@123',
        email:requestFE.message,
      })
      .then(response => {
        console.log('Response SignInAfter', response.status);
        console.log('Token', response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async afterRegisEmail(request: any): Promise<any> {
    await this.signUpUser(request);
    await this.createCustomer(request);
    let firstLogin = {};
    firstLogin['token'] = await this.signIn(request);
    firstLogin['cities'] = await this.globalcityService.getCities();
    return firstLogin;
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
  async sendEmailNotification(dataInput: CreateBookingDTO): Promise<any> {
    const nodemailer = require('nodemailer');
    const mailgun = require('nodemailer-mailgun-transport');
    const auth = {
      auth: {
        api_key: 'd8b96d145f3c1123b7a0f2a68f435cb3-913a5827-e3faf87c',
        domain: 'm.wisere.com',
      },
      // proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
    };
    const nodemailerMailgun = nodemailer.createTransport(mailgun(auth));

    const ejs = require('ejs');
    let dataEJS = {
      name: dataInput.user['name'],
      address: dataInput['address'],
      provider_name: dataInput['provider_name'],
      dentist_name: dataInput['dentist_name'],
      services: this.setServices(dataInput['products']['product_price_quote']),
      cus_booking_time: dataInput['cus_booking_time'],
    };

    let pathFile =
      __dirname + '/../../src/botbooking/emailTemplate/bookingconfirm.ejs';

    ejs.renderFile(pathFile, dataEJS, async function(err, data) {
      if (err) {
        console.log(err);
      } else {
        try {
          let infor = await nodemailerMailgun.sendMail({
            from: 'Wisere support <support@m.wisere.com>', // sender address
            to: dataInput.user['email'], // list of receivers
            subject: 'This is your appointment ✔', // Subject line
            html: data,
          });
          console.log('INFOR:', infor);
        } catch (err) {
          console.log('Err mail', err);
        }
      }
    });
  }

  setServices(products: Array<Object>): any {
    let services = [];
    for (const product of products) {
      services.push(product);
    }
    return services;
  }
}
