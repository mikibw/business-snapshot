/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

import EntryStackNavigator from './entry';
import WechatStackNavigator from './wechat';

export type RootStackParamList = {
  Entry: undefined;
  Wechat: {
    destination?:
      | 'SingleChat'
      | 'GroupChat'
      | 'Transfer'
      | 'Redpocket'
      | 'ChatBackground'
      | 'GroupSend'
      | 'Bill'
      | 'NewFriends'
      | 'Lqt'
      | 'Moments'
      | 'Withdraw'
      | 'Credential'
      | 'BillDetails'
      | 'PaySuccess';
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Entry" component={EntryStackNavigator} />
      <RootStack.Screen name="Wechat" component={WechatStackNavigator} />
    </RootStack.Navigator>
  );
}

export type RootStackProps<RouteName extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  RouteName
>;

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
