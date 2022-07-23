import React from 'react';
import {Image} from 'react-native';

export default function ImageNode(props: {image: any; size: number; radius?: number}) {
  return (
    <Image
      source={props.image}
      style={{width: props.size, height: props.size, borderRadius: props.radius || 0}}
    />
  );
}
