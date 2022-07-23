import {BillEntity} from '@database/entities/BillEntity';
import {BillRepository} from '@database/repositories/BillRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';

class BillService {
  private getBillRepository() {
    return getCustomRepository(BillRepository);
  }

  public async findAllBills() {
    return await this.getBillRepository().findAll();
  }

  public async insertBill(bill: BillEntity) {
    await this.getBillRepository().save(bill);
  }
}

const {getGlobalState} = createGlobalState({
  billService: new BillService(),
});

export function getBillService() {
  return getGlobalState('billService');
}
