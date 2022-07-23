import React from 'react';
import {Text, StyleSheet} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {WechatStackProps} from '@navigation/wechat';
import Separator from '@screens/wechat/Common/Separator';
import {UserEntity} from '@database/entities/UserEntity';
import {usePrompt} from '@components/Prompt';
import {getUserService} from '@database/services/UserService';
import MemberAvatars from './MemberAvatars';
import {getChatService} from '@database/services/ChatService';
import {notifyChatsDidChange, notifyGroupDetailsDidChange} from '@events';
import AvatarMultiple from '@components/AvatarMultiple';

export default function GroupChatCreateOrUpdate({
  route,
  navigation,
}: WechatStackProps<'GroupChatCreateOrUpdate'>) {
  const {chatId} = route.params;

  const {showPrompt} = usePrompt();

  const [members, setMembers] = React.useState<UserEntity[]>([]);
  const [groupName, setGroupName] = React.useState('');
  const [groupMemberCount, setGroupMemberCount] = React.useState(0);

  useNavigationOptions(
    {
      headerLeft: () => (
        <Text style={styles.cancel} onPress={navigation.goBack}>
          取消
        </Text>
      ),
      headerRight: () => (
        <Text style={styles.save} onPress={saveGroupChat}>
          保存
        </Text>
      ),
      title: chatId ? '编辑群聊' : '创建群聊',
    },
    [members, groupName, groupMemberCount],
  );

  React.useEffect(() => {
    async function fetchChatDetails() {
      if (chatId) {
        const chat = await getChatService().findChatById(chatId);
        if (!chat) return;
        changeMembers(chat.users);
        setGroupName(chat.groupName);
        setGroupMemberCount(chat.groupMemberCount);
      } else {
        changeMembers([]);
        setGroupName('爱情家');
        setGroupMemberCount(0);
      }
    }
    fetchChatDetails();
  }, []);

  async function saveGroupChat() {
    if (members.length < 2) return;
    if (chatId) {
      const chat = await getChatService().findChatById(chatId);
      if (!chat) return;
      chat.users = members;
      chat.groupName = groupName;
      chat.groupMemberCount = groupMemberCount;
      await getChatService().saveChat(chat);
      notifyGroupDetailsDidChange();
    } else {
      await getChatService().createGroupChat(members, groupName, groupMemberCount);
    }
    notifyChatsDidChange();
    navigation.goBack();
  }

  function changeGroupName() {
    showPrompt({
      title: '群昵称',
      placeholder: '请输入群昵称',
      completion: text => {
        setGroupName(text);
      },
    });
  }

  function changeGroupMemberCount() {
    showPrompt({
      title: '群成员个数',
      placeholder: '群成员个数',
      completion: text => {
        const num = parseInt(text);
        if (isNaN(num) || num < 0) return;
        setGroupMemberCount(num);
      },
    });
  }

  async function changeMembers(members: UserEntity[]) {
    const self = await getUserService().findSelf();
    setMembers([self!, ...members]);
  }

  return (
    <ContainerView style={styles.contianer}>
      <IndicatorCell
        height={55}
        name="群成员"
        accessory={
          <AvatarMultiple
            avatars={members.map(member => ({uri: member.avatar}))}
            style={styles.accessory}
          />
        }
        node={
          <>
            <MemberAvatars members={members} />
            <Text style={[styles.node, {marginLeft: spacing[3]}]}>{members.length}个成员</Text>
          </>
        }
        arrowHidden
        onPress={() =>
          navigation.navigate('SelectContactMultiple', {
            onComplete: contacts => changeMembers(contacts.map(contact => contact.user)),
          })
        }
      />
      <Separator left={0} />
      <IndicatorCell
        height={55}
        name="群昵称"
        node={<Text style={styles.node}>{groupName}</Text>}
        arrowHidden
        onPress={changeGroupName}
      />
      <Separator left={0} />
      <IndicatorCell
        height={55}
        name="群成员个数"
        node={<Text style={styles.node}>{groupMemberCount}</Text>}
        arrowHidden
        onPress={changeGroupMemberCount}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  cancel: {
    marginLeft: spacing[3],
    fontSize: 16,
    color: '#1B1B1B',
  },
  save: {
    fontSize: 16,
    color: '#07C160',
    marginRight: spacing[3],
  },
  accessory: {
    width: 46,
    height: 46,
    marginLeft: spacing[2],
  },
  node: {
    fontSize: 16,
    color: '#666666',
  },
});
