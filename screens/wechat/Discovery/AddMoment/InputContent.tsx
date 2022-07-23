import {spacing} from '@design-system';
import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export default function InputContent({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="请输入朋友圈内容"
        value={value}
        onChangeText={onChange}
        multiline
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 114,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  input: {
    fontSize: 16,
  },
});
