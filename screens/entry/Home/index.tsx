import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, radius, spacing} from '@design-system';
import {EntryStackProps} from '@navigation/entry';
import {RootStackProps} from '@navigation/root';
import EntryButton from './EntryButton';
import useNavigationOptions from '@hooks/useNavigationOptions';
import PageEntryView from './PageEntryView';
import RNExitApp from 'react-native-exit-app';
import UpgradeVipButton from './UpgradeVipButton';
import useGlobalState from '@hooks/useGlobalState';
import {AppProductState, isAppProduction} from '@services/fetchAppControl';
import withAlpha from '@utils/withAlpha';
import * as images from '@assets/images/entry/home';
import {icon_profile} from '@assets/images/icons';

function Home({navigation}: RootStackProps<'Entry'> & EntryStackProps<'Home'>) {
  useNavigationOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={icon_profile} style={styles.profile} />
      </TouchableOpacity>
    ),
  });

  const [appControl, updateAppControl] = useGlobalState('appControl');
  const isProd = isAppProduction(appControl);

  const [isSubscribed, updateSubscribed] = useGlobalState('isSubscribed');

  React.useEffect(() => {
    if (!isProd) return;
    Alert.alert(
      '免责声明',
      '本软件仅供娱乐，请合法使用。非法使用造成的一切后果由使用者自行承担。同意后才能继续使用本软件。',
      [{text: '退出', onPress: () => RNExitApp.exitApp()}, {text: '同意'}],
    );
  }, [isProd]);

  const entrys = [
    {
      icon: images.xw_xwzy,
      name: '小微主页',
      onPress: () => navigation.navigate('Wechat', {}),
    },
    {
      icon: images.xw_dl,
      name: '单聊',
      onPress: () => navigation.navigate('Wechat', {destination: 'SingleChat'}),
    },
    {
      icon: images.xw_qhdh,
      name: '切换对话',
      onPress: () => navigation.navigate('Wechat', {destination: 'SingleChat'}),
    },
    {
      icon: images.xw_ql,
      name: '群聊',
      onPress: () => navigation.navigate('Wechat', {destination: 'GroupChat'}),
    },
    {
      icon: images.xw_zz,
      name: '转账',
      onPress: () => navigation.navigate('Wechat', {destination: 'Transfer'}),
    },
    {
      icon: images.xw_hb,
      name: '红包',
      onPress: () => navigation.navigate('Wechat', {destination: 'Redpocket'}),
    },
    {
      icon: images.xw_ltbj,
      name: '聊天背景',
      onPress: () => navigation.navigate('Wechat', {destination: 'ChatBackground'}),
    },
    // {
    //   icon: images.xw_qfzs,
    //   name: '群发助手',
    //   onPress: () => navigation.navigate('Wechat', {destination: 'GroupSend'}),
    // },
    {
      icon: images.xw_zd,
      name: '账单',
      onPress: () => navigation.navigate('Wechat', {destination: 'Bill'}),
    },
    {
      icon: images.xw_xdpy,
      name: '新的朋友',
      onPress: () => navigation.navigate('Wechat', {destination: 'NewFriends'}),
    },
    {
      icon: images.xw_lqt,
      name: '零钱通',
      onPress: () => navigation.navigate('Wechat', {destination: 'Lqt'}),
    },
    {
      icon: images.xw_pyq,
      name: '朋友圈',
      onPress: () => navigation.navigate('Wechat', {destination: 'Moments'}),
    },
    {
      icon: images.xw_tx,
      name: '提现',
      onPress: () => navigation.navigate('Wechat', {destination: 'Withdraw'}),
    },
    {
      icon: images.xw_wxzf,
      name: '微信支付',
      onPress: () => navigation.navigate('Wechat', {destination: 'Credential'}),
    },
    {
      icon: images.xw_zdxq,
      name: '账单详情',
      onPress: () => navigation.navigate('Wechat', {destination: 'BillDetails'}),
    },
    {
      icon: images.xw_zfcg,
      name: '支付成功',
      onPress: () => navigation.navigate('Wechat', {destination: 'PaySuccess'}),
    },
  ];

  const renderWechatEntrys = () => {
    const children = () => (
      <>
        <View style={styles.entrys}>
          <PageEntryView title="小微" entrys={entrys} />
        </View>
        {!isSubscribed && (
          <UpgradeVipButton
            style={styles.vipButton}
            onPress={() => navigation.navigate('Payment')}
          />
        )}
      </>
    );
    if (Platform.OS === 'android') {
      return children();
    }
    if (Platform.OS === 'ios' && isProd) {
      return children();
    }
    return (
      <>
        <Button
          title="显示审核版"
          onPress={() => {
            appControl && updateAppControl({...appControl, is_onlie: AppProductState.Audit});
          }}
        />
        <Button
          title="显示线上版-(支付宝为主)"
          onPress={() => {
            appControl &&
              updateAppControl({...appControl, is_onlie: AppProductState.ProAliPayMainly});
          }}
        />
        <Button
          title="显示线上版-(微信为主)"
          onPress={() => {
            appControl &&
              updateAppControl({...appControl, is_onlie: AppProductState.ProWechatPayMainly});
          }}
        />
        <Button
          title="显示线上版-(只有支付宝)"
          onPress={() => {
            appControl &&
              updateAppControl({...appControl, is_onlie: AppProductState.ProAliPayOnly});
          }}
        />
        <Button
          title="显示线上版-(只有微信)"
          onPress={() => {
            appControl &&
              updateAppControl({...appControl, is_onlie: AppProductState.ProWechatPayOnly});
          }}
        />
        <Button
          title={isSubscribed ? '关闭订阅状态' : '开启订阅状态'}
          onPress={() => updateSubscribed(!isSubscribed)}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentInset={{bottom: spacing[2]}}>
        <View style={styles.topView}>
          <EntryButton
            style={[styles.topEntryButton]}
            bg={images.bg_entry_short}
            icon={images.icon_entry_joint}
            text="长图拼接"
            onPress={() => navigation.navigate('PhotoJoint')}
          />
          <EntryButton
            style={[styles.topEntryButton, {marginLeft: spacing[1]}]}
            bg={images.bg_entry_short}
            icon={images.icon_entry_matrix}
            text="九宫格图"
            onPress={() => navigation.navigate('PhotoMatrix')}
          />
        </View>
        <EntryButton
          style={styles.bottomEntryButton}
          bg={images.bg_entry_long}
          icon={images.icon_entry_case_toggle}
          text="大小写转换"
          onPress={() => navigation.navigate('CaseToggle')}
        />
        {renderWechatEntrys()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 34,
    height: 34,
    marginRight: spacing[1],
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: withAlpha(colors.background.grey1, 0.9),
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: spacing[2],
  },
  topEntryButton: {
    flex: 1,
    height: 75,
  },
  bottomEntryButton: {
    height: 75,
    marginTop: spacing[1],
    marginHorizontal: spacing[2],
  },
  entrys: {
    margin: spacing[2],
    backgroundColor: colors.background.white,
    borderRadius: radius[1],
  },
  vipButton: {
    marginHorizontal: spacing[2],
    height: 55,
  },
});

export default Home;
