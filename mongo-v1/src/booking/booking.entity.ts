import { ServiceProvider } from './../serviceprovider/serviceprovider.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Booking extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  booking_id: number;

  @Column()
  user:object;

  @Column()
  provider_id: number;

  @Column()
  provider_name: string;

  @Column()
  product:object;

  @Column()
  dentist_id: number;

  @Column()
  dentist_name: string;

  @Column()
  cus_booking_time: string;
}
