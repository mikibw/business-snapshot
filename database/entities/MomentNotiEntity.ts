import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export enum MomentNotiType {
  Like = 'Like',
  Comment = 'Comment',
}

export enum MomentNotiAccessoryType {
  Text = 'Text',
  Image = 'Image',
  video = 'Video',
}

@Entity('moment_notis')
export class MomentNotiEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: MomentNotiType,
  })
  momentNotiType: MomentNotiType;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column({
    default: '',
  })
  toName: string;

  @Column({
    default: '',
  })
  content: string;

  @Column({
    default: '',
  })
  accessory: string;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: MomentNotiAccessoryType,
  })
  momentNotiAccessoryType: MomentNotiAccessoryType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
