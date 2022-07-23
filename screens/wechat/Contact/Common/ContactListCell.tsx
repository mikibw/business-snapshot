import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {ContactListItem} from '../types';
import {radius, spacing, wechatTypographics} from '@design-system';
import {resolveImageSource} from '@utils/resolveImageSource';

interface IContactListCellProps {
  contact: ContactListItem;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function ContactListCell({contact, onPress, style}: IContactListCellProps) {
  const onPressProps = onPress ? {onPress} : {disabled: true};
  return (
    <TouchableOpacity style={[styles.container, style]} {...onPressProps}>
      <Image source={resolveImageSource(contact.avatar)} style={styles.avatar} />
      <Text style={styles.name}>{contact.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    marginLeft: spacing[4],
    marginVertical: spacing[2],
    borderRadius: radius[1],
  },
  name: {
    marginLeft: spacing[3],
    ...wechatTypographics.title(false),
  },
});
