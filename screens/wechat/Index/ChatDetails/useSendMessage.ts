import {usePrompt} from '@components/Prompt';
import {ChatEntity} from '@database/entities/ChatEntity';
import {
  CallStatus,
  CallType,
  MessageEntity,
  MessageType,
  SystemType,
} from '@database/entities/MessageEntity';
import {UserEntity} from '@database/entities/UserEntity';
import {getChatService} from '@database/services/ChatService';
import {getMessageService} from '@database/services/MessageService';
import {notifyChatsDidChange} from '@events';
import useImagePicker from '@hooks/useImagePicker';
import base64Image from '@utils/base64Image';
import {Alert} from 'react-native';

interface Props {
  completion?: (message: MessageEntity) => void;
}

export default function useSendMessage({completion}: Props) {
  const {showPrompt} = usePrompt();
  const selectMedia = useImagePicker();

  async function sendText(chat: ChatEntity, user: UserEntity, text: string) {
    const message = new MessageEntity();
    message.messageType = MessageType.TEXT;
    message.content = text;
    message.chat = chat;
    message.user = user;
    const save = await getMessageService().saveMessage(message);
    await getChatService().updateMessage(chat.id, text);
    completion?.(save);
    notifyChatsDidChange();
  }

  async function sendImage(chat: ChatEntity, user: UserEntity) {
    try {
      const {base64, width, height} = await selectMedia(0.1, undefined, true);
      if (!base64) return;
      const message = new MessageEntity();
      message.messageType = MessageType.PICTURE;
      message.picture = base64Image(base64);
      message.width = width;
      message.height = height;
      message.chat = chat;
      message.user = user;
      const save = await getMessageService().saveMessage(message);
      await getChatService().updateMessage(chat.id, '[图片]');
      completion?.(save);
      notifyChatsDidChange();
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  }

  async function sendCall(
    chat: ChatEntity,
    user: UserEntity,
    isCancelled: boolean,
    duration: number,
  ) {
    const message = new MessageEntity();
    message.messageType = MessageType.CALL;
    message.callType = CallType.Video;
    message.callStatus = isCancelled ? CallStatus.Cancelled : CallStatus.Connected;
    message.duration = duration.toString();
    message.chat = chat;
    message.user = user;
    const save = await getMessageService().saveMessage(message);
    await getChatService().updateMessage(chat.id, '[视频通话]');
    completion?.(save);
    notifyChatsDidChange();
  }

  async function sendRedpocket(
    chat: ChatEntity,
    user: UserEntity,
    amount: string,
    comment: string,
  ) {
    const message = new MessageEntity();
    message.messageType = MessageType.RED_POCKET;
    message.amount = amount;
    message.amountLabel = comment;
    message.chat = chat;
    message.user = user;
    const save = await getMessageService().saveMessage(message);
    await getChatService().updateMessage(chat.id, '[微信红包]');
    completion?.(save);
    notifyChatsDidChange();
  }

  async function transfer(chat: ChatEntity, user: UserEntity, amount: string, comment: string) {
    const message = new MessageEntity();
    message.messageType = MessageType.TRANSFER;
    message.amount = amount;
    message.amountLabel = comment;
    message.chat = chat;
    message.user = user;
    const save = await getMessageService().saveMessage(message);
    await getChatService().updateMessage(chat.id, '[转账]');
    completion?.(save);
    notifyChatsDidChange();
  }

  async function sendContactCard(chat: ChatEntity, user: UserEntity, card: UserEntity) {
    const message = new MessageEntity();
    message.messageType = MessageType.CONTACT_CARD;
    message.shareContact = card;
    message.chat = chat;
    message.user = user;
    const save = await getMessageService().saveMessage(message);
    await getChatService().updateMessage(chat.id, '[个人名片]');
    completion?.(save);
    notifyChatsDidChange();
  }

  function sendFile(chat: ChatEntity, user: UserEntity) {
    async function send(name: string, size: string) {
      const message = new MessageEntity();
      message.messageType = MessageType.FILE;
      message.fileName = name;
      message.fileSize = size;
      message.chat = chat;
      message.user = user;
      const save = await getMessageService().saveMessage(message);
      await getChatService().updateMessage(chat.id, '[文件]');
      completion?.(save);
      notifyChatsDidChange();
    }
    showPrompt({
      doubleInput: true,
      title: '发送文件',
      placeholder: '文件名称，如：新手教程.pdf',
      placeholder2: '文件大小，如：200K',
      completion: (name, size) => {
        if (!name || !size) return;
        send(name, size);
      },
    });
  }

  async function addTimeline(chat: ChatEntity, date: Date) {
    const message = new MessageEntity();
    message.messageType = MessageType.TIMELINE;
    message.timeline = date;
    message.chat = chat;
    const save = await getMessageService().saveMessage(message);
    completion?.(save);
  }

  function sendVoice(chat: ChatEntity, user: UserEntity) {
    async function send(duration: string) {
      const message = new MessageEntity();
      message.messageType = MessageType.VOICE;
      message.duration = duration;
      message.chat = chat;
      message.user = user;
      const save = await getMessageService().saveMessage(message);
      await getChatService().updateMessage(chat.id, '[语音]');
      completion?.(save);
      notifyChatsDidChange();
    }
    showPrompt({
      title: '发送语音',
      placeholder: '语音时长',
      completion: text => {
        const duration = parseInt(text);
        if (isNaN(duration) || duration <= 0) return;
        send(duration.toString());
      },
    });
  }

  async function addSystemMsg(chat: ChatEntity, systemType: SystemType, systemMsg: string) {
    const message = new MessageEntity();
    message.messageType = MessageType.SYSTEM;
    message.systemType = systemType;
    message.systemMsg = systemMsg;
    message.chat = chat;
    const save = await getMessageService().saveMessage(message);
    completion?.(save);
  }

  return {
    sendText,
    sendImage,
    sendCall,
    sendRedpocket,
    transfer,
    sendContactCard,
    sendFile,
    addTimeline,
    sendVoice,
    addSystemMsg,
  };
}
