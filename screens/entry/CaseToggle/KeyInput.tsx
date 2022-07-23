import {colors} from '@design-system';
import withAlpha from '@utils/withAlpha';
import React, {ReactNode} from 'react';
import {Text, StyleProp, ViewStyle, StyleSheet, TouchableOpacity} from 'react-native';

interface IKeyInputProps {
  style?: StyleProp<ViewStyle>;
  number?: string;
  onPress?: () => void;
  children?: ReactNode;
}

export default function KeyInput({style, number, onPress, children}: IKeyInputProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {children || <Text style={number ? styles.number : styles.copy}>{number || '复制'}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: withAlpha(colors.border.black, 0.1),
  },
  number: {
    fontSize: 30,
    fontWeight: 'normal',
    lineHeight: 36,
    color: colors.text.black,
  },
  copy: {
    fontSize: 22,
    fontWeight: 'normal',
    lineHeight: 27,
    color: colors.text.green1,
  },
});
