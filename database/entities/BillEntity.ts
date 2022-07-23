import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './UserEntity';

export enum BillType {
  Redpacket = 'Redpacket',
  Transfer = 'Transfer',
  MoneyCode = 'MoneyCode',
  PhoneTopUp = 'PhoneTopUp',
  Withdraw = 'Withdraw',
  Custom = 'Custom',
}

@Entity('bills')
export class BillEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: BillType,
  })
  billType: BillType;

  @Column()
  billTypeValue: string;

  @Column()
  amount: string;

  @Column()
  date: Date;

  @Column({nullable: true})
  bankName: string; // billType为withdraw时使用

  @Column({nullable: true})
  bankNumber: string; // billType为withdraw时使用

  @Column({nullable: true})
  bankPeople: string; // billType为withdraw时使用

  @Column({nullable: true})
  inout: boolean; // 除了billType为PhoneTopUp和Withdraw时使用

  @ManyToOne(() => UserEntity, user => user.id, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'userId'})
  user: UserEntity; // 除了billType为PhoneTopUp和Withdraw时使用
}
