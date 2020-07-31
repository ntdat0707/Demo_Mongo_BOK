import { BotBooking } from './botbooking.entity'; import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BotBooking)
export class BotBookingRepository extends Repository<BotBooking> {
}
