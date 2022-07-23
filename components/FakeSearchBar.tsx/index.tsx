import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {colors, radius, spacing, typographics, wechatColors} from '@design-system';
import {icon_search} from '@assets/images/icons';

export default function FakeSearchBar(props: {text?: string}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={icon_search} style={styles.searchIcon} />
        <Text style={styles.searchText}>{props.text || '搜索'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: wechatColors.navigation,
  },
  searchBar: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing[4],
    marginVertical: spacing[2],
    borderRadius: radius[1],
    backgroundColor: wechatColors.white,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchText: {
    marginLeft: spacing[2],
    ...typographics.paragraph,
    color: colors.text.grey9,
  },
});
