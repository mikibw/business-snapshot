import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';
import {MessageRepository} from '@database/repositories/MessageRepository';
import {MessageEntity, MessageType} from '@database/entities/MessageEntity';
import {UserEntity} from '@database/entities/UserEntity';
import {ChatEntity} from '@database/entities/ChatEntity';
import {getUserService} from './UserService';

class MessageService {
  private getMessageRepository() {
    return getCustomRepository(MessageRepository);
  }

  public async findMessagesByChatId(chatId: number) {
    return await this.getMessageRepository().findAllByChatId(chatId);
  }

  public async deleteMessage(id: number) {
    await this.getMessageRepository().delete({id});
  }

  public async saveMessage(messageEntity: MessageEntity) {
    return await this.getMessageRepository().save(messageEntity);
  }

  public async createTextMessage(text: string, chat: ChatEntity, user?: UserEntity) {
    const message = new MessageEntity();
    message.messageType = MessageType.TEXT;
    message.content = text;
    message.chat = chat;
    if (user) {
      message.user = user;
    } else {
      const self = await getUserService().findSelf();
      message.user = self!;
    }
    return await this.getMessageRepository().save(message);
  }
}

const {getGlobalState} = createGlobalState({
  messageService: new MessageService(),
});

export function getMessageService() {
  return getGlobalState('messageService');
}
