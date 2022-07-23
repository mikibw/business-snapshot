import * as ImagePicker from 'expo-image-picker';
import {ImageInfo} from 'expo-image-picker/build/ImagePicker.types';

export default function useImagePicker(): (
  quality: number,
  aspect?: [number, number],
  base64?: boolean,
) => Promise<ImageInfo> {
  return async (quality, aspect, base64) => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const options: ImagePicker.ImagePickerOptions = {
        quality,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      };
      if (aspect) {
        options.allowsEditing = true;
        options.aspect = aspect;
      }
      if (base64) options.base64 = base64;
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        return result;
      } else {
        throw '';
      }
    } else {
      throw '请设置图片访问权限';
    }
  };
}
