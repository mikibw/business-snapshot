import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import {arrow_forward} from '@assets/images/nav';

interface ITextCellProps {
  name: string;
  value?: string | null;
  onPress?: () => void;
  height?: number;
}

export default function TextCell({name, value, onPress, height}: ITextCellProps) {
  return (
    <TouchableOpacity style={[styles.container, {height: height || 55}]} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.right}>
        {value && <Text style={styles.value}>{value}</Text>}
        <Image source={arrow_forward} style={styles.arrow} />
      </View>
    </TouchableOpacity>
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
  name: {
    ...wechatTypographics.title(false),
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  value: {
    ...wechatTypographics.body(false),
  },
  arrow: {
    width: 8,
    height: 14,
    marginLeft: spacing[3],
  },
});
