import React from 'react';
import {Text, StyleSheet, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {colors, radius, spacing, typographics} from '@design-system';
import PaymentPriceView from './PaymentPriceView';
import ShadowBackground from '@components/ShadowBackground';
import withAlpha from '@utils/withAlpha';
import PaymentWayView, {PaymentWay} from './PaymentWayView';

interface IPaymentSelectViewProps {
  style?: StyleProp<ViewStyle>;
  onPay?: (price: number, way: PaymentWay) => void;
}

export default function PaymentSelectView({style, onPay}: IPaymentSelectViewProps) {
  const [price, setPrice] = React.useState<number>(0);
  const [way, setWay] = React.useState<PaymentWay>('a');

  return (
    <ShadowBackground
      style={[styles.container, style]}
      shadowOffset={{width: 0, height: 6}}
      shadowRadius={10}
      shadowColor={withAlpha(colors.shadow.pink, 0.09)}>
      <PaymentPriceView style={styles.paymentPrice} onPricePress={setPrice} />
      <PaymentWayView style={styles.paymentWay} onWayPress={setWay} />
      <TouchableOpacity style={styles.buyButton} onPress={() => onPay && onPay(price, way)}>
        <Text style={styles.buyButtonText}>{`立即购买（￥${price}）`}</Text>
      </TouchableOpacity>
    </ShadowBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 272,
    borderRadius: radius[2],
    backgroundColor: colors.background.white,
  },
  paymentPrice: {
    marginTop: spacing[3],
    marginHorizontal: spacing[3],
  },
  paymentWay: {
    marginTop: spacing[2],
    marginHorizontal: spacing[3],
    marginBottom: spacing[3],
  },
  buyButton: {
    height: 54,
    marginHorizontal: spacing[3],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.red1,
    borderRadius: radius[1],
  },
  buyButtonText: {
    ...typographics.buttonLabel,
    color: colors.text.gold1,
  },
});
