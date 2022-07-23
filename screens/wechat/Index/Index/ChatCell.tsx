import React from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {colors, spacing, wechatColors} from '@design-system';
import Swipeout from 'react-native-swipeout';
import {ChatEntity, ChatType} from '@database/entities/ChatEntity';
import dateDiff from '@utils/dateDiff';
import AvatarBadge from './AvatarBadge';

interface ChatHistoryProps {
  chat: ChatEntity;
  onPress: (item: ChatEntity) => void;
  onMarkRead: (item: ChatEntity) => void;
  onDelete: (item: ChatEntity) => void;
  style?: StyleProp<ViewStyle>;
}

export default function ChatCell({chat, style, ...funcs}: ChatHistoryProps) {
  const swipeOutBtns = [
    {
      text: chat.unreadCount > 0 ? '标记已读' : '标记未读',
      backgroundColor: colors.background.blue,
      onPress: () => funcs.onMarkRead(chat),
    },
    {
      text: '删除',
      backgroundColor: colors.background.red2,
      onPress: () => funcs.onDelete(chat),
    },
  ];

  function getChatName() {
    switch (chat.chatType) {
      case ChatType.PublicAccount:
      case ChatType.Person:
        return chat.users.find(user => user.id !== 1)?.name;
      case ChatType.Group:
        return chat.groupName;
    }
  }

  function getMembers() {
    switch (chat.chatType) {
      case ChatType.PublicAccount:
      case ChatType.Person:
        return chat.users.filter(user => user.id !== 1);
      case ChatType.Group:
        return chat.users;
    }
  }

  return (
    <Swipeout right={swipeOutBtns} autoClose>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: chat.pinTop ? '#F5F6F7' : wechatColors.white,
          },
        ]}
        onPress={() => funcs.onPress(chat)}>
        <AvatarBadge users={getMembers()} badge={chat.unreadCount} />
        <View style={styles.content}>
          <View style={styles.topTextWrapper}>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                chat.chatType === ChatType.PublicAccount && {color: colors.text.lightBlue},
              ]}>
              {getChatName()}
            </Text>
            <Text style={styles.date}>{dateDiff(chat.updatedAt)}</Text>
          </View>
          <View style={styles.bottomTextWrapper}>
            <Text numberOfLines={1} style={styles.subtitle}>
              {chat.message}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing[4],
    paddingRight: spacing[2],
    backgroundColor: wechatColors.white,
  },
  chatImage: {
    width: 42,
    height: 42,
  },
  content: {
    flex: 1,
    marginLeft: spacing[3],
  },
  topTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: wechatColors.black,
  },
  bottomTextWrapper: {
    marginTop: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 13,
    color: '#B5B5B5',
  },
  date: {
    fontSize: 11,
    color: '#C9CBCD',
  },
  separator: {
    position: 'absolute',
    left: 70,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: wechatColors.navigation,
  },
});
