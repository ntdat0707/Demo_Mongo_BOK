import { BaseEntity, Column, ObjectIdColumn } from 'typeorm';

export class Notification extends BaseEntity {
    @ObjectIdColumn()
    _id:string;

    @Column()
    cus_booking_time: string;

    @Column()
    provider_id:number;

    @Column()
    provider_name:string;

    @Column()
    provider_location:string;

    @Column()
    product_id : number;

    @Column()
    product_name:string;

    @Column()
    product_price:number;

    @Column()
    dentist_id:number;

    @Column()
    dentist_name:string;
}
