import React from 'react';
import {StyleSheet} from 'react-native';
import {wechatColors} from '@design-system';
import Modal from 'react-native-modal';
import PasscodeKeyboard from './PasscodeKeyboard';
import PasscodeDetail from './PasscodeDetail';

interface IInputPasscodeProps {
  visible: boolean;
  amount: string;
  username: string;
  onClose?: () => void;
  onFinish?: () => void;
}

export default function InputPasscode({
  amount,
  username,
  visible,
  onClose,
  onFinish,
}: IInputPasscodeProps) {
  const [passcode, setPasscode] = React.useState('');

  const onInput = (num: string | null) => {
    if (num) {
      const code = passcode + num;
      setPasscode(code);
      if (code.length === 6) {
        onClose && onClose();
        onFinish && onFinish();
        return;
      }
    } else {
      setPasscode(pre => pre.slice(0, -1));
    }
  };

  React.useEffect(() => {
    if (visible) setPasscode('');
  }, [visible]);

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropColor={wechatColors.alpha50}
      onBackdropPress={onClose}>
      <PasscodeDetail amount={amount} username={username} passcode={passcode} />
      <PasscodeKeyboard onInput={onInput} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
});
