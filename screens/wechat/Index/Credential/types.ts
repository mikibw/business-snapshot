import {CredentialEntity} from '@database/entities/CredentialEntity';

export type CredentialListSectionData = {
  key: string;
  data: CredentialEntity[];
};
