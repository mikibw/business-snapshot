import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {avatar_placeholder} from '@assets/images/wechat/discovery';

interface IUserInfoCellProps {
  name: string;
  value: string;
  isAvatar: boolean;
  onPress?: () => void;
}

export default function UserInfoCell({name, value, isAvatar, onPress}: IUserInfoCellProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      {isAvatar ? (
        <Image style={styles.avatar} source={value ? {uri: value} : avatar_placeholder} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    backgroundColor: wechatColors.white,
  },
  name: {
    ...wechatTypographics.title(false),
  },
  value: {
    ...wechatTypographics.body(false),
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: radius[1],
    backgroundColor: 'red',
  },
});
