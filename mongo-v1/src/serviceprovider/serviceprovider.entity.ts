import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class ServiceProvider extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn()
  provider_id: number;

  @Column()
  provider_name: string;

  @Column()
  location: string;

  @Column()
  products: object;

  @Column()
  dentists: object;
}
