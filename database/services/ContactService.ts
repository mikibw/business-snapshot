import {ContactEntity} from '@database/entities/ContactEntity';
import {UserEntity} from '@database/entities/UserEntity';
import {ContactRepository} from '@database/repositories/ContactRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository, In, Not} from 'typeorm';
import {getUserService} from './UserService';

class ContactService {
  private getContactRepository() {
    return getCustomRepository(ContactRepository);
  }

  public async initDefaultContact() {
    const contact = await this.getContactRepository().findOne({user: {name: '隆盛微商截图软件'}});
    if (contact) return;
    const user = await getUserService().getDefaultUser();
    return user && (await this.saveContact(user));
  }

  public async findByUserId(id: number) {
    return await this.getContactRepository().findByUserId(id);
  }

  public async findAllContacts() {
    return await this.getContactRepository().findAll();
  }

  public async findContactsInUserIds(ids: number[]) {
    return this.getContactRepository().findByUserIds(ids);
  }

  public async findContactsNotInUserIds(ids: number[], count: number) {
    return this.getContactRepository().findByUserIdsNotIn(ids, count);
  }

  public async saveContact(userEntity: UserEntity) {
    const contact = new ContactEntity();
    contact.user = userEntity;
    return await this.getContactRepository().save(contact);
  }

  public async deleteAllContacts() {
    await this.getContactRepository().delete({});
  }

  public async deleteContacts(count: number) {
    const contacts = await this.findAllContacts();
    const ids = contacts.slice(0, count - 1).map(c => c.id);
    this.getContactRepository().delete(ids);
  }

  public async insertContacts(count: number) {
    const contacts = await this.findAllContacts();
    const ids = contacts.map(c => c.user.id);
    const users = await getUserService().findNormalUsersExceptSelfAndNotInIds(ids, count);
    await this.getContactRepository().save(
      users.map(user => {
        const contact = new ContactEntity();
        contact.user = user;
        return contact;
      }),
    );
  }
}

const {getGlobalState} = createGlobalState({
  contactService: new ContactService(),
});

export function getContactService() {
  return getGlobalState('contactService');
}
