import { Injectable } from '@nestjs/common';
import { BotBookingRepository } from './botbooking.repository';
import { BotBooking } from './botbooking.entity';
import { MessageFEDTO } from './middleware/getmessage-fe-dto';
import { GlobalCityService } from 'src/globalcity/globalcity.service';
import { ServiceproviderService } from 'src/serviceprovider/serviceprovider.service';
import { Rasa } from 'src/rasa/rasa.entity';
import { DentistService } from 'src/dentist/dentist.service';

@Injectable()
export class BotBookingService {
  constructor(
    private botRepository: BotBookingRepository,
    private globalcityService: GlobalCityService,
    private serviceproviderService: ServiceproviderService,
    private dentistService: DentistService,
  ) {}

  async sendReplyToFE(requestFE: MessageFEDTO): Promise<BotBooking> {
    let rasa = new Rasa();
    rasa = await this.botRepository.responseRasa(requestFE);

    let botbooking = new BotBooking();
    botbooking.reply_fe = {
      state: rasa.message_rasa['state'],
      data: await this.setDataToFE(requestFE, rasa),
    };

    if (botbooking.reply_fe['state'] == 'follow_infomation') {
      if (botbooking.reply_fe['data'].length == 0) {
        botbooking.reply_fe['data'] = rasa.message_rasa;
      } else {
        botbooking.reply_fe['message_rasa'] = rasa.message_rasa;
      }
    }
    console.log('Bot Booking state', botbooking.reply_fe);
    return botbooking;
  }

  async setDataToFE(requestFE: MessageFEDTO, rasa: Rasa): Promise<any> {
    let data = [];

    switch (requestFE.message_fe.state) {
      case 'start':
        var user_infor =
          requestFE.message_fe.message == null
            ? []
            : await this.getUserLoggedInfo(requestFE.message_fe.message);
        break;

      case 'follow_information':
        data = await this.stateWelcome(requestFE.message_fe.message);
        return data;

      case 'select_location':
        data = await this.stateSelectLocation(
          requestFE.message_fe['message'],
        );
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
        return await this.getDentists();

      case 'question_name':
        return rasa.message_rasa;

      case 'question_phone_number':
        return rasa.message_rasa;

      case 'question_email':
        return rasa.message_rasa;

      case 'select_doctor':
        return rasa.message_rasa;

      case 'date_booking':
        return rasa.message_rasa;

      case 'thankyou_booking':
        this.sendEmailNotification();
        return rasa.message_rasa;
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

  async getDentists(): Promise<any> {
    return await this.dentistService.getDentists();
  }

  async sendEmailNotification():Promise<any>{
    const nodemailer = require("nodemailer");
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'nguyentandat.email07@gmail.com', // generated ethereal user
        pass: '091392134112', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'nguyentandat.email07@gmail.com', // sender address
      to: "nguyentandat.email07@gmail.com", // list of receivers
      subject: "This is your appointment ✔", // Subject line
      text: "Hello Ms.A,This is your appointment. Please check it again Time Doctor Service Jan 02 2020-15:30 Cameron Implant Korea - Dentium --- Ziconia" , // plain text body
      html: `<p>Hello<b>Ms.A,</b><br>This is your appointment.Please check it again<br><style type='text/css'>.tg {border-collapse:collapse;border-spacing:0;}.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px; overflow:hidden;padding:10px 5px;word-break:normal;}.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px; font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}.tg .tg-0lax{text-align:left;vertical-align:top}</style><table class="tg"><thead> <tr> <th class='tg-0lax>Time</th> <th class="tg-0lax">Doctor</th> <th class="tg-0lax">Service</th> </tr></thead><tbody> <tr> <td class="tg-0lax">Jan 02 2020 - 15:00</td> <td class="tg-0lax">Cameron</td> <td class="tg-0lax">Implant Korea - Dentium --- Ziconia</td> </tr></tbody></table></p>`, // html body
    });
    await transporter.sendMail(info);
  }
}
