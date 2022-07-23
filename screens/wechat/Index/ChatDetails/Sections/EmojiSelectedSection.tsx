import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {spacing, typographics} from '@design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface EmojiSelectedSectionProps {
  sendEmoji: (item: string) => void;
}
export const EmojiSelectedSection: React.FC<EmojiSelectedSectionProps> = ({sendEmoji}) => {
  const insets = useSafeAreaInsets();

  const recentData: string[] = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
  ];

  const allData: string[] = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '😙',
    '😜',
    '😝',
    '🤑',
    '🤓',
    '😎',
    '🤗',
    '🤡',
    '🤠',
    '😏',
    '😶',
    '😑',
    '😒',
    '🙄',
    '🤔',
    '😳',
    '😞',
    '😟',
    '😠',
    '😡',
    '😔',
    '😕',
    '😣',
    '😖',
    '😫',
    '😤',
    '😮',
    '😱',
    '😨',
    '😰',
    '😯',
    '😦',
    '😢',
    '😥',
    '😪',
    '😓',
    '🤤',
    '😲',
    '🤥',
    '🤢',
    '🤧',
    '🤐',
    '😷',
    '🤒',
    '🤕',
    '😴',
    '💤',
    '💩',
    '😈',
    '👹',
  ];

  return (
    <ScrollView contentInset={{bottom: insets.bottom}} style={styles.emojiSectionList}>
      <Text style={styles.label}>最近使用</Text>
      <View style={styles.section}>
        {recentData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => sendEmoji(item)}>
            <Text style={styles.emoji}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>所有表情</Text>
      <View style={styles.section}>
        {allData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => sendEmoji(item)}>
            <Text style={styles.emoji}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emojiSectionList: {
    flex: 1,
    paddingLeft: spacing['3'],
    backgroundColor: '#ECECEC',
  },
  label: {
    ...typographics.textLabel,
    marginVertical: spacing['3'],
  },
  section: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 30,
    marginRight: spacing['3'],
  },
});
