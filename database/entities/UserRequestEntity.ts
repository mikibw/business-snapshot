import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './UserEntity';

@Entity('user_requests')
export class UserRequestEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  @Column()
  message: string;
}
