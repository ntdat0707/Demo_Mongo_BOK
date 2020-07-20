import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  product_id: string;

  @Column()
  provider_id: string;

  @Column()
  dentist_id: string;

  @Column()
  price: string;

  @Column()
  time: string;
}
