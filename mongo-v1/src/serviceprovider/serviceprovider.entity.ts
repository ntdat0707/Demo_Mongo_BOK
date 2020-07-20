import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity()
export class ServiceProvider extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    provider_name: string;

    @Column()
    provider_products: string;

    @Column()
    provider_dentists: string;

    @Column()
    provider_location:string;

}