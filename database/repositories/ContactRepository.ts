import {EntityRepository, In, Not, Repository} from 'typeorm';
import {ContactEntity} from '../entities/ContactEntity';

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity> {
  public async findAll() {
    return await this.find({relations: ['user']});
  }

  public async findByUserId(id: number) {
    return await this.findOne({user: {id}}, {relations: ['user']});
  }

  public async findByUserIds(ids: number[]) {
    return await this.find({
      where: {
        user: {
          id: In(ids),
        },
      },
      relations: ['user'],
    });
  }

  public async findByUserIdsNotIn(ids: number[], count: number) {
    return await this.find({
      take: count,
      where: {
        user: {
          id: Not(In(ids)),
        },
      },
      relations: ['user'],
    });
  }
}
