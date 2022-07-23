import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import ContainerView from '@components/ContainerView';
import {radius, spacing, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import AmountKeyboard from './AmountKeyboard';
import InputAmount from './InputAmount';
import Toast from '@components/Toast';
import {usePrompt} from '@components/Prompt';
import InputPasscode from './InputPasscode';
import Processing from '@components/Processing';

export default function Transfer({route, navigation}: WechatStackProps<'Transfer'>) {
  const {avatar, name, completion} = route.params;

  const {showPrompt} = usePrompt();
  const toast = React.useRef<Toast>(null);
  const [passcodeInputVisible, setPasscodeInputVisible] = React.useState(false);
  const [processingVisible, setProcessingVisible] = React.useState(false);

  const [comment, setComment] = React.useState('');
  const [amountText, setAmountText] = React.useState('');
  const amount = parseFloat(amountText);
  const enabled = !isNaN(amount) && amount > 0;

  const transfer = () => {
    setProcessingVisible(true);
    let timeout: any = null;
    timeout = setTimeout(() => {
      navigation.replace('TransferSuccess', {
        name,
        amount: amount.toFixed(2),
        comment,
        completion,
      });
      if (timeout) clearTimeout(timeout);
    }, 2000);
  };

  const onInput = (num: string | null) => {
    if (num) {
      if (amountText === '0' && num !== '.') return;
      if (amountText.includes('.') && num === '.') return;
      if (amountText.includes('.')) {
        const digital = amountText.split('.')[1];
        if (digital && digital.length >= 2) return;
      }
      setAmountText(pre => pre + num);
    } else {
      setAmountText(pre => pre.slice(0, -1));
    }
  };

  const addComment = () => {
    showPrompt({
      title: '转账说明',
      placeholder: '输入转账说明',
      completion: setComment,
    });
  };

  return (
    <ContainerView style={styles.container}>
      <View style={styles.userBanner}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <InputAmount amount={amountText} comment={comment} addComment={addComment} />
      <AmountKeyboard
        confirmEnabled={enabled}
        onInput={onInput}
        onConfirm={() => setPasscodeInputVisible(true)}
      />

      <InputPasscode
        visible={passcodeInputVisible}
        amount={amountText}
        username={name}
        onClose={() => setPasscodeInputVisible(false)}
        onFinish={transfer}
      />
      {processingVisible && <Processing />}

      <Toast ref={toast} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  userBanner: {
    height: 124,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: radius[1],
  },
  name: {
    fontSize: 16,
    color: '#1B1B1B',
    marginTop: spacing[4],
  },
});
