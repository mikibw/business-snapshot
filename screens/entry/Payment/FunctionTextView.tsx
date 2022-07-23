import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle, ImageBackground, Image} from 'react-native';
import {colors, radius, spacing, typographics} from '@design-system';
import {Ionicons} from '@expo/vector-icons';

import {bg_header} from '@assets/images/entry/common';
import {icon_crown_r} from '@assets/images/entry/common';

interface IFunctionTextViewProps {
  style?: StyleProp<ViewStyle>;
}

export default function FunctionTextView({style}: IFunctionTextViewProps) {
  return (
    <ImageBackground source={bg_header} style={[styles.container, style]} resizeMode="cover">
      <Text style={styles.title}>专业微商做图软件</Text>
      <Text style={styles.subtitle}>助你走上人生巅峰，大展宏图</Text>
      <View style={styles.power}>
        <Image source={icon_crown_r} style={styles.powerImage} />
        <Text style={styles.powerText}>升级VIP尊享4大特权</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 176,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: radius[2],
  },
  title: {
    marginTop: spacing[9],
    textAlign: 'center',
    ...typographics.display,
    color: colors.text.gold2,
  },
  subtitle: {
    marginTop: spacing[1] / 2,
    textAlign: 'center',
    ...typographics.caption,
    color: colors.text.gold2,
  },
  power: {
    height: 24,
    paddingHorizontal: spacing[4],
    marginTop: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.gold,
    borderRadius: radius[3],
  },
  powerText: {
    textAlign: 'center',
    ...typographics.textLabel,
    color: colors.text.red,
  },
  powerImage: {
    width: 16,
    height: 16,
    marginRight: spacing[1],
  },
});
