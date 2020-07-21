import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDTO } from './middleware/create-customer-dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async createUser(customerDTO: CreateCustomerDTO): Promise<Customer> {
    return this.customerRepository.createUser(customerDTO);
  }
}
