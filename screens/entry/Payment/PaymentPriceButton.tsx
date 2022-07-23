import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {View, Text} from 'react-native';
import {colors, radius, spacing, typographics} from '@design-system';

interface IPaymentPriceButtonProps {
  style?: StyleProp<ViewStyle>;
  isSelected: boolean;
  period: string;
  price: number;
  oldPrice?: number;
  onPress?: () => void;
}

export default function PaymentPriceButton({
  style,
  isSelected,
  period,
  price,
  oldPrice,
  onPress,
}: IPaymentPriceButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.note, {opacity: oldPrice ? 1 : 0}]}>
        <Text style={styles.noteText}>限时促销</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[styles.button, isSelected ? styles.selectedButton : styles.unselectedButton]}>
        <Text style={[styles.periodText, isSelected ? styles.selectedText : styles.unselectedText]}>
          {period}
        </Text>
        <View style={styles.priceView}>
          <Text
            style={[styles.priceSymbol, isSelected ? styles.selectedText : styles.unselectedText]}>
            ￥
          </Text>
          <Text
            style={[styles.priceText, isSelected ? styles.selectedText : styles.unselectedText]}>
            {price}
          </Text>
        </View>
        {oldPrice && (
          <Text
            style={[
              styles.oldPriceText,
              isSelected ? styles.selectedText : {color: colors.text.grey6},
            ]}>
            {oldPrice + '元'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  note: {
    width: 50,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    backgroundColor: colors.background.red1,
    zIndex: 100,
    // opacity: 0,
  },
  noteText: {
    textAlign: 'center',
    ...typographics.action,
    color: colors.text.white,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -spacing[2],
    borderRadius: radius[1],
  },
  unselectedButton: {
    borderWidth: 1,
    borderColor: colors.border.grey,
  },
  selectedButton: {
    backgroundColor: colors.background.green1,
  },
  periodText: {
    ...typographics.textLink,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceSymbol: {
    ...typographics.buttonLabel,
  },
  priceText: {
    ...typographics.price,
    lineHeight: undefined,
  },
  oldPriceText: {
    ...typographics.stroke,
    textDecorationLine: 'line-through',
  },
  unselectedText: {
    color: colors.text.dark4,
  },
  selectedText: {
    color: colors.text.white,
  },
});
