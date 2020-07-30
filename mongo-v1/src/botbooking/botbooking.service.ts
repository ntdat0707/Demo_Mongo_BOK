import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository
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
    let state = this.botRepository.stateService.getState(requestFE.state)
    state.excute(requestFE);
    let data = await state.getDataRely(requestFE);
    return data;
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
