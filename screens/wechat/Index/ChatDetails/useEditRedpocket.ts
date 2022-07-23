import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {WechatStackParamList} from '@navigation/wechat';
import {MessageEntity, MessageType, SystemType} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {usePrompt} from '@components/Prompt';
import randomRedpocket from '@utils/randomRedpocket';
import {randomInt} from '@utils/randomInt';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataCreated?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditRedpocket({dataChanged, dataCreated, dataDeleted}: Props) {
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();
  const navigation = useNavigation() as StackNavigationProp<WechatStackParamList, 'ChatDetails'>;

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function changeAmount(message: MessageEntity) {
    async function change(amount: string) {
      message.amount = amount;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    showPrompt({
      title: '修改金额',
      placeholder: '请输入金额',
      completion: text => {
        const amount = parseFloat(text);
        if (isNaN(amount) || amount <= 0) return;
        change(amount.toFixed(2));
      },
    });
  }

  async function changeUnaccepted(message: MessageEntity) {
    if (!message.accepted) return;
    message.accepted = false;
    const save = await getMessageService().saveMessage(message);
    dataChanged?.(save);
  }

  async function changeSender(chat: ChatEntity, message: MessageEntity) {
    const current = message.user;
    const other = chat.users.find(user => user.id !== current.id);
    if (!other) return;
    message.user = other;
    const save = await getMessageService().saveMessage(message);
    dataChanged?.(save);
  }

  function editRedpocket(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '修改金额', '改为未领取', '改为对方发送', '取消'],
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        if (buttonIndex === 4) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeAmount(message);
        } else if (buttonIndex === 2) {
          changeUnaccepted(message);
        } else if (buttonIndex === 3) {
          changeSender(chat, message);
        }
      },
    );
  }

  async function pressRedpocket(chat: ChatEntity, message: MessageEntity) {
    const sender = message.user;
    const others = chat.users.filter(user => user.id !== sender.id);
    if (message.accepted) {
      const redpockets = randomRedpocket()(parseFloat(message.amount), others.length);
      navigation.navigate('RedpocketDetail', {
        sendUser: {
          name: sender.name,
          avatar: sender.avatar,
          comment: message.amountLabel,
        },
        receiveUsers: others.map((user, index) => ({
          name: user.name,
          avatar: user.avatar,
          amount: redpockets[index].toFixed(2),
          date: new Date(),
        })),
      });
    } else {
      message.accepted = true;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);

      const recipient = new MessageEntity();
      recipient.messageType = MessageType.SYSTEM;
      recipient.systemType = SystemType.ReceiveRedpocket;
      const senderName = sender.id === 1 ? '你' : sender.name;
      const acceptName = sender.id === 1 ? others[randomInt(others.length)].name : '你';
      recipient.systemMsg = `${acceptName}领取了${senderName}发的红包`;
      recipient.chat = chat;
      const saveRecipient = await getMessageService().saveMessage(recipient);
      dataCreated?.(saveRecipient);
    }
  }

  return {editRedpocket, pressRedpocket};
}
