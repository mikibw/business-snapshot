import {ExpoConfig, ConfigContext} from '@expo/config';

export default function ({config}: ConfigContext): ExpoConfig {
  const AppMode = process.env.AppMode;
  console.log('AppMode: ', AppMode);
  if (AppMode === 'development') {
    return {
      ...config,
      ios: {
        ...config.ios,
        bundleIdentifier: 'com.huangxun.test',
      },
      android: {
        ...config.android,
        package: 'com.huangxun.test',
      },
    } as ExpoConfig;
  } else {
    return {
      ...config,
      ios: {
        ...config.ios,
        bundleIdentifier: 'com.huangxun.test',
      },
      android: {
        ...config.android,
        package: 'com.huangxun.test',
      },
    } as ExpoConfig;
  }
}
