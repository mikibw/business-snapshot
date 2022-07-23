import React from 'react';
import {Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, Image} from 'react-native';
import {colors, radius, spacing} from '@design-system';
import {Ionicons} from '@expo/vector-icons';
import {icon_crown_y} from '@assets/images/entry/common';

interface IUpgradeVipButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function UpgradeVipButton({style, onPress}: IUpgradeVipButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={icon_crown_y} style={styles.image} />
      <Text style={styles.text}>开通VIP 去掉所有界面水印</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius[1],
    backgroundColor: colors.background.red1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 20,
    color: colors.text.gold1,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: spacing[1],
  },
});
