import React from 'react';
import {View, Text, StyleSheet, Image, Alert, TouchableOpacity} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {Ionicons} from '@expo/vector-icons';
import {WechatStackProps} from '@navigation/wechat';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {bg_add_qrcode} from '@assets/images/wechat/profile';
import useImagePicker from '@hooks/useImagePicker';
import useNavigationOptions from '@hooks/useNavigationOptions';
import ContainerView from '@components/ContainerView';
import {usePrompt} from '@components/Prompt';

export default function MyQRCode({route}: WechatStackProps<'MyQRCode'>) {
  useNavigationOptions({
    headerRight: () => (
      <Ionicons name="ellipsis-horizontal" size={20} style={{marginRight: spacing[4]}} />
    ),
  });

  const {showPrompt} = usePrompt();

  const {profile} = route.params;

  const selectImage = useImagePicker();

  const [sex, setSex] = React.useState('男');
  const [address, setAddress] = React.useState('上海 浦东新区');
  const [imageURI, setImageURI] = React.useState('');

  const {showActionSheetWithOptions} = useActionSheet();

  const selectSex = () => {
    showActionSheetWithOptions(
      {
        options: ['男', '女', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 0) setSex('男');
        if (buttonIndex === 1) setSex('女');
      },
    );
  };

  const inputAddress = () => {
    showPrompt({
      title: '请输入地址',
      completion: text => {
        if (!text) return;
        setAddress(text);
      },
    });
  };

  const handleImagePicker = async () => {
    try {
      const result = await selectImage(1, [1, 1]);
      setImageURI(result.uri);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  };

  return (
    <ContainerView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.top}>
          <Image source={{uri: profile.avatar}} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name} onPress={selectSex}>{`${profile.name}${
              sex === '男' ? '👦' : '👱‍♀️'
            }`}</Text>
            <Text style={styles.address} onPress={inputAddress}>
              {address}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.qrcode} onPress={handleImagePicker}>
          <Image
            source={imageURI ? {uri: imageURI} : bg_add_qrcode}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.note}>扫一扫上面的二维码图案，加我微信</Text>
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: wechatColors.navigation,
  },
  content: {
    borderRadius: radius[2],
    marginHorizontal: spacing[4],
    backgroundColor: wechatColors.white,
    transform: [{translateY: -spacing[6]}],
  },
  top: {
    marginTop: spacing[6],
    marginHorizontal: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius[1],
  },
  info: {
    flex: 1,
    marginLeft: spacing[6],
  },
  name: {
    ...wechatTypographics.title(true),
    fontSize: 18,
  },
  address: {
    marginTop: spacing[3],
    ...wechatTypographics.footnote(true),
  },
  qrcode: {
    marginTop: spacing[8],
    marginHorizontal: spacing[9],
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  note: {
    marginTop: spacing[8],
    marginBottom: spacing[6],
    textAlign: 'center',
    ...wechatTypographics.footnote(true),
  },
});
