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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://Test1:123@cluster0-ga0wm.azure.mongodb.net/Wesere_Test?retryWrites=true&w=majority',
      database: 'Wesere_Test',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Booking, Dentist, ServiceProvider, Product],
    }),
    BookingModule,
    DentistModule,
    ServiceproviderModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
