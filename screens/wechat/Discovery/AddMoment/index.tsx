import React from 'react';
import {StyleSheet, ScrollView, Alert, TouchableOpacity, Text} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import {UserEntity} from '@database/entities/UserEntity';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import Separator from '@screens/wechat/Common/Separator';
import TextNode from './TextNode';
import ImageNode from './ImageNode';
import SwitchCell from '@screens/wechat/Common/SwitchCell';
import Padding from './Padding';
import InputContent from './InputContent';
import InputImage from './InputImage';
import {getUserService} from '@database/services/UserService';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {WechatStackProps} from '@navigation/wechat';
import useImagePicker from '@hooks/useImagePicker';
import {ImageInfo} from 'expo-image-picker/build/ImagePicker.types';
import base64Image from '@utils/base64Image';
import TimePicker from '@screens/wechat/Common/TimePicker';
import dateDiff from '@utils/dateDiff';
import Toast from '@components/Toast';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {MomentEntity, MomentImageEntity, MomentType} from '@database/entities/MomentEntity';
import {getMomentService} from '@database/services/MomentService';
import {notifyMomentsDidChange} from '@events';
import {usePrompt} from '@components/Prompt';

export default function AddMoment({navigation}: WechatStackProps<'AddMoment'>) {
  const toast = React.useRef<Toast>(null);

  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();
  const selectImage = useImagePicker();
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);

  const [isMyself, setMyself] = React.useState(true);
  const [user, setUser] = React.useState<UserEntity | undefined>(undefined);
  const [date, setDate] = React.useState(new Date());
  const [address, setAddress] = React.useState('');
  const [source, setSource] = React.useState('');
  const [isPartiallyVisible, setPartiallyVisible] = React.useState(false);
  const [isLink, setLink] = React.useState(false);
  const [linkTitle, setLinkTitle] = React.useState('');
  const [isVideoStyle, setVideoStyle] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [imageInfos, setImageInfos] = React.useState<ImageInfo[]>([]);

  useNavigationOptions(
    {
      headerRight: () => (
        <TouchableOpacity onPress={publish}>
          <Text style={styles.publish}>发布</Text>
        </TouchableOpacity>
      ),
    },
    [
      isMyself,
      user,
      date,
      address,
      source,
      isPartiallyVisible,
      isLink,
      linkTitle,
      isVideoStyle,
      content,
      imageInfos,
    ],
  );

  async function publish() {
    const moment = new MomentEntity();
    moment.momentType = isLink ? MomentType.Link : MomentType.Normal;
    moment.user = user!;
    moment.content = content;
    moment.address = address;
    moment.source = source;
    if (isMyself) {
      moment.partiallyVisibile = isPartiallyVisible;
    }
    moment.linkTitle = linkTitle;
    moment.videoStyle = isVideoStyle;
    moment.publishDate = date;

    const images: MomentImageEntity[] = [];
    function createImageEntity(infos: ImageInfo[]) {
      infos.forEach(info => {
        const image = new MomentImageEntity();
        image.source = base64Image(info.base64!);
        image.width = info.width;
        image.height = info.height;
        images.push(image);
      });
    }
    if (isVideoStyle) {
      const imageInfo = imageInfos[0];
      if (imageInfo) createImageEntity([imageInfo]);
    } else {
      createImageEntity(imageInfos);
    }
    moment.images = images;

    await getMomentService().insertMoment(moment);
    notifyMomentsDidChange();
    navigation.goBack();
  }

  function changeUser() {
    showActionSheetWithOptions(
      {
        options: ['我', '他人', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 1) {
          navigation.navigate('SelectContact', {
            onComplete: contact => {
              setMyself(false);
              setUser(contact.user);
            },
          });
        } else if (buttonIndex === 0) {
          fetchSelfProfile();
        }
      },
    );
  }

  async function fetchSelfProfile() {
    setMyself(true);
    setUser(await getUserService().findSelf());
  }

  function changeDate() {
    setTimePickerVisible(true);
  }

  function changeAddress() {
    showPrompt({
      title: '发布地点',
      placeholder: '请输入发布地点',
      completion: setAddress,
    });
  }

  function changeSource() {
    showPrompt({
      title: '朋友圈来源',
      placeholder: '请输入朋友圈来源',
      completion: setSource,
    });
  }

  function changeLinkTitle() {
    showPrompt({
      title: '链接标题',
      placeholder: '请输入链接标题',
      completion: setLinkTitle,
    });
  }

  async function addImage() {
    try {
      const result = await selectImage(0.25, undefined, true);
      setImageInfos(pre => [...pre, result]);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  }

  function deleteImage(index: number) {
    setImageInfos(pre => pre.filter((_, idx) => idx !== index));
  }

  React.useEffect(() => {
    fetchSelfProfile();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        <IndicatorCell
          name="发布人"
          node={<TextNode value={isMyself ? '我' : '他人'} />}
          onPress={changeUser}
        />
        <Separator left={spacing[4]} />

        <IndicatorCell
          name="发布人头像"
          node={<ImageNode uri={(user && user.avatar) || ''} />}
          arrowHidden
        />
        <Separator left={spacing[4]} />
        <IndicatorCell
          name="发布人昵称"
          node={<TextNode value={(user && user.name) || ''} />}
          arrowHidden
        />
        <Separator left={spacing[4]} />

        <IndicatorCell
          name="发布时间"
          node={<TextNode value={dateDiff(date)} />}
          onPress={changeDate}
        />
        <Separator left={spacing[4]} />

        <IndicatorCell
          name="发布地点"
          node={<TextNode value={address} placeholder="填写发布地址(选填)" />}
          arrowHidden
          onPress={changeAddress}
        />
        <Separator left={spacing[4]} />

        <IndicatorCell
          name="朋友圈来源"
          node={<TextNode value={source} placeholder="填写来源(选填)" />}
          arrowHidden
          onPress={changeSource}
        />
        <Separator left={spacing[4]} />

        {isMyself && (
          <>
            <SwitchCell
              name="是否部分人可见"
              on={isPartiallyVisible}
              onChange={setPartiallyVisible}
            />
            <Separator left={spacing[4]} />
          </>
        )}

        <SwitchCell name="是否是分享链接" on={isLink} onChange={setLink} />
        <Separator left={spacing[4]} />

        {isLink && (
          <>
            <IndicatorCell
              name="链接标题"
              node={<TextNode value={linkTitle} placeholder="输入分享标题" />}
              arrowHidden
              onPress={changeLinkTitle}
            />
            <Separator left={spacing[4]} />
          </>
        )}

        <SwitchCell name="是否是视频样式" on={isVideoStyle} onChange={setVideoStyle} />
        <Padding />

        <InputContent value={content} onChange={setContent} />
        <Padding />

        <InputImage
          images={imageInfos.map(image => base64Image(image.base64 || ''))}
          onAdd={addImage}
          onDelete={deleteImage}
        />
      </ScrollView>
      <TimePicker
        visible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onDateInput={date => {
          if (date > new Date()) {
            toast.current?.show('不能超过当前时间');
          } else {
            setDate(date);
          }
        }}
      />
      <Toast ref={toast} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  publish: {
    fontSize: 16,
    color: wechatColors.black,
    marginRight: spacing[3],
  },
});
