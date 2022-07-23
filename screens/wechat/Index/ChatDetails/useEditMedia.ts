import {Alert} from 'react-native';
import {MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import useImagePicker from '@hooks/useImagePicker';
import base64Image from '@utils/base64Image';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditMedia({dataChanged, dataDeleted}: Props) {
  const {showActionSheetWithOptions} = useActionSheet();
  const selectMedia = useImagePicker();

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  async function changeMedia(message: MessageEntity) {
    try {
      const {base64, width, height} = await selectMedia(0.1, undefined, true);
      if (!base64) return;
      message.picture = base64Image(base64);
      message.width = width;
      message.height = height;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  }

  async function changeSender(chat: ChatEntity, message: MessageEntity) {
    const current = message.user;
    const other = chat.users.find(user => user.id !== current.id);
    if (!other) return;
    message.user = other;
    const save = await getMessageService().saveMessage(message);
    dataChanged?.(save);
  }

  function editMedia(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '修改图片', '改为对方发送', '取消'],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeMedia(message);
        } else if (buttonIndex === 2) {
          changeSender(chat, message);
        }
      },
    );
  }

  return editMedia;
}
