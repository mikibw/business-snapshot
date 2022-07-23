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
import {ChatEntity} from '@database/entities/ChatEntity';

export enum MessageType {
  TEXT = 'text',
  PICTURE = 'Picture',
  CALL = 'Call',
  RED_POCKET = 'RedPocket',
  TRANSFER = 'Transfer',
  CONTACT_CARD = 'ContactCard',
  FILE = 'File',
  TIMELINE = 'Timeline',
  VOICE = 'Voice',
  SYSTEM = 'System',
}

export enum CallType {
  Video = 'Video',
  Audio = 'Audio',
}

export enum CallStatus {
  Connected = 'Connected',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  Nonresponse = 'Nonresponse',
  BusyChannel = 'BusyChannel',
}

export enum SystemType {
  Plain = 'Plain', // 纯文本
  Pat = 'Pat', // 拍了拍
  Recall = 'Recall', // 撤回消息
  ReceiveRedpocket = 'ReceiveRedpocket', // 红包领取
  Greet = 'Greet',
  Friend = 'Friend', // 已经添加了...
  StrangerNotice = 'StrangerNotice', // 陌生人提醒
  SwindleNotice = 'SwindleNotice', // 诈骗提醒
  EnterGroup = 'EnterGroup', // 进群消息
  InviteIntoGroup = 'InviteIntoGroup', // 邀请入群消息
  PinTopAsTransfer = 'PinTopAsTransfer', // 转账置顶聊天
  TransferSuccessNotify = 'TransferSuccessNotify', // 转账成功通知
  TransferReceipt = 'TransferReceipt', // 转账回执
}

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: MessageType,
  })
  messageType: MessageType;

  @ManyToOne(() => ChatEntity, chat => chat.id, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name: 'chatId'})
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE', nullable: true})
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  // 普通文本
  @Column({nullable: true})
  content: string;

  // 红包/转账
  @Column({nullable: true})
  amount: string;

  @Column({default: false})
  accepted: boolean;

  @Column({nullable: true})
  amountLabel: string;

  @Column({default: false})
  isTransferRecipient: boolean;

  // 视频通话、音频通话
  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: CallType,
  })
  callType: CallType;

  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: CallStatus,
  })
  callStatus: CallStatus;

  // 语音、视频通话、音频通话
  @Column({nullable: true})
  duration: string;

  // 语音已读未读状态
  @Column({default: false})
  voiceRead: boolean;

  // 图片
  @Column({nullable: true})
  picture: string;

  @Column({nullable: true})
  width: number;

  @Column({nullable: true})
  height: number;

  // 个人名片
  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE', nullable: true})
  @JoinColumn({name: 'shareContactId'})
  shareContact: UserEntity;

  // 文件
  @Column({nullable: true})
  fileName: string;

  @Column({nullable: true})
  fileSize: string;

  // 时间线
  @Column({nullable: true})
  timeline: Date;

  // 系统消息
  @Column({
    type: 'simple-enum',
    nullable: true,
    enum: SystemType,
  })
  systemType: SystemType;

  @Column({nullable: true})
  systemMsg: string;

  // -----------
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
