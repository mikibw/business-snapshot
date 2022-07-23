import * as React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {screenOptions} from './screenOptions';

import Home from '@screens/entry/Home';
import Profile from '@screens/entry/Profile';
import Payment from '@screens/entry/Payment';
import PhotoJoint from '@screens/entry/PhotoJoint';
import PhotoMatrix from '@screens/entry/PhotoMatrix';
import CaseToggle from '@screens/entry/CaseToggle';
import MatrixTemplates from '@screens/entry/MatrixTemplates';

export type EntryStackParamList = {
  Home: undefined;
  Profile: undefined;
  PhotoJoint: undefined;
  PhotoMatrix: undefined;
  CaseToggle: undefined;
  MatrixTemplates: undefined;
  Payment: undefined;
};

const EntryStack = createStackNavigator<EntryStackParamList>();

export default function EntryStackNavigator() {
  return (
    <EntryStack.Navigator screenOptions={screenOptions}>
      <EntryStack.Screen name="Home" component={Home} options={{title: ''}} />
      <EntryStack.Screen name="Profile" component={Profile} options={{title: '我的'}} />
      <EntryStack.Screen name="PhotoJoint" component={PhotoJoint} options={{title: ''}} />
      <EntryStack.Screen name="PhotoMatrix" component={PhotoMatrix} options={{title: '九宫格'}} />
      <EntryStack.Screen name="CaseToggle" component={CaseToggle} options={{title: '大小写转换'}} />
      <EntryStack.Screen
        name="MatrixTemplates"
        component={MatrixTemplates}
        options={{title: '选择模板'}}
      />
      <EntryStack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </EntryStack.Navigator>
  );
}

export type EntryStackProps<RouteName extends keyof EntryStackParamList> = StackScreenProps<
  EntryStackParamList,
  RouteName
>;
