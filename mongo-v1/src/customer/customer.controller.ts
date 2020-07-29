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
import { ApiTags, ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @ApiOkResponse({ description: 'successs' })
  @Get('/all')
  async getUsers(): Promise<Customer[]> {
    return this.customerService.getUsers();
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiOkResponse({ description: 'successs' })
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Post()
  async createUser(
    @Body(ValidationPipe) customerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return this.customerService.createUser(customerDTO);
  }

  @ApiOperation({ summary: 'Get User by id' })
  @ApiOkResponse({ description: 'successs' })
  @ApiNotFoundResponse({description: 'Bad requets - input invalid'})
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.customerService.getUser(id);
  }

  @ApiOperation({ summary: 'Get user information by token' })
  @ApiOkResponse({ description: 'successs' })
  @ApiInternalServerErrorResponse({ description:'Interal server errors'})
  @Post('/logged')
  async getUserLoggedInfo(@GetUser() user: User):Promise<Customer> {
   return this.customerService.getUserLoggedInfo(user);
  }
}
