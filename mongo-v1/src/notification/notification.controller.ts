import { Controller, Post, Query, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Booking } from 'src/booking/booking.entity';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('/:id')
  async getCustomerBooking(@Param('id',ParseIntPipe) id: number): Promise<Booking> {
    return this.notificationService.getCustomerBooking(id);
  }
  @Post()
  sendEmailNotification(
    @Query('content') content: string,
    @Query('id',ParseIntPipe) id: number,
  ):Promise<void> {
    return this.notificationService.sendEmailNotification(content, id);
  }
}
