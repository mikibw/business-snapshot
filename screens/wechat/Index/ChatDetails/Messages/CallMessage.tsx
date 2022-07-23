import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, spacing} from '@design-system';
import {CallStatus, CallType, MessageEntity} from '@database/entities/MessageEntity';
import Triangle from 'react-native-triangle';
import {durationText} from '@utils/durationText';
import {video_call_left, video_call_right} from '@assets/images/wechat/index/index';

interface CallMessageProps {
  message: MessageEntity;
  onLongPress?: () => void;
}

export const CallMessage: React.FC<CallMessageProps> = ({message, onLongPress}) => {
  const fromMe = message.user.id === 1;

  let icon: any = null;
  switch (message.callType) {
    case CallType.Video:
      icon = fromMe ? video_call_right : video_call_left;
      break;
    case CallType.Audio:
      icon = fromMe ? video_call_right : video_call_left;
      break;
  }

  let status = '';
  switch (message.callStatus) {
    case CallStatus.Connected:
      status = `通话时长${durationText(parseInt(message.duration))}`;
      break;
    case CallStatus.Rejected:
      status = fromMe ? '对方已拒绝' : '已拒绝';
      break;
    case CallStatus.Cancelled:
      status = '已取消';
      break;
    case CallStatus.Nonresponse:
      status = fromMe ? '对方无应答' : '无应答';
      break;
    case CallStatus.BusyChannel:
      status = fromMe ? '对方忙线中' : '忙线中';
      break;
  }

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
        <View style={[styles.content, fromMe && styles.fromMe]}>
          {!fromMe && <Image source={icon} style={[styles.icon, {marginRight: spacing[2]}]} />}
          <Text style={styles.status}>{status}</Text>
          {fromMe && <Image source={icon} style={[styles.icon, {marginLeft: spacing[2]}]} />}
        </View>
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
  status: {
    fontSize: 16,
    color: '#333333',
    marginVertical: spacing[3],
  },
  icon: {
    width: 20,
    height: 12,
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
