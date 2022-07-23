import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MomentLikeEntity} from '@database/entities/MomentEntity';
import {spacing} from '@design-system';
import {moment_like} from '@assets/images/wechat/discovery';

interface ILikesAreaProps {
  likes: MomentLikeEntity[];
  onLikePress?: (id: number) => void;
}

export default function LikesArea({likes, onLikePress}: ILikesAreaProps) {
  const nameNodes = likes.map((like, index) => {
    return (
      <Text key={like.id} onPress={() => onLikePress && onLikePress(like.id)}>
        {like.user.name}
        {index !== likes.length - 1 && '，'}
      </Text>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Image source={moment_like} style={styles.like} resizeMode="contain" />
        <Text>{'  '}</Text>
        {nameNodes}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[1],
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDEDED',
  },
  like: {
    width: 12,
    height: 10,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    color: '#576B95',
  },
});
