import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {spacing} from '@design-system';
import {arrow_backward} from '@assets/images/nav';

export default function ArrowBack() {
  return <Image source={arrow_backward} style={styles.arrow} />;
}

const styles = StyleSheet.create({
  arrow: {
    width: 10,
    height: 18,
    marginLeft: spacing[3],
  },
});
