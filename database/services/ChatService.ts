import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';
import {ChatEntity, ChatType} from '@database/entities/ChatEntity';
import {ChatRepository} from '@database/repositories/ChatRepository';
import {UserEntity, UserType} from '@database/entities/UserEntity';
import {MessageEntity, MessageType} from '@database/entities/MessageEntity';
import {getUserService} from './UserService';
import {getMessageService} from './MessageService';

class ChatService {
  private getChatRepository() {
    return getCustomRepository(ChatRepository);
  }

  public async findAllUnreadCount() {
    const chats = await this.findAllChats();
    return chats.reduce((count, chat) => count + chat.unreadCount, 0);
  }

  public async findAllChats() {
    return await this.getChatRepository().findAll();
  }

  public async findChatById(id: number) {
    return await this.getChatRepository().findById(id);
  }

  public async findChatsByIds(ids: number[]) {
    return await this.getChatRepository().findByChatIds(ids);
  }

  public async updateMessage(id: number, message: string) {
    await this.getChatRepository().update(id, {message});
  }

  public async updateChat(chatEntity: ChatEntity) {
    await this.getChatRepository().save(chatEntity);
  }

  public async updateAllChatBackground(background: string) {
    await this.getChatRepository().update({}, {background});
  }

  public async updateChatUnreadCount(id: number, count: number) {
    await this.getChatRepository().update({id}, {unreadCount: count});
  }

  public async deleteChatById(id: number) {
    await this.getChatRepository().delete({id});
  }

  public async deleteAllChats() {
    await this.getChatRepository().delete({});
  }

  public async createP2pChat(user: UserEntity, content: string = '') {
    // 找出是否已经存在P2p聊天，存在则直接返回，没有则创建
    const self = await getUserService().findSelf();
    const other = await getUserService().findUserById(user.id);
    const userChatIds = other!.chats.map(chat => chat.id);
    const selfChatIds = self!.chats.map(chat => chat.id);
    const chatIds = userChatIds.filter(id => selfChatIds.includes(id));
    const chats = await this.findChatsByIds(chatIds);
    let chat = chats.find(chat => chat.chatType === ChatType.Person);
    if (chat) {
      return chat;
    } else {
      chat = new ChatEntity();
      switch (other!.userType) {
        case UserType.Person:
          chat.chatType = ChatType.Person;
          chat.message = content || '我通过了你的朋友验证请求，现在我们可以开始聊天了';
          break;
        case UserType.PublicAccount:
          chat.chatType = ChatType.PublicAccount;
          chat.message = content || `感谢关注${other!.name}`;
          break;
      }
      chat.date = new Date();
      chat.users = [self!, other!];
      const savedChat = await this.getChatRepository().save(chat);
      if (content) {
        const message = new MessageEntity();
        message.messageType = MessageType.TEXT;
        message.content = content;
        message.chat = savedChat;
        message.user = other!;
        await getMessageService().saveMessage(message);
      }
      return savedChat;
    }
  }

  async saveChat(chat: ChatEntity) {
    return await this.getChatRepository().save(chat);
  }

  async createGroupChat(users: UserEntity[], name: string, memberCount: number) {
    const chat = new ChatEntity();
    chat.chatType = ChatType.Group;
    chat.users = users;
    chat.groupName = name;
    chat.groupMemberCount = memberCount;
    return await this.getChatRepository().save(chat);
  }
}

const {getGlobalState} = createGlobalState({
  chatService: new ChatService(),
});

export function getChatService() {
  return getGlobalState('chatService');
}
