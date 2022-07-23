import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import Modal from 'react-native-modal';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import {notifyWalletDetailDidChange} from '@events';
import Button from '@screens/wechat/Common/Button';

interface ITimePickerProps {
  visible: boolean;
  onClose?: () => void;
}

export default function LqtInput({visible, onClose}: ITimePickerProps) {
  const [rate, setRate] = React.useState('');
  const [balance, setBalance] = React.useState('');

  const onConfirm = async () => {
    let didChange = false;
    const rateNumber = parseFloat(rate);
    if (!isNaN(rateNumber)) {
      didChange = true;
      await getWalletDetailService().updateDetailByName('lqt_rate', rateNumber.toFixed(2));
    }
    const balanceNumber = parseFloat(balance || '0');
    if (!isNaN(balanceNumber)) {
      didChange = true;
      await getWalletDetailService().updateDetailByName('lqt_balance', balanceNumber.toFixed(2));
    }
    onClose && onClose();
    didChange && notifyWalletDetailDidChange();
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropColor={wechatColors.alpha50}
      onBackdropPress={onClose}>
      <View style={styles.content}>
        <Text style={styles.title}>设置零钱通</Text>
        <TextInput
          style={styles.input}
          placeholder="设置收益率"
          value={rate}
          onChange={e => setRate(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          placeholder="输入零钱通余额，可为空"
          value={balance}
          onChange={e => setBalance(e.nativeEvent.text)}
        />
        <View style={styles.confirm}>
          <Button type="primary" text="确定" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '96%',
    alignItems: 'center',
    borderRadius: radius[2],
    padding: spacing[4],
    backgroundColor: wechatColors.white,
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    ...wechatTypographics.title(false),
  },
  input: {
    width: '90%',
    fontSize: 16,
    marginTop: spacing[4],
    color: wechatColors.alpha50,
    borderBottomWidth: 0.5,
    borderBottomColor: wechatColors.separator,
  },
  confirm: {
    marginTop: spacing[6],
    alignItems: 'center',
  },
});
