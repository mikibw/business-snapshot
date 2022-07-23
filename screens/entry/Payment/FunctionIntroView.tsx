import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, spacing, typographics} from '@design-system';

import {intro_unlock, intro_no_mark, intro_update, intro_no_ad} from '@assets/images/entry/payment';

export default function FunctionIntroView() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={intro_unlock} style={styles.itemImage} />
        <Text style={styles.itemText}>{'解锁全部\n高级功能'}</Text>
      </View>
      <View style={styles.item}>
        <Image source={intro_no_mark} style={styles.itemImage} />
        <Text style={styles.itemText}>{'去除所有\n界面水印'}</Text>
      </View>
      <View style={styles.item}>
        <Image source={intro_update} style={styles.itemImage} />
        <Text style={styles.itemText}>{'后续界面\n同步更新'}</Text>
      </View>
      <View style={styles.item}>
        <Image source={intro_no_ad} style={styles.itemImage} />
        <Text style={styles.itemText}>{'100%无\n广告'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    alignItems: 'center',
    width: '25%',
  },
  itemImage: {
    width: 48,
    height: 48,
  },
  itemText: {
    marginTop: spacing[2],
    textAlign: 'center',
    ...typographics.textLink,
    color: colors.text.dark4,
  },
});
