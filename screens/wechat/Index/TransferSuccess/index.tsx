import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import {icon_pay_logo} from '@assets/images/wechat/index/index';
import Button from '@screens/wechat/Common/Button';

export default function TransferSuccess({route, navigation}: WechatStackProps<'TransferSuccess'>) {
  const {name, amount, comment, completion} = route.params;

  const insets = useSafeAreaInsets();

  function complete() {
    navigation.goBack();
    completion && completion(amount, comment);
  }

  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      <View style={[styles.success, {marginTop: insets.top + spacing[10]}]}>
        <Image source={icon_pay_logo} style={styles.successIcon} />
        <Text style={styles.successText}>支付成功</Text>
      </View>
      <Text style={styles.note}>待{name}确认收款</Text>
      <Text style={styles.amount}>￥{amount}</Text>
      <View style={[styles.complete, {marginBottom: insets.bottom + 50}]}>
        <Button type="secondary" text="完成" onPress={complete} />
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: wechatColors.white,
  },
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 18,
    height: 17,
  },
  successText: {
    fontSize: 16,
    color: '#07C160',
    fontWeight: '500',
    marginLeft: spacing[1],
  },
  note: {
    fontSize: 16,
    color: '#1B1B1B',
    marginTop: 90,
  },
  amount: {
    ...wechatTypographics.headLine(true),
    fontSize: 44,
    color: '#1B1B1B',
    marginTop: spacing[3],
  },
  complete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
