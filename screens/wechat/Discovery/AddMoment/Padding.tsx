import {wechatColors} from '@design-system';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Padding() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: wechatColors.navigation,
  },
});
