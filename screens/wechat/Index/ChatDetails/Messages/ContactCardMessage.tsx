import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import Triangle from 'react-native-triangle';
import {MessageEntity} from '@database/entities/MessageEntity';

interface ContactCardMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export const ContactCardMessage: React.FC<ContactCardMessageProps> = ({message, onLongPress}) => {
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
        <View style={styles.row}>
          <Image source={{uri: message.shareContact.avatar}} style={styles.avatar} />
          <View style={styles.textView}>
            <Text numberOfLines={1} style={styles.name}>
              {message.shareContact.name}
            </Text>
            <Text numberOfLines={1} style={styles.wechatId}>
              {message.shareContact.wxId}
            </Text>
          </View>
        </View>
        <Text style={styles.label}>个人名片</Text>
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
  content: {
    width: 236,
    height: 84,
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: wechatColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    marginHorizontal: spacing[3],
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E8E8',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  name: {
    fontSize: 15,
    color: '#333333',
  },
  wechatId: {
    fontSize: 11,
    color: 'rgba(51, 51, 51, 0.4)',
  },
  textView: {
    flex: 1,
    marginHorizontal: spacing[2],
  },
  label: {
    fontSize: 11,
    color: 'rgba(51, 51, 51, 0.55)',
    marginHorizontal: spacing[3],
    marginVertical: spacing[1],
  },
  triangle: {
    paddingTop: spacing[3],
  },
});
