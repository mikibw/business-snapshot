import React from 'react';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {Image, TouchableOpacity} from 'react-native';
import {icon_moment_camera, icon_moment_camera_white} from '@assets/images/wechat/discovery';
import {spacing} from '@design-system';
import {arrow_backward, arrow_backward_white} from '@assets/images/nav';

export default function useNavigationTransition(options?: {
  onGoBack?: () => void;
  onPublish?: () => void;
}) {
  const [opacity, setOpacity] = React.useState(0);
  const [transparent, setTransparent] = React.useState(true);
  const handleScroll = React.useCallback((offset: number) => {
    let op = offset / 300;
    op = Math.max(0, op);
    op = Math.min(1, op);
    setOpacity(op);
    setTransparent(op <= 0.75);
  }, []);
  useNavigationOptions(
    {
      headerBackgroundContainerStyle: {
        backgroundColor: `rgba(237, 237, 237, ${opacity})`,
      },
      headerTransparent: true,
    },
    [opacity],
  );
  useNavigationOptions(
    {
      title: transparent ? '' : '朋友圈',
      headerLeft: () => (
        <TouchableOpacity onPress={options?.onGoBack}>
          <Image
            source={transparent ? arrow_backward_white : arrow_backward}
            style={{
              width: 10,
              height: 18,
              marginLeft: spacing[3],
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={options?.onPublish}>
          <Image
            source={transparent ? icon_moment_camera_white : icon_moment_camera}
            style={{
              width: 18,
              height: 15,
              marginRight: spacing[3],
            }}
          />
        </TouchableOpacity>
      ),
    },
    [transparent],
  );
  return handleScroll;
}
