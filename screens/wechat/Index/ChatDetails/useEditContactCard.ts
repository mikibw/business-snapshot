import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {WechatStackParamList} from '@navigation/wechat';
import {MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {UserEntity} from '@database/entities/UserEntity';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditContactCard({dataChanged, dataDeleted}: Props) {
  const {showActionSheetWithOptions} = useActionSheet();
  const navigation = useNavigation() as StackNavigationProp<WechatStackParamList, 'ChatDetails'>;

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function changeContact(message: MessageEntity) {
    async function change(user: UserEntity) {
      message.shareContact = user;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    navigation.navigate('SelectContact', {
      onComplete: contact => change(contact.user),
    });
  }

  async function changeSender(chat: ChatEntity, message: MessageEntity) {
    const current = message.user;
    const other = chat.users.find(user => user.id !== current.id);
    if (!other) return;
    message.user = other;
    const save = await getMessageService().saveMessage(message);
    dataChanged?.(save);
  }

  function editContactCard(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '更换联系人', '改为对方发送', '取消'],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeContact(message);
        } else if (buttonIndex === 2) {
          changeSender(chat, message);
        }
      },
    );
  }

  return editContactCard;
}
