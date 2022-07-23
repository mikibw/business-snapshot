import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  MomentNotiAccessoryType,
  MomentNotiEntity,
  MomentNotiType,
} from '@database/entities/MomentNotiEntity';
import {radius, spacing, wechatColors} from '@design-system';
import dateDiff from '@utils/dateDiff';
import {icon_add} from '@assets/images/entry/photo-matrix';
import {moment_like} from '@assets/images/wechat/discovery';

interface IMomentNotiCellProps {
  noti: MomentNotiEntity;
}

export default function MomentNotiCell({noti}: IMomentNotiCellProps) {
  let content: React.ReactNode | null = null;
  switch (noti.momentNotiType) {
    case MomentNotiType.Like:
      content = <Image source={moment_like} style={styles.like} resizeMode="contain" />;
      break;
    case MomentNotiType.Comment:
      content = (
        <Text style={styles.comment} numberOfLines={1}>
          {noti.toName ? (
            <Text>
              回复了<Text style={styles.name}>{noti.toName}</Text>：{noti.content}
            </Text>
          ) : (
            <Text>{noti.content}</Text>
          )}
        </Text>
      );
      break;
  }

  let accessory: React.ReactNode | null = null;
  switch (noti.momentNotiAccessoryType) {
    case MomentNotiAccessoryType.Text:
      accessory = noti.accessory ? (
        <Text numberOfLines={3} style={[styles.accessory, styles.accessoryText]}>
          {noti.accessory}
        </Text>
      ) : null;
      break;
    case MomentNotiAccessoryType.Image:
    case MomentNotiAccessoryType.video:
      accessory = (
        <View style={styles.accessory}>
          <Image source={{uri: noti.accessory}} style={styles.accessoryImage} />
          {noti.momentNotiAccessoryType === MomentNotiAccessoryType.video && (
            <Image source={icon_add} style={styles.video} />
          )}
        </View>
      );
      break;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: noti.avatar}} style={styles.avatar} />
      <View style={styles.middle}>
        <Text style={styles.name}>{noti.name}</Text>
        {content}
        <Text style={styles.date}>{dateDiff(noti.createdAt)}</Text>
      </View>
      {accessory}
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingTop: spacing[2],
    paddingBottom: spacing[1],
    paddingHorizontal: spacing[2],
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius[1],
  },
  middle: {
    flex: 1,
    paddingTop: spacing[1],
    marginHorizontal: spacing[2],
  },
  name: {
    fontSize: 13,
    color: '#576B95',
  },
  like: {
    width: 14,
    height: 12,
    marginTop: spacing[1],
  },
  comment: {
    marginTop: spacing[1],
    fontSize: 13,
    color: wechatColors.black,
  },
  date: {
    marginTop: spacing[1],
    fontSize: 12,
    color: '#888888',
  },
  accessory: {
    width: 54,
    height: 54,
  },
  accessoryText: {
    fontSize: 13,
    color: '#888888',
  },
  accessoryImage: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -12}, {translateY: -12}],
  },
  separator: {
    height: 0.5,
    position: 'absolute',
    left: spacing[2],
    right: 0,
    bottom: 0,
    backgroundColor: '#EDEDED',
  },
});
