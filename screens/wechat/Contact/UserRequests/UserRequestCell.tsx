import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import {UserRequestListItem} from '../types';
import {colors, radius, spacing, typographics, wechatTypographics} from '@design-system';
import {resolveImageSource} from '@utils/resolveImageSource';
import Swipeout from 'react-native-swipeout';

interface IUserRequestCellProps {
  userRequst: UserRequestListItem;
  onPress?: () => void;
  onModify?: () => void;
  onDelete?: () => void;
}

export default function UserRequestCell({
  userRequst,
  onPress,
  onModify,
  onDelete,
}: IUserRequestCellProps) {
  const swipeouts = [
    {
      text: '删除',
      backgroundColor: '#FA5151',
      onPress: () => onDelete && onDelete(),
    },
    {
      text: '修改',
      backgroundColor: '#C5C6C9',
      onPress: () => onModify && onModify(),
    },
  ];

  return (
    <Swipeout style={{backgroundColor: 'transparent'}} right={swipeouts} autoClose>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={resolveImageSource(userRequst.avatar)} style={styles.avatar} />
        <View style={styles.textBox}>
          <Text style={styles.name}>{userRequst.name}</Text>
          <Text style={styles.message}>{userRequst.message}</Text>
        </View>
        <View style={styles.rightBox}>
          {userRequst.isAdded ? (
            <View>
              <Text style={styles.alreadyAddedText}>已添加</Text>
            </View>
          ) : (
            <View style={styles.check}>
              <Text style={styles.checkText}>查看</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    marginLeft: spacing[4],
    marginVertical: spacing[3],
    borderRadius: radius[1],
  },
  textBox: {
    marginLeft: spacing[3],
  },
  name: {
    ...wechatTypographics.title(false),
  },
  message: {
    marginTop: spacing[1],
    ...wechatTypographics.desc(false),
  },
  rightBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: spacing[4],
  },
  alreadyAddedText: {
    ...typographics.subtitle,
    color: colors.text.grey9,
  },
  check: {
    width: 50,
    height: 26,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  checkText: {
    ...typographics.subtitle,
    color: colors.text.green2,
  },
});
