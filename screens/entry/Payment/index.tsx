import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {colors, spacing, typographics} from '@design-system';
import {EntryStackProps} from '@navigation/entry';
import CrossOut from '@components/CrossOut';
import FunctionIntroView from './FunctionIntroView';
import {ScrollView} from 'react-native-gesture-handler';
import LinerGradientBackground from '@components/LinerGradientBackground';
import FunctionTextView from './FunctionTextView';
import PaymentSelectView from './PaymentSelectView';
import {PaymentWay} from './PaymentWayView';
import {clickAliPay, clickWechatPay, enterSellpage} from '@services/behaviors';

export default function Payment({navigation}: EntryStackProps<'Payment'>) {
  React.useEffect(() => {
    enterSellpage();
  }, []);

  const doPay = (price: number, way: PaymentWay) => {
    way === 'a' ? clickAliPay() : clickWechatPay();
  };

  return (
    <LinerGradientBackground
      style={styles.container}
      gradient={{start: colors.gradient.pink.start, end: colors.gradient.pink.end}}>
      <SafeAreaView style={styles.container}>
        <CrossOut onPress={navigation.goBack} style={styles.crossOut} />
        <ScrollView style={styles.container}>
          <FunctionTextView style={styles.functionText} />
          <FunctionIntroView />
          <PaymentSelectView style={styles.paymentSelect} onPay={doPay} />
          <Text style={styles.note}>
            购买须知：本软件仅供娱乐，请勿用于非法用途，否则产生的一切后果自行承担
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinerGradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  crossOut: {
    marginTop: spacing[3],
  },
  functionText: {
    marginHorizontal: spacing[2],
    marginVertical: spacing[3],
  },
  paymentSelect: {
    marginHorizontal: spacing[2],
    marginVertical: spacing[4],
  },
  note: {
    marginBottom: spacing[2],
    marginHorizontal: spacing[5],
    ...typographics.action,
    color: colors.text.grey2,
  },
});
