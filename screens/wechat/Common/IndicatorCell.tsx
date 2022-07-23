import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, StyleProp} from 'react-native';
import {arrow_forward} from '@assets/images/nav';
import {spacing, wechatColors, wechatTypographics} from '@design-system';

interface IIndicatorCellProps {
  icon?: any;
  name: string;
  accessory?: ReactNode;
  node?: ReactNode;
  height?: number;
  arrowHidden?: boolean;
  onPress?: () => void;
}

export default function IndicatorCell({
  icon,
  name,
  accessory,
  node,
  height,
  arrowHidden,
  onPress,
}: IIndicatorCellProps) {
  return (
    <TouchableOpacity style={[styles.container, {height: height || 50}]} onPress={onPress}>
      <View style={styles.left}>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={[styles.name, {marginLeft: icon ? spacing[4] : 0}]}>{name}</Text>
        {accessory}
      </View>
      <View style={styles.right}>
        {node}
        {arrowHidden ? null : <Image source={arrow_forward} style={styles.arrow} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    backgroundColor: wechatColors.white,
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },
  name: {
    ...wechatTypographics.title(true),
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: spacing[2],
  },
  arrow: {
    width: 8,
    height: 14,
    marginLeft: spacing[3],
  },
});
