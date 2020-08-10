import { Module } from '@nestjs/common';
import { BotbookingController } from './botbooking.controller';
import { BotBookingService } from './botbooking.service';
import { BotBookingRepository } from './botbooking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalCityModule } from 'src/globalcity/globalcity.module';
import { ServiceproviderModule } from 'src/serviceprovider/serviceprovider.module';
import { BookingModule } from 'src/booking/booking.module';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BotBookingRepository]),
    GlobalCityModule,
    ServiceproviderModule,
    BookingModule,
    AuthModule,
    CustomerModule
  ],
  controllers: [BotbookingController],
  providers: [BotBookingService],
})
export class BotbookingModule {}
