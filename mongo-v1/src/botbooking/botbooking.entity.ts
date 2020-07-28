import { Entity, BaseEntity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class BotBooking extends BaseEntity {
    @ObjectIdColumn()
    _id:string;
    
    @Column()
    message_fe: { state: string, data: {message:string,data:string} };

    @Column()
    reply_fe: { state: string, data: object };

}