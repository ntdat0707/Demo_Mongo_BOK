import { Controller, Post, Body, Get, Param, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDTO } from './middleware/create-booking-dto';
import { Product } from 'src/products/product.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiCreatedResponse({ description: 'Create Booking' })
  @Post()
  generateBooking(
    @Body(ValidationPipe) createBookingDTO: CreateBookingDTO,
  ): Promise<Booking> {
    return this.bookingService.generateBooking(createBookingDTO);
  }

  @ApiOkResponse({ description: 'Get Provider' })
  @Get('/provider/:id')
  getProvider(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getProvider(id);
  }

  @ApiOkResponse({ description: 'Get Product' })
  @Get('/product/:id')
  getProduct(@Param('id',ParseIntPipe) id:number):Promise<Booking>{
    return this.bookingService.getProduct(id);
  }

  @ApiOkResponse({ description: 'Get Dentist' })
  @Get('/dentist/:id')
  getDentist(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getDentist(id);
  }
}
