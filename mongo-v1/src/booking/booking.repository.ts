import { Booking } from './booking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBookingDTO } from './dto/create-booking-dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async createBooking(createBookingDTO: CreateBookingDTO): Promise<Booking> {
    const {
      customer_name,
      phone,
      email,
      product_id,
      provider_id,
      dentist_id,
      price,
      time,
    } = createBookingDTO;
    
    const booking = new Booking();
    booking.customer_name = customer_name;
    booking.phone = phone;
    booking.email = email;
    booking.product_id = product_id;
    booking.provider_id = provider_id;
    booking.dentist_id = dentist_id;
    booking.price = price;
    booking.time = time;

    try{
        await booking.save();
        return booking;
    }
    catch (err){
        console.log(`Error: ${err}, Error code: ${err.code}`);  
        throw new InternalServerErrorException();
    };
  }
}
