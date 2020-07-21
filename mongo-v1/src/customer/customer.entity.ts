import { ObjectIdColumn, BaseEntity, PrimaryColumn, Column, Entity } from "typeorm";

@Entity()
export class Customer extends BaseEntity{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    user_id:number;

    @Column()
    name:string;

    @Column()
    phone:string;

    @Column()
    email:string;
}