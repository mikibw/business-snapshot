import {EntityRepository, Repository} from 'typeorm';
import {MomentNotiEntity} from '@database/entities/MomentNotiEntity';

@EntityRepository(MomentNotiEntity)
export class MomentNotiRepository extends Repository<MomentNotiEntity> {
  async findAll() {
    return await this.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findLatest() {
    const results = await this.find({
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    });
    return results[0];
  }
}
