import { Entity, BaseEntity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class Rasa extends BaseEntity {
    @ObjectIdColumn()
    _id:number;

    @Column()
   // message_rasa: { message: string[]; state: string; data: any };
    message_rasa: object;
}