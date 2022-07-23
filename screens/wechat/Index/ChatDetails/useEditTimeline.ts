import {MessageEntity} from '@database/entities/MessageEntity';
import {getMessageService} from '@database/services/MessageService';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useDateTimePicker} from '@components/DateTimePicker';

interface Props {
  dataChanged?: (message: MessageEntity) => void;
  dataDeleted?: (id: number) => void;
}

export default function useEditTimeline({dataChanged, dataDeleted}: Props) {
  const {showActionSheetWithOptions} = useActionSheet();
  const {showDateTimePicker} = useDateTimePicker();

  async function deleteMessage(message: MessageEntity) {
    await getMessageService().deleteMessage(message.id);
    dataDeleted?.(message.id);
  }

  function changeTimeline(message: MessageEntity) {
    async function change(date: Date) {
      message.timeline = date;
      const save = await getMessageService().saveMessage(message);
      dataChanged?.(save);
    }
    showDateTimePicker({
      title: '选择日期',
      completion: change,
    });
  }

  function editTimeline(message: MessageEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除消息', '修改时间', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 0) {
          deleteMessage(message);
        } else if (buttonIndex === 1) {
          changeTimeline(message);
        }
      },
    );
  }

  return editTimeline;
}
