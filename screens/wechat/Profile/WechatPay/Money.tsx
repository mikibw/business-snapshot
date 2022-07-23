import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {icon_pay_fund, icon_pay_wallet} from '@assets/images/wechat/profile';

interface IMoneyProps {
  balance: string;
  onWalletPress?: () => void;
}

export default function Money({balance, onWalletPress}: IMoneyProps) {
  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <Image source={icon_pay_fund} style={styles.itemIcon} />
        <Text style={styles.itemLabel}>收付款</Text>
      </View>
      <TouchableOpacity style={styles.itemWrapper} onPress={onWalletPress}>
        <Image source={icon_pay_wallet} style={styles.itemIcon} />
        <Text style={styles.itemLabel}>钱包</Text>
        <Text style={styles.money}>¥{balance}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 144,
    flexDirection: 'row',
    marginTop: spacing[2],
    marginHorizontal: spacing[2],
    borderRadius: radius[2],
    backgroundColor: '#2AAE67',
  },
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  itemIcon: {
    width: 32,
    height: 28,
    marginTop: spacing[9],
  },
  itemLabel: {
    ...wechatTypographics.title(false),
    color: wechatColors.white,
    marginTop: spacing[4],
  },
  money: {
    marginTop: spacing[1],
    ...wechatTypographics.emTitle(true),
    fontSize: 14,
    color: '#fff8',
  },
});
