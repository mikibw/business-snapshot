import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import useNavigationOptions from '@hooks/useNavigationOptions';
import moment from 'moment';
import {icon_progress} from '@assets/images/wechat/profile';
import Button from '@screens/wechat/Common/Button';

export default function WithdrawResult({route, navigation}: WechatStackProps<'WithdrawResult'>) {
  const {amount, fee, info} = route.params;

  useNavigationOptions({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: wechatColors.white,
    },
    headerLeft: () => null,
  });

  return (
    <ContainerView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.dash}>
          <DashedLine axis="vertical" dashLength={5} dashColor="#07C160" style={{flex: 1}} />
          <DashedLine axis="vertical" dashLength={5} dashColor="#E7E7E7" style={{flex: 1}} />
        </View>
        <View style={styles.row}>
          <View style={[styles.dot, {backgroundColor: '#07C160'}]} />
          <Text style={[styles.greyText, {marginLeft: spacing[8]}]}>发起提现申请</Text>
        </View>
        <View style={[styles.row, {marginTop: 48}]}>
          <Image source={icon_progress} style={styles.progress} />
          <View style={{marginLeft: 22}}>
            <Text style={styles.blackText}>银行处理中</Text>
            <Text style={[styles.greyText, {marginTop: 2}]}>{`预计${moment(info.reachDate).format(
              'MM-DD HH:mm',
            )}前到账`}</Text>
          </View>
        </View>
        <View style={[styles.row, {marginTop: 48}]}>
          <View style={[styles.dot, {backgroundColor: '#E5E5E5'}]} />
          <Text style={[styles.greyText, {marginLeft: spacing[8]}]}>到账成功</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.info}>
        <Text style={styles.infoTitle}>提现金额</Text>
        <Text style={styles.infoValue}>{`￥${amount}`}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>服务费</Text>
        <Text style={styles.infoValue}>￥{fee}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>到账银行</Text>
        <Text style={styles.infoValue}>{`${info.bankName} 尾号${info.bankNumber}`}</Text>
      </View>
      <View style={styles.bottom}>
        <Button type="secondary" text="完成" onPress={() => navigation.navigate('MyMoney')} />
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  top: {
    marginTop: spacing[7],
    marginHorizontal: spacing[10],
  },
  dash: {
    position: 'absolute',
    top: 6,
    left: 15,
    bottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  progress: {
    width: 32,
    height: 32,
  },
  greyText: {
    fontSize: 16,
    color: '#808080',
  },
  blackText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  separator: {
    height: 1,
    marginTop: spacing[5],
    marginBottom: spacing[3],
    marginHorizontal: spacing[8],
    backgroundColor: '#E7E7E7',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing[3],
    marginHorizontal: spacing[8],
  },
  infoTitle: {
    fontSize: 14,
    color: '#808080',
  },
  infoValue: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 66,
  },
});
