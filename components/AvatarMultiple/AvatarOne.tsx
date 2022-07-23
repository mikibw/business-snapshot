import React from 'react';
import AvatarItem from './AvatarItem';

export default function AvatarOne({source}: {source: string}) {
  return <AvatarItem source={source} withPadding={false} style={{width: '100%', height: '100%'}} />;
}
