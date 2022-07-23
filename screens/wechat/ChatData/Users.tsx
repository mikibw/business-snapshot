export interface User {
  userId: string;
  name: string;
  wechatId?: string;
  userType: UserType;
}
export enum UserType {
  SUBSCRIPTION,
  OFFICIAL_ACCOUNT,
  PERSON,
  NOTIFICATION,
}
export const users: User[] = [
  {
    userId: '1',
    name: '我',
    wechatId: 'myself',
    userType: UserType.PERSON,
  },
  {
    userId: '2',
    name: '三土',
    wechatId: 'santu',
    userType: UserType.PERSON,
  },
  {
    userId: '3',
    name: '阿狸姐',
    wechatId: 'nanchangceo',
    userType: UserType.PERSON,
  },
  {
    userId: '4',
    name: '同济大学附属口腔医院医疗平台',
    userType: UserType.OFFICIAL_ACCOUNT,
  },
  {
    userId: '5',
    name: '文件传输助手',
    userType: UserType.NOTIFICATION,
  },
  {
    userId: '6',
    name: '微信支付',
    userType: UserType.NOTIFICATION,
  },
  {
    userId: '7',
    name: '订阅号消息',
    userType: UserType.SUBSCRIPTION,
  },
];
