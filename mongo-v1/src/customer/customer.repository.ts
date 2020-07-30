import { Customer } from './customer.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateCustomerDTO } from './middleware/create-customer-dto';
import {
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async createUser(customerDTO: CreateCustomerDTO): Promise<Customer> {
    const { user_id, name, phone, email } = customerDTO;
    const customer = new Customer();
    customer.user_id = user_id;
    customer.name = name;
    customer.phone = phone;
    customer.email = email;

    try {
      await customer.save();
      return customer;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

}
