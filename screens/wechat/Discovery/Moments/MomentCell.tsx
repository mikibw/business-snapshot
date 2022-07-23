import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import {MomentCommentEntity, MomentEntity, MomentType} from '@database/entities/MomentEntity';
import ImageGrid from './ImageGrid';
import ToolBar from './ToolBar';
import Interaction from './Interaction';
import Link from './Link';

interface IMomentCellProps {
  moment: MomentEntity;
  showInteraction: boolean;
  onDelete?: () => void;
  onAction?: () => void;
  onLikePress?: (id: number) => void;
  onCommentPress?: (comment: MomentCommentEntity) => void;
}

export default function MomentCell({
  moment,
  showInteraction,
  onDelete,
  onAction,
  onLikePress,
  onCommentPress,
}: IMomentCellProps) {
  return (
    <View style={styles.container}>
      <Image source={{uri: moment.user.avatar}} style={styles.avatar} />
      <View style={styles.right}>
        <Text style={styles.username}>{moment.user.name}</Text>
        {!!moment.content && <Text style={styles.content}>{moment.content}</Text>}
        {moment.images.length > 0 && moment.momentType === MomentType.Normal && (
          <ImageGrid images={moment.images} isVideoStyle={moment.videoStyle} />
        )}
        {moment.momentType === MomentType.Link && <Link moment={moment} />}
        {!!moment.address && <Text style={styles.address}>{moment.address}</Text>}
        <ToolBar moment={moment} onDelete={onDelete} onAction={onAction} />
        {showInteraction && (moment.likes.length > 0 || moment.comments.length > 0) && (
          <Interaction moment={moment} onLikePress={onLikePress} onCommentPress={onCommentPress} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  right: {
    flex: 1,
    marginLeft: spacing[2],
  },
  username: {
    fontSize: 15,
    color: '#576B95',
    marginTop: spacing[1],
  },
  content: {
    fontSize: 15,
    color: wechatColors.black,
    marginTop: spacing[1],
  },
  address: {
    fontSize: 12,
    color: '#576B95',
    marginTop: spacing[2],
  },
});
