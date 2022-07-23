import {
  contact_business_wx,
  contact_group_chat,
  contact_new_friend,
  contact_only_chat_friend,
  contact_public_account,
  contact_tag,
} from '@assets/images/wechat/contact';
import {ContactListItem} from './types';

export const contactTopItems: ContactListItem[] = [
  {
    id: -1,
    avatar: contact_new_friend,
    name: '新的朋友',
  },
  {
    id: -2,
    avatar: contact_only_chat_friend,
    name: '仅聊天的朋友',
  },
  {
    id: -3,
    avatar: contact_group_chat,
    name: '群聊',
  },
  {
    id: -4,
    avatar: contact_tag,
    name: '标签',
  },
  {
    id: -5,
    avatar: contact_public_account,
    name: '公众号',
  },
  {
    id: -6,
    avatar: contact_business_wx,
    name: '企业微信联系人',
  },
];
