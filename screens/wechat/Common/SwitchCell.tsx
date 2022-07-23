import {spacing, wechatColors, wechatTypographics} from '@design-system';
import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

interface ISwitchCellProps {
  name: string;
  on: boolean;
  height?: number;
  onChange?: (on: boolean) => void;
}

export default function SwitchCell({name, on, height, onChange}: ISwitchCellProps) {
  return (
    <View style={[styles.container, {height: height || 50}]}>
      <Text style={styles.name}>{name}</Text>
      <Switch value={on} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    backgroundColor: wechatColors.white,
  },
  icon: {
    width: 20,
    height: 20,
  },
  name: {
    ...wechatTypographics.title(true),
  },
});
