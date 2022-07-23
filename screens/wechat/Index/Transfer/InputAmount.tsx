import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {spacing, wechatColors, wechatTypographics} from '@design-system';

interface IInputAmountProps {
  amount: string;
  comment: string;
  addComment?: () => void;
}

export default function InputAmount({amount, comment, addComment}: IInputAmountProps) {
  const [showMark, setShowMark] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowMark(pre => !pre);
    }, 750);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>转账金额</Text>
      <View style={styles.input}>
        <Text style={styles.amount}>￥{amount}</Text>
        <View style={[styles.mark, {opacity: showMark ? 1 : 0}]} />
      </View>
      <Text style={styles.comment}>
        {!!comment && comment + '  '}
        <Text style={styles.note} onPress={addComment}>
          {!!comment ? '修改' : '添加'}转账说明
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
  title: {
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
  comment: {
    fontSize: 13,
    color: 'black',
    marginTop: spacing[5],
    marginLeft: spacing[8],
  },
  note: {
    color: '#697CA1',
  },
});
