import * as MediaLibrary from 'expo-media-library';

export default function useImageSave(): (sources: string[]) => Promise<void> {
  return async (sources: string[]) => {
    if (sources.length === 0) {
      throw '请选择图片';
    }
    for (const source of sources) {
      try {
        await MediaLibrary.saveToLibraryAsync(source);
      } catch {
        throw '保存失败';
      }
    }
  };
}
