import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {spacing, typographics, wechatColors} from '@design-system';
import AddImage from '@assets/images/addImage.png';

interface SavedImageSelectedSectionProps {
  addImage: () => void;
}
export const SavedImageSelectedSection: React.FC<SavedImageSelectedSectionProps> = ({addImage}) => {
  return (
    <ScrollView style={styles.emojiSectionList}>
      <Text style={styles.label}>添加的单个表情包</Text>
      <View style={styles.imagesView}>
        <TouchableOpacity onPress={addImage}>
          <Image style={styles.image} source={AddImage} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emojiSectionList: {
    flex: 1,
    backgroundColor: wechatColors.greyBG,
    paddingLeft: spacing['3'],
  },
  label: {
    ...typographics.textLabel,
    marginVertical: spacing['3'],
  },
  flatListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  emojiIcon: {
    marginRight: spacing['3'],
  },
  image: {
    width: 59,
    height: 59,
    marginRight: spacing['3'],
  },
  imagesView: {
    flexDirection: 'row',
  },
});
