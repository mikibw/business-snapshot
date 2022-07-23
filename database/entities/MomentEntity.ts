import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UserEntity} from './UserEntity';

export enum MomentType {
  Normal = 'Normal',
  Link = 'Link',
}

@Entity('moments')
export class MomentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: MomentType,
  })
  momentType: MomentType;

  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  @Column({
    default: '',
  })
  content: string;

  @Column({
    default: '',
  })
  address: string;

  @Column({
    default: '',
  })
  source: string;

  @Column({
    default: '',
  })
  linkTitle: string;

  @Column({
    default: false,
  })
  partiallyVisibile: boolean;

  @Column({
    default: false,
  })
  videoStyle: boolean;

  @Column()
  publishDate: Date;

  @OneToMany(() => MomentImageEntity, momentImage => momentImage.moment, {cascade: true})
  images: MomentImageEntity[];

  @OneToMany(() => MomentLikeEntity, momentLike => momentLike.moment, {cascade: true})
  likes: MomentLikeEntity[];

  @OneToMany(() => MomentCommentEntity, momentComment => momentComment.moment, {cascade: true})
  comments: MomentCommentEntity[];
}

@Entity('moment_images')
export class MomentImageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  source: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @ManyToOne(() => MomentEntity, moment => moment.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  moment: MomentEntity;
}

@Entity('moment_likes')
export class MomentLikeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE'})
  user: UserEntity;

  @ManyToOne(() => MomentEntity, moment => moment.likes, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  moment: MomentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('moment_comments')
export class MomentCommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE'})
  user: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id, {onUpdate: 'CASCADE', nullable: true})
  toUser: UserEntity;

  @ManyToOne(() => MomentEntity, moment => moment.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  moment: MomentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
