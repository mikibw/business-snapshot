import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import CameraImage from '@assets/images/wechat/functions/camera.png';
import BellImage from '@assets/images/wechat/functions/bell.png';
import PayImage from '@assets/images/wechat/functions/wechatPay.png';
import CompassImage from '@assets/images/wechat/functions/compass.png';
import FavoriteImage from '@assets/images/wechat/functions/favorite.png';
import FolderImage from '@assets/images/wechat/functions/folder.png';
import GalleryImage from '@assets/images/wechat/functions/gallery.png';
import LocationImage from '@assets/images/wechat/functions/location.png';
import ProfileImage from '@assets/images/wechat/functions/profile.png';
import RedPocketImage from '@assets/images/wechat/functions/redPocket.png';
import TransferImage from '@assets/images/wechat/functions/transfer.png';
import TimelineImage from '@assets/images/wechat/functions/timeline.png';
import VideoImage from '@assets/images/wechat/functions/video.png';
import VoiceImage from '@assets/images/wechat/functions/voice.png';
import VoiceInputImage from '@assets/images/wechat/functions/voiceInput.png';
import {colors, spacing} from '@design-system';

export interface FunctionItems {
  id: number;
  image: ImageSourcePropType;
  name: string;
  hidden?: boolean;
}

interface FunctionsSectionProps {
  isGroup: boolean;
  sendImage?: () => void;
  call?: () => void;
  sendRedPocket?: () => void;
  transfer?: () => void;
  switchSpeaker?: () => void;
  sendContactCard?: () => void;
  sendFile?: () => void;
  addTimeline?: () => void;
  sendVoice?: () => void;
  addSystemMsg?: () => void;
  paySuccess?: () => void;
}

export const FunctionsSection: React.FC<FunctionsSectionProps> = ({isGroup, ...functions}) => {
  const p2pPage1 = [
    {id: 0, image: GalleryImage, name: '照片'},
    {id: 1, image: CameraImage, name: '拍摄'},
    {id: 2, image: VideoImage, name: '视频通话'},
    {id: 3, image: LocationImage, name: '位置'},
    {id: 4, image: RedPocketImage, name: '红包'},
    {id: 5, image: TransferImage, name: '转账'},
    {id: 6, image: VoiceInputImage, name: '语音输入'},
    {id: 7, image: FavoriteImage, name: '收藏'},
  ] as FunctionItems[];

  const p2pPage2 = [
    {id: 8, image: TransferImage, name: '切换用户'},
    {id: 9, image: ProfileImage, name: '个人名片'},
    {id: 10, image: FolderImage, name: '文件'},
    {id: 11, image: TimelineImage, name: '时间'},
    {id: 12, image: VoiceImage, name: '语音'},
    {id: 13, image: BellImage, name: '系统消息'},
    {id: 14, image: PayImage, name: '支付成功'},
    {id: 15, image: CompassImage, name: '消息排序', hidden: true},
  ] as FunctionItems[];

  const groupPage = [
    {id: 0, image: GalleryImage, name: '照片'},
    {id: 4, image: RedPocketImage, name: '红包'},
    {id: 11, image: TimelineImage, name: '时间'},
    {id: 12, image: VoiceImage, name: '语音'},
    {id: 13, image: BellImage, name: '系统消息'},
    {id: 9, image: ProfileImage, name: '个人名片'},
    {id: 10, image: FolderImage, name: '文件'},
    {id: 15, image: CompassImage, name: '消息排序', hidden: true},
  ] as FunctionItems[];

  const renderItem = (item: FunctionItems) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (item.id === 0 || item.id === 1) {
          functions.sendImage?.();
        } else if (item.id === 2) {
          functions.call?.();
        } else if (item.id === 4) {
          functions.sendRedPocket?.();
        } else if (item.id === 5) {
          functions.transfer?.();
        } else if (item.id === 8) {
          functions.switchSpeaker?.();
        } else if (item.id === 9) {
          functions.sendContactCard?.();
        } else if (item.id === 10) {
          functions.sendFile?.();
        } else if (item.id === 11) {
          functions.addTimeline?.();
        } else if (item.id === 12) {
          functions.sendVoice?.();
        } else if (item.id === 13) {
          functions.addSystemMsg?.();
        } else if (item.id === 14) {
          functions.paySuccess?.();
        }
      }}>
      <Image
        source={item.image}
        resizeMode={'contain'}
        style={[styles.image, !!item.hidden && {opacity: 0}]}
      />
      <Text style={[styles.text, !!item.hidden && {opacity: 0}]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isGroup ? (
        <FlatList
          style={styles.content}
          data={groupPage}
          renderItem={({item}) => renderItem(item)}
          numColumns={4}
          columnWrapperStyle={styles.flatListContent}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <PagerView style={styles.content} showPageIndicator={true}>
          <FlatList
            key="1"
            data={p2pPage1}
            renderItem={({item}) => renderItem(item)}
            numColumns={4}
            columnWrapperStyle={styles.flatListContent}
            keyExtractor={(_, index) => index.toString()}
          />
          <FlatList
            key="2"
            data={p2pPage2}
            renderItem={({item}) => renderItem(item)}
            numColumns={4}
            columnWrapperStyle={styles.flatListContent}
            keyExtractor={(_, index) => index.toString()}
          />
        </PagerView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F7',
  },
  content: {
    height: 250,
  },
  flatListContent: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing[4],
    marginVertical: spacing[3],
  },
  item: {
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
  },
  text: {
    color: colors.text.grey10,
    marginTop: spacing[2],
  },
});
