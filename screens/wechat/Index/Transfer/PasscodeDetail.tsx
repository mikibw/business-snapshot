import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {arrow_forward, cross_out} from '@assets/images/nav';
import PasscodeDots from './PasscodeDots';
import {icon_lq} from '@assets/images/wechat/index/index';

interface IPasscodeDetailProps {
  amount: string;
  username: string;
  passcode: string;
}

export default function PasscodeDetail({amount, username, passcode}: IPasscodeDetailProps) {
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
          向{username}转账
        </Text>
        <Text style={styles.amount}>￥{parseFloat(amount).toFixed(2)}</Text>
        <View style={styles.separator} />
        <View style={styles.payWay}>
          <Text style={styles.leftLabel}>支付方式</Text>
          <View style={styles.rightWrapper}>
            <Image source={icon_lq} style={styles.lqImage} />
            <Text style={styles.rightLabel}>零钱</Text>
            <Image source={arrow_forward} style={styles.arrow} />
          </View>
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
    width: 290,
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
  payWay: {
    marginTop: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftLabel: {
    fontSize: 13,
    color: '#1B1B1B',
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLabel: {
    ...wechatTypographics.title(true),
    fontSize: 13,
    marginLeft: 2,
  },
  lqImage: {
    width: 14,
    height: 14,
  },
  arrow: {
    width: 4,
    height: 8,
    marginLeft: 6,
  },
});
