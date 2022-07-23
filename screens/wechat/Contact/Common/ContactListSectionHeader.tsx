import {colors, spacing, typographics, wechatColors, wechatTypographics} from '@design-system';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ContactListSectionHeader(props: {title: string}) {
  return (
    <View style={[styles.container, {height: !props.title ? 12 : 30}]}>
      {props.title !== 'empty' && <Text style={styles.text}>{props.title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: wechatColors.greyBG,
  },
  text: {
    marginLeft: spacing[4],
    ...typographics.textLabel,
    color: colors.text.grey5,
  },
});
