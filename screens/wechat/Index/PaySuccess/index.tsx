import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import {icon_pay_logo} from '@assets/images/wechat/index/index';
import Button from '@screens/wechat/Common/Button';
import {usePrompt} from '@components/Prompt';

export default function PaySuccess({route, navigation}: WechatStackProps<'PaySuccess'>) {
  const {avatar, name} = route.params;

  const insets = useSafeAreaInsets();
  const {showPrompt} = usePrompt();

  const [amount, setAmount] = React.useState('0.01');

  function modifyAmount() {
    showPrompt({
      title: '修改金额',
      placeholder: '请输入金额',
      completion: text => {
        const num = parseFloat(text);
        if (isNaN(num) || num <= 0) return;
        setAmount(num.toFixed(2));
      },
    });
  }

  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      <View style={[styles.success, {marginTop: insets.top + spacing[10]}]}>
        <Image source={icon_pay_logo} style={styles.successIcon} />
        <Text style={styles.successText}>支付成功</Text>
      </View>
      <Text style={styles.amount} onPress={modifyAmount}>
        ￥{amount}
      </Text>
      <Text style={styles.payeeText}>收款方</Text>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <View style={[styles.complete, {marginBottom: insets.bottom + 50}]}>
        <Button type="secondary" text="完成" onPress={() => navigation.goBack()} />
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
    alignItems: 'center',
  },
  successIcon: {
    width: 36,
    height: 34,
  },
  successText: {
    fontSize: 16,
    color: '#07C160',
    fontWeight: '500',
    marginTop: spacing[4],
  },
  amount: {
    ...wechatTypographics.headLine(true),
    fontSize: 44,
    color: '#1B1B1B',
    marginTop: 80,
  },
  payeeText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 80,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginTop: spacing[5],
  },
  name: {
    fontSize: 16,
    color: '#1B1B1B',
    marginTop: spacing[3],
  },
  complete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
