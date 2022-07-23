import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {typographics, colors, spacing} from '@design-system';
import withAlpha from '@utils/withAlpha';
import ArrowBack from '@components/ArrowBack';

export const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: withAlpha(colors.background.grey1, 0.9),
  },
  headerTitleStyle: {
    ...typographics.title,
    color: withAlpha(colors.text.dark1, 0.9),
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerBackImage: () => <ArrowBack />,
};
