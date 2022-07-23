import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import {UserEntity} from '@database/entities/UserEntity';
import {WechatStackProps} from '@navigation/wechat';
import {CredentialEntity, CredentialType} from '@database/entities/CredentialEntity';
import TextCell from '@screens/wechat/Common/TextCell';
import Separator from '@screens/wechat/Common/Separator';
import moment from 'moment';
import TimePicker from '@screens/wechat/Common/TimePicker';
import {getCredentialService} from '@database/services/CredentialService';
import {notifyChatsDidChange, notifyCredentialsDidChange} from '@events';
import Button from '@screens/wechat/Common/Button';
import {usePrompt} from '@components/Prompt';
import {getUserService} from '@database/services/UserService';
import {getChatService} from '@database/services/ChatService';

type InputCreadentialItem = {
  id: string;
  name: string;
  value: any;
};

export default function AddCredential({route, navigation}: WechatStackProps<'AddCredential'>) {
  const {credentialType, credential} = route.params;

  const {showPrompt} = usePrompt();
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);

  const [userEntity, setUserEntity] = React.useState<UserEntity | null>(null);
  const [payWay, setPayWay] = React.useState<string | null>(null);
  const [payAmount, setPayAmount] = React.useState<string | null>(null);
  const [productDetail, setProductDetail] = React.useState<string | null>(null);
  const [refundReason, setRefundReason] = React.useState<string | null>(null);
  const [refundDate, setRefundDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (!credential) return;
    setUserEntity(credential.user);
    setPayWay(credential.payWay);
    setPayAmount(credential.payAmount);
    if (credentialType === CredentialType.Refund) {
      setProductDetail(credential.productDetail);
      setRefundReason(credential.refundReason);
      setRefundDate(credential.refundDate);
    }
  }, []);

  const items: InputCreadentialItem[] = [];
  items.push({
    id: 'user',
    name: '收款方',
    value: userEntity?.name || '请选择收款方',
  });
  items.push({
    id: 'payWay',
    name: '交易方式',
    value: payWay || '请输入交易方式',
  });
  items.push({
    id: 'payAmount',
    name: '交易金额',
    value: payAmount || '请输入交易金额',
  });
  if (credentialType === CredentialType.Refund) {
    items.push({
      id: 'productDetail',
      name: '商品详情',
      value: productDetail || '请输入商品详情',
    });
    items.push({
      id: 'refundReason',
      name: '退款原因',
      value: refundReason || '请输入退款原因',
    });
    items.push({
      id: 'refundDate',
      name: '到账时间',
      value: (refundDate && moment(refundDate).format('yyyy-MM-DD HH:mm:ss')) || '请选择到账日期',
    });
  }

  const onItemPress = (item: InputCreadentialItem) => {
    if (item.id === 'user') {
      navigation.navigate('SelectContact', {
        onComplete: contact => setUserEntity(contact.user),
      });
      return;
    }
    if (item.id === 'payWay') {
      showPrompt({
        title: '请输入交易方式',
        placeholder: '交易方式，如：零钱',
        completion: text => {
          if (!text) return;
          setPayWay(text);
        },
      });
      return;
    }
    if (item.id === 'payAmount') {
      showPrompt({
        title: '请输入交易金额',
        placeholder: '交易金额',
        completion: text => {
          const amount = parseFloat(text);
          if (isNaN(amount)) return;
          setPayAmount(amount.toFixed(2));
        },
      });
      return;
    }
    if (item.id === 'productDetail') {
      showPrompt({
        title: '请输入商品详情',
        placeholder: '商品详情',
        completion: text => {
          if (!text) return;
          setProductDetail(text);
        },
      });
      return;
    }
    if (item.id === 'refundReason') {
      showPrompt({
        title: '请输入退款原因',
        placeholder: '退款原因',
        completion: text => {
          if (!text) return;
          setRefundReason(text);
        },
      });
      return;
    }
    if (item.id === 'refundDate') {
      setTimePickerVisible(true);
      return;
    }
  };

  const onSavePress = async () => {
    if (!userEntity || !payWay || !payAmount) return;
    const payAmountNumber = parseFloat(payAmount);
    if (isNaN(payAmountNumber)) return;
    const save = credential || new CredentialEntity();
    save.type = credentialType;
    save.user = userEntity;
    save.payWay = payWay;
    save.payAmount = payAmountNumber.toFixed(2);
    if (credentialType === CredentialType.Refund) {
      if (!productDetail || !refundReason || !refundDate) return;
      save.productDetail = productDetail;
      save.refundReason = refundReason;
      save.refundDate = refundDate;
    }
    await getCredentialService().saveCredential(save);
    notifyCredentialsDidChange();

    const other = await getUserService().findCredential();
    const chat = await getChatService().createP2pChat(other!);
    chat.message = '微信支付凭证';
    await getChatService().updateChat(chat);
    notifyChatsDidChange();

    navigation.goBack();
  };

  function renderFooter() {
    return (
      <View style={styles.footer}>
        <Button type="primary" text="确定" onPress={onSavePress} />
      </View>
    );
  }

  return (
    <ContainerView style={styles.container}>
      <FlatList
        data={items}
        ItemSeparatorComponent={() => <Separator left={spacing[4]} />}
        ListFooterComponent={renderFooter}
        renderItem={({item}) => {
          return <TextCell name={item.name} value={item.value} onPress={() => onItemPress(item)} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <TimePicker
        visible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onDateInput={setRefundDate}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.greyBG,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing[11],
  },
});
