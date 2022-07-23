import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import {defaultItems, LockListItem} from './types';
import LockCell from './LockCell';
import {usePrompt} from '@components/Prompt';
import useImagePicker from '@hooks/useImagePicker';
import {lock_bg_default} from '@assets/images/wechat/index/index';

export default function MiddleLock() {
  const {showPrompt} = usePrompt();
  const selectImage = useImagePicker();

  const [data, setData] = React.useState<LockListItem[]>(Object.assign([], defaultItems));
  const [bgImage, setBgImage] = React.useState<string | null>(null);

  const changeBgImage = async () => {
    try {
      const result = await selectImage(0.9);
      setBgImage(result.uri);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  };

  function onChange(index: number) {
    const item = data[index];
    showPrompt({
      title: '修改消息',
      defaultValue: item.title,
      defaultValue2: item.subtitle,
      placeholder: '请输入对方昵称',
      placeholder2: '请输入消息内容',
      doubleInput: true,
      completion: (text1, text2) => {
        if (!text1 || !text2) return;
        const item: LockListItem = {
          title: text1,
          subtitle: text2,
        };
        data[index] = item;
        setData(Object.assign([], data));
      },
    });
  }

  function onAdd() {
    showPrompt({
      title: '新增消息',
      placeholder: '请输入对方昵称',
      placeholder2: '请输入消息内容',
      doubleInput: true,
      completion: (text1, text2) => {
        if (!text1 || !text2) return;
        const item: LockListItem = {
          title: text1,
          subtitle: text2,
        };
        setData(Object.assign([], [item, ...data]));
      },
    });
  }

  function onDelete(index: number) {
    data.splice(index, 1);
    setData(Object.assign([], data));
  }

  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={changeBgImage}>
        <Image source={bgImage ? {uri: bgImage} : lock_bg_default} style={styles.bgImage} />
      </TouchableOpacity>
      <View style={styles.top} pointerEvents="none">
        <Text style={styles.time}>4:59</Text>
        <Text style={styles.date}>2月13日 星期四</Text>
        <Text style={styles.season}>庚子年正月二十</Text>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({item, index}) => (
          <LockCell
            item={item}
            editable
            onPress={() => onChange(index)}
            onAdd={() => onAdd()}
            onDelete={() => onDelete(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
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
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 375 / 225,
  },
  list: {
    height: 352,
  },
  time: {
    marginTop: spacing[3],
    fontSize: 60,
    color: wechatColors.white,
  },
  date: {
    marginTop: spacing[1],
    fontSize: 20,
    color: wechatColors.white,
  },
  season: {
    marginTop: spacing[1],
    fontSize: 16,
    color: wechatColors.white,
  },
});
