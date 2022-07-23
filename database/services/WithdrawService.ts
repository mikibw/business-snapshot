import {WithdrawEntity} from '@database/entities/WithdrawEntity';
import {WithdrawRepository} from '@database/repositories/WithdrawRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';

class WithdrawService {
  private getWithdrawRepository() {
    return getCustomRepository(WithdrawRepository);
  }

  public async findAllWithdraws() {
    return await this.getWithdrawRepository().findAll();
  }

  public async insertWithdraw(withdrawEntity: WithdrawEntity) {
    await this.getWithdrawRepository().save(withdrawEntity);
  }
}

const {getGlobalState} = createGlobalState({
  withdrawService: new WithdrawService(),
});

export function getWithdrawService() {
  return getGlobalState('withdrawService');
}
