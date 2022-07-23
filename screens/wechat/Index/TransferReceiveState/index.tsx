import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {WechatStackProps} from '@navigation/wechat';
import {transfer_pending, transfer_success} from '@assets/images/wechat/index/index';
import moment from 'moment';

export default function TransferReceiveState({
  route,
  navigation,
}: WechatStackProps<'TransferReceiveState'>) {
  const {name, amount, sendDate, receiveDate, notification} = route.params;

  useNavigationOptions({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: wechatColors.white,
    },
  });

  function notifyReceive() {
    notification?.();
    navigation.setParams({receiveDate: new Date()});
  }

  return (
    <ContainerView style={styles.container}>
      <View style={styles.state}>
        <Image
          source={receiveDate ? transfer_success : transfer_pending}
          style={styles.stateImage}
        />
        <Text style={styles.title}>{receiveDate ? `${name}已收款` : `待${name}确认收款`}</Text>
        <Text style={styles.amount}>￥{amount}</Text>
        {!receiveDate && (
          <Text style={styles.note}>
            1天内朋友未确认，将退还给你。
            <Text onPress={notifyReceive} style={{color: '#576B95'}}>
              提醒对方收款
            </Text>
          </Text>
        )}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.date}>{`转账时间：${moment(sendDate).format(
          'yyyy-MM-DD HH:mm:ss',
        )}`}</Text>
        {receiveDate && (
          <Text style={styles.date}>{`收款时间：${moment(receiveDate).format(
            'yyyy-MM-DD HH:mm:ss',
          )}`}</Text>
        )}
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  state: {
    marginTop: 80,
    alignItems: 'center',
  },
  stateImage: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 17,
    color: wechatColors.black,
    marginTop: spacing[8],
  },
  amount: {
    ...wechatTypographics.headLine(true),
    fontSize: 46,
    marginTop: spacing[4],
  },
  note: {
    fontSize: 14,
    color: 'rgba(51, 51, 51, 0.6)',
    marginTop: spacing[7],
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: spacing[4],
  },
  date: {
    fontSize: 12,
    color: '#777777',
    paddingBottom: spacing[1],
  },
});
