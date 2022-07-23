import {CredentialEntity} from '@database/entities/CredentialEntity';
import {CredentialRepository} from '@database/repositories/CredentialRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';

class CredentialService {
  private getCredentialRepository() {
    return getCustomRepository(CredentialRepository);
  }

  public async findAllCredentials() {
    return await this.getCredentialRepository().findAll();
  }

  public async saveCredential(credentialEntity: CredentialEntity) {
    await this.getCredentialRepository().save(credentialEntity);
  }

  public async deleteCredential(id: number) {
    await this.getCredentialRepository().delete({id});
  }
}

const {getGlobalState} = createGlobalState({
  credentialService: new CredentialService(),
});

export function getCredentialService() {
  return getGlobalState('credentialService');
}
