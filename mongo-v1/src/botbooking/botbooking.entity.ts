import { Entity, BaseEntity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class BotBooking extends BaseEntity {
    @ObjectIdColumn()
    _id:string;
    
    @Column()
    message_fe: { state: string, data: object };

    @Column()
    reply_fe: { state: string, data: object };

    @Column()
    message_rasa: { message: string[]; state: string; data: object };

    @Column()
    reply_rasa:{ message: string};
}