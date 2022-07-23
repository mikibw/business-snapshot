import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {spacing} from '@design-system';

export interface IPageEntryItemProps {
  icon: any;
  name: string;
  onPress?: () => void;
}

function PageEntryItem(props: IPageEntryItemProps) {
  return (
    <View style={styles.container}>
      <Image source={props.icon} style={styles.image} />
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    marginTop: spacing[4],
  },
  image: {
    width: 25,
    height: 25,
  },
});

export default PageEntryItem;
