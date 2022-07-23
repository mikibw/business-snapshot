import {MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {usePrompt} from '@components/Prompt';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditFile({dataChanged, dataDeleted}: Props) {
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function changeFile(message: MessageEntity) {
    async function change(name: string, size: string) {
      message.fileName = name;
      message.fileSize = size;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    showPrompt({
      doubleInput: true,
      title: '修改文件',
      placeholder: '文件名称，如：新手教程.pdf',
      placeholder2: '文件大小，如：200K',
      completion: (name, size) => {
        if (!name || !size) return;
        change(name, size);
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

  function editFile(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '修改文件内容', '改为对方发送', '取消'],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeFile(message);
        } else if (buttonIndex === 2) {
          changeSender(chat, message);
        }
      },
    );
  }

  return editFile;
}
