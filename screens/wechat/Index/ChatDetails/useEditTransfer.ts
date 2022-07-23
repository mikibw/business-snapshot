import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {WechatStackParamList} from '@navigation/wechat';
import {MessageEntity, MessageType} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {usePrompt} from '@components/Prompt';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataCreated?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditTransfer({dataChanged, dataCreated, dataDeleted}: Props) {
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

  async function toggleAccepted(message: MessageEntity) {
    message.accepted = !message.accepted;
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

  function editTransfer(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '修改金额', '改为领取/未领取', '改为对方发送', '取消'],
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        if (buttonIndex === 4) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeAmount(message);
        } else if (buttonIndex === 2) {
          toggleAccepted(message);
        } else if (buttonIndex === 3) {
          changeSender(chat, message);
        }
      },
    );
  }

  function pressTransfer(chat: ChatEntity, message: MessageEntity) {
    const sender = message.user;
    const other = chat.users.filter(user => user.id !== sender.id)[0];
    async function accept() {
      message.accepted = true;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);

      const recipient = new MessageEntity();
      recipient.messageType = MessageType.TRANSFER;
      recipient.amount = message.amount;
      recipient.accepted = true;
      recipient.isTransferRecipient = true;
      recipient.chat = chat;
      recipient.user = other;
      const saveRecipient = await getMessageService().saveMessage(recipient);
      dataCreated?.(saveRecipient);
    }
    navigation.navigate('TransferReceiveState', {
      name: other.name,
      amount: message.amount,
      sendDate: message.createdAt,
      receiveDate: message.accepted ? message.updatedAt : undefined,
      notification: accept,
    });
  }

  return {editTransfer, pressTransfer};
}
