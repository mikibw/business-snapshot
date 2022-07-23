import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Menu from './Menu';
import Client from './Client';
import FakeSearchBar from '@components/FakeSearchBar.tsx';
import {spacing, wechatColors} from '@design-system';
import {Ionicons} from '@expo/vector-icons';
import ChatCell from '@screens/wechat/Index/Index/ChatCell';
import ContainerView from '@components/ContainerView';
import {ChatEntity} from '@database/entities/ChatEntity';
import {getChatService} from '@database/services/ChatService';
import {
  notifyChatUnreadCountDidChange,
  notifyContactsDidChange,
  observeChatsDidChange,
  observeUserProfileDidChange,
} from '@events';
import {WechatStackProps} from '@navigation/wechat';
import {getContactService} from '@database/services/ContactService';
import ClearModal from './ClearModal';

const Index = ({navigation}: WechatStackProps<'Index'>) => {
  const {showActionSheetWithOptions} = useActionSheet();
  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);
  const [clientVisible, setClientVisible] = React.useState<boolean>(true);
  const [clearModalVisible, setClearModalVisible] = React.useState<boolean>(false);

  const [chatList, setChatList] = React.useState<ChatEntity[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '微信',
      headerRight: () => (
        <Ionicons
          onPress={() => {
            setMenuVisible(!menuVisible);
          }}
          name={'add-circle-outline'}
          size={23}
          style={styles.more}
        />
      ),
    });
  }, [navigation, menuVisible]);

  function onMenuItemPress(index: number) {
    if (index === 0) {
      navigation.navigate('GroupChatCreateOrUpdate', {});
    } else if (index === 1) {
      async function deleteContacts(all: boolean, count: number = 0) {
        if (all) {
          await getContactService().deleteAllContacts();
        } else {
          await getContactService().deleteContacts(count);
        }
        notifyContactsDidChange();
        navigation.navigate('Contact');
      }
      async function insertContacts(count: number) {
        await getContactService().insertContacts(count);
        notifyContactsDidChange();
        navigation.navigate('Contact');
      }
      function showAutoOptions() {
        showActionSheetWithOptions(
          {
            options: ['添加10个', '删除10个', '取消'],
            cancelButtonIndex: 2,
          },
          buttonIndex => {
            if (buttonIndex === 2) return;
            if (buttonIndex === 0) insertContacts(10);
            if (buttonIndex === 1) deleteContacts(false, 10);
          },
        );
      }
      function addContactMannually() {
        navigation.navigate('CreateContact', {
          completion: () => {
            notifyContactsDidChange();
            navigation.navigate('Contact');
          },
        });
      }
      showActionSheetWithOptions(
        {
          options: ['自动添加', '手动添加', '删除20个好友', '删除全部好友', '取消'],
          cancelButtonIndex: 4,
        },
        buttonIndex => {
          if (buttonIndex === 4) return;
          if (buttonIndex === 0) showAutoOptions();
          if (buttonIndex === 1) addContactMannually();
          if (buttonIndex === 2) deleteContacts(false, 20);
          if (buttonIndex === 3) deleteContacts(true);
        },
      );
    } else if (index === 2) {
      navigation.navigate('Credential');
    } else if (index === 3) {
      setClearModalVisible(true);
    } else if (index === 4) {
      showActionSheetWithOptions(
        {
          title: '设置通知类型',
          options: ['显示锁屏通知', '显示顶部通知', '取消'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 2) return;
          if (buttonIndex === 0) {
            navigation.navigate('MiddleLock');
          } else if (buttonIndex === 1) {
            navigation.navigate('TopLock');
          }
        },
      );
    }
    setMenuVisible(false);
  }

  function onChatPress(chat: ChatEntity) {
    if (chat.users.find(user => user.id === 2)) {
      navigation.navigate('Credential');
    } else {
      if (chat.unreadCount > 0) markChatRead(chat);
      navigation.navigate('ChatDetails', {chatId: chat.id});
    }
  }

  async function markChatRead(chat: ChatEntity) {
    const count = chat.unreadCount;
    await getChatService().updateChatUnreadCount(chat.id, count > 0 ? 0 : 1);
    await fetchChats();
    notifyChatUnreadCountDidChange();
  }

  async function deleteChat(id: number) {
    await getChatService().deleteChatById(id);
    await fetchChats();
    notifyChatUnreadCountDidChange();
  }

  async function fetchChats() {
    let chats = await getChatService().findAllChats();
    let tops = chats.filter(chat => chat.pinTop);
    let bottoms = chats.filter(chat => !chat.pinTop);
    setChatList([...tops, ...bottoms]);
    notifyChatUnreadCountDidChange();
  }

  async function clearChats() {
    await getChatService().deleteAllChats();
    setChatList([]);
    notifyChatUnreadCountDidChange();
  }

  React.useEffect(() => {
    fetchChats();
    const obervers = [observeChatsDidChange(fetchChats), observeUserProfileDidChange(fetchChats)];
    return () => obervers.forEach(observer => observer.remove());
  }, []);

  return (
    <ContainerView style={styles.container}>
      <FakeSearchBar />
      {menuVisible && (
        <Menu onBackdropPress={() => setMenuVisible(false)} onItemPress={onMenuItemPress} />
      )}
      {clientVisible && <Client onPress={() => setClientVisible(false)} />}
      <FlatList
        data={chatList}
        renderItem={({item}) => (
          <ChatCell
            chat={item}
            onPress={() => onChatPress(item)}
            onMarkRead={() => markChatRead(item)}
            onDelete={() => deleteChat(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <ClearModal
        visible={clearModalVisible}
        onClose={() => setClearModalVisible(false)}
        onClear={clearChats}
      />
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  more: {
    marginRight: spacing[3],
  },
});

export default Index;
