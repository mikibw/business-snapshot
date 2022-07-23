import React from 'react';
import {View} from 'react-native';
import AvatarItem from './AvatarItem';

export default function AvatarSeven({sources}: {sources: string[]}) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <AvatarItem source={sources[0]} withPadding style={{width: '33%', aspectRatio: 1}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <AvatarItem source={sources[1]} withPadding style={{flex: 1, aspectRatio: 1}} />
        <AvatarItem source={sources[2]} withPadding style={{flex: 1, aspectRatio: 1}} />
        <AvatarItem source={sources[3]} withPadding style={{flex: 1, aspectRatio: 1}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <AvatarItem source={sources[4]} withPadding style={{flex: 1, aspectRatio: 1}} />
        <AvatarItem source={sources[5]} withPadding style={{flex: 1, aspectRatio: 1}} />
        <AvatarItem source={sources[6]} withPadding style={{flex: 1, aspectRatio: 1}} />
      </View>
    </View>
  );
}
