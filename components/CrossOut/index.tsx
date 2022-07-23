import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image} from 'react-native';
import {spacing} from '@design-system';
import {cross_out} from '@assets/images/nav';

interface ICrossOutProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function CrossOut({style, onPress}: ICrossOutProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={cross_out} style={styles.crossOut} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: spacing[3],
  },
  crossOut: {
    width: 24,
    height: 24,
  },
});
