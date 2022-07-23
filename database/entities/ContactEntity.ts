import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './UserEntity';

@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: UserEntity;
}
