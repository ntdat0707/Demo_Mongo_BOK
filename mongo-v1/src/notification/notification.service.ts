import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';
import { Booking } from 'src/booking/booking.entity';

@Injectable()
export class NotificationService {
    constructor(private bookingService: BookingService){}

    async getCustomerBooking(booking_id:number): Promise<Booking>{
        const bookings = await this.getBookings();
        let found = false;
        for (let booking of bookings){
            if(booking.booking_id === booking_id){
                found = true;
               return booking;
            }
        }
        if(found==false){
            throw new NotFoundException('Not Found');
        }
    }

    async getBookings():Promise<Booking[]>{
        return this.bookingService.getBooking();
    }
}
