import {Alert} from 'react-native';
import {MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';

interface Props {
  dataDeleted?: (id: number) => void;
}

export default function useEditSystemMsg({dataDeleted}: Props) {
  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function editSystemMsg(message: MessageEntity) {
    Alert.alert('该消息暂不支持修改', '', [
      {
        text: '取消',
      },
      {
        text: '删除消息',
        onPress: () => deleteMessage(message),
      },
    ]);
  }

  return editSystemMsg;
}
