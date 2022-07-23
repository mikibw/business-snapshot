import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {colors, radius, spacing, typographics} from '@design-system';

interface Props {
  bg: any;
  icon: any;
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

function EntryButton(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]}>
      <ImageBackground source={props.bg} style={styles.background}>
        <Image source={props.icon} style={styles.icon} />
        <Text style={styles.buttonText}>{props.text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: radius[1],
  },
  background: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: spacing[3],
  },
  buttonText: {
    ...typographics.button,
    color: colors.text.white,
  },
});

export default EntryButton;
