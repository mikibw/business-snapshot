import React, {ReactNode, createContext, useContext} from 'react';
import {View} from 'react-native';
import Dialog from 'react-native-dialog';

type Parameters = {
  title: string;
  message?: string;
  defaultValue?: string;
  defaultValue2?: string;
  placeholder?: string;
  placeholder2?: string;
  doubleInput?: boolean;
  completion?: (text: string, text2?: string) => void;
};

type Props = {
  showPrompt: (options: Parameters) => void;
};

const Context = createContext<Props>({showPrompt: () => {}});

export function PromptProvider(props: {children?: ReactNode}) {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [value2, setValue2] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState<string | undefined>('');
  const [placeholder, setPlaceholder] = React.useState<string | undefined>(undefined);
  const [placeholder2, setPlaceholder2] = React.useState<string | undefined>(undefined);
  const [doubleInput, setDoubleInput] = React.useState(false);
  const ref = React.useRef<((text: string, text2?: string) => void) | null>(null);

  const showPrompt = (options: Parameters) => {
    setVisible(true);
    setValue(options.defaultValue || '');
    setValue2(options.defaultValue2 || '');
    setTitle(options.title);
    setMessage(options.message);
    setPlaceholder2(options.placeholder2);
    setPlaceholder(options.placeholder);
    setPlaceholder2(options.placeholder2);
    setDoubleInput(options.doubleInput === true);
    if (options.completion) {
      ref.current = options.completion;
    }
  };

  return (
    <Context.Provider value={{showPrompt}}>
      {props.children}
      <Dialog.Container visible={visible} onBackdropPress={() => setVisible(false)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>
        <Dialog.Input placeholder={placeholder} onChangeText={setValue} value={value} />
        {doubleInput === true ? (
          <Dialog.Input placeholder={placeholder2} onChangeText={setValue2} value={value2} />
        ) : (
          <View />
        )}
        <Dialog.Button label="取消" onPress={() => setVisible(false)} />
        <Dialog.Button
          label="确定"
          onPress={() => {
            setVisible(false);
            ref.current && ref.current(value, value2);
          }}
        />
      </Dialog.Container>
    </Context.Provider>
  );
}

export function usePrompt() {
  return {showPrompt: useContext(Context).showPrompt};
}
