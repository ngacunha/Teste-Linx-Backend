import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('creditcards')
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_number: string;

  @Column()
  card_holder_name: string;

  @Column()
  value: number;

  @Column()
  cvv: number;

  @Column()
  exp_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CreditCard;
