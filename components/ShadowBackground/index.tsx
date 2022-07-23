import withAlpha from '@utils/withAlpha';
import React, {ReactNode} from 'react';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {colors} from '@design-system';

interface IShadowBackgroundProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowRadius: number;
  shadowColor: string;
}

export default function ShadowBackground(props: IShadowBackgroundProps) {
  const _styles = StyleSheet.create({
    shadow: {
      shadowOffset: {
        width: props.shadowOffset.width,
        height: props.shadowOffset.height,
      },
      shadowOpacity: 1,
      shadowRadius: props.shadowRadius,
      shadowColor: props.shadowColor,
    },
  });
  return <View style={[_styles.shadow, props.style]}>{props.children}</View>;
}
