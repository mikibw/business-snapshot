import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {wechatColors, wechatTypographics} from '@design-system';
import {key_delete} from '@assets/images/wechat/profile';

interface IPasscodeKeyProps {
  num?: string;
  node?: ReactNode;
  onPress?: () => void;
}

function PasscodeKey({num, node, onPress}: IPasscodeKeyProps) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 50,
        margin: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: wechatColors.navigation,
        backgroundColor: num ? wechatColors.white : '#0000',
      }}
      onPress={onPress}>
      {node ? node : <Text style={{...wechatTypographics.headLine(true)}}>{num}</Text>}
    </TouchableOpacity>
  );
}

interface IPasscodeKeyboardProps {
  onInput?: (num: string | null) => void;
}

export default function PasscodeKeyboard({onInput}: IPasscodeKeyboardProps) {
  const onKeyPress = (num: string | null) => {
    onInput && onInput(num);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <PasscodeKey num="1" onPress={() => onKeyPress('1')} />
        <PasscodeKey num="2" onPress={() => onKeyPress('2')} />
        <PasscodeKey num="3" onPress={() => onKeyPress('3')} />
      </View>
      <View style={styles.row}>
        <PasscodeKey num="4" onPress={() => onKeyPress('4')} />
        <PasscodeKey num="5" onPress={() => onKeyPress('5')} />
        <PasscodeKey num="6" onPress={() => onKeyPress('6')} />
      </View>
      <View style={styles.row}>
        <PasscodeKey num="7" onPress={() => onKeyPress('7')} />
        <PasscodeKey num="8" onPress={() => onKeyPress('8')} />
        <PasscodeKey num="9" onPress={() => onKeyPress('9')} />
      </View>
      <View style={styles.row}>
        <PasscodeKey num="" />
        <PasscodeKey num="0" onPress={() => onKeyPress('0')} />
        <PasscodeKey
          node={<Image source={key_delete} style={{width: 20, height: 16}} />}
          onPress={() => onKeyPress(null)}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDED',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
