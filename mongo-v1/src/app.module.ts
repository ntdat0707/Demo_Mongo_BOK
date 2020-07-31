import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { DentistModule } from './dentist/dentist.module';
import { ServiceproviderModule } from './serviceprovider/serviceprovider.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { GlobalCityModule } from './globalcity/globalcity.module';
import { BotbookingModule } from './botbooking/botbooking.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BookingModule,
    DentistModule,
    ServiceproviderModule,
    ProductsModule,
    CustomerModule,
    AuthModule,
    GlobalCityModule,
    BotbookingModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
