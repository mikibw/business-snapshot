import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import {radius} from '@design-system';

interface ILinearGradientBackgounrdProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  gradient: {
    start: string;
    end: string;
  };
}

const LinearGradientBackgounrd = ({children, style, gradient}: ILinearGradientBackgounrdProps) => {
  return (
    <View style={style}>
      <LinearGradient
        locations={[0, 1]}
        colors={[gradient.start, gradient.end]}
        style={styles.gradient}>
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: radius[3],
  },
});

export default React.memo(LinearGradientBackgounrd);
