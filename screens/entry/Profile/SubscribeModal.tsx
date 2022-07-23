import {colors, radius, spacing, typographics} from '@design-system';
import withAlpha from '@utils/withAlpha';
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import useGlobalState from '@hooks/useGlobalState';
import {isAppProduction} from '@services/fetchAppControl';
import CrossOut from '@components/CrossOut';

export type ISubscribeModalProps = {
  visible: boolean;
  onClose?: () => void;
  onAction?: (type: 'subscribe' | 'terms' | 'privacy' | 'restore') => void;
};

export default function SubscribeModal({visible, onClose, onAction}: ISubscribeModalProps) {
  const [appControl] = useGlobalState('appControl');
  const showRestore = Platform.OS === 'ios' && !isAppProduction(appControl);

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropColor={withAlpha(colors.background.black, 0.6)}
      onBackdropPress={onClose}>
      <SafeAreaView style={styles.container}>
        <CrossOut onPress={onClose} style={styles.crossOut} />
        <View style={styles.textView}>
          <Text style={styles.title}>{'不想看到广告？订阅即可去\n除全部广告'}</Text>
          <Text style={styles.subtitle}>免费试用3天，然后以 ￥1元/年续订</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onAction && onAction('subscribe')}>
          <Text style={styles.buttonText}>按年订阅 ￥1元</Text>
        </TouchableOpacity>
        <View style={styles.actionView}>
          <TouchableOpacity onPress={() => onAction && onAction('terms')}>
            <Text style={styles.action}>服务条款</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAction && onAction('privacy')}>
            <Text style={styles.action}>隐私政策</Text>
          </TouchableOpacity>
          {showRestore && (
            <TouchableOpacity onPress={() => onAction && onAction('restore')}>
              <Text style={styles.action}>恢复购买</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  crossOut: {
    justifyContent: 'flex-end',
    marginTop: spacing[3],
  },
  container: {
    backgroundColor: colors.background.white,
  },
  textView: {
    alignItems: 'center',
    marginTop: spacing[5],
    marginBottom: spacing[3],
  },
  title: {
    textAlign: 'center',
    ...typographics.extrude,
    color: colors.text.dark4,
  },
  subtitle: {
    marginTop: spacing[7],
    ...typographics.paragraph,
    color: colors.text.grey5,
  },
  button: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius[1],
    marginHorizontal: spacing[6],
    backgroundColor: colors.background.red1,
  },
  buttonText: {
    ...typographics.label,
    color: colors.text.white,
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[6],
    marginBottom: spacing[7],
  },
  action: {
    ...typographics.action,
    color: colors.text.grey2,
    marginHorizontal: spacing[3],
  },
});
