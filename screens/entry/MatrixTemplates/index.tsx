import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, spacing} from '@design-system';
import {EntryStackProps} from '@navigation/entry';

export default function MatrixTemplates({navigation}: EntryStackProps<'MatrixTemplates'>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.none} activeOpacity={1} onPress={navigation.goBack}>
        <Text style={styles.noneText}>无</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  none: {
    width: 108,
    height: 108,
    marginTop: spacing[4],
    marginLeft: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.grey1,
  },
  noneText: {
    fontSize: 16,
    color: colors.text.grey5,
  },
});
