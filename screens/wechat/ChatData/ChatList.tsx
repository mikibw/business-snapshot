import { MessageItems, messages } from "@screens/wechat/ChatData/ChatDetails";

interface ChatList {
  chatId: number,
  message: MessageItems[],
  pinTop: boolean
}

const getChatList = () => {
  const chats = [] as ChatList[]
  for (let msg of messages) {
    const chat = chats.find(a => a.chatId === msg.chatId);
    if (chat) {
      chat.message.push(msg)
      chat.message.sort((a,b) => a.time - b.time);
    } else {
      chats.push({chatId: msg.chatId, message: [msg], pinTop: false})
    }
  }
  return chats;
}

export const ChatList = getChatList()