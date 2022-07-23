import React from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Draggable from 'react-native-draggable';
import useGlobalState from '@hooks/useGlobalState';
import {water_mark_button} from '@assets/images/entry/home';

const window = Dimensions.get('window');

export default function FloatSubscribeButton() {
  const navigation = useNavigation();
  const [isSubscribed] = useGlobalState('isSubscribed');
  if (isSubscribed) return null;
  return (
    <Draggable x={window.width - 75} y={window.height - 150}>
      <TouchableOpacity onPress={() => navigation.navigate('Payment' as any)}>
        <Image source={water_mark_button} style={{width: 58, height: 48}} />
      </TouchableOpacity>
    </Draggable>
  );
}
