import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {radius, spacing, wechatColors} from '@design-system';
import range from '@utils/range';

interface IPasscodeDotsProps {
  passcode: string;
}

export default function PasscodeDots({passcode}: IPasscodeDotsProps) {
  const characters = passcode.split('');

  return (
    <View style={styles.container}>
      {range(0, 5).map(index => {
        return (
          <View key={index.toString()} style={styles.box}>
            {characters[index] && <View style={styles.dot} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[5],
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius[1],
    marginHorizontal: spacing[1],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: wechatColors.navigation,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1B1B1B',
  },
});
