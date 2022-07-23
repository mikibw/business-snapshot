import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import ArrowBack from '@components/ArrowBack';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export const screenOptions: StackNavigationOptions & BottomTabNavigationOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: wechatColors.navigation,
  },
  headerTitleStyle: {
    ...wechatTypographics.title,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerBackImage: () => <ArrowBack />,
};
