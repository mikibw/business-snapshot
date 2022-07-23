import {EntityRepository, Repository} from 'typeorm';
import {CredentialEntity} from '../entities/CredentialEntity';

@EntityRepository(CredentialEntity)
export class CredentialRepository extends Repository<CredentialEntity> {
  public async findAll() {
    return await this.find({relations: ['user']});
  }
}
