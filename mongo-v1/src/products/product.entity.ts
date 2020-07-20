import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, ObjectIdColumn, Double, PrimaryColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    product_id:number;

    @Column()
    product_kind:string;

    @Column()
    product_name:string;

    @Column()
    product_price:number;
    
    // @ManyToOne(type => User, user => user.tasks, { eager: false })
    // user: User;
}