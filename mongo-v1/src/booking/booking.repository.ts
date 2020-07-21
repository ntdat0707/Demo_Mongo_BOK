import { Booking } from './booking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBookingDTO } from './middleware/create-booking-dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async generateBooking(createBookingDTO: CreateBookingDTO): Promise<Booking> {
    const {
      booking_id,
      user,
      provider_id,
      provider_name,
      product,
      dentist_id,
      dentist_name,
      cus_booking_time,
    } = createBookingDTO;

    const booking = new Booking();
    booking.booking_id = booking_id;
    booking.user = user;
    booking.provider_id = provider_id;
    booking.provider_name = provider_name;
    booking.product = product;
    booking.dentist_id = dentist_id;
    booking.dentist_name = dentist_name;
    booking.cus_booking_time = cus_booking_time;

    try {
      await booking.save();
      return booking;
    } catch (err) {
      console.log(`Error: ${err}, Error code: ${err.code}`);
      throw new InternalServerErrorException();
    }
  }

  //async getDentist(dent)
}
