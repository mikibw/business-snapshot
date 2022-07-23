import {colors, spacing} from '@design-system';
import {Ionicons} from '@expo/vector-icons';
import {getGlobalState} from '@hooks/useGlobalState';
import {AppProductState} from '@services/fetchAppControl';
import withAlpha from '@utils/withAlpha';
import React from 'react';
import {View, Text, StyleProp, ViewStyle, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {
  icon_ali_pay,
  icon_wechat_pay,
  icon_check,
  icon_uncheck,
} from '@assets/images/entry/payment';

export type PaymentWay = 'a' | 'w';

type PaymentOption = {
  way: PaymentWay;
  icon: any;
  name: string;
  selected: boolean;
};

const getPaymentWays = (): PaymentOption[] => {
  const appControl = getGlobalState('appControl');
  if (!appControl || appControl.is_onlie === AppProductState.Audit) return [];
  const AliPay: PaymentOption = {
    way: 'a',
    icon: icon_ali_pay,
    name: '支付宝支付',
    selected: false,
  };
  const WechatPay: PaymentOption = {
    way: 'w',
    icon: icon_wechat_pay,
    name: '微信支付',
    selected: false,
  };
  let options: PaymentOption[] = [];
  if (appControl.is_onlie === AppProductState.ProAliPayMainly) {
    options = [AliPay, WechatPay];
  } else if (appControl.is_onlie === AppProductState.ProAliPayOnly) {
    options = [AliPay];
  } else if (appControl.is_onlie === AppProductState.ProWechatPayMainly) {
    options = [WechatPay, AliPay];
  } else {
    options = [WechatPay];
  }
  return options;
};

interface IPaymentWayViewProps {
  style?: StyleProp<ViewStyle>;
  onWayPress?: (way: PaymentWay) => void;
}

export default function PaymentWayView({style, onWayPress}: IPaymentWayViewProps) {
  const [options, setOptions] = React.useState(getPaymentWays());

  const selectWayIndex = (index: number) => {
    if (index === 0) return;
    onWayPress && onWayPress(options[index].way);
    setOptions(Object.assign([], options.reverse()));
  };

  React.useEffect(() => selectWayIndex(0), []);

  return (
    <View style={style}>
      {options.map((option, index) => {
        const selected = index === 0;
        const buttonLeftStyle = selected ? null : styles.unselectedButtonLeft;
        const iconStyle = selected ? styles.selectedIcon : styles.unselectedIcon;
        const nameStyle = selected ? styles.selectedName : styles.unselectedName;
        const checkboxIcon = selected ? icon_check : icon_uncheck;
        return (
          <View key={option.way}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={() => selectWayIndex(index)}>
              <View style={[styles.buttonLeft, buttonLeftStyle]}>
                <Image source={option.icon} style={iconStyle} />
                <Text style={nameStyle}>{option.name}</Text>
              </View>
              <Image source={checkboxIcon} style={styles.checkbox} />
            </TouchableOpacity>
            {selected && <View style={styles.separator} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[3],
  },
  unselectedButtonLeft: {
    marginLeft: spacing[1],
  },
  selectedIcon: {
    width: 32,
    height: 32,
  },
  unselectedIcon: {
    width: 20,
    height: 20,
  },
  selectedName: {
    marginLeft: spacing[2],
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.dark4,
  },
  unselectedName: {
    marginLeft: spacing[4],
    fontSize: 11,
    fontWeight: '400',
    color: colors.text.grey2,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  separator: {
    height: 0.5,
    backgroundColor: withAlpha(colors.background.black, 0.1),
  },
});
