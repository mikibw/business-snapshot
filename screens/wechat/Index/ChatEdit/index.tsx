import React from 'react';
import {Text, StyleSheet, FlatList, Alert} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import dateLine from '@utils/dateLine';
import Separator from '@screens/wechat/Common/Separator';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import {usePrompt} from '@components/Prompt';
import TimePicker from '@screens/wechat/Common/TimePicker';
import Toast from '@components/Toast';
import useImagePicker from '@hooks/useImagePicker';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {getChatService} from '@database/services/ChatService';
import {notifyChatBackgroundDidChange, notifyChatsDidChange} from '@events';
import base64Image from '@utils/base64Image';
import {useActionSheet} from '@expo/react-native-action-sheet';

export default function ChatEdit({route, navigation}: WechatStackProps<'ChatEdit'>) {
  const {id} = route.params;

  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();
  const selectBackground = useImagePicker();

  const toast = React.useRef<Toast>(null);
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);

  const [unreadCount, setUnreadCount] = React.useState(0);
  const [latestMessage, setLatestMessage] = React.useState('');
  const [latestMessageDate, setLatestMessageDate] = React.useState(new Date());
  const [noBother, setNoBother] = React.useState(false);
  const [pinTop, setPinTop] = React.useState(false);
  const [background, setBackground] = React.useState({value: '', all: false});
  const [safeNotice, setSafeNotice] = React.useState(false);
  const [telephoneMode, setTelephoneMode] = React.useState(false);

  useNavigationOptions(
    {
      headerRight: () => (
        <Text style={styles.save} onPress={save}>
          保存
        </Text>
      ),
    },
    [
      id,
      unreadCount,
      latestMessage,
      latestMessageDate,
      noBother,
      pinTop,
      background,
      safeNotice,
      telephoneMode,
    ],
  );

  React.useEffect(() => {
    async function initialize() {
      const chat = await getChatService().findChatById(id);
      if (!chat) return;
      setUnreadCount(chat.unreadCount);
      setLatestMessage(chat.message);
      setLatestMessageDate(chat.updatedAt);
      setNoBother(chat.noBother);
      setPinTop(chat.pinTop);
      setBackground({value: chat.background, all: false});
      setSafeNotice(chat.safeNotice);
      setTelephoneMode(chat.telephoneMode);
    }
    initialize();
  }, []);

  async function save() {
    const chat = await getChatService().findChatById(id);
    if (!chat) return;
    chat.unreadCount = unreadCount;
    chat.message = latestMessage;
    chat.date = latestMessageDate;
    chat.noBother = noBother;
    chat.pinTop = pinTop;
    chat.background = background.value ? base64Image(background.value) : '';
    chat.safeNotice = safeNotice;
    chat.telephoneMode = telephoneMode;
    await getChatService().updateChat(chat);

    if (background.all) {
      await getChatService().updateAllChatBackground(chat.background);
    }

    notifyChatsDidChange();
    notifyChatBackgroundDidChange();
    navigation.goBack();
  }

  const data: {name: string; value: string}[] = [
    {
      name: '未读消息数',
      value: unreadCount.toString(),
    },
    {
      name: '最后一条消息',
      value: latestMessage,
    },
    {
      name: '最后一条消息的时间',
      value: dateLine(latestMessageDate),
    },
    {
      name: '消息免打扰',
      value: noBother ? '是' : '否',
    },
    {
      name: '是否置顶',
      value: pinTop ? '是' : '否',
    },
    {
      name: '设置聊天背景',
      value: '',
    },
    {
      name: '开启安全提示',
      value: safeNotice ? '是' : '否',
    },
    {
      name: '是否开启听筒模式',
      value: telephoneMode ? '是' : '否',
    },
  ];

  function changeUnreadCount() {
    showPrompt({
      title: '未读消息数',
      placeholder: '请输入未读消息数',
      completion: text => {
        const num = parseInt(text);
        if (isNaN(num) || num < 0) return;
        setUnreadCount(num);
      },
    });
  }

  function changeLatestMessage() {
    showPrompt({
      title: '最后一条消息',
      placeholder: '请输入最后一条消息',
      completion: text => {
        setLatestMessage(text);
      },
    });
  }

  function changeLatestMessageDate() {
    setTimePickerVisible(true);
  }

  function changeNoBother() {
    setNoBother(!noBother);
  }

  function changePinTop() {
    setPinTop(!pinTop);
  }

  function changeBackground() {
    async function showImagePicker() {
      try {
        const {base64} = await selectBackground(0.75, undefined, true);
        if (!base64) return;
        setBackground(pre => ({...pre, value: base64}));
      } catch (msg: any) {
        msg && Alert.alert('', msg, [{text: '确定'}]);
      }
    }
    function showImageOptions() {
      showActionSheetWithOptions(
        {
          title: '设置聊天场景',
          options: ['当前聊天', '所有聊天', '取消'],
        },
        buttonIndex => {
          if (buttonIndex === 2) return;
          if (buttonIndex === 0) setBackground(pre => ({...pre, all: false}));
          if (buttonIndex === 1) setBackground(pre => ({...pre, all: true}));
          showImagePicker();
        },
      );
    }
    showActionSheetWithOptions(
      {
        options: ['设置新的背景', '移除当前聊天背景', '移除所有聊天背景', '取消'],
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) showImageOptions();
        if (buttonIndex === 1) setBackground({value: '', all: false});
        if (buttonIndex === 2) setBackground({value: '', all: true});
      },
    );
  }

  function changeSafeNotice() {
    setSafeNotice(!safeNotice);
  }

  function changeTelephoneMode() {
    setTelephoneMode(!telephoneMode);
  }

  function onItemPress(index: number) {
    if (index === 0) {
      changeUnreadCount();
    } else if (index === 1) {
      changeLatestMessage();
    } else if (index === 2) {
      changeLatestMessageDate();
    } else if (index === 3) {
      changeNoBother();
    } else if (index === 4) {
      changePinTop();
    } else if (index === 5) {
      changeBackground();
    } else if (index === 6) {
      changeSafeNotice();
    } else if (index === 7) {
      changeTelephoneMode();
    }
  }

  return (
    <ContainerView style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Separator left={spacing[4]} />}
        renderItem={({item, index}) => {
          return (
            <IndicatorCell
              name={item.name}
              node={<Text style={styles.node}>{item.value}</Text>}
              arrowHidden
              onPress={() => onItemPress(index)}
            />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <TimePicker
        visible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onDateInput={date => {
          if (date > new Date()) {
            toast.current?.show('不能超过当前时间');
          } else {
            setLatestMessageDate(date);
          }
        }}
      />
      <Toast ref={toast} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  save: {
    fontSize: 16,
    color: '#07C160',
    marginRight: spacing[3],
  },
  node: {
    fontSize: 15,
    color: 'rgba(27, 27, 27, 0.4)',
  },
});
