import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MomentEntity} from '@database/entities/MomentEntity';
import {spacing, wechatColors} from '@design-system';
import {icon_add} from '@assets/images/entry/photo-matrix';

interface ILinkProps {
  moment: MomentEntity;
}

export default function Link({moment}: ILinkProps) {
  const source = moment.images[0]?.source;
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {!!source && <Image source={{uri: source}} style={styles.image} />}
        {!!source && moment.videoStyle && <Image source={icon_add} style={styles.video} />}
      </View>
      <Text numberOfLines={2} style={styles.text}>
        {moment.linkTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[3],
    padding: spacing[1],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  imageWrapper: {
    width: 40,
    height: 40,
    backgroundColor: wechatColors.navigation,
  },
  image: {
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
  text: {
    flex: 1,
    marginLeft: spacing[1],
    fontSize: 13,
    color: wechatColors.black,
  },
});
