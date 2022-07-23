import React from 'react';
import {Text, StyleSheet} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {WechatStackProps} from '@navigation/wechat';
import AmountKeyboard from './AmountKeyboard';
import InputAmount from './InputAmount';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import Toast from '@components/Toast';
import BankInfoBanner from './BankInfoBanner';
import {WithdrawInfo} from '../types';
import InputPasscode from './InputPasscode';
import {makeId} from '@utils/makeId';
import {WithdrawEntity} from '@database/entities/WithdrawEntity';
import {getWithdrawService} from '@database/services/WithdrawService';
import {notifyWalletDetailDidChange} from '@events';
import Processing from '@components/Processing';
import {
  bank_ABC,
  bank_BOC,
  bank_CCB,
  bank_CMB,
  bank_ICBC,
  bank_SPD,
} from '@assets/images/wechat/profile';

const bankIconMaps = {
  建设银行: bank_CCB,
  农业银行: bank_ABC,
  中国银行: bank_BOC,
  招商银行: bank_CMB,
  工商银行: bank_ICBC,
  浦发银行: bank_SPD,
};

export default function Withdraw({navigation}: WechatStackProps<'Withdraw'>) {
  useNavigationOptions({
    headerLeft: () => (
      <Text style={styles.cancel} onPress={navigation.goBack}>
        取消
      </Text>
    ),
  });

  const toast = React.useRef<Toast>(null);

  const [info, setInfo] = React.useState<WithdrawInfo>({
    applyDate: new Date(),
    reachDate: new Date(),
    bankName: '建设银行',
    bankNumber: '6645',
    orderNumber: makeId(22),
  });

  const [passcodeInputVisible, setPasscodeInputVisible] = React.useState(false);
  const [processingVisible, setProcessingVisible] = React.useState(false);

  const [balance, setBalance] = React.useState('');

  const [amount, setAmount] = React.useState('');
  const amountNumber = parseFloat(amount);
  const enabled = !isNaN(amountNumber) && amountNumber > 0;
  const fee = enabled ? Math.max(0.1, amountNumber / 1000).toFixed(2) : '0.10';

  const onConfirm = () => {
    const currentBalance = parseFloat(balance);
    if (isNaN(currentBalance)) {
      toast.current?.show('钱包余额数字不合法，请更改数字后重试！');
      return;
    }
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount)) {
      toast.current?.show('提现金额数字不合法，请重新输入！');
      return;
    }
    const fee = parseFloat(Math.max(0.1, withdrawAmount / 1000).toFixed(2));
    const rest = parseFloat((currentBalance - fee).toFixed(2));
    if (withdrawAmount > rest) {
      toast.current?.show('钱包余额不足，请更改后重试！');
      return;
    }
    setPasscodeInputVisible(true);
  };

  const generateWithdrawResult = async () => {
    const amountNumber = parseFloat(amount);
    let tempBalance: string = balance;

    const withdraw = new WithdrawEntity();
    withdraw.amount = amountNumber.toFixed(2);
    tempBalance = (parseFloat(tempBalance) - parseFloat(withdraw.amount)).toFixed(2);
    withdraw.balance = tempBalance;
    withdraw.reachDate = info.reachDate;
    withdraw.applyDate = info.applyDate;
    withdraw.bankName = info.bankName;
    withdraw.bankNumber = info.bankNumber;
    withdraw.orderNumber = info.orderNumber;
    await getWithdrawService().insertWithdraw(withdraw);

    const service = new WithdrawEntity();
    const fee = Math.max(0.1, amountNumber / 1000).toFixed(2);
    service.amount = fee;
    tempBalance = (parseFloat(tempBalance) - parseFloat(fee)).toFixed(2);
    service.balance = tempBalance;
    service.reachDate = info.reachDate;
    await getWithdrawService().insertWithdraw(service);

    setBalance(tempBalance);
    await getWalletDetailService().updateDetailByName('lq_balance', tempBalance);
    notifyWalletDetailDidChange();

    navigation.navigate('WithdrawResult', {amount: withdraw.amount, fee: service.amount, info});
  };

  const withdrawAll = () => {
    const currentBalance = parseFloat(balance);
    if (isNaN(currentBalance)) {
      toast.current?.show('钱包余额数字不合法，请更改数字后重试！');
      return;
    }
    if (currentBalance < 0.1) {
      toast.current?.show('钱包余额不足，请更改后重试！');
      return;
    }
    const fee = parseFloat(Math.max(0.1, currentBalance / 1000).toFixed(2));
    const rest = parseFloat((currentBalance - fee).toFixed(2));
    setAmount(rest.toFixed(2));
  };

  const onInput = (num: string | null) => {
    if (num) {
      if (amount === '0' && num !== '.') return;
      if (amount.includes('.') && num === '.') return;
      if (amount.includes('.')) {
        const digital = amount.split('.')[1];
        if (digital && digital.length >= 2) return;
      }
      setAmount(pre => pre + num);
    } else {
      setAmount(pre => pre.slice(0, -1));
    }
  };

  const onInputFinish = () => {
    setProcessingVisible(true);
    let timeout: any = null;
    timeout = setTimeout(() => {
      setProcessingVisible(false);
      generateWithdrawResult();
      if (timeout) clearTimeout(timeout);
    }, 2000);
  };

  React.useEffect(() => {
    async function fetchBalance() {
      setBalance(await getWalletDetailService().findDetailByName('lq_balance'));
    }
    fetchBalance();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <BankInfoBanner
        bankIcon={bankIconMaps[info.bankName]}
        bankName={info.bankName}
        bankNumber={info.bankNumber}
        onPress={() => navigation.navigate('AddWithdraw', {onComplete: setInfo})}
      />
      <InputAmount amount={amount} balance={balance} onWithdrawAll={withdrawAll} />
      {!passcodeInputVisible && (
        <AmountKeyboard confirmEnabled={enabled} onInput={onInput} onConfirm={onConfirm} />
      )}
      <InputPasscode
        visible={passcodeInputVisible}
        amount={amount}
        fee={fee}
        onClose={() => setPasscodeInputVisible(false)}
        onFinish={onInputFinish}
      />
      {processingVisible && <Processing />}
      <Toast ref={toast} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  cancel: {
    marginLeft: spacing[3],
    ...wechatTypographics.title(false),
  },
});
