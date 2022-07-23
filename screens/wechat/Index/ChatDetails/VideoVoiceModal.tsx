import React from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image} from 'react-native';
import Modal from 'react-native-modal';
import {spacing, wechatColors} from '@design-system';
import Separator from '@screens/wechat/Common/Separator';
import {call_video, call_voice} from '@assets/images/wechat/index/index';

interface IVideoVoiceModalProps {
  visible: boolean;
  onClose?: () => void;
  onPress?: (video: boolean) => void;
}

export default function VideoVoiceModal({visible, onClose, onPress}: IVideoVoiceModalProps) {
  const data = [
    {
      icon: call_video,
      name: '视频通话',
    },
    {
      icon: call_voice,
      name: '语音通话',
    },
  ];

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropColor={wechatColors.alpha50}
      onBackdropPress={onClose}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <Separator left={0} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                onClose?.();
                onPress?.(index === 0);
              }}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <TouchableOpacity onPress={onClose} style={styles.cancelRow}>
          <Text style={styles.text}>取消</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: wechatColors.white,
  },
  row: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 8,
    borderTopColor: '#F5F6F7',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: spacing[2],
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
});
