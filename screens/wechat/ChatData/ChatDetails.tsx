import {ImageProps} from "react-native";

export interface MessageItems {
  chatId: number,
  time: number,
  message?: string,
  image?: ImageProps,
  fromUserId: string,
  messageType: MessageType,
  groupName?: string
  read: boolean,
  amount?: string,
  duration?: string,
  shareUser?: string,
  redPocketLabel?: string,
  fileName?: string,
  size?: string,
}

export enum MessageType {
  TEXT,
  VIDEO,
  PICTURE,
  TRANSFER,
  RED_POCKET,
  VIDEO_CALL,
  VOICE_CALL,
  AUDIO,
  CONTACT_CARD,
  FILE
}

export const messages: MessageItems[] = [
  {
    chatId: 2,
    time: Date.now() - 5,
    message: "我通过了你的朋友验证请求，现在我们可以开始聊天了",
    fromUserId: "2",
    messageType: MessageType.TEXT,
    read: true
  },{
    chatId: 2,
    time: Date.now() - 4,
    message: "send by myself",
    fromUserId: "1",
    messageType: MessageType.TEXT,
    read: true
  }, {
    chatId: 2,
    time: Date.now() - 4,
    fromUserId: "2",
    messageType: MessageType.AUDIO,
    duration: "15''",
    read: false
  }, {
    chatId: 1,
    time: Date.now()+20,
    message: "关于元旦门急诊安排的通知",
    fromUserId: "4",
    messageType: MessageType.TEXT,
    read: true
  }, {
    chatId: 2,
    time: Date.now() - 3,
    fromUserId: "1",
    messageType: MessageType.TRANSFER,
    redPocketLabel: "微信转账",
    read: false,
    amount: "0.10"
  }, {
    chatId: 2,
    time: Date.now() - 2,
    fromUserId: "1",
    messageType: MessageType.VIDEO_CALL,
    duration: "00:07",
    read: true
  }, {
    chatId: 2,
    time: Date.now() - 1,
    fromUserId: "2",
    messageType: MessageType.VOICE_CALL,
    duration: "00:07",
    read: true
  }, {
    chatId: 2,
    time: Date.now(),
    fromUserId: "2",
    messageType: MessageType.RED_POCKET,
    message: "恭喜发财，大吉大利",
    redPocketLabel: "看视频领红包",
    read: false
  }, {
    chatId: 2,
    time: Date.now() + 1,
    fromUserId: "2",
    messageType: MessageType.RED_POCKET,
    message: "恭喜发财，大吉大利",
    read: true,
    redPocketLabel: "看视频领红包"
  }, {
    chatId: 2,
    time: Date.now() + 2,
    fromUserId: "1",
    messageType: MessageType.TRANSFER,
    read: true,
    amount: "¥0.10",
  }, {
    chatId: 2,
    time: Date.now() + 4,
    fromUserId: "2",
    messageType: MessageType.TRANSFER,
    read: true,
    amount: "0.10",
    redPocketLabel: "微信转账",
  }, {
    chatId: 2,
    time: Date.now() + 3,
    fromUserId: "1",
    messageType: MessageType.CONTACT_CARD,
    shareUser: "3",
    read: false,
  },{
    chatId: 2,
    time: Date.now() + 3,
    fromUserId: "2",
    messageType: MessageType.CONTACT_CARD,
    shareUser: "3",
    read: false,
  }, {
    chatId: 2,
    time: Date.now(),
    fromUserId: "1",
    messageType: MessageType.AUDIO,
    duration: "10''",
    read: true
  },{
    chatId: 3,
    fromUserId: "5",
    time: Date.now(),
    messageType: MessageType.PICTURE,
    read: true
  }, {
    chatId: 4,
    fromUserId: "6",
    message: '红包退款到账通知',
    time: Date.now(),
    messageType: MessageType.TEXT,
    read: true
  }, {
    chatId: 5,
    fromUserId: "2",
    message: "可以了",
    groupName: "最美证件照5.10交付",
    time: Date.now(),
    messageType: MessageType.TEXT,
    read: true
  },{
    chatId: 2,
    fromUserId: "1",
    fileName: "xmail.pdf",
    size: "123KB",
    time: Date.now(),
    messageType: MessageType.FILE,
    read: true,
  },
]