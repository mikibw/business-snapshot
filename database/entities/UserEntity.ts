import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ChatEntity} from './ChatEntity';

export enum UserType {
  Person = 'Person',
  PublicAccount = 'PublicAccount',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({nullable: true})
  wxId: string;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: UserType,
  })
  userType: UserType;

  @Column({
    default: '',
  })
  realname?: string;

  @ManyToMany(() => ChatEntity, chat => chat.users, {onUpdate: 'CASCADE'})
  chats: ChatEntity[];
}
