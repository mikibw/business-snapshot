import React from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import {radius, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import Separator from '@screens/wechat/Common/Separator';
import {PersonalInfoListSectionData, UserProfile} from '../types';
import {getUserService} from '@database/services/UserService';
import ImageNode from './ImageNode';
import DescNode from './DescNode';
import {icon_qrcode} from '@assets/images/wechat/profile';
import {Alert} from 'react-native';
import {notifySelfProfileDidChange} from '@events';
import useImagePicker from '@hooks/useImagePicker';
import base64Image from '@utils/base64Image';
import ContainerView from '@components/ContainerView';
import {usePrompt} from '@components/Prompt';

export default function PersonalInfo({navigation}: WechatStackProps<'PersonalInfo'>) {
  const {showPrompt} = usePrompt();
  const selectImage = useImagePicker();

  const [data, setData] = React.useState<PersonalInfoListSectionData[]>([]);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  const generateDataSource = async () => {
    const self = await getUserService().findSelf();
    if (!self) return;

    const profile: UserProfile = {
      avatar: self.avatar,
      name: self.name,
      wxId: self.wxId,
    };
    setProfile(profile);

    const sections: PersonalInfoListSectionData[] = [];

    sections.push({
      key: '0',
      data: [
        {
          name: '头像',
          node: <ImageNode image={{uri: profile.avatar}} size={64} radius={radius[1]} />,
        },
        {
          name: '名字',
          node: <DescNode desc={profile.name} />,
        },
        // {
        //   name: '拍一拍',
        //   node: <DescNode desc="并说要给我500万" />,
        // },
        {
          name: '微信号',
          node: <DescNode desc={profile.wxId} />,
        },
        {
          name: '我的二维码',
          node: <ImageNode image={icon_qrcode} size={16} />,
        },
        {
          name: '更多',
        },
      ],
    });

    sections.push({
      key: '1',
      data: [
        {
          name: '我的地址',
        },
      ],
    });

    setData(sections);
  };

  const changeAvatar = async () => {
    const self = await getUserService().findSelf();
    if (self) {
      try {
        const {base64} = await selectImage(0.1, [1, 1], true);
        if (base64) {
          self.avatar = base64Image(base64);
          await getUserService().saveUser(self);
          notifySelfProfileDidChange();
          generateDataSource();
        }
      } catch (msg: any) {
        msg && Alert.alert('', msg, [{text: '确定'}]);
      }
    }
  };

  const changeName = async (text: string) => {
    const self = await getUserService().findSelf();
    if (!self) return;
    self.name = text;
    await getUserService().saveUser(self);
    notifySelfProfileDidChange();
    generateDataSource();
  };

  const changeWxId = async (text: string) => {
    const self = await getUserService().findSelf();
    if (!self) return;
    self.wxId = text;
    await getUserService().saveUser(self);
    notifySelfProfileDidChange();
    generateDataSource();
  };

  const onItemPress = (sectionKey: string, index: number) => {
    if (sectionKey === '0' && index === 0) {
      changeAvatar();
    } else if (sectionKey === '0' && index === 1) {
      showPrompt({
        title: '请输入昵称',
        placeholder: '请输入昵称',
        completion: text => {
          if (!text) return;
          changeName(text);
        },
      });
    } else if (sectionKey === '0' && index === 2) {
      showPrompt({
        title: '请输入微信号',
        placeholder: '请输入微信号',
        completion: text => {
          if (!text) return;
          changeWxId(text);
        },
      });
    } else if (sectionKey === '0' && index === 3) {
      navigation.navigate('MyQRCode', {profile: profile!});
    }
  };

  React.useEffect(() => {
    generateDataSource();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={data}
        ItemSeparatorComponent={() => <Separator left={16} />}
        renderSectionFooter={() => <View style={{height: 8}}></View>}
        renderItem={({item, index, section}) => {
          return (
            <IndicatorCell
              name={item.name}
              node={item.node}
              height={section.key === '0' && index === 0 ? 88 : 55}
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
});
