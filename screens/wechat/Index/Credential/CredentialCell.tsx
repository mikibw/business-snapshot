import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';
import {CredentialEntity, CredentialType} from '@database/entities/CredentialEntity';
import moment from 'moment';
import TextCell from '@screens/wechat/Common/TextCell';
import dateLine from '@utils/dateLine';

function DetailDescription(props: {name: string; value: string; isHightlight?: boolean}) {
  return (
    <View style={detailDescriptionStyles.container}>
      <Text style={detailDescriptionStyles.name}>{props.name}</Text>
      <Text
        style={[
          detailDescriptionStyles.value,
          props.isHightlight && detailDescriptionStyles.valueHightlight,
        ]}>
        {props.value}
      </Text>
    </View>
  );
}

const detailDescriptionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  name: {
    width: 72,
    marginRight: spacing[5],
    fontSize: 15,
    color: wechatColors.alpha50,
  },
  value: {
    fontSize: 15,
    color: wechatColors.alpha90,
  },
  valueHightlight: {
    color: '#FFC15D',
  },
});

interface ICredentialCellProps {
  credential: CredentialEntity;
  onLongPress?: () => void;
}

export default function CredentialCell({credential, onLongPress}: ICredentialCellProps) {
  let avatar: any = null;
  let title = '';
  let amountTitle = '';
  let details: {name: string; value: string; isHightlight?: boolean}[] = [];
  let actions: {name: string; value?: string}[] = [];

  switch (credential.type) {
    case CredentialType.Payment:
      title = '微信支付凭证';
      amountTitle = '付款金额';
      details = [
        {
          name: '收款方',
          value: credential.user.name,
        },
        {
          name: '支付方式',
          value: credential.payWay,
        },
        {
          name: '交易状态',
          value: '支付成功，对方已收款',
        },
      ];
      actions = [
        {
          name: '查看账单详情',
        },
        {
          name: '商家名片',
          value: '答谢商家',
        },
      ];
      break;
    case CredentialType.InnerAppPayment:
      avatar = credential.user.avatar;
      title = credential.user.name;
      amountTitle = '付款金额';
      details = [
        {
          name: '支付方式',
          value: credential.payWay,
        },
      ];
      actions = [
        {
          name: '查看账单详情',
        },
      ];
      break;
    case CredentialType.Refund:
      title = '退款到账通知';
      amountTitle = '退款金额';
      details = [
        {
          name: '商品详情',
          value: credential.productDetail,
        },
        {
          name: '商户名称',
          value: credential.user.name,
        },
        {
          name: '退款方式',
          value: `退回${credential.payWay}`,
          isHightlight: true,
        },
        {
          name: '退款原因',
          value: credential.refundReason,
        },
        {
          name: '到账时间',
          value: moment(credential.refundDate).format('yyyy-MM-DD HH:mm:ss'),
        },
      ];
      actions = [
        {
          name: '查看退款详情',
        },
      ];
      break;
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onLongPress={onLongPress}>
      {credential.displayDate && (
        <Text style={styles.date}>{dateLine(credential.displayDate)}</Text>
      )}
      <View style={styles.content}>
        <View style={styles.titleArea}>
          {avatar && <Image source={{uri: avatar}} style={styles.avatar} />}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.amountArea}>
          <Text style={styles.amountTitle}>{amountTitle}</Text>
          <Text style={styles.amount}>￥{credential.payAmount}</Text>
        </View>
        <View style={styles.detailArea}>
          {details.map((detail, index) => (
            <DetailDescription key={index.toString()} {...detail} />
          ))}
        </View>
        <View style={styles.separator} />
        <View style={styles.actionArea}>
          {actions.map((action, index) => (
            <TextCell key={index.toString()} height={44} {...action} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[2],
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ADADAD',
    marginBottom: spacing[3],
  },
  content: {
    marginHorizontal: spacing[3],
    borderRadius: radius[2],
    backgroundColor: wechatColors.white,
  },
  titleArea: {
    marginTop: spacing[6],
    marginLeft: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: spacing[2],
  },
  title: {
    ...wechatTypographics.title(false),
  },
  amountArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[9],
    marginBottom: spacing[8],
  },
  amountTitle: {
    ...wechatTypographics.groupTitle(false),
    fontSize: 15,
  },
  amount: {
    marginTop: spacing[3],
    ...wechatTypographics.headLine(true),
    fontSize: 38,
  },
  detailArea: {
    marginHorizontal: spacing[4],
  },
  separator: {
    height: 12,
    marginHorizontal: spacing[3],
    borderBottomWidth: 0.5,
    borderBottomColor: wechatColors.separator,
  },
  actionArea: {
    marginBottom: spacing[2],
  },
});
