import {EntityRepository, Repository} from 'typeorm';
import {BillEntity} from '@database/entities/BillEntity';

@EntityRepository(BillEntity)
export class BillRepository extends Repository<BillEntity> {
  public async findAll() {
    return await this.find({relations: ['user']});
  }
}
