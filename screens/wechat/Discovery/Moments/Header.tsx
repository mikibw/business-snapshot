import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {radius, spacing, wechatColors} from '@design-system';
import {UserEntity} from '@database/entities/UserEntity';
import {getUserService} from '@database/services/UserService';
import useImagePicker from '@hooks/useImagePicker';
import base64Image from '@utils/base64Image';
import {observeMomentNotisDidChange, observeSelfProfileDidChange} from '@events';
import {avatar_placeholder, cover_change} from '@assets/images/wechat/discovery';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import {getMomentNotiService} from '@database/services/MomentNotiService';
import useCameraPicker from '@hooks/useCameraPicker';
import {useActionSheet} from '@expo/react-native-action-sheet';

interface IHeaderProps {
  onProfilePress?: () => void;
  onMessagePress?: () => void;
}

export default function Header({onProfilePress, onMessagePress}: IHeaderProps) {
  const selectCover = useImagePicker();
  const takeCover = useCameraPicker();
  const {showActionSheetWithOptions} = useActionSheet();

  const [cover, setCover] = React.useState<any>(null);
  const [user, setUser] = React.useState<UserEntity | undefined>(undefined);
  const [notiCount, setNotiCount] = React.useState(0);
  const [notiAvatar, setNotiAvatar] = React.useState<string | undefined>(undefined);

  function changeCover() {
    async function change(lib: boolean) {
      try {
        const {base64} = lib
          ? await selectCover(0.75, [1, 1], true)
          : await takeCover(0.75, [1, 1], true);
        if (base64) {
          const cover = base64Image(base64);
          setCover(cover);
          await getWalletDetailService().updateDetailByName('profile_cover', cover);
        }
      } catch (msg: any) {
        msg && Alert.alert('', msg, [{text: '确定'}]);
      }
    }
    showActionSheetWithOptions(
      {
        title: '修改背景图',
        options: ['打开系统相册', '打开相机', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        change(buttonIndex === 0);
      },
    );
  }

  React.useEffect(() => {
    async function fetchSelfProfile() {
      setUser(await getUserService().findSelf());
    }
    async function fetchProfileCover() {
      setCover(await getWalletDetailService().findDetailByName('profile_cover'));
    }
    async function fetchNotis() {
      setNotiCount(await getMomentNotiService().count());
      const noti = await getMomentNotiService().findLatestMomentNoti();
      setNotiAvatar(noti?.avatar || undefined);
    }
    fetchSelfProfile();
    fetchProfileCover();
    fetchNotis();
    const observers = [
      observeSelfProfileDidChange(fetchSelfProfile),
      observeMomentNotisDidChange(fetchNotis),
    ];
    return () => observers.forEach(observer => observer.remove());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        {cover ? (
          <TouchableOpacity style={styles.existCover} onPress={changeCover}>
            <Image source={{uri: cover}} style={styles.coverImage} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.noneCover} onPress={changeCover}>
            <Image source={cover_change} style={styles.changeCoverImage} />
            <Text style={styles.changeCoverText}>点击换封面</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profile}>
        <Text style={styles.name}>{user && user.name}</Text>
        <TouchableOpacity onPress={onProfilePress}>
          <Image source={user ? {uri: user.avatar} : avatar_placeholder} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <View style={[styles.unread, {height: notiCount > 0 ? 90 : 24}]}>
        {notiCount > 0 && (
          <TouchableOpacity style={styles.message} onPress={onMessagePress}>
            <Image source={{uri: notiAvatar}} style={styles.messageImage} />
            <Text style={styles.messageText}>{notiCount}条新消息</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  cover: {
    height: 290,
  },
  noneCover: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D8',
  },
  changeCoverImage: {
    width: 66,
    height: 66,
  },
  changeCoverText: {
    fontSize: 16,
    color: '#8D8D8D',
    marginTop: spacing[3],
  },
  existCover: {
    flex: 1,
    alignItems: 'center',
  },
  coverImage: {
    position: 'absolute',
    bottom: 0,
    width: '125%',
    height: '125%',
  },
  profile: {
    marginTop: -42,
    flexDirection: 'row',
    paddingHorizontal: spacing[3],
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: radius[1],
  },
  name: {
    fontSize: 18,
    color: wechatColors.white,
    marginTop: spacing[2],
    marginRight: spacing[5],
  },
  unread: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  message: {
    width: 164,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[1],
    marginBottom: spacing[3],
    borderRadius: 3,
    backgroundColor: '#323334',
  },
  messageImage: {
    width: 28,
    height: 28,
    borderRadius: 3,
  },
  messageText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: wechatColors.white,
  },
});
