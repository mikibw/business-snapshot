import {UserEntity, UserType} from '@database/entities/UserEntity';
import {UserRepository} from '@database/repositories/UserRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository, In, Not} from 'typeorm';

class UserService {
  private getUserRepository() {
    return getCustomRepository(UserRepository);
  }

  public async getDefaultUser() {
    return await this.getUserRepository().findOne({name: '隆盛微商截图软件'});
  }

  public async findSelf() {
    return await this.getUserRepository().findSelf();
  }

  public async findUserById(id: number) {
    return await this.getUserRepository().findById(id);
  }

  public async findCredential() {
    return await this.findUserById(2);
  }

  public async findNormalUsersExceptSelfAndNotInIds(ids: number[], count: number) {
    return await this.getUserRepository().findExceptSelfAndIdNotIn(ids, count);
  }

  public async saveUser(userEntity: UserEntity) {
    return await this.getUserRepository().save(userEntity);
  }

  public async initialize() {
    const count = await this.getUserRepository().count();
    if (count > 0) return;
    await this.selfInitialize();
    await this.credentialInitialize();
    await this.usersInitialize();
  }

  private async selfInitialize() {
    const self = new UserEntity();
    self.name = '猪';
    self.avatar = 'http://img.touxiangwu.com/2020/3/UbMbUz.jpg';
    self.wxId = '18638990332';
    self.userType = UserType.Person;
    await this.getUserRepository().save(self);
  }

  private async credentialInitialize() {
    const credential = new UserEntity();
    credential.name = '微信支付';
    credential.avatar = '';
    credential.wxId = '';
    credential.userType = UserType.Person;
    await this.getUserRepository().save(credential);
  }

  private async usersInitialize() {
    const json = require('@assets/json/users');
    const users: UserEntity[] = json.map((item, index) => {
      const user = new UserEntity();
      user.name = item.name;
      user.avatar = item.avatar;
      user.wxId = `user_${index}`;
      user.userType = UserType.Person;
      return user;
    });
    await this.getUserRepository().save(users);
  }
}

const {getGlobalState} = createGlobalState({
  userService: new UserService(),
});

export function getUserService() {
  return getGlobalState('userService');
}
