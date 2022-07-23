import React from 'react';
import {Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {radius, wechatColors, wechatTypographics} from '@design-system';

interface IButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button({type, text, onPress, style}: IButtonProps) {
  const primary = type === 'primary';

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: primary ? '#07C160' : '#F2F2F2'}, style]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: primary ? wechatColors.white : '#08AF57'}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 184,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius[1],
  },
  buttonText: {
    ...wechatTypographics.title(true),
  },
});
