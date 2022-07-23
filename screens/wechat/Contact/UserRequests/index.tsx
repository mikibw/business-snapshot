import * as React from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors, spacing, typographics, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import FakeSearchBar from '@components/FakeSearchBar.tsx';
import PhoneHolder from './PhoneHolder';
import {UserRequestListItem} from '../types';
import UserRequestCell from './UserRequestCell';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {getUserRequestService} from '@database/services/UserRequestService';
import {
  observeUserProfileDidChange,
  observeContactsDidChange,
  notifyNewFriendsDidChange,
} from '@events';
import Separator from '@screens/wechat/Common/Separator';
import ContainerView from '@components/ContainerView';
import {usePrompt} from '@components/Prompt';
import {useActionSheet} from '@expo/react-native-action-sheet';

export default function UserRequests({navigation}: WechatStackProps<'Contact'>) {
  const {showActionSheetWithOptions} = useActionSheet();

  useNavigationOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          showActionSheetWithOptions(
            {
              options: ['添加10个', '删除10个', '取消'],
              cancelButtonIndex: 2,
            },
            buttonIndex => {
              if (buttonIndex === 2) return;
              if (buttonIndex === 0) addUserRequests(10);
              if (buttonIndex === 1) deleteUserRequests(10);
            },
          );
        }}>
        <Text style={styles.addText}>添加朋友</Text>
      </TouchableOpacity>
    ),
  });

  const {showPrompt} = usePrompt();

  const [items, setItems] = React.useState<UserRequestListItem[]>([]);

  const findUserRequests = React.useCallback(async () => {
    const userRequests = await getUserRequestService().findAllUserRequests();
    const data: UserRequestListItem[] = userRequests.map(ur => {
      return {
        id: ur.user.id,
        avatar: ur.user.avatar,
        name: ur.user.name,
        message: ur.message,
        isAdded: false,
      };
    });
    for (const item of data) {
      item.isAdded = await getUserRequestService().isInUserRequestContactList(item.id);
    }
    setItems(data);
  }, []);

  const checkUserDetail = (userId: number, isInContacts: boolean) => {
    navigation.navigate('UserDetail', {userId, isInContacts});
  };

  const updateUserRequestMessage = async (userId: number, message: string) => {
    await getUserRequestService().updateMessageByUserId(userId, message);
    await findUserRequests();
  };

  const changeUserRequestMessage = (userId: number) => {
    showPrompt({
      title: '修改好友验证消息',
      placeholder: '请输入好友验证消息',
      completion: text => {
        if (!text) return;
        updateUserRequestMessage(userId, text);
      },
    });
  };

  const deleteUserRequest = async (item: UserRequestListItem) => {
    await getUserRequestService().deleteUserRequestByUserId(item.id);
    await findUserRequests();
    if (!item.isAdded) notifyNewFriendsDidChange();
  };

  const addUserRequests = React.useCallback(async (count: number) => {
    await getUserRequestService().insertUserRequests(count);
    await findUserRequests();
    notifyNewFriendsDidChange();
  }, []);

  const deleteUserRequests = React.useCallback(async (count: number) => {
    await getUserRequestService().deleteUserRequests(count);
    await findUserRequests();
    notifyNewFriendsDidChange();
  }, []);

  React.useEffect(() => {
    findUserRequests();
    const observers = [
      observeUserProfileDidChange(findUserRequests),
      observeContactsDidChange(findUserRequests),
    ];
    return () => observers.forEach(observer => observer.remove());
  }, []);

  return (
    <ContainerView style={styles.container}>
      <FakeSearchBar text="微信号/手机号" />
      <PhoneHolder />
      <View style={styles.days3}>
        <Text style={styles.days3Text}>近三天</Text>
      </View>
      <FlatList
        data={items}
        ItemSeparatorComponent={() => <Separator left={78} />}
        renderItem={({item}) => (
          <UserRequestCell
            userRequst={item}
            onPress={() => checkUserDetail(item.id, item.isAdded)}
            onModify={() => changeUserRequestMessage(item.id)}
            onDelete={() => deleteUserRequest(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  addText: {
    fontSize: 16,
    color: wechatColors.alpha70,
    marginRight: spacing[4],
  },
  days3: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: wechatColors.greyBG,
  },
  days3Text: {
    marginLeft: spacing[4],
    ...typographics.textLabel,
    color: colors.text.grey5,
  },
});
