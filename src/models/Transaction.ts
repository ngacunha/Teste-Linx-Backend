import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import CreditCard from './CreditCard';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  purchase_id: string;

  @Column()
  client_id: string;

  @Column()
  client_name: string;

  @Column()
  total_to_pay: number;

  @OneToOne(() => CreditCard, {
    cascade: true,
  })
  credit_card: CreditCard;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
