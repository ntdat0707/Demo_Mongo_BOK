import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './middleware/create-customer-dto';
import { Customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/all')
  async getUsers(): Promise<Customer[]> {
    return this.customerService.getUsers();
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) customerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return this.customerService.createUser(customerDTO);
  }

  @Get('/:id')
  async getUser(@Param('id',ParseIntPipe) id: number): Promise<Customer> {
    return this.customerService.getUser(id);
  }
}
