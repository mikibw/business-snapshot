import React from 'react';
import {View, StyleSheet} from 'react-native';
import Triangle from 'react-native-triangle';
import {MomentCommentEntity, MomentEntity} from '@database/entities/MomentEntity';
import {spacing} from '@design-system';
import LikesArea from './LikesArea';
import CommentsArea from './CommentsArea';

interface IInteractionProps {
  moment: MomentEntity;
  onLikePress?: (id: number) => void;
  onCommentPress?: (comment: MomentCommentEntity) => void;
}

export default function Interaction({moment, onLikePress, onCommentPress}: IInteractionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.triangle}>
        <Triangle width={14} height={6} color="#F7F7F7" direction="up" />
      </View>
      <View style={styles.content}>
        {moment.likes.length > 0 && <LikesArea likes={moment.likes} onLikePress={onLikePress} />}
        {moment.comments.length > 0 && (
          <CommentsArea comments={moment.comments} onCommentPress={onCommentPress} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[2],
  },
  content: {
    paddingHorizontal: spacing[2],
    borderRadius: 2,
    backgroundColor: '#F7F7F7',
  },
  triangle: {
    paddingLeft: spacing[2],
  },
});
