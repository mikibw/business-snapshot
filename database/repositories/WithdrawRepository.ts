import {EntityRepository, Repository} from 'typeorm';
import {WithdrawEntity} from '@database/entities/WithdrawEntity';

@EntityRepository(WithdrawEntity)
export class WithdrawRepository extends Repository<WithdrawEntity> {
  public async findAll() {
    return await this.find({order: {reachDate: 'DESC'}});
  }
}
