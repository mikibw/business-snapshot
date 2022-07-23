import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {EntryStackProps} from '@navigation/entry';
import {colors, spacing} from '@design-system';
import withAlpha from '@utils/withAlpha';
import KeyInput from './KeyInput';
import changeNumberToChinese from '@utils/changeNumberToChinese';
import Toast from '@components/Toast';
import * as images from '@assets/images/entry/case-toggle';

export default function CaseToggle({navigation}: EntryStackProps<'CaseToggle'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={clear}>
          <Image source={images.clear} style={styles.clear} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const toast = React.useRef<Toast>(null);

  const [input, setInput] = React.useState('0');
  const [result, setResult] = React.useState(changeNumberToChinese('0'));

  const clear = () => {
    setInput('0');
    setResult(changeNumberToChinese('0'));
  };

  const copy = () => {
    Clipboard.setString(result);
    toast.current?.show('复制成功');
  };

  const keyIn = (num: string) => {
    if (!num) {
      const newInput = input.slice(0, -1);
      if (newInput.length === 0) {
        clear();
      } else {
        setInput(newInput);
        setResult(changeNumberToChinese(newInput));
      }
      return;
    }
    if (input.length === 1 && input === '0' && num === '0') return;
    if (input.includes('.') && num === '.') return;
    if (input.includes('.')) {
      const last = input.split('.')[1];
      if (last && last.length >= 4) return;
    }
    try {
      const empty = input.length === 1 && input === '0' && num !== '.';
      const newInput = empty ? num : input + num;
      const chinese = changeNumberToChinese(newInput);
      setInput(newInput);
      setResult(chinese);
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.displayView}>
          <Text style={styles.inputText}>{input}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.displayView}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      </View>
      <View>
        <View style={styles.group}>
          <View style={styles.colum}>
            <View style={styles.row}>
              <KeyInput number="7" style={styles.n7} onPress={() => keyIn('7')} />
              <KeyInput number="8" style={styles.n8} onPress={() => keyIn('8')} />
              <KeyInput number="9" style={styles.n9} onPress={() => keyIn('9')} />
            </View>
            <View style={styles.row}>
              <KeyInput number="4" style={styles.n4} onPress={() => keyIn('4')} />
              <KeyInput number="5" style={styles.n5} onPress={() => keyIn('5')} />
              <KeyInput number="6" style={styles.n6} onPress={() => keyIn('6')} />
            </View>
          </View>
          <KeyInput style={styles.copy} onPress={copy} />
        </View>
        <View style={styles.group}>
          <View style={styles.colum}>
            <View style={styles.row}>
              <KeyInput number="1" style={styles.n1} onPress={() => keyIn('1')} />
              <KeyInput number="2" style={styles.n2} onPress={() => keyIn('2')} />
              <KeyInput number="3" style={styles.n3} onPress={() => keyIn('3')} />
            </View>
            <View style={styles.row}>
              <KeyInput number="0" style={styles.n0} onPress={() => keyIn('0')} />
              <KeyInput number="." style={styles.dot} onPress={() => keyIn('.')} />
            </View>
          </View>
          <KeyInput style={styles.backSpace} onPress={() => keyIn('')}>
            <Image source={images.back_space} style={styles.backSpaceImage} />
          </KeyInput>
        </View>
      </View>
      <Toast ref={toast} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: withAlpha(colors.background.grey1, 0.9),
  },
  clear: {
    width: 24,
    height: 24,
    marginRight: spacing[3],
  },
  topView: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: withAlpha(colors.border.black, 0.1),
  },
  displayView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 28,
    fontWeight: 'normal',
    lineHeight: 34,
    color: colors.text.green1,
    marginRight: spacing[2],
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'normal',
    lineHeight: 34,
    color: colors.text.grey5,
    marginRight: spacing[2],
  },
  group: {
    flexDirection: 'row',
  },
  colum: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  n0: {
    flex: 1,
    aspectRatio: 3 / 2,
  },
  n1: {
    flex: 1,
    aspectRatio: 1,
  },
  n2: {
    flex: 1,
    aspectRatio: 1,
  },
  n3: {
    flex: 1,
    aspectRatio: 1,
  },
  n4: {
    flex: 1,
    aspectRatio: 1,
  },
  n5: {
    flex: 1,
    aspectRatio: 1,
  },
  n6: {
    flex: 1,
    aspectRatio: 1,
  },
  n7: {
    flex: 1,
    aspectRatio: 1,
  },
  n8: {
    flex: 1,
    aspectRatio: 1,
  },
  n9: {
    flex: 1,
    aspectRatio: 1,
  },
  dot: {
    flex: 1,
    aspectRatio: 3 / 2,
  },
  copy: {
    width: '25%',
  },
  backSpace: {
    width: '25%',
  },
  backSpaceImage: {
    width: 36,
    height: 36,
  },
});
