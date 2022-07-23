import {moment_like} from '@assets/images/wechat/discovery';
import {MomentLikeEntity} from '@database/entities/MomentEntity';
import {spacing} from '@design-system';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

interface ILikesAreaProps {
  likes: MomentLikeEntity[];
}

export default function LikesArea({likes}: ILikesAreaProps) {
  return (
    <View style={styles.container}>
      <Image source={moment_like} style={styles.like} />
      <View style={styles.avatars}>
        {likes.map(like => {
          return <Image key={like.id} source={{uri: like.user.avatar}} style={styles.avatar} />;
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDEDED',
  },
  like: {
    width: 14,
    height: 12,
    marginTop: spacing[3],
  },
  avatars: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: spacing[3],
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: spacing[1],
    marginBottom: spacing[1],
  },
});
