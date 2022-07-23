import {arrow_forward} from '@assets/images/nav';
import {icon_qrcode} from '@assets/images/wechat/profile';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {UserProfile} from '../types';

interface IProfileHeaderProps {
  profile: UserProfile;
  onPress?: () => void;
}

export default function ProfileHeader({profile, onPress}: IProfileHeaderProps) {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Image source={{uri: profile.avatar}} style={styles.avatar} />
        <View style={styles.right}>
          <Text style={styles.name}>{profile.name}</Text>
          <View style={styles.bottom}>
            <Text style={styles.wx}>{`微信号：${profile.wxId}`}</Text>
            <View style={styles.indicator}>
              <Image source={icon_qrcode} style={styles.qrcode} />
              <Image source={arrow_forward} style={styles.arrow} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 104,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: wechatColors.white,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[7],
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius[1],
  },
  right: {
    flex: 1,
    marginLeft: spacing[6],
  },
  name: {
    ...wechatTypographics.headLine(true),
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing[2],
  },
  wx: {
    ...wechatTypographics.body(false),
  },
  indicator: {
    marginRight: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrcode: {
    width: 20,
    height: 20,
    marginRight: spacing[6],
  },
  arrow: {
    width: 8,
    height: 14,
  },
});
