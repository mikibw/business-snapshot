import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AvatarMultiple from '@components/AvatarMultiple';
import {UserEntity} from '@database/entities/UserEntity';
import {spacing, wechatColors} from '@design-system';
import {chat_credential} from '@assets/images/wechat/index/index';

interface IAvatarBadgeProps {
  users: UserEntity[];
  badge: number;
}

export default function AvatarBadge({users, badge}: IAvatarBadgeProps) {
  let avatars = users.map(user => ({uri: user.avatar}));
  if (users.length === 1) {
    const user = users[0];
    // 微信支付
    if (user.id === 2) {
      avatars = [chat_credential];
    }
  }

  return (
    <View style={styles.container}>
      <AvatarMultiple avatars={avatars} style={styles.avatar} />
      {badge > 0 && <Text style={styles.badge}>{badge > 99 ? '···' : badge.toString()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    overflow: 'hidden',
    paddingHorizontal: spacing[1],
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    color: wechatColors.white,
    backgroundColor: '#F15151',
  },
});
