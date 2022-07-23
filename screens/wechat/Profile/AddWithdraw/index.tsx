import React from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import ContainerView from '@components/ContainerView';
import moment from 'moment';
import {makeId} from '@utils/makeId';
import Separator from '@screens/wechat/Common/Separator';
import Button from '@screens/wechat/Common/Button';
import TextCell from '@screens/wechat/Common/TextCell';
import TimePicker from '@screens/wechat/Common/TimePicker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {WechatStackProps} from '@navigation/wechat';
import {usePrompt} from '@components/Prompt';

export default function AddWithdraw({route, navigation}: WechatStackProps<'AddWithdraw'>) {
  const {onComplete} = route.params;

  const {showPrompt} = usePrompt();

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);
  const {showActionSheetWithOptions} = useActionSheet();

  const [applyDate, setApplyDate] = React.useState(new Date());
  const [reachDate, setReachDate] = React.useState(new Date());
  const [bankName, setBankName] = React.useState('建设银行');
  const [bankNumber, setBankNumber] = React.useState('6686');
  const [orderNumber, setOrderNumber] = React.useState(makeId(22));

  const data: {name: string; value: string}[] = [
    {
      name: '提现申请时间',
      value: moment(applyDate).format('yyyy-MM-DD HH:mm:ss'),
    },
    {
      name: '提现到账时间',
      value: moment(reachDate).format('yyyy-MM-DD HH:mm:ss'),
    },
    {
      name: '提现银行',
      value: bankName,
    },
    {
      name: '银行卡号后4位',
      value: bankNumber,
    },
    {
      name: '提现单号',
      value: orderNumber,
    },
  ];

  const onDateInput = (date: Date) => {
    if (currentIndex === 0) {
      setApplyDate(date);
    } else if (currentIndex === 1) {
      setReachDate(date);
    }
  };

  const onItemPress = (index: number) => {
    if (index === 0 || index === 1) {
      setCurrentIndex(index);
      setTimePickerVisible(true);
    } else if (index === 2) {
      const options = ['中国银行', '建设银行', '工商银行', '农业银行', '招商银行', '浦发银行'];
      showActionSheetWithOptions(
        {
          options: [...options, '取消'],
          cancelButtonIndex: options.length,
        },
        buttonIndex => {
          if (buttonIndex === options.length) return;
          setBankName(options[buttonIndex]);
        },
      );
    } else if (index === 3) {
      showPrompt({
        title: '请输入银行卡号后4位',
        placeholder: '银行卡号后4位',
        completion: text => {
          if (!/^\d{4}$/.test(text)) return;
          setBankNumber(text);
        },
      });
    } else if (index === 4) {
      setOrderNumber(makeId(22));
    }
  };

  const onConfirm = () => {
    const result = {
      applyDate,
      reachDate,
      bankName,
      bankNumber,
      orderNumber,
    };
    onComplete && onComplete(result);
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
        renderItem={({item, index}) => {
          return (
            <TextCell name={item.name} value={item.value} onPress={() => onItemPress(index)} />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <TimePicker
        visible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onDateInput={onDateInput}
      />
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
