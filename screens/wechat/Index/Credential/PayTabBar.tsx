import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {icon_3dash, icon_keyboard} from '@assets/images/wechat/index/index';
import {spacing, typographics, wechatColors} from '@design-system';

function PayTabButton(props: {name: string}) {
  return (
    <TouchableOpacity style={styles.tabItem}>
      <View style={styles.tabItemSeparator} />
      <Image source={icon_3dash} style={styles.dashIcon} resizeMode="contain" />
      <Text style={styles.tabItemText}>{props.name}</Text>
    </TouchableOpacity>
  );
}

export default function PayTabBar() {
  return (
    <View style={styles.container}>
      <View style={styles.keyboard}>
        <Image source={icon_keyboard} style={styles.keyboardIcon} resizeMode="contain" />
      </View>
      <View style={styles.tabItems}>
        <PayTabButton name="我的账单" />
        <PayTabButton name="账户安全" />
        <PayTabButton name="更多" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
    paddingVertical: spacing[3],
    backgroundColor: '#F7F7F7E6',
  },
  keyboard: {
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardIcon: {
    width: 24,
    height: 24,
  },
  tabItems: {
    flex: 1,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashIcon: {
    width: 8,
    height: 12,
  },
  tabItemText: {
    marginLeft: spacing[1],
    ...typographics.subtitle,
    color: wechatColors.black,
  },
  tabItemSeparator: {
    width: 0.5,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#DFE0DF',
  },
});
