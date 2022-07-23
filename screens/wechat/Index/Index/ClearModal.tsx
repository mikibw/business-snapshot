import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import Modal from 'react-native-modal';
import Separator from '@screens/wechat/Common/Separator';

interface IClearModalProps {
  visible: boolean;
  onClose?: () => void;
  onClear?: () => void;
}

export default function ClearModal({visible, onClose, onClear}: IClearModalProps) {
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropColor={wechatColors.alpha50}
      onBackdropPress={onClose}>
      <View style={styles.content}>
        <View style={styles.prompt}>
          <Text style={styles.title}>提示</Text>
          <Text style={styles.subtitle}>确定删除所有聊天？(聊天记录也将被删除，不可恢复)</Text>
        </View>
        <Separator left={0} />
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              onClose?.();
              onClear?.();
            }}>
            <Text style={styles.actionText}>确定</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={onClose}>
            <Text style={styles.actionText}>取消</Text>
          </TouchableOpacity>
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
    width: 280,
    height: 168,
    borderRadius: 4,
    backgroundColor: wechatColors.white,
  },
  prompt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[9],
  },
  title: {
    fontSize: 18,
    color: wechatColors.black,
  },
  subtitle: {
    marginTop: spacing[3],
    fontSize: 15,
    color: '#888888',
  },
  actions: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 18,
    color: '#43C561',
  },
});
