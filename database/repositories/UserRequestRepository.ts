import {EntityRepository, Repository} from 'typeorm';
import {UserRequestEntity} from '../entities/UserRequestEntity';

@EntityRepository(UserRequestEntity)
export class UserRequestRepository extends Repository<UserRequestEntity> {}
