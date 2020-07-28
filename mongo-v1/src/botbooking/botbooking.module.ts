import { Module } from '@nestjs/common';
import { BotbookingController } from './botbooking.controller';
import { BotBookingService } from './botbooking.service';
import { BotBookingRepository } from './botbooking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalCityModule } from 'src/globalcity/globalcity.module';
import { ServiceproviderModule } from 'src/serviceprovider/serviceprovider.module';

@Module({
  imports: [TypeOrmModule.forFeature([BotBookingRepository]),GlobalCityModule,ServiceproviderModule],
  controllers: [BotbookingController],
  providers: [BotBookingService]
})
export class BotbookingModule {}
