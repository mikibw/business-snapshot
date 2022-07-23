import React, {ReactNode} from 'react';
import {View, StyleProp, ViewStyle, SafeAreaView} from 'react-native';

interface IMarkableViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  ignoreSafeArea?: boolean;
}

export default function ContainerView({style, children, ignoreSafeArea}: IMarkableViewProps) {
  return ignoreSafeArea ? (
    <View style={style}>{children}</View>
  ) : (
    <SafeAreaView style={style}>{children}</SafeAreaView>
  );
}
