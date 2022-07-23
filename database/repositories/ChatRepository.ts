import {EntityRepository, In, Repository} from 'typeorm';
import {ChatEntity} from '@database/entities/ChatEntity';

@EntityRepository(ChatEntity)
export class ChatRepository extends Repository<ChatEntity> {
  public async findAll() {
    return await this.find({
      relations: ['users'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async findById(id: number) {
    return await this.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });
  }

  public async findByChatIds(ids: number[]) {
    return await this.find({
      where: {
        id: In(ids),
      },
      relations: ['users'],
    });
  }
}
