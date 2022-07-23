import React from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList, View, Alert} from 'react-native';
import {colors, spacing, wechatColors} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {UserEntity, UserType} from '@database/entities/UserEntity';
import {getUserService} from '@database/services/UserService';
import {WechatStackProps} from '@navigation/wechat';
import UserInfoCell from './UserInfoCell';
import {
  notifyUserProfileDidChange,
  notifyContactsDidChange,
  notifyChatsDidChange,
  notifyNewFriendsDidChange,
} from '@events';
import {getContactService} from '@database/services/ContactService';
import Separator from '@screens/wechat/Common/Separator';
import ContainerView from '@components/ContainerView';
import Button from '@screens/wechat/Common/Button';
import {getChatService} from '@database/services/ChatService';
import {usePrompt} from '@components/Prompt';
import {useActionSheet} from '@expo/react-native-action-sheet';
import useImagePicker from '@hooks/useImagePicker';
import base64Image from '@utils/base64Image';

type User = {
  avatar: string;
  name: string;
  wxId?: string;
  isService: boolean;
  realname?: string;
};

export default function UserDetail({route, navigation}: WechatStackProps<'UserDetail'>) {
  const {userId, isInContacts} = route.params;

  const {showPrompt} = usePrompt();
  const selectImage = useImagePicker();
  const {showActionSheetWithOptions} = useActionSheet();
  const [user, setUser] = React.useState<User | null>(null);

  useNavigationOptions(
    {
      headerRight: () => (
        <TouchableOpacity onPress={save}>
          <Text style={styles.save}>保存</Text>
        </TouchableOpacity>
      ),
    },
    [user],
  );

  const findUserDetail = async () => {
    const userEntity = await getUserService().findUserById(userId);
    if (!userEntity) return;
    setUser({
      avatar: userEntity.avatar,
      name: userEntity.name,
      wxId: userEntity.wxId,
      isService: userEntity.userType === UserType.PublicAccount,
      realname: userEntity.realname,
    });
  };

  const save = async () => {
    if (!user) return;
    const userEntity = new UserEntity();
    userEntity.id = userId;
    userEntity.avatar = user.avatar;
    userEntity.name = user.name;
    userEntity.wxId = user.wxId ?? '';
    userEntity.userType = user.isService ? UserType.PublicAccount : UserType.Person;
    userEntity.realname = user.realname;
    await getUserService().saveUser(userEntity);
    notifyUserProfileDidChange(userId);
    navigation.goBack();
  };

  const saveContact = async () => {
    const userEntity = await getUserService().findUserById(userId);
    if (userEntity) {
      await getContactService().saveContact(userEntity);
      notifyNewFriendsDidChange();
      notifyContactsDidChange();
      navigation.setParams({isInContacts: true});
    }
  };

  const startChat = async () => {
    const user = await getUserService().findUserById(userId);
    if (!user) return;
    const chat = await getChatService().createP2pChat(user);
    navigation.navigate('ChatDetails', {chatId: chat.id});
    notifyChatsDidChange();
  };

  const modify = async (index: number) => {
    if (index === 0) {
      try {
        const {base64} = await selectImage(0.1, [1, 1], true);
        if (base64) setUser(pre => pre && {...pre, avatar: base64Image(base64)});
      } catch (msg: any) {
        msg && Alert.alert('', msg, [{text: '确定'}]);
      }
    }
    if (index === 1) {
      showPrompt({
        title: '请输入昵称',
        placeholder: '请输入昵称',
        completion: text => {
          if (!text) return;
          setUser(pre => pre && {...pre, name: text});
        },
      });
    } else if (index === 2) {
      showPrompt({
        title: '请输入微信号',
        placeholder: '请输入微信号',
        completion: text => {
          if (!text) return;
          setUser(pre => pre && {...pre, wxId: text});
        },
      });
    } else if (index === 3) {
      showActionSheetWithOptions(
        {
          options: ['是', '否', '取消'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 2) return;
          setUser(pre => pre && {...pre, isService: buttonIndex === 0});
        },
      );
    } else if (index === 4) {
      showPrompt({
        title: '请输入真实姓名',
        placeholder: '请输入真实姓名',
        completion: text => {
          if (!text) return;
          setUser(pre => pre && {...pre, realname: text});
        },
      });
    }
  };

  React.useEffect(() => {
    findUserDetail();
  }, []);

  const data: {
    name: string;
    value: string;
    isAvatar: boolean;
  }[] = [
    {
      name: '头像',
      value: user?.avatar || '',
      isAvatar: true,
    },
    {
      name: '昵称',
      value: user?.name || '',
      isAvatar: false,
    },
    {
      name: '微信号',
      value: user?.wxId || '',
      isAvatar: false,
    },
    {
      name: '是否是服务号',
      value: user ? (user.isService ? '是' : '否') : '',
      isAvatar: false,
    },
    {
      name: '真实姓名',
      value: user?.realname || '',
      isAvatar: false,
    },
  ];

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Button
          type="primary"
          text={isInContacts ? '发消息' : '添加'}
          onPress={() => {
            if (isInContacts) {
              startChat();
            } else {
              saveContact();
            }
          }}
        />
      </View>
    );
  };

  return (
    <ContainerView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => <UserInfoCell {...item} onPress={() => modify(index)} />}
        ItemSeparatorComponent={() => <Separator left={0} />}
        ListFooterComponent={renderFooter}
        keyExtractor={(_, index) => index.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.greyBG,
  },
  save: {
    fontSize: 16,
    color: colors.text.green1,
    marginRight: spacing[4],
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing[11],
  },
});
