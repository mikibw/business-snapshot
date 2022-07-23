import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {useHeaderHeight} from '@react-navigation/elements';
import {WechatStackProps} from '@navigation/wechat';
import {TextMessage} from '@screens/wechat/Index/ChatDetails/Messages/TextMessage';
import {MediaMessage} from './Messages/MediaMessage';
import {spacing, wechatColors} from '@design-system';
import {EmojiSection} from '@screens/wechat/Index/ChatDetails/Sections/EmojiSection';
import {FunctionsSection} from '@screens/wechat/Index/ChatDetails/Sections/FunctionsSection';
import {getMessageService} from '@database/services/MessageService';
import {MessageEntity, MessageType} from '@database/entities/MessageEntity';
import {getUserService} from '@database/services/UserService';
import {UserEntity} from '@database/entities/UserEntity';
import {VoiceMessage} from '@screens/wechat/Index/ChatDetails/Messages/VoiceMessage';
import {ContactCardMessage} from '@screens/wechat/Index/ChatDetails/Messages/ContactCardMessage';
import {TimelineMessage} from './Messages/TimelineMessage';
import {RedPocket} from '@screens/wechat/Index/ChatDetails/Messages/RedPocket';
import {FileMessage} from '@screens/wechat/Index/ChatDetails/Messages/FileMessage';
import {observeChatBackgroundDidChange, observeGroupDetailsDidChange} from '@events';
import {getChatService} from '@database/services/ChatService';
import {ChatEntity, ChatType} from '@database/entities/ChatEntity';
import {Ionicons} from '@expo/vector-icons';
import {icon_audio, icon_facial_25, icon_func, icon_keyboard} from '@assets/images/icons';
import useEditText from './useEditText';
import useSendMessage from './useSendMessage';
import VideoVoiceModal from './VideoVoiceModal';
import Toast from '@components/Toast';
import {useDateTimePicker} from '@components/DateTimePicker';
import {SystemMessage} from './Messages/SystemMessage';
import useEditSystemMsg from './useEditSystemMsg';
import useEditMedia from './useEditMedia';
import useEditRedpocket from './useEditRedpocket';
import useEditTransfer from './useEditTransfer';
import useEditContactCard from './useEditContactCard';
import useEditFile from './useEditFile';
import useEditTimeline from './useEditTimeline';
import useEditVoice from './useEditVoice';
import {CallMessage} from './Messages/CallMessage';
import useEditCall from './useEditCall';
import GroupUsersSection from './Sections/GroupUsersSection';

