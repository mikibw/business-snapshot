import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import {redpocket_header_bg} from '@assets/images/wechat/index/index';
import Separator from '@screens/wechat/Common/Separator';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

export default function RedpocketDetail({route}: WechatStackProps<'RedpocketDetail'>) {
  const {sendUser, receiveUsers} = route.params;

  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      <Image source={redpocket_header_bg} style={styles.headerBg} resizeMode="stretch" />
      <View style={styles.top}>
        <View style={styles.sendUser}>
          <Image source={{uri: sendUser.avatar}} style={styles.sendUserAvatar} />
          <Text style={styles.sendUserName}>{`${sendUser.name} 发出的红包`}</Text>
        </View>
        <Text style={styles.comment}>{sendUser.comment}</Text>
      </View>
      <View style={styles.gap} />
      <View style={styles.bottom}>
        <Text style={styles.listTitle}>他们也刚刚领到红包</Text>
        <Separator left={0} />
        <FlatList
          data={receiveUsers}
          renderItem={({item}) => (
            <View style={styles.cell}>
              <Image source={{uri: item.avatar}} style={styles.receiveUserAvatar} />
              <View style={styles.receiveUserRightWrapper}>
                <View style={styles.receiveUserNameAmount}>
                  <Text style={styles.receiveUserName}>{item.name}</Text>
                  <Text style={styles.receiveUserAmount}>{item.amount}元</Text>
                </View>
                <Text style={styles.receiveUserDate}>{moment(item.date).format('HH:mm')}</Text>
              </View>
              <View style={styles.itemSeparator} />
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: wechatColors.white,
  },
  headerBg: {
    width: '100%',
    height: 120,
  },
  top: {
    marginTop: spacing[7],
    alignItems: 'center',
  },
  sendUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendUserAvatar: {
    width: 21,
    height: 21,
    borderRadius: 4,
  },
  sendUserName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#18191A',
    marginLeft: spacing[1],
  },
  comment: {
    fontSize: 13,
    color: '#B5B5B7',
    marginTop: spacing[2],
  },
  gap: {
    marginTop: spacing[8],
    height: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#F5F5F5',
  },
  bottom: {
    flex: 1,
    paddingHorizontal: spacing[2],
  },
  listTitle: {
    fontSize: 13,
    color: '#B5B5B7',
    marginVertical: spacing[3],
  },
  cell: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiveUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  receiveUserRightWrapper: {
    flex: 1,
    marginLeft: spacing[3],
  },
  receiveUserNameAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receiveUserName: {
    fontSize: 15,
    color: '#1E1E1F',
  },
  receiveUserAmount: {
    ...wechatTypographics.body(true),
    fontSize: 15,
    color: '#1E1E1F',
  },
  receiveUserDate: {
    fontSize: 13,
    color: '#B5B5B7',
  },
  itemSeparator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 0.5,
    backgroundColor: '#E1E2E3',
  },
});
