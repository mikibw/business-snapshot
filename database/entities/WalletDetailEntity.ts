import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('wallet_detail')
export class WalletDetailEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  value: string;
}
