import {CallStatus, MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {ChatEntity} from '@database/entities/ChatEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {usePrompt} from '@components/Prompt';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditCall({dataChanged, dataDeleted}: Props) {
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function changeCallDuration(message: MessageEntity) {
    async function change(duration: string) {
      message.callStatus = CallStatus.Connected;
      message.duration = duration;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    showPrompt({
      title: '修改通话时长',
      placeholder: '输入通话时长',
      completion: text => {
        const duration = parseInt(text);
        if (isNaN(duration) || duration <= 0) return;
        change(duration.toString());
      },
    });
  }

  async function changeCallStatus(message: MessageEntity, status: CallStatus) {
    message.callStatus = status;
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

  function editCall(chat: ChatEntity, message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: [
          '删除消息',
          '修改通话时长',
          '改为已接通',
          '改为已拒绝',
          '改为已取消',
          '改为无应答',
          '改为忙线中',
          '改为对方发送',
          '取消',
        ],
        cancelButtonIndex: 8,
      },
      buttonIndex => {
        if (buttonIndex === 8) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeCallDuration(message);
        } else if (buttonIndex === 2) {
          changeCallStatus(message, CallStatus.Connected);
        } else if (buttonIndex === 3) {
          changeCallStatus(message, CallStatus.Rejected);
        } else if (buttonIndex === 4) {
          changeCallStatus(message, CallStatus.Cancelled);
        } else if (buttonIndex === 5) {
          changeCallStatus(message, CallStatus.Nonresponse);
        } else if (buttonIndex === 6) {
          changeCallStatus(message, CallStatus.BusyChannel);
        } else if (buttonIndex === 7) {
          changeSender(chat, message);
        }
      },
    );
  }

  return editCall;
}
