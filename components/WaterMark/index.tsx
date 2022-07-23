import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import useGlobalState from '@hooks/useGlobalState';
import {water_mark_bg} from '@assets/images/entry/home';

export default function WaterMark() {
  const [isSubscribed] = useGlobalState('isSubscribed');
  if (isSubscribed) return null;
  return (
    <View style={styles.watermark} pointerEvents="none">
      <Image source={water_mark_bg} style={styles.watermarkImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  watermark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  watermarkImage: {
    width: '100%',
    height: '100%',
  },
});
