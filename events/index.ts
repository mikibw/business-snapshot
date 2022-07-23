import {DeviceEventEmitter} from 'react-native';

const ChatUnreadCountDidChangeEvent = 'ChatUnreadCountDidChangeEvent';

export function observeChatUnreadCountDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(ChatUnreadCountDidChangeEvent, observer);
}

export function notifyChatUnreadCountDidChange() {
  DeviceEventEmitter.emit(ChatUnreadCountDidChangeEvent);
}

const ContactsDidChangeEvent = 'ContactsDidChangeEvent';

export function observeContactsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(ContactsDidChangeEvent, observer);
}

export function notifyContactsDidChange() {
  DeviceEventEmitter.emit(ContactsDidChangeEvent);
}

const NewFriendsDidChangeEvent = 'NewFriendsDidChangeEvent';

export function observeNewFriendsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(NewFriendsDidChangeEvent, observer);
}

export function notifyNewFriendsDidChange() {
  DeviceEventEmitter.emit(NewFriendsDidChangeEvent);
}

const UserProfileDidChangeEvent = 'UserProfileDidChangeEvent';

export function observeUserProfileDidChange(observer: (id: number) => void) {
  return DeviceEventEmitter.addListener(UserProfileDidChangeEvent, observer);
}

export function notifyUserProfileDidChange(id: number) {
  DeviceEventEmitter.emit(UserProfileDidChangeEvent, id);
}

const SelfProfileDidChangeEvent = 'SelfProfileDidChangeEvent';

export function observeSelfProfileDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(SelfProfileDidChangeEvent, observer);
}

export function notifySelfProfileDidChange() {
  DeviceEventEmitter.emit(SelfProfileDidChangeEvent);
}

const CredentialsDidChangeEvent = 'CredentialsDidChangeEvent';

export function observeCredentialsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(CredentialsDidChangeEvent, observer);
}

export function notifyCredentialsDidChange() {
  DeviceEventEmitter.emit(CredentialsDidChangeEvent);
}

const WalletDetailDidChangeEvent = 'WalletDetailDidChangeEvent';

export function observeWalletDetailDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(WalletDetailDidChangeEvent, observer);
}

export function notifyWalletDetailDidChange() {
  DeviceEventEmitter.emit(WalletDetailDidChangeEvent);
}

const BillsDidChangeEvent = 'BillsDidChangeEvent';

export function observeBillsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(BillsDidChangeEvent, observer);
}

export function notifyBillsDidChange() {
  DeviceEventEmitter.emit(BillsDidChangeEvent);
}

const MomentsDidChangeEvent = 'MomentsDidChangeEvent';

export function observeMomentsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(MomentsDidChangeEvent, observer);
}

export function notifyMomentsDidChange() {
  DeviceEventEmitter.emit(MomentsDidChangeEvent);
}

const MomentNotisDidChangeEvent = 'MomentNotisDidChangeEvent';

export function observeMomentNotisDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(MomentNotisDidChangeEvent, observer);
}

export function notifyMomentNotisDidChange() {
  DeviceEventEmitter.emit(MomentNotisDidChangeEvent);
}

const ChatsDidChangeEvent = 'ChatsDidChangeEvent';

export function observeChatsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(ChatsDidChangeEvent, observer);
}

export function notifyChatsDidChange() {
  DeviceEventEmitter.emit(ChatsDidChangeEvent);
}

const GroupDetailsDidChangeEvent = 'GroupDetailsDidChangeEvent';

export function observeGroupDetailsDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(GroupDetailsDidChangeEvent, observer);
}

export function notifyGroupDetailsDidChange() {
  DeviceEventEmitter.emit(GroupDetailsDidChangeEvent);
}

const MessagesDidChangeEvent = 'MessagesDidChangeEvent';

export function observeMessagesDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(MessagesDidChangeEvent, observer);
}

export function notifyMessagesDidChange() {
  DeviceEventEmitter.emit(ChatsDidChangeEvent);
}

const ChatBackgroundDidChangeEvent = 'ChatBackgroundDidChangeEvent';

export function observeChatBackgroundDidChange(observer: () => void) {
  return DeviceEventEmitter.addListener(ChatBackgroundDidChangeEvent, observer);
}

export function notifyChatBackgroundDidChange() {
  DeviceEventEmitter.emit(ChatBackgroundDidChangeEvent);
}
