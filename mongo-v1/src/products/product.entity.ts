import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_kind:string;

    @Column()
    product_name:string;

    @Column()
    product_price:string;
    
    // @ManyToOne(type => User, user => user.tasks, { eager: false })
    // user: User;
}