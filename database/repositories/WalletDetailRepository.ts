import {EntityRepository, Repository} from 'typeorm';
import {WalletDetailEntity} from '../entities/WalletDetailEntity';

@EntityRepository(WalletDetailEntity)
export class WalletDetailRepository extends Repository<WalletDetailEntity> {}
