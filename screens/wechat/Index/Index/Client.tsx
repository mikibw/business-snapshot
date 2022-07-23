import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {spacing} from '@design-system';
import {Ionicons} from '@expo/vector-icons';

interface IClientProps {
  onPress?: () => void;
}

export default function Client({onPress}: IClientProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={'desktop-outline'} size={20} color="#7A7B7C" />
      </View>
      <Text style={styles.text}>Mac 微信已登录</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: 0.5,
    borderTopColor: '#DFE1E2',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DFE1E2',
    backgroundColor: '#F5F6F7',
  },
  iconContainer: {
    flex: 0.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  text: {
    flex: 2.5,
    fontSize: 13,
    color: '#7E7E7E',
  },
});
