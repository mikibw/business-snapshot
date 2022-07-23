import {MomentCommentEntity, MomentEntity, MomentLikeEntity} from '@database/entities/MomentEntity';
import {UserEntity} from '@database/entities/UserEntity';
import {MomentRepository} from '@database/repositories/MomentRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';

class MomentService {
  private getMomentRepository() {
    return getCustomRepository(MomentRepository);
  }

  public async findAllMoments() {
    return await this.getMomentRepository().findAll();
  }

  public async insertMoment(momentEntity: MomentEntity) {
    await this.getMomentRepository().save(momentEntity);
  }

  public async insertLikes(momentEntity: MomentEntity, users: UserEntity[]) {
    const likes: MomentLikeEntity[] = Object.assign([], momentEntity.likes);
    users.forEach(user => {
      const like = new MomentLikeEntity();
      like.user = user;
      likes.push(like);
    });
    momentEntity.likes = likes;
    await this.getMomentRepository().save(momentEntity);
  }

  public async deleteLike(momentEntity: MomentEntity, likeId: number) {
    momentEntity.likes = momentEntity.likes.filter(like => like.id !== likeId);
    await this.getMomentRepository().save(momentEntity);
  }

  public async insertComment(
    momentEntity: MomentEntity,
    content: string,
    user: UserEntity,
    toUser?: UserEntity,
  ) {
    let comments: MomentCommentEntity[] = Object.assign([], momentEntity.comments);
    const comment = new MomentCommentEntity();
    comment.content = content;
    comment.user = user;
    if (toUser) comment.toUser = toUser;
    comments = [comment, ...comments];
    momentEntity.comments = comments;
    await this.getMomentRepository().save(momentEntity);
  }

  public async deleteComment(momentEntity: MomentEntity, commentId: number) {
    momentEntity.comments = momentEntity.comments.filter(comment => comment.id !== commentId);
    await this.getMomentRepository().save(momentEntity);
  }

  public async deleteMoment(id: number) {
    await this.getMomentRepository().delete({id});
  }

  public async updatePublishDate(id: number, date: Date) {
    await this.getMomentRepository().update({id}, {publishDate: date});
  }
}

const {getGlobalState} = createGlobalState({
  momentService: new MomentService(),
});

export function getMomentService() {
  return getGlobalState('momentService');
}
