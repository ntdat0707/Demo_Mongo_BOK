import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDTO } from './middleware/create-customer-dto';
import { Customer } from './customer.entity';
import { User } from '../auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
 
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository) {}

  async createUser(customerDTO: CreateCustomerDTO): Promise<Customer> {
    return this.customerRepository.createUser(customerDTO);
  }

  async getUsers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async getUser(userID: number): Promise<Customer> {
    const user = await this.customerRepository.findOne({ user_id: userID });
    if (!user) {
      throw new NotFoundException(`Not found this User id: ${userID}`);
    } else {
      return user;
    }
  }

async getUserByEmail(userEmail: string): Promise<Customer> {
    const user = await this.customerRepository.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException(`Not found this User id: ${userEmail}`);
    } else {
      return user;
    }
  }

  async getUserLoggedInfo(user: User):Promise<Customer> {
    console.log('User Logged update',user);
    const customer = await this.getUserByEmail(user.email);
    return customer;
  }


}
