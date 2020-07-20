import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDTO } from './dto/create-booking-dto';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(BookingRepository)
        private bookingRepository: BookingRepository
    ) { }
    
    async createBooking(createBookingDTO:CreateBookingDTO):Promise<Booking>{
        return this.bookingRepository.createBooking(createBookingDTO);
    }

}
