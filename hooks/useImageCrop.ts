import * as ImageManipulator from 'expo-image-manipulator';

export default function useImageCrop(
  count: number,
  colums: number,
): (uri: string, wh: number) => Promise<ImageManipulator.ImageResult[]> {
  return async (uri: string, wh: number) => {
    try {
      const images: ImageManipulator.ImageResult[] = [];
      const options = {
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG,
      };
      for (let index = 0; index < count; index++) {
        const row = Math.floor(index / colums);
        const colum = index % colums;
        const rect = {
          originX: (colum * wh) / colums,
          originY: (row * wh) / colums,
          width: wh / colums,
          height: wh / colums,
        };
        const result = await ImageManipulator.manipulateAsync(uri, [{crop: rect}], options);
        images.push(result);
      }
      return images;
    } catch {
      throw '裁剪失败！请选择正方形区域，使得图片充满线框';
    }
  };
}
