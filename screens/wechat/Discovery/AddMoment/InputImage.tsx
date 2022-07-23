import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {bg_add_qrcode} from '@assets/images/wechat/profile';
import {radius, spacing} from '@design-system';
import {icon_delete} from '@assets/images/wechat/discovery';

interface IInputImageProps {
  images: string[];
  onAdd?: () => void;
  onDelete?: (index: number) => void;
}

export default function InputImage({images, onAdd, onDelete}: IInputImageProps) {
  return (
    <View style={styles.container}>
      {images.map((image, index) => {
        return (
          <View key={index} style={styles.item}>
            <Image source={{uri: image}} style={styles.image} />
            <TouchableOpacity style={styles.delete} onPress={() => onDelete && onDelete(index)}>
              <Image source={icon_delete} style={styles.deleteImage} />
            </TouchableOpacity>
          </View>
        );
      })}
      {images.length < 9 && (
        <TouchableOpacity style={styles.item} onPress={onAdd}>
          <Image source={bg_add_qrcode} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  item: {
    width: '25%',
    padding: spacing[2],
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius[1],
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#07C160',
  },
  deleteImage: {
    width: 12,
    height: 12,
  },
});
