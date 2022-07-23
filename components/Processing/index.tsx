import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import {icon_paying} from '@assets/images/icons';

export default function Processing() {
  return (
    <View style={styles.container}>
      <Image source={icon_paying} style={styles.logo} />
      <Text style={styles.text}>微信支付</Text>
      <View style={styles.indicators}>
        <View style={[styles.indicator, {backgroundColor: '#828282'}]} />
        <View style={[styles.indicator, {backgroundColor: '#EDEDED'}]} />
        <View style={[styles.indicator, {backgroundColor: '#828282'}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 136,
    height: 136,
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: spacing[2],
    backgroundColor: '#4C4C4C',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateX: -68}, {translateY: -136}],
  },
  logo: {
    width: 36,
    height: 32,
  },
  text: {
    fontSize: 17,
    marginTop: spacing[4],
    color: wechatColors.white,
  },
  indicators: {
    flexDirection: 'row',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: spacing[4],
    marginHorizontal: spacing[1] / 2,
  },
});
