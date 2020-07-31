import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { DentistModule } from './dentist/dentist.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ChatbotModule } from './chatbot/chatbot.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { GlobalCityModule } from './globalcity/globalcity.module';
import { BotBookingModule } from './botbooking/botbooking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BookingModule,
    DentistModule,
    ServiceproviderModule,
    ProductsModule,
    ChatbotModule,
    CustomerModule,
    AuthModule,
    GlobalCityModule,
    BotBookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
