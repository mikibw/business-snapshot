import {BillType} from '@database/entities/BillEntity';

export const billTypeKeys = [
  BillType.Redpacket,
  BillType.Transfer,
  BillType.MoneyCode,
  BillType.PhoneTopUp,
  BillType.Custom,
  BillType.Withdraw,
];
export const billTypeValues = ['红包', '转账', '收钱码', '手机充值', '自定义', '提现'];

export const billTypeMaps = {
  [BillType.Redpacket]: billTypeValues[0],
  [BillType.Transfer]: billTypeValues[1],
  [BillType.MoneyCode]: billTypeValues[2],
  [BillType.PhoneTopUp]: billTypeValues[3],
  [BillType.Custom]: billTypeValues[4],
  [BillType.Withdraw]: billTypeValues[5],
};
