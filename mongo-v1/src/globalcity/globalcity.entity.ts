import { Column, Entity, BaseEntity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class GlobalCity extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    city_id:number;

    @Column()
    name:string;

}