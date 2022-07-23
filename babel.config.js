module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@design-system': './design-system',
            '@database': './database',
            '@events': './events',
            '@navigation': './navigation',
            '@screens': './screens',
            '@components': './components',
            '@constants': './constants',
            '@services': './services',
            '@hooks': './hooks',
            '@utils': './utils',
            '@assets': './assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
      '@babel/transform-react-jsx-source',
      'babel-plugin-transform-typescript-metadata',
    ],
  };
};
