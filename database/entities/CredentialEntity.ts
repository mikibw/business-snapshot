import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UserEntity} from './UserEntity';

export enum CredentialType {
  Payment = 'Payment',
  InnerAppPayment = 'InnerAppPayment',
  Refund = 'Refund',
}

@Entity('credentials')
export class CredentialEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: CredentialType,
  })
  type: CredentialType;

  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  @Column({nullable: true})
  displayDate: Date;

  @Column({default: ''})
  payWay: string;

  @Column({default: ''})
  payAmount: string;

  @Column({default: ''})
  productDetail: string;

  @Column({default: ''})
  refundReason: string;

  @Column({nullable: true})
  refundDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
