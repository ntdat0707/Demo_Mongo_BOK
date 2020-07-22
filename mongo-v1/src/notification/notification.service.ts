import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';
import { Booking } from 'src/booking/booking.entity';
import { BookingRepository } from 'src/booking/booking.repository';

@Injectable()
export class NotificationService {
  constructor(
    private bookingService: BookingService,
    private bookingRepository: BookingRepository,
  ) {}

  async getCustomerBooking(customer_id: number): Promise<Booking> {
    const bookings = await this.bookingService.getBookings();
   
    let found = false;
    for (const booking of bookings) {
      if (booking.user['user_id'] == customer_id) {
        return await booking;
      }
    }
    if (found == false) {
      throw new NotFoundException('Not Found');
    }
  }

  async sendEmailNotification(content: string, id: number): Promise<void> {
    //setting nodemailer
    var nodemailer = require('nodemailer');
    const booking = await this.bookingRepository.findOne({booking_id:id})
    var transpoter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'luckyrain07@gmail.com', //edit less security apps on gmail
        pass: '091392134112',
      },
    });

    //Setting email
    var mailOptions = {
      from: 'luckyrain07@gmail.com',
      to: 'nguyentandat.email07@gmail.com',
      subject: content,
      text: `Hi ${booking.user['name']} 
     This is your Booking detail:Booking Time: ${booking['cus_booking_time']} ,
      Service:${booking.product['product_name']}, Dentist:${booking['dentist_name']}`,
      html: `<p>Hi,<strong>${booking.user['name']}</strong><br>This is your Booking detail:<br>
      -\nBooking Time:\n<strong>${booking['cus_booking_time']}</strong><br>-\nService:\n<strong>${booking.product['product_name']}</strong><br>-\nDentist:\n<strong>${booking['dentist_name']}</strong></p>`,
    };

    transpoter.sendMail(mailOptions, (error, infor) => {
      if (error) {
        console.log('Error mail', error);
      } else {
        console.log('Email sent' + JSON.stringify(infor));
      }
    });
  }

  async createEmailContent(id: number): Promise<Booking> {
    const bookings = await this.bookingService.getBookings();
    const booking = await bookings.find(booking => booking.booking_id == id);
    if (!booking) {
      throw new NotFoundException('Not found this booking');
    } else {
      return booking;
    }
  }
}
