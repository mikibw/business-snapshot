import {EntityRepository, Repository} from 'typeorm';
import {MessageEntity} from '@database/entities/MessageEntity';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
  public async findLatestByChatId(chatId: number) {
    const messages = await this.find({
      where: {
        chat: {id: chatId},
      },
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    });
    return messages[0];
  }

  public async findAllByChatId(chatId: number) {
    const messages = await this.find({
      where: {
        chat: {id: chatId},
      },
      order: {
        createdAt: 'ASC',
      },
      relations: ['user', 'chat', 'shareContact'],
    });
    return messages;
  }
  public async findAll() {
    const messages = await this.find({
      relations: ['user', 'chat'],
    });
    return messages;
  }
}
