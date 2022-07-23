import {WithdrawEntity} from '@database/entities/WithdrawEntity';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IMoneyDetailCellProps {
  withdraw: WithdrawEntity;
}

export default function MoneyDetailCell({withdraw}: IMoneyDetailCellProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>提现{!withdraw.applyDate && '服务费'}</Text>
        <Text style={styles.note}>{moment(withdraw.reachDate).format('MM月DD日 HH:mm')}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.amount}>-{withdraw.amount}</Text>
        <Text style={styles.note}>余额{withdraw.balance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    backgroundColor: wechatColors.white,
  },
  title: {
    ...wechatTypographics.title(false),
  },
  amount: {
    ...wechatTypographics.emTitle(true),
  },
  note: {
    marginTop: spacing[1],
    ...wechatTypographics.emTitle(true),
    fontSize: 13,
    color: '#B8B8B8',
  },
});
