import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('withdraws')
export class WithdrawEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: string;

  @Column()
  balance: string;

  @Column()
  reachDate: Date;

  @Column({nullable: true})
  applyDate: Date;

  @Column({nullable: true})
  bankName: string;

  @Column({nullable: true})
  bankNumber: string;

  @Column({nullable: true})
  orderNumber: string;
}
