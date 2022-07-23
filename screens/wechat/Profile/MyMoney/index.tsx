import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import ContainerView from '@components/ContainerView';
import Note from '@screens/wechat/Common/Note';
import Button from '@screens/wechat/Common/Button';
import {my_money} from '@assets/images/wechat/profile';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import {notifyWalletDetailDidChange, observeWalletDetailDidChange} from '@events';
import {WechatStackProps} from '@navigation/wechat';
import {usePrompt} from '@components/Prompt';

export default function MyMoney({navigation}: WechatStackProps<'MyMoney'>) {
  useNavigationOptions({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: wechatColors.white,
    },
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('MoneyDetail')}>
        <Text style={styles.moneyDetail}>零钱明细</Text>
      </TouchableOpacity>
    ),
  });

  const {showPrompt} = usePrompt();

  const [lqBalance, setLqBalance] = React.useState('');
  const [lqtDesc, setLqtDesc] = React.useState('');

  const onLqBalanceChange = () => {
    async function changeBalance(text: string) {
      setLqBalance(text);
      await getWalletDetailService().updateDetailByName('lq_balance', text);
      notifyWalletDetailDidChange();
    }
    showPrompt({
      title: '修改金额',
      placeholder: '输入金额',
      completion: text => {
        if (!text) return;
        const n = parseFloat(text);
        if (!isNaN(n)) changeBalance(n.toFixed(2));
      },
    });
  };

  const onLqtDescChange = () => {
    async function changeDesc(text: string) {
      setLqtDesc(text);
      await getWalletDetailService().updateDetailByName('lqt_desc', text);
    }
    showPrompt({
      title: '设置零钱通描述',
      placeholder: '零钱通描述',
      completion: text => {
        if (!text) return;
        changeDesc(text);
      },
    });
  };

  React.useEffect(() => {
    async function fetchDataSource() {
      setLqBalance(await getWalletDetailService().findDetailByName('lq_balance'));
      setLqtDesc(await getWalletDetailService().findDetailByName('lqt_desc'));
    }
    fetchDataSource();
    const observer = observeWalletDetailDidChange(fetchDataSource);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.detail}>
          <Image source={my_money} style={styles.image} />
          <Text style={styles.moneyTitle}>我的零钱</Text>
          <Text style={styles.money} onPress={onLqBalanceChange}>
            ￥{lqBalance}
          </Text>
          <Text style={styles.lqtDesc} onPress={onLqtDescChange}>{`${lqtDesc} >`}</Text>
        </View>
        <View style={styles.buttons}>
          <Button type="primary" text="充值" onPress={onLqBalanceChange} />
          <Button
            type="secondary"
            text="提现"
            style={{marginTop: spacing[4]}}
            onPress={() => navigation.navigate('Withdraw')}
          />
        </View>
      </View>
      <Note name="常见问题" desc="本服务由财付通提供" />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  moneyDetail: {
    marginRight: spacing[3],
    ...wechatTypographics.title(false),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'center',
    marginBottom: spacing[16],
  },
  image: {
    width: 56,
    height: 56,
    marginTop: spacing[15],
  },
  moneyTitle: {
    marginTop: spacing[9],
    ...wechatTypographics.title(false),
  },
  money: {
    marginTop: spacing[4],
    ...wechatTypographics.headLine(true),
    fontSize: 46,
  },
  lqtDesc: {
    marginTop: spacing[7],
    fontSize: 14,
    color: '#FA9E3C',
  },
});
