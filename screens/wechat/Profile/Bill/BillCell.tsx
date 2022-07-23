import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BillEntity, BillType} from '@database/entities/BillEntity';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import {
  bill_money_code,
  bill_phone_top_up,
  bill_redpocket,
  bill_withdraw,
} from '@assets/images/wechat/profile';
import moment from 'moment';

interface IBillCellProps {
  bill: BillEntity;
}

export default function BillCell({bill}: IBillCellProps) {
  let avatar: any = null;
  let title = '';
  const date = moment(bill.date).format('MM月DD日 HH:mm');
  let amount = '';
  let inout = false;

  switch (bill.billType) {
    case BillType.Redpacket:
      avatar = bill_redpocket;
      if (bill.inout) {
        title = `微信红包-来自${bill.user.name}`;
        amount = `+${bill.amount}`;
      } else {
        title = `微信红包-发给${bill.user.name}`;
        amount = `-${bill.amount}`;
      }
      inout = bill.inout;
      break;
    case BillType.Transfer:
      avatar = {uri: bill.user.avatar};
      if (bill.inout) {
        title = `转账-来自${bill.user.name}`;
        amount = `+${bill.amount}`;
      } else {
        title = `转账-转给${bill.user.name}`;
        amount = `-${bill.amount}`;
      }
      inout = bill.inout;
      break;
    case BillType.MoneyCode:
      if (bill.inout) {
        avatar = {uri: bill.user.avatar};
        title = `收钱码收款-来自${bill.user.name}`;
        amount = `+${bill.amount}`;
      } else {
        avatar = bill_money_code;
        title = `扫二维码付款-给${bill.user.name}`;
        amount = `-${bill.amount}`;
      }
      inout = bill.inout;
      break;
    case BillType.PhoneTopUp:
      avatar = bill_phone_top_up;
      title = '手机充值';
      amount = `-${bill.amount}`;
      inout = false;
      break;
    case BillType.Custom:
      avatar = {uri: bill.user.avatar};
      title = bill.billTypeValue;
      if (bill.inout) {
        amount = `+${bill.amount}`;
      } else {
        amount = `-${bill.amount}`;
      }
      inout = bill.inout;
      break;
    case BillType.Withdraw:
      avatar = bill_withdraw;
      title = `零钱提现-到${bill.bankName}(${bill.bankNumber})`;
      amount = `-${bill.amount}`;
      inout = false;
      break;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={avatar} />
      <View style={styles.detail}>
        <View style={styles.topInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.amount, {color: inout ? '#EEAF26' : '#353535'}]}>{amount}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    backgroundColor: wechatColors.white,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  detail: {
    flex: 1,
    marginLeft: spacing[3],
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#353535',
    marginRight: spacing[2],
  },
  amount: {
    ...wechatTypographics.emTitle(true),
  },
  date: {
    marginTop: spacing[1],
    ...wechatTypographics.footnote(true),
    fontSize: 13,
  },
});
