import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {cross_out} from '@assets/images/nav';
import PasscodeDots from './PasscodeDots';

interface IPasscodeDetailProps {
  amount: string;
  fee: string;
  passcode: string;
}

export default function PasscodeDetail({amount, fee, passcode}: IPasscodeDetailProps) {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.content}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Image source={cross_out} style={styles.crossOut} />
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>请输入支付密码</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.faceText}>使用面容</Text>
          </View>
        </View>
        <Text style={{marginTop: spacing[8], fontSize: 16, color: '#1B1B1B', textAlign: 'center'}}>
          提现
        </Text>
        <Text style={styles.amount}>￥{parseFloat(amount).toFixed(2)}</Text>
        <View style={styles.separator} />
        <View style={styles.fee}>
          <Text style={styles.leftLabel}>服务费</Text>
          <Text style={styles.rightLabel}>¥{fee}</Text>
        </View>
        <View style={styles.fee}>
          <Text style={styles.leftLabel}>费率</Text>
          <Text style={styles.rightLabel}>0.10% (最低¥0.10)</Text>
        </View>
        <PasscodeDots passcode={passcode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 300,
    borderRadius: radius[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
    backgroundColor: wechatColors.white,
    transform: [{translateY: 60}],
  },
  crossOut: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  faceText: {
    fontSize: 16,
    color: '#667996',
  },
  amount: {
    marginTop: spacing[2],
    ...wechatTypographics.headLine(true),
    fontSize: 36,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    marginTop: spacing[6],
    marginBottom: spacing[1],
    backgroundColor: wechatColors.separator,
  },
  fee: {
    marginTop: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftLabel: {
    fontSize: 13,
    color: '#808080',
  },
  rightLabel: {
    ...wechatTypographics.title(true),
    fontSize: 13,
  },
});
