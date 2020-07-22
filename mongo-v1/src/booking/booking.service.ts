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
    const bookings = await this.getBooking();
    let found = false;
    for (const booking of bookings) {
      if (booking.provider_id == provider_id) {
        found = true;
        console.log('Booking:',booking.user['user_id']);
        return booking;
      }
    }

    if (found === false) {
      throw new NotFoundException(
        `Can not found booking by provider id :"${provider_id}" `,
      );
    }
  }

  async getDentist(dentist_id: number): Promise<Booking> {
    const bookings = await this.getBooking();
    let found = false;
    for (const booking of bookings) {
      if (booking.dentist_id == dentist_id) {
        found = true;
        return await booking;
      }
    }
    
    if (found === false) {
      throw new NotFoundException(
        `Can not found booking by provider id :"${dentist_id}" `,
      );
    }
  }

  async getBooking(): Promise<Booking[]> {

    return this.bookingRepository.find();
  }
}
