import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {LockListItem} from './types';
import {radius, spacing, wechatColors} from '@design-system';
import {BlurView} from 'expo-blur';
import Swipeout, {SwipeoutButtonProperties} from 'react-native-swipeout';
import {logo_wechat} from '@assets/images/wechat/profile';

interface ILockCellProps {
  item: LockListItem;
  editable: boolean;
  onPress?: () => void;
  onAdd?: () => void;
  onDelete?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function LockCell({
  item,
  editable,
  onPress,
  onAdd,
  onDelete,
  style,
}: ILockCellProps) {
  const swipeouts: SwipeoutButtonProperties[] = [
    {
      text: '添加',
      backgroundColor: 'transparent',
      onPress: () => onAdd && onAdd(),
    },
    {
      text: '删除',
      backgroundColor: 'transparent',
      onPress: () => onDelete && onDelete(),
    },
  ];

  function renderChildren() {
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.container, style]} onPress={onPress}>
        <BlurView tint="light" intensity={90} style={styles.blur}>
          <View style={styles.top}>
            <View style={styles.mark}>
              <Image source={logo_wechat} style={styles.icon} />
              <Text style={styles.source}>微信</Text>
            </View>
            <Text style={styles.date}>现在</Text>
          </View>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text}>{item.subtitle}</Text>
        </BlurView>
      </TouchableOpacity>
    );
  }

  return editable ? (
    <Swipeout style={{backgroundColor: 'transparent'}} right={swipeouts} autoClose>
      {renderChildren()}
    </Swipeout>
  ) : (
    renderChildren()
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  blur: {
    height: 80,
    justifyContent: 'space-between',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    overflow: 'hidden',
    borderRadius: radius[1],
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mark: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },
  source: {
    marginLeft: spacing[1],
    fontSize: 14,
    color: '#333333',
  },
  date: {
    fontSize: 14,
    color: '#333333',
  },
  text: {
    fontSize: 14,
    color: wechatColors.black,
  },
});
