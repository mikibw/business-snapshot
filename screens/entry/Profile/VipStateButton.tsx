import React from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import LinerGradientBackground from '@components/LinerGradientBackground';
import {colors, spacing, typographics} from '@design-system';
import ShadowBackground from '@components/ShadowBackground';
import {Ionicons} from '@expo/vector-icons';
import withAlpha from '@utils/withAlpha';

import {icon_crown_r, icon_crown_y} from '@assets/images/entry/common';

interface IVipStateButtonProps {
  isViper: boolean;
  onPress?: () => void;
}

export default function VipStateButton({isViper, onPress}: IVipStateButtonProps) {
  return isViper ? (
    <View style={styles.content}>
      <Image source={icon_crown_y} style={styles.vipImage} />
      <Text style={styles.vipText}>你已可享受特权</Text>
    </View>
  ) : (
    <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
      <ShadowBackground
        style={styles.shadowContainer}
        shadowOffset={{width: 0, height: 4}}
        shadowRadius={7}
        shadowColor={withAlpha(colors.shadow.red, 0.6)}>
        <LinerGradientBackground
          style={{flex: 1}}
          gradient={{start: colors.gradient.red.start, end: colors.gradient.red.end}}>
          <View style={[styles.content, {flex: 1}]}>
            <Image source={icon_crown_r} style={styles.vipImage} />
            <Text style={styles.unvipText}>升级VIP</Text>
          </View>
        </LinerGradientBackground>
      </ShadowBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    width: 176,
    height: 50,
    transform: [{translateY: 16}],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipText: {
    fontSize: 21,
    fontWeight: 'normal',
    lineHeight: 25,
    color: colors.text.gold1,
  },
  unvipText: {
    ...typographics.button,
    color: colors.text.red,
  },
  vipImage: {
    width: 18,
    height: 18,
    marginRight: spacing[1],
  },
});
