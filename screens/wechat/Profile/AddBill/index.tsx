import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import ContainerView from '@components/ContainerView';
import {BillEntity, BillType} from '@database/entities/BillEntity';
import {billTypeKeys, billTypeMaps, billTypeValues} from './constants';
import {UserEntity} from '@database/entities/UserEntity';
import moment from 'moment';
import Separator from '@screens/wechat/Common/Separator';
import Button from '@screens/wechat/Common/Button';
import TextCell from '@screens/wechat/Common/TextCell';
import {useActionSheet} from '@expo/react-native-action-sheet';
import TimePicker from '@screens/wechat/Common/TimePicker';
import {WechatStackProps} from '@navigation/wechat';
import Toast from '@components/Toast';
import {getBillService} from '@database/services/BillService';
import {notifyBillsDidChange} from '@events';
import {usePrompt} from '@components/Prompt';

export default function AddBill({navigation}: WechatStackProps<'AddBill'>) {
  const toast = React.useRef<Toast>(null);
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);

  const [billType, setBillType] = React.useState(BillType.Transfer);
  const [customValue, setCustomValue] = React.useState('');

  const [amount, setAmount] = React.useState('0.00');
  const [date, setDate] = React.useState(new Date());

  const [user, setUser] = React.useState<UserEntity | null>(null);
  const [inout, setInout] = React.useState(false);
  const [bankName, setBankName] = React.useState('建设银行');
  const [bankNumber, setBankNumber] = React.useState('6645');
  const [bankPeople, setBankPeople] = React.useState('张三');

  const data: {id: number; name: string; value: string}[] = [
    {
      id: 0,
      name: '交易方式',
      value: billType === BillType.Custom ? customValue : billTypeMaps[billType],
    },
    {
      id: 1,
      name: '金额',
      value: amount,
    },
    {
      id: 2,
      name: '时间',
      value: moment(date).format('yyyy-MM-DD HH:mm:ss'),
    },
  ];

  if (![BillType.PhoneTopUp, BillType.Withdraw].includes(billType)) {
    data.push({
      id: 3,
      name: '对方信息',
      value: user?.name || '无',
    });
    data.push({
      id: 4,
      name: '交易类型',
      value: inout ? '收入' : '支出',
    });
  }

  if (BillType.Withdraw === billType) {
    data.push({
      id: 5,
      name: '提现银行',
      value: bankName,
    });
    data.push({
      id: 6,
      name: '银行卡号后4位',
      value: bankNumber,
    });
    data.push({
      id: 7,
      name: '银行卡所属人姓名',
      value: bankPeople,
    });
  }

  const onItemPress = item => {
    if (item.id === 0) {
      changeBillType();
    } else if (item.id === 1) {
      changeAmount();
    } else if (item.id === 2) {
      changeDate();
    } else if (item.id === 3) {
      changeUser();
    } else if (item.id === 4) {
      changeInout();
    } else if (item.id === 5) {
      changeBankName();
    } else if (item.id === 6) {
      changeBankNumber();
    } else if (item.id === 7) {
      changeBankPeople();
    }
  };

  const changeBillType = () => {
    function update(type: BillType) {
      if (type === BillType.Custom) {
        showPrompt({
          title: '自定义交易方式',
          placeholder: '请输入交易方式',
          completion: text => {
            if (!text) return;
            setCustomValue(text);
            setBillType(type);
          },
        });
      } else {
        setBillType(type);
      }
    }
    showActionSheetWithOptions(
      {
        options: [...billTypeValues, '取消'],
        cancelButtonIndex: billTypeValues.length,
      },
      buttonIndex => {
        if (buttonIndex === billTypeValues.length) return;
        update(billTypeKeys[buttonIndex]);
      },
    );
  };

  const changeAmount = () => {
    showPrompt({
      title: '请输入金额',
      placeholder: '输入金额',
      completion: text => {
        if (!text) return;
        const num = parseFloat(text);
        if (isNaN(num)) return;
        setAmount(num.toFixed(2));
      },
    });
  };

  const changeDate = () => {
    setTimePickerVisible(true);
  };

  const changeUser = () => {
    navigation.navigate('SelectContact', {onComplete: contact => setUser(contact.user)});
  };

  const changeInout = () => {
    showActionSheetWithOptions(
      {
        options: ['支出', '收入', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        setInout(buttonIndex === 0 ? false : true);
      },
    );
  };

  const changeBankName = () => {
    const bankNames = ['中国银行', '建设银行', '工商银行', '农业银行', '招商银行', '浦发银行'];
    showActionSheetWithOptions(
      {
        title: '选择提现银行',
        options: [...bankNames, '取消'],
        cancelButtonIndex: bankNames.length,
      },
      buttonIndex => {
        if (buttonIndex === bankNames.length) return;
        setBankName(bankNames[buttonIndex]);
      },
    );
  };

  const changeBankNumber = () => {
    showPrompt({
      title: '请输入银行卡后4位',
      placeholder: '银行卡后4位',
      completion: text => {
        if (!/\d{4}/.test(text)) return;
        setBankNumber(text);
      },
    });
  };

  const changeBankPeople = () => {
    showPrompt({
      title: '请输入银行卡所属人姓名',
      placeholder: '银行卡所属人姓名',
      completion: text => {
        if (!text) return;
        setBankPeople(text);
      },
    });
  };

  const onConfirm = async () => {
    const bill = new BillEntity();
    bill.billType = billType;
    if (billType === BillType.Custom) {
      bill.billTypeValue = customValue;
    } else {
      bill.billTypeValue = billTypeMaps[billType];
    }
    if (parseFloat(amount) <= 0) {
      toast.current?.show('请输入账单金额');
      return;
    }
    bill.amount = amount;
    bill.date = date;
    if (![BillType.PhoneTopUp, BillType.Withdraw].includes(billType)) {
      if (!user) {
        toast.current?.show('请选择对方信息');
        return;
      }
      bill.user = user;
      bill.inout = inout;
    }
    if (billType === BillType.Withdraw) {
      bill.bankName = bankName;
      bill.bankNumber = bankNumber;
      bill.bankPeople = bankPeople;
    }
    await getBillService().insertBill(bill);
    notifyBillsDidChange();
    navigation.goBack();
  };

  function renderFooter() {
    return (
      <View style={styles.footer}>
        <Button type="primary" text="确定" onPress={onConfirm} />
      </View>
    );
  }

  return (
    <ContainerView style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Separator left={spacing[4]} />}
        ListFooterComponent={renderFooter}
        renderItem={({item}) => {
          return <TextCell name={item.name} value={item.value} onPress={() => onItemPress(item)} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <TimePicker
        visible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onDateInput={setDate}
      />
      <Toast ref={toast} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing[11],
  },
});
