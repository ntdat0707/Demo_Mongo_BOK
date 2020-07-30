import { Entity, BaseEntity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class BotBooking extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  sender:string;

  @Column()
  state:string;

  @Column()
  message:string;
 
  @Column()
  data:any
}
