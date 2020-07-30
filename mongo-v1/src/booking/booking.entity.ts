import {
  Column,
  Entity,
  BaseEntity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  booking_id: number;

  @Column()
  user: object;

  @Column()
  provider_id: number;

  @Column()
  provider_name: string;

  @Column()
  products: object;

  @Column()
  dentist_id: number;

  @Column()
  dentist_name: string;

  @Column()
  cus_booking_time: string;
}
