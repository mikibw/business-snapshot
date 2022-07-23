import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {UserEntity} from '@database/entities/UserEntity';

interface IMemberAvatarsProps {
  members: UserEntity[];
}

export default function MemberAvatars({members}: IMemberAvatarsProps) {
  if (members.length === 0) return null;
  const _members = members.slice(0, 4);
  return (
    <View style={styles.container}>
      {_members.map((member, index) => {
        return (
          <Image
            key={index}
            source={{uri: member.avatar}}
            style={[
              styles.avatar,
              {
                marginLeft: _members.length === 1 ? 0 : -16,
                zIndex: -index,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});
