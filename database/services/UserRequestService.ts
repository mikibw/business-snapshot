import {UserRequestEntity} from '@database/entities/UserRequestEntity';
import {UserRequestRepository} from '@database/repositories/UserRequestRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository, In} from 'typeorm';
import {getContactService} from './ContactService';
import {getUserService} from './UserService';

class UserRequestService {
  private getUserRequestRepository() {
    return getCustomRepository(UserRequestRepository);
  }

  public async initialize() {
    const requests = await this.findAllUserRequests();
    if (requests.length === 0) {
      await this.insertUserRequests(10);
    }
  }

  public async findAllUserRequests() {
    return await this.getUserRequestRepository().find({relations: ['user']});
  }

  public async isInUserRequestContactList(userId: number) {
    return !!(await getContactService().findByUserId(userId));
  }

  public async findAllNewFriendRequests() {
    const requests = await this.getUserRequestRepository().find({relations: ['user']});
    const unacceptedUserRequests: UserRequestEntity[] = [];
    for (const reqeust of requests) {
      const accepted = await this.isInUserRequestContactList(reqeust.user.id);
      if (!accepted) unacceptedUserRequests.push(reqeust);
    }
    return unacceptedUserRequests;
  }

  public async updateMessageByUserId(userId: number, message: string) {
    const ur = await this.getUserRequestRepository().findOne({user: {id: userId}});
    if (ur) {
      ur.message = message;
      await this.getUserRequestRepository().save(ur);
    }
  }

  public async deleteUserRequestByUserId(userId: number) {
    await this.getUserRequestRepository().delete({user: {id: userId}});
  }

  public async insertUserRequests(count: number) {
    const userRequests = await this.findAllUserRequests();
    const ids = userRequests.map(ur => ur.user.id);
    const users = await getUserService().findNormalUsersExceptSelfAndNotInIds(ids, count);
    const newUserRequests = users.map(user => {
      const ur = new UserRequestEntity();
      ur.user = user;
      ur.message = `我是${user.name}`;
      return ur;
    });
    await this.getUserRequestRepository().save(newUserRequests);
  }

  public async deleteUserRequests(count: number) {
    const userRequests = await this.findAllUserRequests();
    const ids = userRequests.slice(0, count).map(ur => ur.user.id);
    await this.getUserRequestRepository().delete({
      user: {id: In(ids)},
    });
  }
}

const {getGlobalState} = createGlobalState({
  userRequestService: new UserRequestService(),
});

export function getUserRequestService() {
  return getGlobalState('userRequestService');
}
