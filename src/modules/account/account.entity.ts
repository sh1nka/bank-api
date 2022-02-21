import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class Account {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @Column({ default: null, select: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'float', default: null })
  balance: number;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
