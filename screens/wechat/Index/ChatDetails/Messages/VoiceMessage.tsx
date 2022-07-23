import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, spacing} from '@design-system';
import VoiceLeftImage from '@assets/images/voice_left.png';
import VoiceRightImage from '@assets/images/voice_right.png';
import {MessageEntity} from '@database/entities/MessageEntity';
import Triangle from 'react-native-triangle';

interface VoiceMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export const VoiceMessage: React.FC<VoiceMessageProps> = ({message, onLongPress}) => {
  const fromMe = message.user.id === 1;

  const duration = parseInt(message.duration);
  let width = 80 + 1 * duration;
  width = Math.min(180, width);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={onLongPress}
      style={[styles.container, fromMe && {justifyContent: 'flex-end'}]}>
      {!fromMe && <Image source={{uri: message.user.avatar}} style={styles.avatar} />}
      {!fromMe && (
        <View style={[styles.triangle, {marginLeft: spacing[1]}]}>
          <Triangle width={4} height={8} color={'white'} direction={'left'} />
        </View>
      )}
      <View style={styles.view}>
        <View style={[styles.content, {width}, fromMe && styles.fromMe]}>
          {!fromMe && (
            <Image source={VoiceLeftImage} style={[styles.voiceIcon, {marginRight: spacing[2]}]} />
          )}
          <Text style={styles.duration}>{`${message.duration}"`}</Text>
          {fromMe && (
            <Image source={VoiceRightImage} style={[styles.voiceIcon, {marginLeft: spacing[2]}]} />
          )}
        </View>
        {!fromMe && !message.voiceRead && <View style={styles.unReadCircle} />}
        {/* {!fromMe && (
          <View style={styles.translate}>
            <Text style={styles.translateText}>转文字</Text>
          </View>
        )} */}
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    borderRadius: 5,
    backgroundColor: 'white',
  },
  fromMe: {
    justifyContent: 'flex-end',
    backgroundColor: '#9FEB70',
  },
  duration: {
    fontSize: 14,
    color: '#333333',
    marginVertical: spacing[3],
  },
  voiceIcon: {
    width: 11,
    height: 16,
  },
  unReadCircle: {
    width: 6,
    height: 6,
    borderRadius: 25,
    marginLeft: spacing[2],
    backgroundColor: '#F15151',
  },
  translate: {
    borderRadius: 25,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    marginHorizontal: spacing[2],
    backgroundColor: '#D8D8D8',
  },
  translateText: {
    fontSize: 11,
    color: '#333333',
  },
  triangle: {
    paddingTop: spacing[3],
  },
});
