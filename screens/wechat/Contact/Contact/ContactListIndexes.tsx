import {colors, spacing} from '@design-system';
import React from 'react';
import {View, Text, StyleProp, ViewStyle, StyleSheet} from 'react-native';

interface IContactListIndexesProps {
  style?: StyleProp<ViewStyle>;
  indexes: string[];
}

export default function ContactListIndexes({style, indexes}: IContactListIndexesProps) {
  return (
    <View style={[styles.container, style]}>
      {indexes.map(t => (
        <Text key={t} style={styles.text}>
          {t}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 8,
    textAlign: 'center',
    color: colors.text.grey5,
    marginVertical: spacing[1] / 2,
  },
});
