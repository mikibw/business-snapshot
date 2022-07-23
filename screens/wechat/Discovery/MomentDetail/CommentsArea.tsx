import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import {MomentCommentEntity} from '@database/entities/MomentEntity';
import dateDiff from '@utils/dateDiff';
import {moment_comment} from '@assets/images/wechat/discovery';

interface ICommentsAreaProps {
  comments: MomentCommentEntity[];
}

export default function CommentsArea({comments}: ICommentsAreaProps) {
  return (
    <View style={styles.container}>
      <Image source={moment_comment} style={styles.comment} />
      <View style={styles.comments}>
        {comments.map(comment => {
          return (
            <View key={comment.id} style={styles.item}>
              <Image source={{uri: comment.user.avatar}} style={styles.avatar} />
              <View style={styles.content}>
                <View style={styles.nameDate}>
                  <Text style={styles.name}>{comment.user.name}</Text>
                  <Text style={styles.date}>{dateDiff(comment.createdAt)}</Text>
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  {comment.content}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: spacing[1],
    paddingHorizontal: spacing[2],
  },
  comment: {
    width: 14,
    height: 12,
    marginTop: spacing[5],
  },
  comments: {
    flex: 1,
    marginLeft: spacing[3],
  },
  item: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: spacing[1],
  },
  nameDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    color: '#576B95',
  },
  date: {
    fontSize: 11,
    color: '#888888',
  },
  text: {
    fontSize: 14,
    color: wechatColors.black,
    marginTop: spacing[1],
  },
});
