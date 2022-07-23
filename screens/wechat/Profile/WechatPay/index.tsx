import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {Ionicons} from '@expo/vector-icons';
import Money from './Money';
import Section, {ISectionProps} from './Section';
import {WechatStackProps} from '@navigation/wechat';
import * as icons from '@assets/images/wechat/profile';
import {observeWalletDetailDidChange} from '@events';
import {getWalletDetailService} from '@database/services/WalletDetailService';

export default function WechatPay({navigation}: WechatStackProps<'WechatPay'>) {
  useNavigationOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onRightItemPress}>
        <Ionicons name="ellipsis-horizontal" size={20} style={{marginRight: spacing[4]}} />
      </TouchableOpacity>
    ),
  });

  const onRightItemPress = () => {
    navigation.navigate('PaySettings');
  };

  const [walletBalance, setWalletBalance] = React.useState('');

  const sections: ISectionProps[] = [
    {
      title: '金融理财',
      items: [
        {
          image: icons.wp_xykhk,
          name: '信用卡还款',
        },
        {
          image: icons.wp_wldjq,
          name: '微粒贷借钱',
        },
        {
          image: icons.wp_lct,
          name: '理财通',
        },
        {
          image: icons.wp_bxfw,
          name: '保险服务',
        },
      ],
    },
    {
      title: '生活服务',
      items: [
        {
          image: icons.wp_sjcz,
          name: '手机充值',
        },
        {
          image: icons.wp_shjf,
          name: '生活缴费',
        },
        {
          image: icons.wp_qbcz,
          name: 'Q币充值',
        },
        {
          image: icons.wp_csfw,
          name: '城市服务',
        },
        {
          image: icons.wp_txgy,
          name: '腾讯公益',
        },
        {
          image: icons.wp_yljk,
          name: '医疗健康',
        },
        {
          image: icons.wp_fyjkm,
          name: '防疫健康码',
          mark: '限时推广',
        },
      ],
    },
    {
      title: '交通出行',
      items: [
        {
          image: icons.wp_cxfw,
          name: '出行服务',
        },
        {
          image: icons.wp_hcpjp,
          name: '火车票机票',
        },
        {
          image: icons.wp_ddcx,
          name: '滴滴出行',
        },
        {
          image: icons.wp_jd,
          name: '酒店',
        },
      ],
    },
    {
      title: '购物消费',
      items: [
        {
          image: icons.wp_jdgw,
          name: '京东购物',
        },
        {
          image: icons.wp_mtwm,
          name: '美团外卖',
        },
        {
          image: icons.wp_dyycss,
          name: '电影演出\n赛事',
        },
        {
          image: icons.wp_mttg,
          name: '美团团购',
        },
        {
          image: icons.wp_pdd,
          name: '拼多多',
        },
        {
          image: icons.wp_mgjnz,
          name: '蘑菇街女装',
        },
        {
          image: icons.wp_wphtm,
          name: '唯品会特卖',
        },
        {
          image: icons.wp_zzes,
          name: '转转二手',
        },
        {
          image: icons.wp_bkzf,
          name: '贝壳找房',
        },
      ],
    },
  ];

  React.useEffect(() => {
    async function fetchWalletBalance() {
      setWalletBalance(await getWalletDetailService().findDetailByName('lq_balance'));
    }
    fetchWalletBalance();
    const observer = observeWalletDetailDidChange(fetchWalletBalance);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Money balance={walletBalance} onWalletPress={() => navigation.navigate('Wallet')} />
        {sections.map(section => (
          <Section key={section.title} title={section.title} items={section.items} />
        ))}
      </ScrollView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
});
