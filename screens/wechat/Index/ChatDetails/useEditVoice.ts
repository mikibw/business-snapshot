import {MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {usePrompt} from '@components/Prompt';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditVoice({dataChanged, dataDeleted}: Props) {
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function changeVoiceDuration(message: MessageEntity) {
    async function change(duration: string) {
      message.duration = duration;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    showPrompt({
      title: '修改语音时长',
      placeholder: '输入语音时长',
      completion: text => {
        const duration = parseInt(text);
        if (isNaN(duration) || duration <= 0) return;
        change(duration.toString());
      },
    });
  }

  async function toggleVoiceRead(message: MessageEntity) {
    message.voiceRead = !message.voiceRead;
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

  function editVoice(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '修改语音时长', '改为已读/未读', '改为对方发送', '取消'],
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        if (buttonIndex === 4) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeVoiceDuration(message);
        } else if (buttonIndex === 2) {
          toggleVoiceRead(message);
        } else if (buttonIndex === 3) {
          changeSender(chat, message);
        }
      },
    );
  }

  return editVoice;
}
