import {spacing} from '@design-system';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface INoteProps {
  name: string;
  desc: string;
}

export default function Note({name, desc}: INoteProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  name: {
    fontSize: 14,
    color: '#576B95',
  },
  desc: {
    marginTop: spacing[2],
    fontSize: 12,
    color: '#777777',
  },
});
