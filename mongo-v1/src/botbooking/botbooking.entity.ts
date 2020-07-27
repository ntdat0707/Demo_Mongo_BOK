import { Entity, BaseEntity, Column, Column } from "typeorm";

@Entity()
export class BotBooking extends BaseEntity {
    @Column()
    message: object;

    @Column()
    reply: object;
}