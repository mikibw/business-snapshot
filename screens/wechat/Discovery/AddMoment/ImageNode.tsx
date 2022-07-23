import {avatar_placeholder} from '@assets/images/wechat/discovery';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function ImageNode({uri}: {uri: string}) {
  return <Image source={uri ? {uri} : avatar_placeholder} style={styles.avatar} />;
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
});
