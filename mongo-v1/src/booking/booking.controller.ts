import { Controller, Post, Body, Get, Param, ValidationPipe} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDTO } from './middleware/create-booking-dto';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  generateBooking(
    @Body(ValidationPipe) createBookingDTO: CreateBookingDTO,
  ): Promise<Booking> {
    return this.bookingService.generateBooking(createBookingDTO);
  }

  @Get('/provider/:id')
  getProvider(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.getProvider(id);
  }

  @Get('/dentist/:id')
  getDentist(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.getDentist(id);
  }
}
