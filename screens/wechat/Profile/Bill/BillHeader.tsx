import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Triangle from 'react-native-triangle';
import {wechatColors} from '@design-system';

export default function BillHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>全部交易类型</Text>
      <Triangle width={10} height={5} color="#C2C2C2" direction="down" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: wechatColors.navigation,
  },
  title: {
    fontSize: 15,
    color: '#1E1E1E',
  },
});
