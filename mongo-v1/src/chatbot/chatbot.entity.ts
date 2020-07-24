import {
  Entity,
  BaseEntity,
  Column,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chatbot extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn()
  channel_id: string;

  @Column()

  message: object;

  @Column()
  response_Rasa: object;

  @Column()
  type: Language;
}
export enum Language {
  en = 'EN',
  vn = 'VN',
}
