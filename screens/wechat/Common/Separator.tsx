import React from 'react';
import {View} from 'react-native';
import {wechatColors} from '@design-system';

export default function Separator({left}: {left: number}) {
  return (
    <View
      style={{
        height: 0.5,
        marginTop: -0.5,
        marginLeft: left,
        backgroundColor: wechatColors.separator,
      }}
    />
  );
}
