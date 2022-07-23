import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {colors, radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import moment from 'moment';
import Modal from 'react-native-modal';
import Button from './Button';

function TimeInput(props: {suffix: string; value: string; onChange: (text: string) => void}) {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        value={props.value}
        onChange={e => props.onChange(e.nativeEvent.text)}
        keyboardType="number-pad"
      />
      <Text style={styles.inputSuffix}>{props.suffix}</Text>
    </View>
  );
}
interface ITimePickerProps {
  visible: boolean;
  onClose?: () => void;
  onDateInput?: (date: Date, metaData?: any) => void;
}

export default function TimePicker({visible, onClose, onDateInput}: ITimePickerProps) {
  const [year, setYear] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [day, setDay] = React.useState('');
  const [hour, setHour] = React.useState('');
  const [minute, setMinute] = React.useState('');
  const [second, setSecond] = React.useState('');

  React.useEffect(() => {
    if (visible) {
      const now = new Date();
      setYear(now.getFullYear().toString());
      setMonth((now.getMonth() + 1).toString());
      setDay(now.getDate().toString());
      setHour(now.getHours().toString());
      setMinute(now.getMinutes().toString());
      setSecond(now.getSeconds().toString());
    }
  }, [visible]);

  const onConfirm = () => {
    onClose && onClose();
    const result = moment(
      `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      'yy-MM-DD HH:mm:ss',
    );
    result.isValid() && onDateInput && onDateInput(result.toDate());
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
        <View style={styles.inputRow}>
          <Text style={styles.label}>日期：</Text>
          <TimeInput suffix="年" value={year} onChange={setYear} />
          <TimeInput suffix="月" value={month} onChange={setMonth} />
          <TimeInput suffix="日" value={day} onChange={setDay} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>时间：</Text>
          <TimeInput suffix="时" value={hour} onChange={setHour} />
          <TimeInput suffix="分" value={minute} onChange={setMinute} />
          <TimeInput suffix="秒" value={second} onChange={setSecond} />
        </View>
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
    borderRadius: radius[2],
    padding: spacing[4],
    backgroundColor: wechatColors.white,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: spacing[2],
  },
  label: {
    ...wechatTypographics.title(false),
  },
  inputBox: {
    marginHorizontal: spacing[1],
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  input: {
    width: 60,
    color: wechatColors.alpha50,
    borderBottomWidth: 0.5,
    borderBottomColor: wechatColors.separator,
  },
  inputSuffix: {
    ...wechatTypographics.title(false),
  },
  confirm: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing[4],
  },
});
