import {EntityRepository, In, Not, Repository} from 'typeorm';
import {UserEntity} from '../entities/UserEntity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async findSelf() {
    return await this.findById(1);
  }

  public async findById(id: number) {
    return await this.findOne({id}, {relations: ['chats']});
  }

  public async findExceptSelfAndIdNotIn(ids: number[], count: number) {
    return await this.find({
      where: {
        id: Not(In([1, 2, ...ids])),
      },
      relations: ['chats'],
      take: count,
    });
  }
}
