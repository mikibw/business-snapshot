import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Triangle from 'react-native-triangle';
import {colors, spacing} from '@design-system';
import {MessageEntity} from '@database/entities/MessageEntity';

interface TextMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export const TextMessage: React.FC<TextMessageProps> = ({message, onLongPress}) => {
  const fromMe = message.user.id === 1;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={onLongPress}
      style={[styles.container, fromMe && {justifyContent: 'flex-end'}]}>
      {!fromMe && (
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: message.user.avatar}} style={styles.avatar} />
        </View>
      )}
      {!fromMe && (
        <View style={[styles.triangle, {marginLeft: spacing[1]}]}>
          <Triangle width={4} height={8} color={'white'} direction={'left'} />
        </View>
      )}
      <View style={[styles.message, fromMe && {backgroundColor: colors.background.green2}]}>
        <Text style={styles.content}>{message.content}</Text>
      </View>
      {fromMe && (
        <View style={[styles.triangle, {marginRight: spacing[1]}]}>
          <Triangle width={4} height={8} color={colors.background.green2} direction={'right'} />
        </View>
      )}
      {fromMe && <Image source={{uri: message.user.avatar}} style={styles.avatar} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing[4],
    marginHorizontal: spacing[3],
  },
  message: {
    borderRadius: 5,
    backgroundColor: 'white',
    padding: spacing[3],
    maxWidth: '70%',
  },
  content: {
    fontSize: 16,
    color: '#333333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  triangle: {
    paddingTop: spacing[3],
  },
});
