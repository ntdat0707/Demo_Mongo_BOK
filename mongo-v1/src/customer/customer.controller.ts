import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './middleware/create-customer-dto';
import { Customer } from './customer.entity';
import { JwtAuthGuard } from 'src/auth/middleware/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('customer')
@UseGuards(JwtAuthGuard)
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
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customerService.getUser(id);
  }

  @Post('/logged')
  async getUserLoggedInfo(@GetUser() user: User):Promise<Customer> {
   return this.customerService.getUserLoggedInfo(user);
  }
}
