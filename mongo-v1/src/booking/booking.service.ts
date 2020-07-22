import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDTO } from './middleware/create-booking-dto';
import { Booking } from './booking.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingRepository)
    private bookingRepository: BookingRepository,
  ) {}

  async generateBooking(createBookingDTO: CreateBookingDTO): Promise<Booking> {
    return this.bookingRepository.generateBooking(createBookingDTO);
  }

  async getProvider(provider_id: number): Promise<Booking> {
    const provider = await this.bookingRepository.findOne({
      provider_id: provider_id,
    });
    if (!provider) {
      throw new NotFoundException(
        `Can not found booking by provider id :"${provider_id}" `,
      );
    }
    else {
      return provider;
    }
  }

  // async getProduct(id:number):Promise<Booking>{
  //   const product_find = await this.bookingRepository.findOne({['product_id']:id});
  //   console.log('Product',product_find);
  //   if(!product_find){
  //     throw new NotFoundException(`Not found this Product id: ${product_id}`);
  //   }
  //   else {
  //     return product;
  //   }
  // }

  async getDentist(dentist_id: number): Promise<Booking> {
    const dentist = await this.bookingRepository.findOne({
      dentist_id: dentist_id,
    });
    if (!dentist) {
      throw new NotFoundException(
        `Can not found booking by provider id :"${dentist_id}" `
      );
    }
    else{
      return dentist;
    }
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }
}
