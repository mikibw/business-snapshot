import {Clipboard} from 'react-native';
import {ChatEntity} from '@database/entities/ChatEntity';
import {MessageEntity} from '@database/entities/MessageEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {getMessageService} from '@database/services/MessageService';
import {usePrompt} from '@components/Prompt';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditText({dataChanged, dataDeleted}: Props) {
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();

  function copy(text: string) {
    Clipboard.setString(text);
  }

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  async function reEditMessage(message: MessageEntity) {
    async function change(text: string) {
      message.content = text;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    showPrompt({
      title: '编辑消息',
      placeholder: '输入新的消息文本',
      completion: text => {
        if (!text) return;
        change(text);
      },
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

  function editText(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['复制消息', '删除消息', '重新编辑', '改为对方发送', '取消'],
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          copy(message.content);
        } else if (buttonIndex === 1) {
          deleteMessage(message);
        } else if (buttonIndex === 2) {
          reEditMessage(message);
        } else if (buttonIndex === 3) {
          changeSender(chat, message);
        }
      },
    );
  }

  return editText;
}
