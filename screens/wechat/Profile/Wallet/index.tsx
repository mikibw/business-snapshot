import React from 'react';
import {Text, StyleSheet, SectionList, View} from 'react-native';
import ContainerView from '@components/ContainerView';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {WalletListSectionData} from '../types';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import Separator from '@screens/wechat/Common/Separator';
import {observeWalletDetailDidChange} from '@events';
import Note from '@screens/wechat/Common/Note';
import * as icons from '@assets/images/wechat/profile';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import LqtInput from './LqtInput';
import {WechatStackProps} from '@navigation/wechat';

function MoneyRate(props: {rate: string}) {
  return (
    <View
      style={{
        height: 22,
        marginLeft: spacing[2],
        borderRadius: radius[1],
        backgroundColor: '#FDECDA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing[1],
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: '#FAA244',
        }}>{`收益率${props.rate}%`}</Text>
    </View>
  );
}

export default function Wallet({navigation}: WechatStackProps<'Wallet'>) {
  useNavigationOptions({
    headerRight: () => (
      <Text style={styles.bill} onPress={() => navigation.navigate('Bill')}>
        账单
      </Text>
    ),
  });

  const [lqtInputVisible, setLqtInputVisible] = React.useState(false);

  const [sections, setSections] = React.useState<WalletListSectionData[]>([]);

  const generateDataSource = async () => {
    const data: WalletListSectionData[] = [];

    const lqBalance = await getWalletDetailService().findDetailByName('lq_balance');
    const lqtBalance = await getWalletDetailService().findDetailByName('lqt_balance');
    const lqtRate = await getWalletDetailService().findDetailByName('lqt_rate');

    data.push({
      key: '0',
      data: [
        {
          icon: icons.wallet_lq,
          name: '零钱',
          node: <Text style={{...wechatTypographics.emTitle(true)}}>￥{lqBalance}</Text>,
        },
        {
          icon: icons.wallet_lqt,
          name: '零钱通',
          accessory: <MoneyRate rate={lqtRate} />,
          node:
            parseFloat(lqtBalance) > 0 ? (
              <Text style={{...wechatTypographics.emTitle(true)}}>￥{lqtBalance}</Text>
            ) : undefined,
        },
        {
          icon: icons.wallet_yhk,
          name: '银行卡',
        },
      ],
    });
    data.push({
      key: '1',
      data: [
        {
          icon: icons.wallet_zff,
          name: '支付分',
        },
        {
          icon: icons.wallet_qsk,
          name: '亲属卡',
        },
        {
          icon: icons.wallet_yhcx,
          name: '银行储蓄',
        },
      ],
    });
    data.push({
      key: '2',
      data: [
        {
          icon: icons.wallet_aqbz,
          name: '安全保障',
        },
      ],
    });
    setSections(data);
  };

  const onItemPress = (sectionKey: string, index: number) => {
    if (sectionKey === '0' && index === 0) {
      navigation.navigate('MyMoney');
    } else if (sectionKey === '0' && index === 1) {
      setLqtInputVisible(true);
    }
  };

  React.useEffect(() => {
    generateDataSource();
    const observer = observeWalletDetailDidChange(generateDataSource);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={sections}
        ItemSeparatorComponent={() => <Separator left={spacing[14]} />}
        renderSectionFooter={() => <View style={{height: 8}} />}
        renderItem={({item, section, index}) => {
          return (
            <IndicatorCell {...item} height={55} onPress={() => onItemPress(section.key, index)} />
          );
        }}
        keyExtractor={item => item.name}
      />
      <Note name="帮助中心" desc="本服务由财付通提供" />
      <LqtInput visible={lqtInputVisible} onClose={() => setLqtInputVisible(false)} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.greyBG,
  },
  bill: {
    marginRight: spacing[3],
    ...wechatTypographics.title(false),
  },
});
