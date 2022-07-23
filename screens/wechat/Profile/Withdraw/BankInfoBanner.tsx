import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {spacing, wechatTypographics} from '@design-system';
import {arrow_forward} from '@assets/images/nav';

interface IBankInfoBannerProps {
  bankIcon: any;
  bankName: string;
  bankNumber: string;
  onPress?: () => void;
}

export default function BankInfoBanner({
  bankIcon,
  bankName,
  bankNumber,
  onPress,
}: IBankInfoBannerProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Text style={styles.leftText}>到账银行卡</Text>
        <View style={styles.middle}>
          <Image source={bankIcon} style={styles.icon} />
          <View style={styles.bank}>
            <Text style={styles.bankName}>{`${bankName}(${bankNumber})`}</Text>
            <Text style={styles.note}>2小时内到账</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Image source={arrow_forward} style={styles.arrow} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 124,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: spacing[8],
  },
  leftText: {
    fontSize: 16,
    color: '#353535',
  },
  middle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: spacing[3],
  },
  icon: {
    width: 16,
    height: 16,
  },
  bank: {
    marginTop: -2,
    marginLeft: spacing[2],
  },
  bankName: {
    fontSize: 16,
    color: '#353535',
  },
  note: {
    marginTop: spacing[1],
    ...wechatTypographics.emTitle(true),
    fontSize: 14,
    color: '#8B8B8B',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  arrow: {
    width: 8,
    height: 14,
  },
});
