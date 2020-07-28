import { Entity, BaseEntity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class BotBooking extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  //message_fe:object;
  message_fe: { state: string; message: string; data: any  };

  @Column()
  //reply_fe: object;
  reply_fe: { state: string; data: any };
}
