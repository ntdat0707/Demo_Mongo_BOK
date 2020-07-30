import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private globalcityService: GlobalCityService,
    private serviceproviderService: ServiceproviderService,
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    let mess = await this.botRepository.setStateToFE(requestFE);
     let botbooking = new BotBooking();    
    botbooking = await this.botRepository.sendReplyToRasa(mess);
    botbooking.data = await this.setDataToFE(requestFE);

    console.log('Bot Booking state', botbooking);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO): Promise<any> {
    let data = [];
    switch (requestFE.state) {
      case 'start':
        var user_infor =
          requestFE.message == null
            ? []
            : await this.getUserLoggedInfo(requestFE.message);
        break;

      case 'follow_information':
        data = await this.stateWelcome(requestFE.message);
        return data;

      case 'select_location':
        data = await this.stateSelectLocation(requestFE['message']);
        return data;

      case 'nearest_branch':
        return (data = [
          'Whitening',
          'Checks-up',
          'Braces',
          'Implant',
          'Fillings',
        ]);

      case 'select_service':
        return await this.getProducts(70, requestFE['message']);

      case 'question_name':
        return data;

      case 'question_phone_number':
        return data;

      case 'question_email':
        return data;

      case 'select_doctor':
        return await this.getDentists(71);

      case 'date_booking':
        return data;

      case 'thankyou_booking':
        this.sendEmailNotification(requestFE['data']);
        return data;
    }
    return !user_infor ? data : user_infor;
  }

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
    let data = [];
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

    let info = await transporter.sendMail({
      from: 'nguyentandat.email07@gmail.com', // sender address
      to: data['email'], // list of receivers
      subject: 'This is your appointment ✔', // Subject line
      text: '', // plain text body
      html:
        '<p>Hi,Ms.A</p><p>This is your appoinment information. Please check it again</p><p>Time:&nbsp;<strong>'+data['time']+'</strong></p><p>Doctor:&nbsp;<strong>'+data['doctor']+'</strong></p><p>Service:&nbsp;<strong>'+data['service']+'</strong></p>',
    });
    await transporter.sendMail(info);
  }
}