const ChatDetails: React.FC<WechatStackProps<'ChatDetails'>> = ({route, navigation}) => {
  const {chatId} = route.params;

  const headerHeight = useHeaderHeight();
  const {showDateTimePicker} = useDateTimePicker();
  const list = React.useRef<FlatList>(null);
  const toast = React.useRef<Toast>(null);
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [shouldScrollToEnd, setScrollToEnd] = useState(false);

  const {
    sendText,
    sendImage,
    sendCall,
    sendRedpocket,
    transfer,
    sendContactCard,
    sendFile,
    addTimeline,
    sendVoice,
    addSystemMsg,
  } = useSendMessage({
    completion: dataCreated,
  });

  function dataChanged(newMessage: MessageEntity) {
    const index = messages.findIndex(message => message.id === newMessage.id);
    if (index === -1) return;
    messages[index] = newMessage;
    setMessages(Object.assign([], messages));
  }

  function dataCreated(newMessage: MessageEntity) {
    setScrollToEnd(true);
    setMessages(pre => [...pre, newMessage]);
  }

  function dataDeleted(id: number) {
    setMessages(pre => pre.filter(message => message.id !== id));
  }

  const editText = useEditText({dataChanged, dataDeleted});
  const editMedia = useEditMedia({dataChanged, dataDeleted});
  const editCall = useEditCall({dataChanged, dataDeleted});
  const {editRedpocket, pressRedpocket} = useEditRedpocket({dataChanged, dataCreated, dataDeleted});
  const {editTransfer, pressTransfer} = useEditTransfer({dataChanged, dataCreated, dataDeleted});
  const editContactCard = useEditContactCard({dataChanged, dataDeleted});
  const editFile = useEditFile({dataChanged, dataDeleted});
  const editTimeline = useEditTimeline({dataChanged, dataDeleted});
  const editVoice = useEditVoice({dataChanged, dataDeleted});
  const editSystemMsg = useEditSystemMsg({dataDeleted});

  const [chat, setChat] = useState<ChatEntity | undefined>(undefined);
  const [speaker, setSpeaker] = useState<UserEntity | undefined>(undefined);
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  const [inputText, setInputText] = useState<string>('');
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [showFuncs, setShowFuncs] = useState<boolean>(false);
  const [showGroupUsers, setShowGroupUsers] = useState<boolean>(false);

  function headerTitle() {
    if (!chat) return '';
    switch (chat.chatType) {
      case ChatType.Group:
        return `${chat.groupName}(${chat.groupMemberCount})`;
      case ChatType.Person:
      case ChatType.PublicAccount:
        const other = chat.users.find(user => user.id !== 1);
        return other?.name || '';
    }
  }

  useNavigationOptions(
    {
      headerRight: () => (
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          style={{marginRight: spacing[4]}}
          onPress={() => navigation.navigate('ChatEdit', {id: chatId})}
        />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 1,
        backgroundColor: wechatColors.navigation,
      },
      headerTitle: headerTitle(),
    },
    [chat],
  );

  const renderItem = (message: MessageEntity) => {
    switch (message.messageType) {
      case MessageType.TEXT:
        return <TextMessage message={message} onLongPress={() => editText(chat!, message)} />;
      case MessageType.PICTURE:
        return <MediaMessage message={message} onLongPress={() => editMedia(chat!, message)} />;
      case MessageType.CALL:
        return <CallMessage message={message} onLongPress={() => editCall(chat!, message)} />;
      case MessageType.RED_POCKET:
        return (
          <RedPocket
            message={message}
            onPress={() => pressRedpocket(chat!, message)}
            onLongPress={() => editRedpocket(chat!, message)}
          />
        );
      case MessageType.TRANSFER:
        return (
          <RedPocket
            message={message}
            onPress={() => pressTransfer(chat!, message)}
            onLongPress={() => editTransfer(chat!, message)}
          />
        );
      case MessageType.CONTACT_CARD:
        return (
          <ContactCardMessage
            message={message}
            onLongPress={() => editContactCard(chat!, message)}
          />
        );
      case MessageType.FILE:
        return <FileMessage message={message} onLongPress={() => editFile(chat!, message)} />;
      case MessageType.TIMELINE:
        return <TimelineMessage message={message} onLongPress={() => editTimeline(message)} />;
      case MessageType.VOICE:
        return <VoiceMessage message={message} onLongPress={() => editVoice(chat!, message)} />;
      case MessageType.SYSTEM:
        return <SystemMessage message={message} onLongPress={() => editSystemMsg(message)} />;
    }
  };

  function scrollToEnd() {
    setTimeout(() => {
      if (!messages.length) return;
      list.current?.scrollToIndex({
        animated: true,
        viewOffset: -8,
        viewPosition: 1,
        index: messages.length - 1,
      });
    }, 500);
  }

  const showEmojiSection = () => {
    Keyboard.dismiss();
    setShowEmoji(true);
    setShowFuncs(false);
    setShowGroupUsers(false);
    scrollToEnd();
  };

  const showFuncsSection = () => {
    Keyboard.dismiss();
    setShowEmoji(false);
    setShowFuncs(true);
    setShowGroupUsers(false);
    scrollToEnd();
  };

  const showGroupUsersSection = () => {
    Keyboard.dismiss();
    setShowEmoji(false);
    setShowFuncs(false);
    setShowGroupUsers(true);
    scrollToEnd();
  };

  function showInputs() {
    setShowEmoji(false);
    setShowFuncs(false);
    setShowGroupUsers(false);
    scrollToEnd();
  }

  function hideInputs() {
    Keyboard.dismiss();
    setShowEmoji(false);
    setShowFuncs(false);
    setShowGroupUsers(false);
  }

  useEffect(() => {
    async function fetchBase() {
      setChat(await getChatService().findChatById(chatId));
    }
    async function fetchSpeaker() {
      setSpeaker(await getUserService().findSelf());
    }
    async function fetchMessages() {
      setMessages(await getMessageService().findMessagesByChatId(chatId));
    }
    async function fetchData() {
      await fetchBase();
      await fetchSpeaker();
      await fetchMessages();
    }
    fetchData();
    const observers = [
      observeChatBackgroundDidChange(fetchBase),
      observeGroupDetailsDidChange(fetchBase),
    ];
    return () => observers.forEach(observer => observer.remove());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
      style={styles.container}>
      {chat && !!chat.background && (
        <Image source={{uri: chat.background}} style={styles.background} />
      )}

      <FlatList
        ref={list}
        data={messages}
        renderItem={({item}) => renderItem(item)}
        contentInset={{bottom: 12}}
        onScrollBeginDrag={hideInputs}
        onContentSizeChange={() => {
          if (shouldScrollToEnd) {
            list.current?.scrollToEnd();
            setScrollToEnd(false);
          }
        }}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.bottom}>
        <SafeAreaView>
          <View style={styles.typeView}>
            <TouchableOpacity onPress={showGroupUsersSection}>
              <Image source={icon_audio} style={styles.iconImage} />
            </TouchableOpacity>
            <TextInput
              value={inputText}
              onChangeText={value => setInputText(value)}
              style={styles.textInput}
              selectionColor="#07C160"
              returnKeyType="send"
              blurOnSubmit={false}
              enablesReturnKeyAutomatically
              onFocus={() => showInputs()}
              onSubmitEditing={async ({nativeEvent}) => {
                await sendText(chat!, speaker!, nativeEvent.text);
                setInputText('');
              }}
            />
            <TouchableOpacity onPress={showEmojiSection}>
              <Image source={showEmoji ? icon_keyboard : icon_facial_25} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={showFuncsSection}>
              <Image source={icon_func} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {showEmoji && <EmojiSection sendEmoji={emoji => setInputText(pre => pre + emoji)} />}
        {showFuncs && (
          <FunctionsSection
            isGroup={chat?.chatType === ChatType.Group}
            sendImage={() => sendImage(chat!, speaker!)}
            call={() => setCallModalVisible(true)}
            sendRedPocket={() => {
              navigation.navigate('SendRedpocket', {
                isGroup: chat?.chatType === ChatType.Group,
                completion: (amount: string, comment: string) =>
                  sendRedpocket(chat!, speaker!, amount, comment),
              });
            }}
            transfer={() => {
              const user = chat?.users.find(user => user.id !== 1);
              const avatar = user?.avatar || '';
              const name = user?.name || '';
              navigation.navigate('Transfer', {
                avatar,
                name,
                completion: (amount, comment) => transfer(chat!, speaker!, amount, comment),
              });
            }}
            switchSpeaker={() => {
              const user = chat?.users.find(user => user.id !== speaker?.id);
              toast.current?.show(`现在是${user?.id === 1 ? '你' : '对方'}在说话`);
              setSpeaker(user);
            }}
            sendContactCard={() => {
              navigation.navigate('SelectContact', {
                onComplete: contact => sendContactCard(chat!, speaker!, contact.user),
              });
            }}
            sendFile={() => sendFile(chat!, speaker!)}
            addTimeline={() =>
              showDateTimePicker({
                title: '请选择时间',
                completion: date => addTimeline(chat!, date),
              })
            }
            sendVoice={() => sendVoice(chat!, speaker!)}
            addSystemMsg={() =>
              navigation.navigate('InsertSystemMsg', {
                completion: (systemType, systemMsg) => addSystemMsg(chat!, systemType, systemMsg),
              })
            }
            paySuccess={() => {
              const user = chat?.users.find(user => user.id !== 1);
              navigation.navigate('PaySuccess', {
                avatar: user?.avatar || '',
                name: user?.name || '',
              });
            }}
          />
        )}
      </View>

      {chat?.chatType === ChatType.Group && showGroupUsers && (
        <GroupUsersSection
          users={chat.users}
          speaker={speaker}
          switchSpeaker={user => {
            toast.current?.show(`现在是${user.id === 1 ? '你' : user.name}在说话`);
            setSpeaker(user);
          }}
          manageGroup={() => navigation.navigate('GroupChatCreateOrUpdate', {chatId})}
        />
      )}

      <Toast ref={toast} />

      <VideoVoiceModal
        visible={callModalVisible}
        onClose={() => setCallModalVisible(false)}
        onPress={() => {
          const user = chat?.users.find(user => user.id !== 1);
          const avatar = user?.avatar || '';
          const name = user?.name || '';
          navigation.navigate('VideoCall', {
            avatar,
            name,
            completion: (isCancelled, duration) => sendCall(chat!, speaker!, isCancelled, duration),
          });
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: wechatColors.navigation,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    backgroundColor: '#F5F6F7',
  },
  typeView: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[3],
    backgroundColor: '#F5F6F7',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  textInput: {
    width: '70%',
    height: 36,
    padding: spacing[1],
    borderRadius: 5,
    backgroundColor: wechatColors.white,
  },
  empty: {
    backgroundColor: '#F5F6F7',
  },
});

export default ChatDetails;
