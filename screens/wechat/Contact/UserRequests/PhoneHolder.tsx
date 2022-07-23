import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {icon_phone} from '@assets/images/wechat/contact';
import {colors, spacing} from '@design-system';

export default function PhoneHolder() {
  return (
    <View style={styles.container}>
      <Image source={icon_phone} style={styles.phoneIcon} />
      <Text style={styles.phoneText}>添加手机联系人</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    width: 12,
    height: 20,
  },
  phoneText: {
    fontSize: 12,
    color: colors.text.grey2,
    marginTop: spacing[1],
  },
});
