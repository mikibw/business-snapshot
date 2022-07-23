import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from 'react-native';
import PaymentPriceButton from './PaymentPriceButton';
import {spacing} from '@design-system';

interface IPaymentPriceViewProps {
  style?: StyleProp<ViewStyle>;
  onPricePress?: (price: number) => void;
}

export default function PaymentPriceView({style, onPricePress}: IPaymentPriceViewProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectPriceIndex = (index: number) => {
    let price = 0;
    if (index === 0) {
      price = 38;
    } else if (index === 1) {
      price = 148;
    } else {
      price = 168;
    }
    onPricePress && onPricePress(price);
    setSelectedIndex(index);
  };

  React.useEffect(() => selectPriceIndex(0), []);

  return (
    <View style={[styles.container, style]}>
      <PaymentPriceButton
        style={styles.priceButton}
        isSelected={selectedIndex === 0}
        period="1个月"
        price={38}
        onPress={() => selectPriceIndex(0)}
      />
      <PaymentPriceButton
        style={[styles.priceButton, styles.midPriceButton]}
        isSelected={selectedIndex === 1}
        period="12个月"
        price={148}
        onPress={() => selectPriceIndex(1)}
      />
      <PaymentPriceButton
        style={styles.priceButton}
        isSelected={selectedIndex === 2}
        period="永久VIP"
        price={168}
        oldPrice={598}
        onPress={() => selectPriceIndex(2)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  priceButton: {
    flex: 1,
    aspectRatio: 105 / 70.0,
  },
  midPriceButton: {
    marginHorizontal: spacing[2],
  },
});
