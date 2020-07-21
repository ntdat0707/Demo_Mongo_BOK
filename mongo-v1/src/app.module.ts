import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { DentistModule } from './dentist/dentist.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { Dentist } from './dentist/dentist.entity';
import { ServiceProvider } from './serviceprovider/serviceprovider.entity';
import { Product } from './products/product.entity';
import { Booking } from './booking/booking.entity';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ConservationModule } from './conservation/conservation.module';
import { CustomerModule } from './customer/customer.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
