import React from 'react';
import {Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, View, Alert} from 'react-native';
import {EntryStackProps} from '@navigation/entry';
import {colors, radius, spacing, typographics} from '@design-system';
import Toast from '@components/Toast';
import {icon_add} from '@assets/images/entry/photo-matrix';
import useNavigationOptions from '@hooks/useNavigationOptions';
import useImagePicker from '@hooks/useImagePicker';
import useImageCrop from '@hooks/useImageCrop';
import useImageSave from '@hooks/useImageSave';
import range from '@utils/range';
import useGlobalState from '@hooks/useGlobalState';

export default function PhotoMatrix({navigation}: EntryStackProps<'PhotoMatrix'>) {
  const toast = React.useRef<Toast>(null);

  const selectImage = useImagePicker();
  const cropImage = useImageCrop(9, 3);
  const saveImages = useImageSave();
  const [sources, setSources] = React.useState<string[]>([]);

  const [isSubscribed] = useGlobalState('isSubscribed');

  useNavigationOptions(
    {
      headerRight: () => (
        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text style={styles.saveText}>保存</Text>
        </TouchableOpacity>
      ),
    },
    [sources, isSubscribed],
  );

  const save = async () => {
    if (!isSubscribed) {
      navigation.navigate('Payment');
      return;
    }
    try {
      await saveImages(sources);
      toast.current?.show('保存成功');
    } catch (msg: any) {
      toast.current?.show(msg);
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await selectImage(1, [1, 1]);
      await handleImageCrop(result.uri, result.width);
    } catch (msg: any) {
      msg && Alert.alert('', msg, [{text: '确定'}]);
    }
  };

  const handleImageCrop = async (uri: string, wh: number) => {
    try {
      const crops = await cropImage(uri, wh);
      setSources(crops.map(crop => crop.uri));
    } catch (msg: any) {
      toast.current?.show(msg);
    }
  };

  const selectTemplate = () => {
    navigation.navigate('MatrixTemplates');
  };

  return (
    <SafeAreaView style={styles.container}>
      {sources.length ? (
        <View style={styles.collection}>
          {range(0, 2).map(row => (
            <View key={row} style={styles.row}>
              {range(0, 2).map(colum => (
                <Image key={colum} style={styles.item} source={{uri: sources[row * 3 + colum]}} />
              ))}
            </View>
          ))}
        </View>
      ) : (
        <View style={[styles.wrapper, {marginTop: 140}]}>
          <TouchableOpacity style={styles.addIconButton} onPress={handleImagePicker}>
            <Image source={icon_add} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.wrapper, {marginTop: 64}]}>
        <TouchableOpacity style={styles.addTextButton} onPress={handleImagePicker}>
          <Text style={styles.addText}>选择图片</Text>
        </TouchableOpacity>
        {sources.length > 0 && (
          <TouchableOpacity style={styles.templateButton} onPress={selectTemplate}>
            <Text style={styles.templateText}>选择模板</Text>
          </TouchableOpacity>
        )}
      </View>
      <Toast ref={toast} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  saveButton: {
    width: 60,
    height: 30,
    marginRight: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius[1],
    backgroundColor: colors.background.green3,
  },
  saveText: {
    ...typographics.button,
    color: colors.text.white,
  },
  collection: {
    marginTop: spacing[2],
    padding: spacing[1] / 2,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    margin: spacing[1] / 2,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addIconButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: radius[1],
    borderColor: colors.border.green,
  },
  addIcon: {
    width: 26,
    height: 26,
  },
  addTextButton: {
    height: 40,
    marginHorizontal: spacing[3],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius[1],
    backgroundColor: colors.background.grey5,
  },
  addText: {
    ...typographics.button,
    color: colors.text.green2,
  },
  templateButton: {
    height: 40,
    marginHorizontal: spacing[3],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius[1],
    backgroundColor: colors.background.green3,
  },
  templateText: {
    ...typographics.button,
    color: colors.text.white,
  },
});
