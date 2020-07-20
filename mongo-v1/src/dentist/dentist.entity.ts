import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Dentist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  provider_id: string;

  @Column()
  product_id: string;

  @Column()
  available_time: string;

  // @ManyToOne(type => User, user => user.tasks, { eager: false })
  // user: User;
}
