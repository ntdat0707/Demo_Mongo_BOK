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

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'mail.google.com',
    //     service: 'gmail',
    //     port: 587,
    //     secure: false, // upgrade later with STARTTLS
    //     auth: {
    //       user: "username",
    //       pass: "password",
    //     },
    //   },
    //   defaults: {
    //     from:'"nest-modules" <modules@nestjs.com>',
    //   },
    //   template: {
    //     dir: process.cwd() + '/templates/',
    //     adapter: new PugAdapter(), // or new PugAdapter()
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BookingModule,
    DentistModule,
    ServiceproviderModule,
    ProductsModule,
    ChatbotModule,
    ConservationModule,
    CustomerModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
