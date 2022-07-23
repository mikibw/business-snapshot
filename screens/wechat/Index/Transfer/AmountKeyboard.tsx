import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {key_delete} from '@assets/images/wechat/profile';

interface IAmountKeyProps {
  flex: number;
  num?: string;
  node?: ReactNode;
  onPress?: () => void;
}

function AmountKey({num, node, flex, onPress}: IAmountKeyProps) {
  return (
    <TouchableOpacity style={{flex, height: 56}} onPress={onPress}>
      <View
        style={{
          flex: 1,
          margin: spacing[1],
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius[1],
          backgroundColor: wechatColors.white,
        }}>
        {node ? node : <Text style={{...wechatTypographics.headLine(true)}}>{num}</Text>}
      </View>
    </TouchableOpacity>
  );
}

interface IAmountKeyboardProps {
  confirmEnabled: boolean;
  onConfirm?: () => void;
  onInput?: (text: string | null) => void;
}

export default function AmountKeyboard({confirmEnabled, onConfirm, onInput}: IAmountKeyboardProps) {
  const onKeyPress = (num: string | null) => {
    onInput && onInput(num);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AmountKey num="1" flex={1} onPress={() => onKeyPress('1')} />
        <AmountKey num="2" flex={1} onPress={() => onKeyPress('2')} />
        <AmountKey num="3" flex={1} onPress={() => onKeyPress('3')} />
        <AmountKey
          node={<Image source={key_delete} style={{width: 20, height: 16}} />}
          flex={1}
          onPress={() => onKeyPress(null)}
        />
      </View>
      <View style={styles.row}>
        <View style={{flex: 3}}>
          <View style={styles.row}>
            <AmountKey num="4" flex={1} onPress={() => onKeyPress('4')} />
            <AmountKey num="5" flex={1} onPress={() => onKeyPress('5')} />
            <AmountKey num="6" flex={1} onPress={() => onKeyPress('6')} />
          </View>
          <View style={styles.row}>
            <AmountKey num="7" flex={1} onPress={() => onKeyPress('7')} />
            <AmountKey num="8" flex={1} onPress={() => onKeyPress('8')} />
            <AmountKey num="9" flex={1} onPress={() => onKeyPress('9')} />
          </View>
          <View style={styles.row}>
            <AmountKey num="0" flex={2} onPress={() => onKeyPress('0')} />
            <AmountKey num="." flex={1} onPress={() => onKeyPress('.')} />
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            disabled={!confirmEnabled}
            onPress={onConfirm}
            style={[styles.withdraw, {backgroundColor: confirmEnabled ? '#07C160' : '#07C16080'}]}>
            <Text style={styles.withdrawText}>转账</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[1],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  withdraw: {
    flex: 1,
    margin: spacing[1],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius[1],
  },
  withdrawText: {
    ...wechatTypographics.title(false),
    color: wechatColors.white,
  },
});
