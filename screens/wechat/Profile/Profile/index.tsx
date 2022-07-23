import React from 'react';
import {StyleSheet, SectionList, View, Image, Alert, TouchableOpacity} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import {ProfileListSectionData, UserProfile} from '../types';
import {getUserService} from '@database/services/UserService';
import Separator from '@screens/wechat/Common/Separator';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import ProfileHeader from './ProfileHeader';
import {WechatStackProps} from '@navigation/wechat';
import {RootStackProps} from '@navigation/root';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {observeSelfProfileDidChange} from '@events';
import * as icons from '@assets/images/wechat/profile';
import ContainerView from '@components/ContainerView';

export default function Profile({
  navigation,
}: WechatStackProps<'Profile'> & RootStackProps<'Wechat'>) {
  useNavigationOptions({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: wechatColors.white,
    },
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo')}>
        <Image source={icons.profile_camera} style={styles.camera} />
      </TouchableOpacity>
    ),
  });

  const [data, setData] = React.useState<ProfileListSectionData[]>([]);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  const generateDataSource = async () => {
    const self = await getUserService().findSelf();
    if (!self) return;

    const profile: UserProfile = {
      avatar: self.avatar,
      name: self.name,
      wxId: self.wxId ?? '',
    };
    setProfile(profile);

    const sections: ProfileListSectionData[] = [];

    sections.push({
      key: '0',
      data: [
        {
          icon: icons.icon_wechat_pay,
          name: '支付',
        },
      ],
    });

    sections.push({
      key: '1',
      data: [
        {
          icon: icons.icon_collections,
          name: '收藏',
        },
        {
          icon: icons.icon_photos,
          name: '相册',
        },
        {
          icon: icons.icon_cards,
          name: '卡包',
        },
        {
          icon: icons.icon_emojs,
          name: '表情',
        },
      ],
    });

    sections.push({
      key: '2',
      data: [
        {
          icon: icons.icon_settings,
          name: '设置',
        },
      ],
    });

    setData(sections);
  };

  const onItemPress = (sectionKey: string, index: number) => {
    if (sectionKey === '0' && index === 0) {
      navigation.navigate('WechatPay');
    } else if (sectionKey === '2' && index === 0) {
      Alert.alert('是否退出小微模拟器？', '', [
        {
          text: '取消',
        },
        {
          text: '确定',
          onPress: () => navigation.navigate('Entry'),
        },
      ]);
    }
  };

  React.useEffect(() => {
    generateDataSource();
    const observer = observeSelfProfileDidChange(generateDataSource);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={data}
        ListHeaderComponent={() =>
          profile && (
            <ProfileHeader profile={profile} onPress={() => navigation.navigate('PersonalInfo')} />
          )
        }
        ItemSeparatorComponent={() => <Separator left={50} />}
        renderSectionHeader={() => <View style={{height: 8}}></View>}
        renderItem={({item, index, section}) => {
          return (
            <IndicatorCell
              icon={item.icon}
              name={item.name}
              height={55}
              onPress={() => onItemPress(section.key, index)}
            />
          );
        }}
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
  camera: {
    width: 20,
    height: 18,
    marginRight: spacing[4],
  },
});
