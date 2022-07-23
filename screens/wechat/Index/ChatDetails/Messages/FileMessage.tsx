import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import {MessageEntity} from '@database/entities/MessageEntity';
import Triangle from 'react-native-triangle';
import {file_holder} from '@assets/images/wechat/index/index';

interface FileMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export const FileMessage: React.FC<FileMessageProps> = ({message, onLongPress}) => {
  const fromMe = message.user.id === 1;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={onLongPress}
      style={[styles.container, fromMe && {justifyContent: 'flex-end'}]}>
      {!fromMe && <Image source={{uri: message.user.avatar}} style={styles.avatar} />}
      {!fromMe && (
        <View style={[styles.triangle, {marginLeft: spacing[1]}]}>
          <Triangle width={4} height={8} color="white" direction={'left'} />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>{message.fileName}</Text>
          <Text style={styles.fileSize}>{message.fileSize}</Text>
        </View>
        <Image source={file_holder} style={styles.fileHolder} />
      </View>
      {fromMe && (
        <View style={[styles.triangle, {marginRight: spacing[1]}]}>
          <Triangle width={4} height={8} color="white" direction={'right'} />
        </View>
      )}
      {fromMe && (
        <Image source={{uri: message.user.avatar}} style={styles.avatar} resizeMode={'contain'} />
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
  content: {
    width: 236,
    height: 62,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    backgroundColor: wechatColors.white,
  },
  fileHolder: {
    width: 30,
    height: 40,
  },
  fileDetails: {
    justifyContent: 'flex-start',
  },
  fileName: {
    fontSize: 15,
    color: '#333333',
  },
  fileSize: {
    fontSize: 11,
    color: '#333333',
    marginTop: spacing[1],
  },
  triangle: {
    paddingTop: spacing[3],
  },
});
