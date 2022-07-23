import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {WechatStackProps} from '@navigation/wechat';
import ContainerView from '@components/ContainerView';
import {colors, spacing, wechatColors} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {SystemType} from '@database/entities/MessageEntity';
import {TextInput} from 'react-native-gesture-handler';

interface SystemMsgListItem {
  name: string;
  value: string;
  type: SystemType;
}

const data: SystemMsgListItem[] = [
  {
    name: '你拍了拍“精灵”',
    value: '你拍了拍“精灵”',
    type: SystemType.Pat,
  },
  {
    name: '“精灵”撤回了一条信息',
    value: '“精灵”撤回了一条信息',
    type: SystemType.Recall,
  },
  {
    name: '插入收红包消息',
    value: '你领取了“宝宝”发的红包',
    type: SystemType.ReceiveRedpocket,
  },
  {
    name: '插入“以上是打招呼的内容”',
    value: '以上是打招呼的内容',
    type: SystemType.Greet,
  },
  {
    name: '插入“你已经添加了...”',
    value: '你已经添加了宝宝，现在可以开始聊天了。',
    type: SystemType.Friend,
  },
  {
    name: '插入“如果陌生人主动添加你...”',
    value: '如果陌生人主动添加你，请谨慎核实对方身份。',
    type: SystemType.StrangerNotice,
  },
  {
    name: '插入“与对方发生资金往来可能存在风险...”',
    value:
      '与对方发生资金往来可能存在风险。请注意核实身份，涉及汇款、转账等务必电话确认，谨防诈骗。\n查看异常，我要投诉',
    type: SystemType.SwindleNotice,
  },
  {
    name: '插入进群消息',
    value: '宝宝进入了群聊',
    type: SystemType.EnterGroup,
  },
  {
    name: '插入邀请入群消息',
    value: '宝宝邀请你加入群聊',
    type: SystemType.InviteIntoGroup,
  },
  {
    name: '经常给他转账？置顶聊天',
    value: '经常给他转账？置顶聊天',
    type: SystemType.PinTopAsTransfer,
  },
  {
    name: '转账成功，马上通知TA',
    value: '转账成功，马上通知TA',
    type: SystemType.TransferSuccessNotify,
  },
  {
    name: '给对方发个转账回执，让对方放心',
    value: '给对方发个转账回执，让对方放心',
    type: SystemType.TransferReceipt,
  },
];

export default function InsertSystemMsg({route, navigation}: WechatStackProps<'InsertSystemMsg'>) {
  const {completion} = route.params;

  const [value, setValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<SystemMsgListItem | null>(null);

  useNavigationOptions(
    {
      headerRight: () => (
        <Text style={styles.send} onPress={send}>
          发送
        </Text>
      ),
    },
    [value, selectedItem],
  );

  function send() {
    if (!value) return;
    navigation.goBack();
    completion?.(selectedItem?.type || SystemType.Plain, value);
  }

  return (
    <ContainerView style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          multiline
          selectionColor="#07C160"
          style={styles.input}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <Text
              style={styles.cell}
              onPress={() => {
                setValue(item.value);
                setSelectedItem(item);
              }}>
              {item.name}
            </Text>
          );
        }}
        keyboardDismissMode="on-drag"
        keyExtractor={(_, index) => index.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  send: {
    fontSize: 16,
    color: colors.text.green1,
    marginRight: spacing[4],
  },
  inputWrapper: {
    height: 128,
    padding: spacing[4],
    marginBottom: spacing[1],
    backgroundColor: wechatColors.white,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: wechatColors.black,
  },
  cell: {
    height: 38,
    backgroundColor: '#4C4C4C',
    fontSize: 15,
    lineHeight: 38,
    textAlign: 'center',
    color: wechatColors.white,
    marginHorizontal: spacing[3],
    marginVertical: spacing[2],
  },
});
