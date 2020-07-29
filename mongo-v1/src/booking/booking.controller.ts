import { Controller, Post, Body, Get, Param, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDTO } from './middleware/create-booking-dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiOperation, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create Booking' })
  @ApiOkResponse({ description: 'successs' })
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Post()
  generateBooking(
    @Body(ValidationPipe) createBookingDTO: CreateBookingDTO,
  ): Promise<Booking> {
    return this.bookingService.generateBooking(createBookingDTO);
  }

  @ApiOperation({ summary: 'Get Provider' })
  @ApiOkResponse({ description: 'successs' })
  @ApiNotFoundResponse({ description:'Bad requets - input invalid'})
  @Get('/provider/:id')
  getProvider(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getProvider(id);
  }

  @ApiOperation({ summary: 'Get Product' })
  @ApiOkResponse({ description: 'successs' })
  @ApiNotFoundResponse({ description:'Bad requets - input invalid'})
  @Get('/product/:id')
  getProduct(@Param('id',ParseIntPipe) id:number):Promise<Booking>{
    return this.bookingService.getProduct(id);
  }

  @ApiOperation({ summary: 'Get Dentists' })
  @ApiOkResponse({ description: 'successs' })
  @ApiNotFoundResponse({ description:'Bad requets - input invalid'})
  @Get('/dentist/:id')
  getDentist(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getDentist(id);
  }
}
