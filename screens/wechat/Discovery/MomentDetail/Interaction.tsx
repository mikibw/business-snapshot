import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MomentEntity} from '@database/entities/MomentEntity';
import {spacing} from '@design-system';
import Triangle from 'react-native-triangle';
import LikesArea from './LikesArea';
import CommentsArea from './CommentsArea';

interface IInteractionProps {
  moment: MomentEntity;
}

export default function Interaction({moment}: IInteractionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.triangle}>
        <Triangle width={14} height={6} color="#F7F7F7" direction="up" />
      </View>
      <View style={styles.content}>
        {moment.likes.length > 0 && <LikesArea likes={moment.likes} />}
        {moment.comments.length > 0 && <CommentsArea comments={moment.comments} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[2],
    marginHorizontal: spacing[2],
  },
  content: {
    borderRadius: 2,
    backgroundColor: '#F7F7F7',
  },
  triangle: {
    paddingLeft: spacing[2],
  },
});
