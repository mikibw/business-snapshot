import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {wechatTypographics} from '@design-system';

export default function DescNode(props: {desc: string}) {
  return <Text style={styles.desc}>{props.desc}</Text>;
}

const styles = StyleSheet.create({
  desc: {
    ...wechatTypographics.body(false),
  },
});
