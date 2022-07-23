import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useImagePicker from '@hooks/useImagePicker';
import {video_camera, video_off, video_switch} from '@assets/images/wechat/index/index';
import {WechatStackProps} from '@navigation/wechat';
import {durationText} from '@utils/durationText';
import {call_shrink} from '@assets/images/icons';

export default function VideoCall({route, navigation}: WechatStackProps<'VideoCall'>) {
  const {avatar, name, completion} = route.params;

  const insets = useSafeAreaInsets();
  const selectImage = useImagePicker();

  const [isConnected, setConnected] = React.useState(false);
  const [bgImage, setBgImage] = React.useState<string | null>(null);
  const [oppositeImage, setOppositeImage] = React.useState<string | null>(null);
  const [duration, setDuration] = React.useState<number>(0);

  React.useEffect(() => {
    let timer: any;
    if (isConnected) {
      timer = setInterval(() => setDuration(pre => pre + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isConnected]);

  async function changeBgImage() {
    try {
      const result = await selectImage(0.9);
      setBgImage(result.uri);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  }

  async function changeOppositeImage() {
    try {
      const result = await selectImage(0.9);
      setOppositeImage(result.uri);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  }

  function exit() {
    completion && completion(!isConnected, duration);
    navigation.goBack();
  }

  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      {/* -----背景----- */}
      <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={changeBgImage}>
        {!bgImage && <Text style={styles.bgText}>点击添加视频或图片</Text>}
        {!!bgImage && <Image source={{uri: bgImage}} style={styles.bgImage} />}
      </TouchableOpacity>
      {/* -----头部----- */}
      <View style={[styles.header, {marginTop: insets.top + spacing[4]}]}>
        {/* -----缩小/通话时间----- */}
        <View style={styles.top}>
          <TouchableOpacity onPress={() => setConnected(true)}>
            <Image source={call_shrink} style={styles.shrink} />
          </TouchableOpacity>
          {isConnected && <Text style={styles.duration}>{durationText(duration)}</Text>}
        </View>
        {/* -----对方信息----- */}
        {!isConnected && (
          <View style={styles.user}>
            <Image source={{uri: avatar}} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.accepting}>正在等待对方接受邀请</Text>
            </View>
          </View>
        )}
      </View>
      {/* -----对方图像----- */}
      {isConnected && (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.opposite, {top: insets.top}]}
          onPress={changeOppositeImage}>
          {!oppositeImage && <Text style={styles.oppositeText}>点击视频添加视频或图片</Text>}
          {!!oppositeImage && <Image source={{uri: oppositeImage}} style={styles.oppositeImage} />}
        </TouchableOpacity>
      )}
      {/* -----按钮----- */}
      <View style={[styles.bottom, {marginBottom: insets.bottom + spacing[3]}]}>
        {isConnected ? (
          <>
            <View style={styles.action}>
              <Image source={video_switch} style={styles.actionImage} />
              <Text style={styles.actionText}>切换到语音通话</Text>
            </View>
            <TouchableOpacity style={styles.action} onPress={exit}>
              <Image source={video_off} style={styles.actionImage} />
              <Text style={styles.actionText}>取消</Text>
            </TouchableOpacity>
            <View style={styles.action}>
              <Image source={video_camera} style={styles.actionImage} />
              <Text style={styles.actionText}>切换摄像头</Text>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.action} onPress={exit}>
              <Image source={video_off} style={styles.actionImage} />
              <Text style={styles.actionText}>取消</Text>
            </TouchableOpacity>
            <View style={styles.action}>
              <Image source={video_switch} style={styles.actionImage} />
              <Text style={styles.actionText}>切换到语音通话</Text>
            </View>
          </>
        )}
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: wechatColors.black,
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bgText: {
    fontSize: 16,
    color: wechatColors.white,
  },
  opposite: {
    position: 'absolute',
    right: spacing[2],
    width: 90,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oppositeImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  oppositeText: {
    fontSize: 12,
    color: wechatColors.white,
  },
  header: {
    paddingHorizontal: spacing[5],
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shrink: {
    width: 20,
    height: 20,
  },
  duration: {
    flex: 1,
    marginLeft: -20,
    fontSize: 16,
    textAlign: 'center',
    color: wechatColors.white,
  },
  user: {
    marginTop: spacing[8],
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 4,
    marginRight: spacing[2],
  },
  username: {
    fontSize: 28,
    color: wechatColors.white,
  },
  accepting: {
    marginTop: spacing[2],
    fontSize: 15,
    color: wechatColors.white,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  action: {
    alignItems: 'center',
  },
  actionImage: {
    width: 72,
    height: 72,
    alignItems: 'center',
  },
  actionText: {
    marginTop: spacing[3],
    fontSize: 11,
    color: wechatColors.white,
  },
});
