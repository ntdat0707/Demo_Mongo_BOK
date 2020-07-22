import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Conservation extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn()
  conversation_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp = new Date();
}
