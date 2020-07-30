import { Column, Entity, BaseEntity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    product_id:number;

    @Column()
    product_kind:string;

    @Column()
    product_price_quote:object[];

}