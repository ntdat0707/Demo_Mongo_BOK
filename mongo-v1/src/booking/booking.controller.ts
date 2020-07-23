import { Controller, Post, Body, Get, Param, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDTO } from './middleware/create-booking-dto';
import { Product } from 'src/products/product.entity';

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
  getProvider(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getProvider(id);
  }

  @Get('/product/:id')
  getProduct(@Param('id',ParseIntPipe) id:number):Promise<Booking>{
    return this.bookingService.getProduct(id);
  }

  @Get('/dentist/:id')
  getDentist(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getDentist(id);
  }
}
