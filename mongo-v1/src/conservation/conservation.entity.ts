import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ObjectIdColumn, Column } from 'typeorm';
import { CreateCustomerDTO } from 'src/customer/middleware/create-customer-dto';

@Entity()
export class Conservation extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn()
  conversation_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp = new Date();

  @Column()
  conversation:{content:string,user:CreateCustomerDTO};
  
}
