import React from 'react';
import {View, Dimensions, StyleSheet, Image, ViewStyle, ImageStyle} from 'react-native';
import {spacing} from '@design-system';
import {icon_add} from '@assets/images/entry/photo-matrix';
import {MomentImageEntity} from '@database/entities/MomentEntity';

const relativeRatio = Dimensions.get('window').width / 375.0;
const relativeImageSize = 78 * relativeRatio;

interface IImageGridProps {
  images: MomentImageEntity[];
  isVideoStyle: boolean;
}

export default function ImageGrid({images, isVideoStyle}: IImageGridProps) {
  let layout: ViewStyle | null = null;
  let item: ImageStyle | null = null;

  if (images.length === 1) {
    const image = images[0];
    let width = image.width;
    let height = image.height;
    const ratio = height / width;
    width = Math.min(width, 236 * relativeRatio);
    width = Math.max(width, 54 * relativeRatio);
    if (ratio < 0.1) {
      height = width / 10;
    } else if (ratio > 10) {
      height = Math.min(300, width * 10);
    } else {
      height = width * ratio;
    }
    layout = {
      width,
      height,
    };
    item = {
      width: '100%',
      height: '100%',
    };
  } else if (images.length === 4) {
    const wh = relativeImageSize * 2 + spacing[1] * 2;
    layout = {
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: wh,
      height: wh,
    };
    item = {
      width: relativeImageSize,
      height: relativeImageSize,
      marginRight: spacing[1],
      marginBottom: spacing[1],
    };
  } else {
    const w = relativeImageSize * 3 + spacing[1] * 3;
    const rows = Math.floor((images.length + 2) / 3);
    const h = relativeImageSize * rows + spacing[1] * rows;
    layout = {
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: w,
      height: h,
    };
    item = {
      width: relativeImageSize,
      height: relativeImageSize,
      marginRight: spacing[1],
      marginBottom: spacing[1],
    };
  }

  return (
    <View style={[styles.container]}>
      {images.length === 1 ? (
        <View style={layout}>
          <Image source={{uri: images[0].source}} style={item} />
          {isVideoStyle && <Image source={icon_add} style={styles.video} />}
        </View>
      ) : (
        <View style={layout}>
          {images.map((image, index) => (
            <Image key={index} source={{uri: image.source}} style={item} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[3],
  },
  single: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 36,
    height: 36,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -18}, {translateY: -18}],
  },
});
