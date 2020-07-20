import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDTO } from './dto/create-booking-dto';
import { Booking } from './booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  createBooking(
      @Body() createBookingDTO: CreateBookingDTO): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDTO);
  }
}
