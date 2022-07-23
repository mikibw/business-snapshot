import {MomentCommentEntity} from '@database/entities/MomentEntity';
import {spacing} from '@design-system';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ICommentsAreaProps {
  comments: MomentCommentEntity[];
  onCommentPress?: (comment: MomentCommentEntity) => void;
}

export default function CommentsArea({comments, onCommentPress}: ICommentsAreaProps) {
  return (
    <View style={styles.container}>
      {comments.map(comment => {
        return (
          <Text
            key={comment.id}
            style={styles.comment}
            onPress={() => onCommentPress && onCommentPress(comment)}>
            <Text style={styles.username}>
              {comment.user.name}
              {comment.toUser ? ` 回复${comment.toUser.name}` : ''}
              {'：'}
            </Text>
            <Text style={styles.content}>{comment.content}</Text>
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing[1],
  },
  comment: {
    marginTop: spacing[1],
  },
  username: {
    fontSize: 12,
    color: '#576B95',
  },
  content: {
    fontSize: 12,
    color: '#000000',
  },
});
