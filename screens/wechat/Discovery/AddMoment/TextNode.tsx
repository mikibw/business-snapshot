import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {wechatColors} from '@design-system';

export default function TextNode({value, placeholder}: {value: string; placeholder?: string}) {
  return (
    <Text numberOfLines={2} style={!!value ? styles.value : styles.placeholder}>
      {value || placeholder || ''}
    </Text>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 15,
    color: wechatColors.black,
  },
  placeholder: {
    fontSize: 15,
    color: '#BEBEBE',
  },
});
