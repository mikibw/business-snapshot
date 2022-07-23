import React, {createContext, ReactNode, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import withAlpha from '@utils/withAlpha';
import {colors, spacing, wechatColors} from '@design-system';
import Button from '@screens/wechat/Common/Button';
import moment from 'moment';
import CrossOut from '@components/CrossOut';

const days = (function () {
  const values: string[] = [];
  for (let index = -500; index < 500; index++) {
    const now = moment(new Date());
    let value: moment.Moment;
    if (index < 0) {
      value = now.subtract(-index, 'day');
    } else if (index > 0) {
      value = now.add(index, 'day');
    } else {
      value = now;
    }
    values.push(value.format('yyyy年MM月DD日'));
  }
  return values;
})();

const hours = (function () {
  const values: string[] = [];
  for (let index = 0; index < 24; index++) {
    values.push(index.toString());
  }
  return values;
})();

const minutes = (function () {
  const values: string[] = [];
  for (let index = 0; index < 60; index++) {
    values.push(index.toString());
  }
  return values;
})();

type Parameters = {
  title: string;
  completion?: (date: Date) => void;
};

type Props = {
  showDateTimePicker: (options: Parameters) => void;
};

const Context = createContext<Props>({showDateTimePicker: () => {}});

export function DateTimePickerProvider(props: {children?: ReactNode}) {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const [dayIndex, setDayIndex] = React.useState(500);
  const [hourIndex, setHourIndex] = React.useState(0);
  const [minuteIndex, setMinuteIndex] = React.useState(0);

  const ref = React.useRef<Parameters['completion']>(undefined);

  function showDateTimePicker(options: Parameters) {
    setVisible(true);
    setTitle(options.title);
    ref.current = options.completion;
  }

  function confirm() {
    const str = `${days[dayIndex]} ${hours[hourIndex]}:${minutes[minuteIndex]}`;
    const date = moment(str, 'yyyy年MM月DD日 HH:mm').toDate();
    setVisible(false);
    ref.current?.(date);
  }

  return (
    <Context.Provider value={{showDateTimePicker}}>
      {props.children}
      <Modal
        isVisible={visible}
        style={styles.modal}
        backdropColor={withAlpha(colors.background.black, 0.6)}
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.container}>
          <View style={styles.top}>
            <CrossOut onPress={() => setVisible(false)} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.pickers}>
            <Picker style={{flex: 2}} selectedValue={dayIndex} onValueChange={setDayIndex}>
              {days.map((day, index) => {
                return <Picker.Item key={day} label={day} value={index} />;
              })}
            </Picker>
            <Picker style={{flex: 1}} selectedValue={hourIndex} onValueChange={setHourIndex}>
              {hours.map((hour, index) => {
                return <Picker.Item key={hour} label={hour} value={index} />;
              })}
            </Picker>
            <Picker style={{flex: 1}} selectedValue={minuteIndex} onValueChange={setMinuteIndex}>
              {minutes.map((minute, index) => {
                return <Picker.Item key={minute} label={minute} value={index} />;
              })}
            </Picker>
          </View>
          <View style={styles.button}>
            <Button type="primary" text="确定" onPress={confirm} />
          </View>
        </View>
      </Modal>
    </Context.Provider>
  );
}

export function useDateTimePicker() {
  return {showDateTimePicker: useContext(Context).showDateTimePicker};
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: wechatColors.white,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[4],
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: -24,
    color: wechatColors.black,
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  button: {
    marginBottom: spacing[7],
    alignItems: 'center',
  },
});
