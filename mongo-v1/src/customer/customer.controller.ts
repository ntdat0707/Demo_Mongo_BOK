import { Controller, Post, Get, Body, Param, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './middleware/create-customer-dto';
import { Customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async createUser(@Body(ValidationPipe) customerDTO: CreateCustomerDTO): Promise<Customer> {
    return this.customerService.createUser(customerDTO);
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<Customer> {
      return this.customerService.getUser(id);
  }
}
