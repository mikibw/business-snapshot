/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import React from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '@navigation/root';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {createStackNavigator, StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {screenOptions} from './screenOptions';
import WaterMark from '@components/WaterMark';
import FloatSubscribeButton from '@components/FloatSubscribeButton';

import {UserProfile, WithdrawInfo} from '@screens/wechat/Profile/types';
import {ContactEntity} from '@database/entities/ContactEntity';
import {CredentialEntity, CredentialType} from '@database/entities/CredentialEntity';
import {MomentEntity} from '@database/entities/MomentEntity';
import {SystemType} from '@database/entities/MessageEntity';

import DashBoard, {DashBoardParamList} from './DashBoard';
import Credential from '@screens/wechat/Index/Credential';
import AddCredential from '@screens/wechat/Index/AddCredential';
import ChatDetails from '@screens/wechat/Index/ChatDetails';
import UserRequests from '@screens/wechat/Contact/UserRequests';
import UserDetail from '@screens/wechat/Contact/UserDetail';
import CreateContact from '@screens/wechat/Index/CreateContact.tsx';
import SelectContact from '@screens/wechat/Contact/SelectContact';
import SelectContactMultiple from '@screens/wechat/Contact/SelectContactMultiple';
import PersonalInfo from '@screens/wechat/Profile/PersonalInfo';
import MyQRCode from '@screens/wechat/Profile/MyQRCode';
import WechatPay from '@screens/wechat/Profile/WechatPay';
import Wallet from '@screens/wechat/Profile/Wallet';
import PaySettings from '@screens/wechat/Profile/PaySettings';
import MyMoney from '@screens/wechat/Profile/MyMoney';
import MoneyDetail from '@screens/wechat/Profile/MoneyDetail';
import Withdraw from '@screens/wechat/Profile/Withdraw';
import AddWithdraw from '@screens/wechat/Profile/AddWithdraw';
import WithdrawResult from '@screens/wechat/Profile/WithdrawResult';
import Bill from '@screens/wechat/Profile/Bill';
import AddBill from '@screens/wechat/Profile/AddBill';
import Moments from '@screens/wechat/Discovery/Moments';
import AddMoment from '@screens/wechat/Discovery/AddMoment';
import MomentDetail from '@screens/wechat/Discovery/MomentDetail';
import MomentNotis from '@screens/wechat/Discovery/MomentNotis';
import MiddleLock from '@screens/wechat/Index/Lock/MiddleLock';
import TopLock from '@screens/wechat/Index/Lock/TopLock';
import VideoCall from '@screens/wechat/Index/VideoCall';
import SendRedpocket from '@screens/wechat/Index/SendRepocket';
import Transfer from '@screens/wechat/Index/Transfer';
import TransferSuccess from '@screens/wechat/Index/TransferSuccess';
import TransferReceiveState from '@screens/wechat/Index/TransferReceiveState';
import PaySuccess from '@screens/wechat/Index/PaySuccess';
import RedpocketDetail from '@screens/wechat/Index/RedpocketDetail';
import ChatEdit from '@screens/wechat/Index/ChatEdit';
import InsertSystemMsg from '@screens/wechat/Index/InsertSystemMsg';
import GroupChatCreateOrUpdate from '@screens/wechat/Index/GroupChatCreateOrUpdate';

export type WechatStackParamList = {
  DashBoard: undefined;
  Credential: undefined;
  AddCredential: {credentialType: CredentialType; credential?: CredentialEntity};
  ChatDetails: {chatId: number};
  UserRequests: undefined;
  UserDetail: {userId: number; isInContacts: boolean};
  CreateContact: {completion?: () => void};
  SelectContact: {
    destination?: 'SingleChat' | 'Transfer' | 'Redpocket' | 'ChatBackground' | 'PaySuccess';
    onComplete?: (contact: ContactEntity) => void;
  };
  SelectContactMultiple: {onComplete?: (contacts: ContactEntity[]) => void};
  PersonalInfo: undefined;
  MyQRCode: {profile: UserProfile};
  WechatPay: undefined;
  Wallet: undefined;
  PaySettings: undefined;
  MyMoney: undefined;
  MoneyDetail: undefined;
  Withdraw: undefined;
  AddWithdraw: {onComplete?: (info: WithdrawInfo) => void};
  WithdrawResult: {amount: string; fee: string; info: WithdrawInfo};
  Bill: undefined;
  AddBill: undefined;
  Moments: undefined;
  AddMoment: undefined;
  MomentDetail: {moment: MomentEntity};
  MomentNotis: undefined;
  MiddleLock: undefined;
  TopLock: undefined;
  VideoCall: {
    avatar: string;
    name: string;
    completion?: (isCancelled: boolean, duration: number) => void;
  };
  SendRedpocket: {isGroup: boolean; completion?: (amount: string, comment: string) => void};
  Transfer: {
    avatar: string;
    name: string;
    completion?: (amount: string, comment: string) => void;
  };
  TransferSuccess: {
    name: string;
    amount: string;
    comment: string;
    completion?: (amount: string, comment: string) => void;
  };
  TransferReceiveState: {
    name: string;
    amount: string;
    sendDate: Date;
    receiveDate?: Date;
    notification?: () => void;
  };
  PaySuccess: {
    avatar: string;
    name: string;
  };
  RedpocketDetail: {
    sendUser: {
      avatar: string;
      name: string;
      comment: string;
    };
    receiveUsers: {
      avatar: string;
      name: string;
      amount: string;
      date: Date;
    }[];
  };
  ChatEdit: {
    id: number;
  };
  InsertSystemMsg: {
    completion?: (systemType: SystemType, systemMsg: string) => void;
  };
  GroupChatCreateOrUpdate: {chatId?: number};
} & DashBoardParamList;

const WechatStack = createStackNavigator<WechatStackParamList>();

export default function WechatStackNavigator() {
  const route = useRoute() as RouteProp<RootStackParamList, 'Wechat'>;
  const navigation = useNavigation() as StackNavigationProp<WechatStackParamList, 'DashBoard'>;

  function destinate() {
    const {destination} = route.params;
    switch (destination) {
      case 'SingleChat':
        navigation.navigate('SelectContact', {destination: 'SingleChat'});
        break;
      case 'GroupChat':
        navigation.navigate('GroupChatCreateOrUpdate', {});
        break;
      case 'Transfer':
        navigation.navigate('SelectContact', {destination: 'Transfer'});
        break;
      case 'Redpocket':
        navigation.navigate('SelectContact', {destination: 'Redpocket'});
        break;
      case 'ChatBackground':
        navigation.navigate('SelectContact', {destination: 'ChatBackground'});
        break;
      case 'Bill':
        navigation.navigate('Profile');
        navigation.navigate('Bill');
        break;
      case 'NewFriends':
        navigation.navigate('Contact');
        navigation.navigate('UserRequests');
        break;
      case 'Lqt':
        navigation.navigate('Profile');
        navigation.navigate('Wallet');
        break;
      case 'Moments':
        navigation.navigate('Discovery');
        navigation.navigate('Moments');
        break;
      case 'Withdraw':
        navigation.navigate('Profile');
        navigation.navigate('Withdraw');
        break;
      case 'Credential':
        navigation.navigate('Credential');
        break;
      case 'BillDetails':
        navigation.navigate('Profile');
        navigation.navigate('AddBill');
        break;
      case 'PaySuccess':
        navigation.navigate('SelectContact', {destination: 'PaySuccess'});
        break;
    }
  }

  React.useEffect(() => {
    setTimeout(() => destinate(), 500);
  }, []);

  return (
    <View style={{flex: 1}}>
      <WechatStack.Navigator screenOptions={screenOptions}>
        <WechatStack.Screen name="DashBoard" component={DashBoard} />
        <WechatStack.Screen
          name="Credential"
          component={Credential}
          options={{title: '微信支付'}}
        />
        <WechatStack.Screen
          name="AddCredential"
          component={AddCredential}
          options={{title: '新增消息'}}
        />
        <WechatStack.Screen name="ChatDetails" component={ChatDetails} />
        <WechatStack.Screen
          name="UserRequests"
          component={UserRequests}
          options={{title: '新的朋友'}}
        />
        <WechatStack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{title: '联系人资料'}}
        />
        <WechatStack.Screen
          name="CreateContact"
          component={CreateContact}
          options={{title: '手动添加好友'}}
        />
        <WechatStack.Screen
          name="SelectContact"
          component={SelectContact}
          options={{title: '选择一个好友'}}
        />
        <WechatStack.Screen
          name="SelectContactMultiple"
          component={SelectContactMultiple}
          options={{title: '选择好友'}}
        />
        <WechatStack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          options={{title: '个人信息'}}
        />
        <WechatStack.Screen name="MyQRCode" component={MyQRCode} options={{title: '我的二维码'}} />
        <WechatStack.Screen name="WechatPay" component={WechatPay} options={{title: '支付'}} />
        <WechatStack.Screen name="Wallet" component={Wallet} options={{title: '钱包'}} />
        <WechatStack.Screen
          name="PaySettings"
          component={PaySettings}
          options={{title: '支付管理'}}
        />
        <WechatStack.Screen name="MyMoney" component={MyMoney} options={{title: ''}} />
        <WechatStack.Screen
          name="MoneyDetail"
          component={MoneyDetail}
          options={{title: '零钱明细'}}
        />
        <WechatStack.Screen name="Withdraw" component={Withdraw} options={{title: '零钱提现'}} />
        <WechatStack.Screen name="AddWithdraw" component={AddWithdraw} options={{title: '提现'}} />
        <WechatStack.Screen
          name="WithdrawResult"
          component={WithdrawResult}
          options={{title: '零钱提现', gestureEnabled: false}}
        />
        <WechatStack.Screen name="Bill" component={Bill} options={{title: '账单'}} />
        <WechatStack.Screen name="AddBill" component={AddBill} options={{title: '新增账单'}} />
        <WechatStack.Screen name="Moments" component={Moments} />
        <WechatStack.Screen
          name="AddMoment"
          component={AddMoment}
          options={{title: '发布朋友圈'}}
        />
        <WechatStack.Screen
          name="MomentDetail"
          component={MomentDetail}
          options={{title: '详情'}}
        />
        <WechatStack.Screen name="MomentNotis" component={MomentNotis} options={{title: '消息'}} />
        <WechatStack.Screen
          name="MiddleLock"
          component={MiddleLock}
          options={{headerShown: false}}
        />
        <WechatStack.Screen name="TopLock" component={TopLock} options={{headerShown: false}} />
        <WechatStack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <WechatStack.Screen
          name="SendRedpocket"
          component={SendRedpocket}
          options={{title: '发红包'}}
        />
        <WechatStack.Screen name="Transfer" component={Transfer} options={{title: ''}} />
        <WechatStack.Screen
          name="TransferSuccess"
          component={TransferSuccess}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <WechatStack.Screen
          name="TransferReceiveState"
          component={TransferReceiveState}
          options={{title: ''}}
        />
        <WechatStack.Screen
          name="PaySuccess"
          component={PaySuccess}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <WechatStack.Screen
          name="RedpocketDetail"
          component={RedpocketDetail}
          options={{headerTransparent: true, title: ''}}
        />
        <WechatStack.Screen
          name="ChatEdit"
          component={ChatEdit}
          options={{title: '编辑聊天信息'}}
        />
        <WechatStack.Screen
          name="InsertSystemMsg"
          component={InsertSystemMsg}
          options={{title: '系统消息'}}
        />
        <WechatStack.Screen name="GroupChatCreateOrUpdate" component={GroupChatCreateOrUpdate} />
      </WechatStack.Navigator>
      <WaterMark />
      <FloatSubscribeButton />
    </View>
  );
}

export type WechatStackProps<RouteName extends keyof WechatStackParamList> = StackScreenProps<
  WechatStackParamList,
  RouteName
>;
