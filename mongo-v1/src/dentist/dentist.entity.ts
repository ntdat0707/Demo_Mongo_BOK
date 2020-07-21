import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Dentist extends BaseEntity {
  @ObjectIdColumn()
  _id: number;

  @PrimaryGeneratedColumn()
  dentist_id:number;

  @Column()
  dentist_name: string;

  @Column()
  dentist_email: string;

  @Column()
  dentist_phone: string;

  // @ManyToOne(type => User, user => user.tasks, { eager: false })
  // user: User;
}
