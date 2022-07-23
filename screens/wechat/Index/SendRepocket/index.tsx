import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity} from 'react-native';
import ContainerView from '@components/ContainerView';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {WechatStackProps} from '@navigation/wechat';
import InputPasscode from './InputPasscode';
import Processing from '@components/Processing';
import {add_comment} from '@assets/images/icons';
import Toast from '@components/Toast';

export default function SendRedpocket({route, navigation}: WechatStackProps<'SendRedpocket'>) {
  const {isGroup, completion} = route.params;

  useNavigationOptions({
    headerLeft: () => (
      <Text style={styles.cancel} onPress={navigation.goBack}>
        取消
      </Text>
    ),
  });

  const toast = React.useRef<Toast>(null);
  const [passcodeInputVisible, setPasscodeInputVisible] = React.useState(false);
  const [processingVisible, setProcessingVisible] = React.useState(false);

  const [amountText, setAmountText] = React.useState('');
  const [countText, setCountText] = React.useState('');
  const [comment, setComment] = React.useState('');

  const amount = parseFloat(amountText);
  const buttonEnabled = !isNaN(amount) && amount > 0;
  const formattedAmountText = buttonEnabled ? amount.toFixed(2) : '0.00';

  function confirmMoney() {
    if (amount > 200) {
      toast.current?.show('红包金额最大200元');
      return;
    }
    setPasscodeInputVisible(true);
  }

  function sendRedpocket() {
    setProcessingVisible(true);
    let timeout: any = null;
    timeout = setTimeout(() => {
      setProcessingVisible(false);
      completion && completion(formattedAmountText, comment || '恭喜发财，大吉大利');
      navigation.goBack();
      if (timeout) clearTimeout(timeout);
    }, 2000);
  }

  return (
    <ContainerView style={styles.container}>
      <ScrollView keyboardDismissMode="interactive">
        <View style={styles.row}>
          <Text style={styles.name}>金额</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              selectionColor="#07C160"
              style={styles.input}
              value={amountText}
              onChangeText={setAmountText}
            />
            <Text style={styles.name}>元</Text>
          </View>
        </View>
        {isGroup && (
          <View style={styles.row}>
            <Text style={styles.name}>个数</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="0"
                keyboardType="number-pad"
                selectionColor="#07C160"
                style={styles.input}
                value={countText}
                onChangeText={setCountText}
              />
              <Text style={styles.name}>个</Text>
            </View>
          </View>
        )}
        <View style={styles.row}>
          <TextInput
            placeholder="恭喜发财，大吉大利"
            selectionColor="#07C160"
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
          />
          <Image source={add_comment} style={styles.commentImage} />
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>红包封面</Text>
        </View>
        <Text style={styles.displayAmount}>￥{formattedAmountText}</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: buttonEnabled ? '#EE5B49' : '#EE5B4980'}]}
            disabled={!buttonEnabled}
            onPress={confirmMoney}>
            <Text style={styles.buttonText}>塞钱进红包</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text style={styles.note}>未领取的红包，将于24小时后发起退款</Text>

      <InputPasscode
        visible={passcodeInputVisible}
        amount={amountText}
        onClose={() => setPasscodeInputVisible(false)}
        onFinish={sendRedpocket}
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
  cancel: {
    marginLeft: spacing[3],
    fontSize: 15,
    color: '#1B1B1B',
  },
  row: {
    height: 50,
    marginTop: spacing[3],
    marginHorizontal: spacing[5],
    paddingHorizontal: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius[1],
    backgroundColor: wechatColors.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 150,
    fontSize: 16,
    textAlign: 'right',
    marginRight: spacing[2],
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
  },
  commentImage: {
    width: 25,
    height: 20,
    marginLeft: spacing[2],
  },
  name: {
    fontSize: 16,
    color: '#1B1B1B',
  },
  displayAmount: {
    marginTop: spacing[14],
    ...wechatTypographics.headLine(true),
    fontSize: 47,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: spacing[7],
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 160,
    height: 40,
    borderRadius: radius[1],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: wechatColors.white,
  },
  note: {
    fontSize: 13,
    color: '#1B1B1B',
    textAlign: 'center',
    opacity: 0.57,
    marginBottom: spacing[2],
  },
});
