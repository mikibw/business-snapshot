import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import ContainerView from '@components/ContainerView';
import {LockListItem} from './types';
import LockCell from './LockCell';
import {usePrompt} from '@components/Prompt';
import useImagePicker from '@hooks/useImagePicker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {lock_bg_default} from '@assets/images/wechat/index/index';

export default function MiddleLock() {
  const insets = useSafeAreaInsets();

  const {showPrompt} = usePrompt();
  const selectImage = useImagePicker();

  const [data, setData] = React.useState<LockListItem>({
    title: '微商截图王',
    subtitle: '右滑可以返回，点击文字可以修改相关内容',
  });
  const [bgImage, setBgImage] = React.useState<string | null>(null);

  const changeBgImage = async () => {
    try {
      const result = await selectImage(0.9);
      setBgImage(result.uri);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  };

  function onChange() {
    showPrompt({
      title: '修改消息',
      defaultValue: data.title,
      defaultValue2: data.subtitle,
      placeholder: '请输入对方昵称',
      placeholder2: '请输入消息内容',
      doubleInput: true,
      completion: (text1, text2) => {
        if (!text1 || !text2) return;
        setData({
          title: text1,
          subtitle: text2,
        });
      },
    });
  }
  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={changeBgImage}>
        <Image source={bgImage ? {uri: bgImage} : lock_bg_default} style={styles.bgImage} />
      </TouchableOpacity>
      <LockCell
        item={data}
        onPress={() => onChange()}
        editable={false}
        style={{marginTop: insets.top}}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
});
