import {users} from '@screens/wechat/ChatData/Users';
import {MessageItems, MessageType} from '@screens/wechat/ChatData/ChatDetails';
import {ChatList} from '@screens/wechat/ChatData/ChatList';
import {UserType} from '@database/entities/UserEntity';

export interface ChatDisplayListProps {
  chatId: number;
  image?: string;
  name: string;
  message: string;
  time: number;
  type: UserType;
  pinTop: boolean;
}

const findUser = (userId: string) => {
  return users.find(user => user.userId === userId);
};

const name = (message: MessageItems) => {
  return message.groupName ?? findUser(message.fromUserId)!!.name;
};

const getMessage = (msg: MessageItems) => {
  if (msg.groupName && msg.messageType === MessageType.TEXT) {
    return findUser(msg.fromUserId)!!.name.concat(': ', msg.message!!);
  } else if (msg.message) {
    return msg.message;
  }

  switch (msg.messageType) {
    case MessageType.PICTURE:
      return '[图片]';
    case MessageType.VIDEO:
      return '[视频]';
    case MessageType.CONTACT_CARD:
      return '[个人名片]';
    case MessageType.RED_POCKET:
      return '[微信红包]';
    case MessageType.VIDEO_CALL:
      return '[视频通话]';
    case MessageType.VOICE_CALL:
      return '[语音通话]';
    case MessageType.TRANSFER:
      return '[微信转账]';
    case MessageType.AUDIO:
      return '[语音]';
  }
};

const mapToChatDisplayListItems = (msg: MessageItems[]) => {
  const notFromMe = msg.find(m => !sendByMe(m.fromUserId)) ?? msg[msg.length - 1];
  return {
    chatId: msg[msg.length - 1].chatId,
    name: name(notFromMe),
    message: getMessage(msg[msg.length - 1]) ?? '',
    time: msg[msg.length - 1].time,
    type: findUser(notFromMe.fromUserId)!!.userType ?? UserType.Person,
    pinTop: false,
  };
};

const sendByMe = (userId: string) => {
  return findUser(userId)!!.userId === '1';
};

// const formChatList = () => {
//   const chats = [] as ChatDisplayListProps[];
//   for (let msg of ChatList) {
//     const chat = mapToChatDisplayListItems(msg.message);
//     chats.push(chat);
//   }
//   chats.sort((a, b) => b.time - a.time);
//   return chats;
// };
//
// export const chatDisplayList = formChatList();
