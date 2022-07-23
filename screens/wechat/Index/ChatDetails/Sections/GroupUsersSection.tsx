import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {UserEntity} from '@database/entities/UserEntity';
import {spacing, wechatColors} from '@design-system';
import {group_management} from '@assets/images/wechat/index/index';

interface IGroupUsersSectionProps {
  users: UserEntity[];
  speaker?: UserEntity;
  switchSpeaker?: (user: UserEntity) => void;
  manageGroup?: () => void;
}

type ListItem = {
  user: UserEntity | null;
};

export default function GroupUsersSection({
  users,
  speaker,
  switchSpeaker,
  manageGroup,
}: IGroupUsersSectionProps) {
  const data: ListItem[] = [null, ...users].map(item => ({user: item}));

  function renderItem(item: ListItem) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => (item.user ? switchSpeaker?.(item.user) : manageGroup?.())}
        style={{width: '20%', height: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={item.user ? {uri: item.user.avatar} : group_management}
          style={[
            {width: 56, height: 56, borderRadius: 28},
            item.user && item.user.id === speaker?.id && {borderWidth: 2, borderColor: '#F45252'},
          ]}
        />
        <Text
          numberOfLines={2}
          style={{fontSize: 10, color: item.user ? '#000000' : '#F45252', marginTop: spacing[2]}}>
          {item.user ? item.user.name : '管理群'}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.content}
        data={data}
        renderItem={({item}) => renderItem(item)}
        numColumns={5}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: wechatColors.white,
  },
  content: {
    height: 250,
  },
});
