import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MessageEntity} from '@database/entities/MessageEntity';
import {spacing} from '@design-system';
import dateLine from '@utils/dateLine';

interface ITimelineMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export function TimelineMessage({message, onLongPress}: ITimelineMessageProps) {
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={onLongPress} style={styles.container}>
      <Text style={styles.timeline}>{dateLine(message.timeline)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: spacing[4],
  },
  timeline: {
    fontSize: 13,
    color: '#B5B5B5',
  },
});
