import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {EntryStackProps} from '@navigation/entry';
import {RootStackProps} from '@navigation/root';
import {Ionicons} from '@expo/vector-icons';
import {colors, spacing} from '@design-system';
import withAlpha from '@utils/withAlpha';

function Home({navigation}: RootStackProps<'Entry'> & EntryStackProps<'Home'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Ionicons name="person" size={18} style={{marginRight: spacing[3]}} />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        onPress={() => {
          navigation.navigate('Wechat');
        }}>
        123
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: withAlpha(colors.background.grey1, 0.9),
  },
});

export default Home;
