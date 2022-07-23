import {colors, spacing, wechatColors} from '@design-system';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ContactListFooter(props: {count: number}) {
  return (
    <View>
      <View style={styles.separator} />
      <Text style={styles.count}>{`${props.count}位朋友及联系人`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: wechatColors.separator,
  },
  count: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.text.grey5,
    marginVertical: spacing[4],
  },
});
