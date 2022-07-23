import {EntityRepository, Repository} from 'typeorm';
import {MomentEntity} from '../entities/MomentEntity';

@EntityRepository(MomentEntity)
export class MomentRepository extends Repository<MomentEntity> {
  async findAll() {
    return this.find({
      relations: [
        'user',
        'images',
        'likes',
        'comments',
        'likes.user',
        'comments.user',
        'comments.toUser',
      ],
      order: {publishDate: 'DESC'},
    });
  }
}
