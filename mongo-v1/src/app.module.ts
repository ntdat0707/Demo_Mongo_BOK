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
import { ConservationModule } from './conservation/conservation.module';
import { CustomerModule } from './customer/customer.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { GlobalCityModule } from './globalcity/globalcity.module';
import { BotbookingModule } from './botbooking/botbooking.module';
import { RasaModule } from './rasa/rasa.module';




@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BookingModule,
    DentistModule,
    ServiceproviderModule,
    ProductsModule,
    ChatbotModule,
    ConservationModule,
    CustomerModule,
    NotificationModule,
    AuthModule,
    GlobalCityModule,
    BotbookingModule,
    RasaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
