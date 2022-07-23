import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Image} from 'react-native';

interface IAvatarItemProps {
  source: any;
  withPadding: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AvatarItem({source, withPadding, style}: IAvatarItemProps) {
  return (
    <View style={[{padding: withPadding ? 0.5 : 0}, style]}>
      <Image source={source} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
  },
});
