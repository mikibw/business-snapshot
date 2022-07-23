import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {spacing} from '@design-system';
import {MessageEntity} from '@database/entities/MessageEntity';

interface MediaMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export const MediaMessage: React.FC<MediaMessageProps> = ({message, onLongPress}) => {
  const fromMe = message.user.id === 1;

  let imageSize: any = null;
  const ratio = message.height / message.width;
  if (ratio < 1) {
    const width = Math.min(140, message.width);
    imageSize = {
      width,
      height: width * ratio,
    };
  } else if (ratio === 1) {
    imageSize = {
      width: 140,
      height: 140,
    };
  } else {
    const height = Math.min(140, message.height);
    imageSize = {
      width: height / ratio,
      height,
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={onLongPress}
      style={[styles.container, fromMe && {justifyContent: 'flex-end'}]}>
      {!fromMe && (
        <Image
          source={{uri: message.user.avatar}}
          style={[styles.avatar, {marginRight: spacing[2]}]}
        />
      )}
      <Image source={{uri: message.picture}} style={{...imageSize, borderRadius: 4}} />
      {fromMe && (
        <Image
          source={{uri: message.user.avatar}}
          style={[styles.avatar, {marginLeft: spacing[2]}]}
        />
      )}
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  triangle: {
    paddingTop: spacing[3],
  },
});
