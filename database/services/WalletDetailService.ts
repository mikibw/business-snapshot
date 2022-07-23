import {WalletDetailEntity} from '@database/entities/WalletDetailEntity';
import {WalletDetailRepository} from '@database/repositories/WalletDetailRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';

type DetailName =
  | 'lq_balance'
  | 'lqt_rate'
  | 'lqt_balance'
  | 'lqt_desc'
  | 'realname_auth'
  | 'face_pay'
  | 'transfer_phone'
  | 'transfer_reach_date'
  | 'redpacket_refund_way'
  | 'profile_cover';

class WalletDetailService {
  private getWalletDetailRepository() {
    return getCustomRepository(WalletDetailRepository);
  }

  public async findDetailByName(name: DetailName) {
    const detail = await this.getWalletDetailRepository().findOne({name: name});
    return detail?.value || '';
  }

  public async updateDetailByName(name: DetailName, value: string) {
    await this.getWalletDetailRepository().update({name}, {value});
  }

  public async initialize() {
    const count = await this.getWalletDetailRepository().count();
    if (count > 0) return;

    const lqBalance = new WalletDetailEntity();
    lqBalance.name = 'lq_balance';
    lqBalance.value = '6.38';

    const lqtRate = new WalletDetailEntity();
    lqtRate.name = 'lqt_rate';
    lqtRate.value = '2.38';

    const lqtBalance = new WalletDetailEntity();
    lqtBalance.name = 'lqt_balance';
    lqtBalance.value = '2.38';

    const lqtDesc = new WalletDetailEntity();
    lqtDesc.name = 'lqt_desc';
    lqtDesc.value = '转入零钱通 给自己加加薪';

    const realnameAuth = new WalletDetailEntity();
    realnameAuth.name = 'realname_auth';
    realnameAuth.value = '已认证';

    const face_pay = new WalletDetailEntity();
    face_pay.name = 'face_pay';
    face_pay.value = 'true';

    const transferPhone = new WalletDetailEntity();
    transferPhone.name = 'transfer_phone';
    transferPhone.value = '187****7188';

    const transferReachDate = new WalletDetailEntity();
    transferReachDate.name = 'transfer_reach_date';
    transferReachDate.value = '实时到账';

    const redpacketRefundWay = new WalletDetailEntity();
    redpacketRefundWay.name = 'redpacket_refund_way';
    redpacketRefundWay.value = '退回原支付方式';

    const profileCover = new WalletDetailEntity();
    profileCover.name = 'profile_cover';
    profileCover.value = '';

    await this.getWalletDetailRepository().save([
      lqBalance,
      lqtRate,
      lqtBalance,
      lqtDesc,
      realnameAuth,
      face_pay,
      transferPhone,
      transferReachDate,
      redpacketRefundWay,
      profileCover,
    ]);
  }
}

const {getGlobalState} = createGlobalState({
  walletDetailService: new WalletDetailService(),
});

export function getWalletDetailService() {
  return getGlobalState('walletDetailService');
}
