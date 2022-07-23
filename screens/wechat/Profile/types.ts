import {BillEntity} from '@database/entities/BillEntity';
import {ReactNode} from 'react';

export type UserProfile = {
  avatar: string;
  name: string;
  wxId: string;
};

export type WithdrawInfo = {
  applyDate: Date;
  reachDate: Date;
  bankName: string;
  bankNumber: string;
  orderNumber: string;
};

export type ProfileListItem = {
  icon: any;
  name: string;
};

export type ProfileListSectionData = {
  key: string;
  data: ProfileListItem[];
};

export type PersonalInfoListItem = {
  name: string;
  node?: ReactNode;
};

export type PersonalInfoListSectionData = {
  key: string;
  data: PersonalInfoListItem[];
};

export type WalletListItem = {
  icon: any;
  name: string;
  accessory?: ReactNode;
  node?: ReactNode;
};

export type WalletListSectionData = {
  key: string;
  data: WalletListItem[];
};

export type BillMonthStat = {
  month: string;
  in: string;
  out: string;
};

export type BillListSectionData = {
  stat: BillMonthStat;
  data: BillEntity[];
};
