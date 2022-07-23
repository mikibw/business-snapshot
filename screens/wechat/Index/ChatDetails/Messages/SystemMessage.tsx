import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {MessageEntity, SystemType} from '@database/entities/MessageEntity';
import {spacing} from '@design-system';
import redpocket from '@assets/images/redPocket.png';

interface ISystemMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export function SystemMessage({message, onLongPress}: ISystemMessageProps) {
  function renderMessage() {
    switch (message.systemType) {
      case SystemType.ReceiveRedpocket:
        const parts = message.systemMsg.split(/(红包)/g).filter(part => !!part);
        return (
          <View style={{flexDirection: 'row'}}>
            <Image source={redpocket} style={styles.redpocketIcon} />
            <Text style={styles.commonText}>
              {parts.map(part => {
                return part === '红包' ? (
                  <Text key={part} style={styles.redpocketText}>
                    {part}
                  </Text>
                ) : (
                  part
                );
              })}
            </Text>
          </View>
        );
      default:
        return <Text style={styles.commonText}>{message.systemMsg}</Text>;
    }
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onLongPress={onLongPress}>
      {renderMessage()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: spacing[4],
    paddingHorizontal: spacing[6],
  },
  commonText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#B5B5B5',
  },
  redpocketIcon: {
    width: 12,
    height: 15,
    marginRight: spacing[1],
  },
  redpocketText: {
    color: '#FC9B37',
  },
});
