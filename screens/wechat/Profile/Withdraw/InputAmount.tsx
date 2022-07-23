import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {spacing, wechatColors, wechatTypographics} from '@design-system';

interface IInputAmountProps {
  amount: string;
  balance: string;
  onWithdrawAll?: () => void;
}

export default function InputAmount({amount, balance, onWithdrawAll}: IInputAmountProps) {
  const [showMark, setShowMark] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowMark(pre => !pre);
    }, 750);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.withdrawTitle}>提现金额</Text>
      <View style={styles.input}>
        <Text style={styles.amount}>￥{amount}</Text>
        <View style={[styles.mark, {opacity: showMark ? 1 : 0}]} />
      </View>
      <Text style={styles.balance}>
        {`当前零钱余额${balance}元，`}
        <Text style={styles.all} onPress={onWithdrawAll}>
          全部提现
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: wechatColors.white,
  },
  withdrawTitle: {
    marginTop: spacing[7],
    marginLeft: spacing[8],
    ...wechatTypographics.title(false),
  },
  input: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[2],
    marginHorizontal: spacing[8],
    borderBottomWidth: 1,
    borderBottomColor: wechatColors.separator,
  },
  amount: {
    ...wechatTypographics.headLine(true),
    fontSize: 56,
  },
  mark: {
    height: '80%',
    width: 2,
    backgroundColor: '#07C160',
  },
  balance: {
    marginTop: spacing[5],
    marginLeft: spacing[8],
    fontSize: 13,
    color: '#878787',
  },
  all: {
    fontSize: 13,
    color: '#697CA1',
  },
});
