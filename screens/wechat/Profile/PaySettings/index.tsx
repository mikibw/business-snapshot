import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import ContainerView from '@components/ContainerView';
import Separator from '@screens/wechat/Common/Separator';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import {ScrollView} from 'react-native-gesture-handler';
import SwitchCell from '@screens/wechat/Common/SwitchCell';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import {usePrompt} from '@components/Prompt';

function SettingTextValue({value}: {value: string}) {
  return <Text style={{...wechatTypographics.body(false)}}>{value}</Text>;
}

function SectionPadding() {
  return <View style={{height: 8}} />;
}

export default function PaySettings() {
  const {showPrompt} = usePrompt();

  const [realnameAuth, setRealnameAuth] = React.useState('');
  const [facePay, setFacePay] = React.useState(false);
  const [transferPhone, setTransferPhone] = React.useState('');
  const [transferReachDate, setTransferReachDate] = React.useState('');
  const [redpacketRefundWay, setRedpacketRefundWay] = React.useState('');

  const onRealnameAuthChange = async () => {
    async function changeAuth(auth: string) {
      await getWalletDetailService().updateDetailByName('realname_auth', auth);
    }
    showPrompt({
      title: '实名认证',
      placeholder: '实名认证',
      completion: text => {
        if (!text) return;
        setRealnameAuth(text);
        changeAuth(text);
      },
    });
  };

  const onFacePayChange = async (on: boolean) => {
    setFacePay(on);
    await getWalletDetailService().updateDetailByName('face_pay', on ? 'true' : 'false');
  };

  const onTransferPhoneChange = () => {
    async function changePhone(phone: string) {
      await getWalletDetailService().updateDetailByName('transfer_phone', phone);
    }
    showPrompt({
      title: '修改手机号',
      completion: text => {
        if (!text) return;
        setTransferPhone(text);
        changePhone(text);
      },
    });
  };

  const onTransferReachDateChange = () => {
    async function changeDate(date: string) {
      await getWalletDetailService().updateDetailByName('transfer_reach_date', date);
    }
    showPrompt({
      title: '转账到账时间',
      placeholder: '转账到账时间，如：实时到账',
      completion: text => {
        if (!text) return;
        setTransferReachDate(text);
        changeDate(text);
      },
    });
  };

  const onRedpacketRefundWayChange = () => {
    async function changeWay(way: string) {
      await getWalletDetailService().updateDetailByName('redpacket_refund_way', way);
    }
    showPrompt({
      title: '红包退款方式',
      completion: text => {
        if (!text) return;
        setRedpacketRefundWay(text);
        changeWay(text);
      },
    });
  };

  React.useEffect(() => {
    async function init() {
      const service = getWalletDetailService();
      setRealnameAuth(await service.findDetailByName('realname_auth'));
      setFacePay((await service.findDetailByName('face_pay')) === 'true');
      setTransferPhone(await service.findDetailByName('transfer_phone'));
      setTransferReachDate(await service.findDetailByName('transfer_reach_date'));
      setRedpacketRefundWay(await service.findDetailByName('redpacket_refund_way'));
    }
    init();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <ScrollView>
        <Separator left={0} />
        <IndicatorCell
          height={55}
          name="实名认证"
          node={<SettingTextValue value={realnameAuth} />}
          onPress={onRealnameAuthChange}
        />
        <Separator left={0} />

        <SectionPadding />

        <Separator left={0} />
        <IndicatorCell height={55} name="修改支付密码" />
        <Separator left={spacing[4]} />
        <IndicatorCell height={55} name="忘记支付密码" />
        <Separator left={0} />

        <SectionPadding />

        <Separator left={0} />
        <SwitchCell height={55} name="面容支付" on={facePay} onChange={onFacePayChange} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            开启后，转账或消费时，可使用面容ID验证面容快速完成付款
          </Text>
        </View>

        <SectionPadding />

        <Separator left={0} />
        <SwitchCell height={55} name="允许通过手机号向我转账" on={false} />
        <TouchableOpacity style={styles.footer} onPress={onTransferPhoneChange}>
          <Text style={styles.footerText}>
            {`开启后，他人可进入“收付款>向银行卡或手机号转账”，向你的微信绑定手机号 ${transferPhone} 转账，收款将存入零钱。开启即同意`}
            <Text style={styles.protocol}>服务协议</Text>
          </Text>
        </TouchableOpacity>

        <Separator left={0} />
        <IndicatorCell height={55} name="扣费服务" />
        <Separator left={spacing[4]} />
        <IndicatorCell
          height={55}
          name="转账到账时间"
          node={<SettingTextValue value={transferReachDate} />}
          onPress={onTransferReachDateChange}
        />
        <Separator left={spacing[4]} />
        <IndicatorCell
          height={55}
          name="红包退款方式"
          node={<SettingTextValue value={redpacketRefundWay} />}
          onPress={onRedpacketRefundWayChange}
        />
        <Separator left={0} />

        <SectionPadding />

        <Separator left={0} />
        <IndicatorCell height={55} name="服务管理" />
        <Separator left={0} />

        <SectionPadding />

        <Separator left={0} />
        <IndicatorCell height={55} name="切换钱包地区" />
        <Separator left={0} />

        <SectionPadding />

        <Separator left={0} />
        <IndicatorCell height={55} name="注销微信支付" />
        <Separator left={0} />
      </ScrollView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  footerText: {
    fontSize: 14,
    color: '#777777',
  },
  protocol: {
    fontSize: 14,
    color: '#576B95',
  },
});
