import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import Triangle from 'react-native-triangle';
import {
  menu_chat,
  menu_add_friend,
  menu_transfer,
  menu_pay,
  menu_bin,
  menu_bell,
} from '@assets/images/wechat/index/index';

interface IMenuProps {
  onBackdropPress?: () => void;
  onItemPress?: (index: number) => void;
}

export default function Menu({onBackdropPress, onItemPress}: IMenuProps) {
  const data = [
    {
      image: menu_chat,
      text: '发起群聊',
    },
    {
      image: menu_add_friend,
      text: '添加朋友',
    },
    {
      image: menu_pay,
      text: '微信支付',
    },
    {
      image: menu_bin,
      text: '删除所有聊天',
    },
    {
      image: menu_bell,
      text: '生成消息通知',
    },
  ];

  return (
    <TouchableOpacity activeOpacity={1} onPress={onBackdropPress} style={styles.backdrop}>
      <View style={styles.container}>
        <View style={styles.triangle}>
          <Triangle width={10} height={5} color="#4C4C4C" direction="up" />
        </View>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.menu}
              onPress={() => onItemPress && onItemPress(index)}>
              <Image source={item.image} style={styles.image} resizeMode={'contain'} />
              <View style={styles.textView}>
                <Text style={styles.menuText}>{item.text}</Text>
              </View>
              <View style={styles.separator} />
            </TouchableOpacity>
          )}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: spacing[3],
  },
  triangle: {
    alignItems: 'flex-end',
    paddingRight: spacing[3],
  },
  list: {
    borderRadius: 4,
  },
  menu: {
    height: 50,
    paddingLeft: spacing[6],
    paddingRight: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C4C4C',
  },
  image: {
    width: 18,
    height: 18,
  },
  textView: {
    marginLeft: spacing[2],
    backgroundColor: '#4C4C4C',
  },
  menuText: {
    fontSize: 15,
    color: wechatColors.white,
  },
  separator: {
    height: 0.5,
    position: 'absolute',
    left: 50,
    right: spacing[1],
    bottom: 0,
    backgroundColor: '#616161',
  },
});
