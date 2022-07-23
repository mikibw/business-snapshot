import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {UserRequestEntity} from '@database/entities/UserRequestEntity';
import {radius, spacing, wechatColors} from '@design-system';

interface INewFriendsCellProps {
  requests: UserRequestEntity[];
  onPress?: () => void;
}

export default function NewFriendsCell({requests, onPress}: INewFriendsCellProps) {
  const count = requests.length;
  const avatars = requests.slice(0, 4).map(request => request.user.avatar);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>新的朋友</Text>
      <View style={styles.bottom}>
        <View style={styles.avatars}>
          {avatars.map((avatar, index) => (
            <Image key={index} source={{uri: avatar}} style={styles.avatar} />
          ))}
        </View>
        <Text style={styles.count}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  title: {
    fontSize: 13,
    color: '#999999',
  },
  bottom: {
    marginTop: spacing[2],
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatars: {
    flexDirection: 'row',
  },
  avatar: {
    width: 38,
    height: 38,
    marginRight: spacing[2],
    borderRadius: radius[1],
  },
  count: {
    height: 16,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
    color: wechatColors.white,
    paddingHorizontal: spacing[2],
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F15151',
  },
});
