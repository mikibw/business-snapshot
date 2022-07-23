import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ImageBackground,
  Image,
} from 'react-native';
import {colors, radius, spacing, typographics} from '@design-system';
import withAlpha from '@utils/withAlpha';
import VipStateButton from './VipStateButton';
import useGlobalState from '@hooks/useGlobalState';
import SubscribeModal from './SubscribeModal';
import {EntryStackProps} from '@navigation/entry';
import {bg_header} from '@assets/images/entry/common';
import {arrow_forward} from '@assets/images/nav';

export default function Profile({navigation}: EntryStackProps<'Profile'>) {
  const [isSubscribed, updateSubscribeState] = useGlobalState('isSubscribed');
  const [isModalVisible, setModalVisible] = React.useState(false);

  const gotoPrivacy = () => {
    const url = 'http://longsheng.rzrzrz.top/policy-privacy.html';
    Linking.canOpenURL(url) && Linking.openURL(url);
  };

  const gotoServiceTerms = () => {
    const url = 'http://longsheng.rzrzrz.top/policy-service.html';
    Linking.canOpenURL(url) && Linking.openURL(url);
  };

  const gotoSuggestionFeedback = () => {
    const url = 'http://longsheng.rzrzrz.top/feedback/index/index.html';
    Linking.canOpenURL(url) && Linking.openURL(url);
  };

  const subscribe = () => {
    navigation.navigate('Payment');
    // updateSubscribeState(!isSubscribed);
  };

  const restore = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg_header} style={styles.viper} resizeMode="cover">
        <VipStateButton isViper={isSubscribed} onPress={() => setModalVisible(true)} />
      </ImageBackground>
      <View style={styles.cells}>
        <TouchableOpacity style={styles.cell} onPress={gotoPrivacy}>
          <Text style={styles.cellText}>隐私政策</Text>
          <Image source={arrow_forward} style={styles.cellIndicator} />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.cell} onPress={gotoServiceTerms}>
          <Text style={styles.cellText}>试用协议</Text>
          <Image source={arrow_forward} style={styles.cellIndicator} />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.cell} onPress={gotoSuggestionFeedback}>
          <Text style={styles.cellText}>意见反馈</Text>
          <Image source={arrow_forward} style={styles.cellIndicator} />
        </TouchableOpacity>
      </View>
      <SubscribeModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAction={type => {
          setModalVisible(false);
          switch (type) {
            case 'terms':
              gotoServiceTerms();
              break;
            case 'privacy':
              gotoPrivacy();
              break;
            case 'subscribe':
              subscribe();
              break;
            case 'restore':
              restore();
              break;
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: withAlpha(colors.background.grey1, 0.9),
  },
  viper: {
    height: 144,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing[2],
    overflow: 'hidden',
    borderRadius: radius[2],
  },
  cells: {
    marginTop: spacing[2],
    marginHorizontal: spacing[2],
    backgroundColor: colors.background.white,
  },
  cell: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cellText: {
    ...typographics.title,
    color: colors.text.dark3,
    marginLeft: spacing[5],
  },
  cellIndicator: {
    width: 8,
    height: 12,
    marginRight: spacing[3],
  },
  separator: {
    height: 0.5,
    marginLeft: spacing[2],
    backgroundColor: withAlpha(colors.background.black, 0.1),
  },
});
