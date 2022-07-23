import React from 'react';
import {StyleSheet, FlatList, View, Alert} from 'react-native';
import {colors, spacing, wechatColors} from '@design-system';
import {UserEntity, UserType} from '@database/entities/UserEntity';
import {getUserService} from '@database/services/UserService';
import {WechatStackProps} from '@navigation/wechat';
import UserInfoCell from './UserInfoCell';
import {getContactService} from '@database/services/ContactService';
import Separator from '@screens/wechat/Common/Separator';
import ContainerView from '@components/ContainerView';
import Button from '@screens/wechat/Common/Button';
import {usePrompt} from '@components/Prompt';
import {useActionSheet} from '@expo/react-native-action-sheet';
import useImagePicker from '@hooks/useImagePicker';
import base64Image from '@utils/base64Image';
import Toast from '@components/Toast';
import {ContactEntity} from '@database/entities/ContactEntity';

type User = {
  avatar: string;
  name: string;
  wxId: string;
  isService: boolean;
  realname: string;
};

export default function CreateContact({route, navigation}: WechatStackProps<'CreateContact'>) {
  const {completion} = route.params;

  const {showPrompt} = usePrompt();
  const selectImage = useImagePicker();
  const {showActionSheetWithOptions} = useActionSheet();
  const toast = React.useRef<Toast>(null);

  const [user, setUser] = React.useState<User>({
    avatar: '',
    name: '截图王',
    wxId: '',
    isService: false,
    realname: '',
  });

  const saveContact = async () => {
    if (!user.avatar) {
      toast.current?.show('请选择头像');
      return;
    }
    if (!user.name) {
      toast.current?.show('请输入昵称');
      return;
    }
    if (!user.wxId) {
      toast.current?.show('请输入微信号');
      return;
    }
    const userEntity = new UserEntity();
    userEntity.avatar = user.avatar;
    userEntity.name = user.name;
    userEntity.wxId = user.wxId;
    userEntity.userType = user.isService ? UserType.PublicAccount : UserType.Person;
    userEntity.realname = user.realname;
    const save = await getUserService().saveUser(userEntity);

    const contactEntity = new ContactEntity();
    contactEntity.user = save;
    await getContactService().saveContact(userEntity);

    navigation.goBack();
    completion?.();
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

  const data: {
    name: string;
    value: string;
    isAvatar: boolean;
  }[] = [
    {
      name: '头像',
      value: user.avatar,
      isAvatar: true,
    },
    {
      name: '昵称',
      value: user.name,
      isAvatar: false,
    },
    {
      name: '微信号',
      value: user.wxId,
      isAvatar: false,
    },
    {
      name: '是否是服务号',
      value: user.isService ? '是' : '否',
      isAvatar: false,
    },
    {
      name: '真实姓名',
      value: user.realname,
      isAvatar: false,
    },
  ];

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Button type="primary" text="保存" onPress={saveContact} />
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
      <Toast ref={toast} />
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
