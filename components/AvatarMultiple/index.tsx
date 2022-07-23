import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import AvatarOne from './AvatarOne';
import AvatarTwo from './AvatarTwo';
import AvatarThree from './AvatarThree';
import AvatarFour from './AvatarFour';
import AvatarFive from './AvatarFive';
import AvatarSix from './AvatarSix';
import AvatarSeven from './AvatarSeven';
import AvatarEight from './AvatarEight';
import AvatarNine from './AvatarNine';

interface IAvatarMultipleProps {
  avatars: any[];
  style?: StyleProp<ViewStyle>;
}

export default function AvatarMultiple({avatars, style}: IAvatarMultipleProps) {
  const _avatars = avatars.slice(0, 9);

  return (
    <View style={[styles.container, style]}>
      {_avatars.length === 1 && <AvatarOne source={avatars[0]} />}
      {_avatars.length === 2 && <AvatarTwo sources={avatars} />}
      {_avatars.length === 3 && <AvatarThree sources={avatars} />}
      {_avatars.length === 4 && <AvatarFour sources={avatars} />}
      {_avatars.length === 5 && <AvatarFive sources={avatars} />}
      {_avatars.length === 6 && <AvatarSix sources={avatars} />}
      {_avatars.length === 7 && <AvatarSeven sources={avatars} />}
      {_avatars.length === 8 && <AvatarEight sources={avatars} />}
      {_avatars.length === 9 && <AvatarNine sources={avatars} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#EDEDED',
  },
});
