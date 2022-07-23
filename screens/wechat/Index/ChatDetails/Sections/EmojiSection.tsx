import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {spacing} from '@design-system';
import {SavedImageSelectedSection} from './SavedImageSelectedSection';
import {EmojiSelectedSection} from './EmojiSelectedSection';
import SearchImage from '@assets/images/icons/search.png';
import FacialImage from '@assets/images/icons/facial.png';
import HeartImage from '@assets/images/icons/heart.png';

interface EmojiSectionProps {
  sendEmoji: (item: string) => void;
}

export const EmojiSection: React.FC<EmojiSectionProps> = ({sendEmoji}) => {
  const [faceSelected, setFaceSelected] = useState<boolean>(true);
  const [searchSelected, setSearchSelected] = useState<boolean>(false);
  const [heartSelected, setHeartSelected] = useState<boolean>(false);

  const resetIcon = () => {
    setFaceSelected(false);
    setSearchSelected(false);
    setHeartSelected(false);
  };
  const selectEmoji = () => {
    resetIcon();
    setFaceSelected(true);
  };
  const selectSearchEmoji = () => {
    resetIcon();
    setSearchSelected(true);
  };
  const selectSavedEmoji = () => {
    resetIcon();
    setHeartSelected(true);
  };
  const addImage = () => {
    console.log('AddImage');
  };

  return (
    <View style={styles.emoji}>
      <View style={styles.emojiView}>
        <TouchableOpacity
          style={[styles.selectedIcon, searchSelected && {backgroundColor: 'white'}]}
          onPress={selectSearchEmoji}>
          <Image source={SearchImage} style={styles.iconImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectedIcon, faceSelected && {backgroundColor: 'white'}]}
          onPress={selectEmoji}>
          <Image source={FacialImage} style={styles.iconImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectedIcon, heartSelected && {backgroundColor: 'white'}]}
          onPress={selectSavedEmoji}>
          <Image source={HeartImage} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      {faceSelected && <EmojiSelectedSection sendEmoji={sendEmoji} />}

      {heartSelected && <SavedImageSelectedSection addImage={addImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    width: 30,
    height: 30,
  },
  emoji: {
    height: 300,
  },
  emojiView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing['3'],
    paddingVertical: spacing['2'],
    backgroundColor: '#F5F6F7',
  },
  selectedIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing['4'],
  },
});
