import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDTO } from './middleware/create-booking-dto';
import { Booking } from './booking.entity';

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
    } else {
      return provider;
    }
  }


  async getBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }
}
