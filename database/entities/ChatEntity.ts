import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UserEntity, UserType} from './UserEntity';

export enum ChatType {
  Person = 'Person',
  Group = 'Group',
  PublicAccount = 'PublicAccount',
}

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: ChatType,
  })
  chatType: ChatType; // 根据chatType取头像、名称

  @Column({
    default: 0,
  })
  unreadCount: number;

  @Column({
    default: '',
  })
  groupName: string;

  @Column({
    default: 0,
  })
  groupMemberCount: number;

  @Column({
    default: '',
  })
  message: string;

  @Column({
    nullable: true,
  })
  date: Date;

  @Column({default: false})
  noBother: boolean;

  @Column({default: false})
  pinTop: boolean;

  @Column({nullable: true})
  background: string;

  @Column({default: false})
  safeNotice: boolean;

  @Column({default: false})
  telephoneMode: boolean;

  @ManyToMany(() => UserEntity, user => user.chats, {onUpdate: 'CASCADE'})
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
