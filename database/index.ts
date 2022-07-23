import React from 'react';
import {createConnection} from 'typeorm';
import {UserEntity} from './entities/UserEntity';
import {ContactEntity} from './entities/ContactEntity';
import {UserRequestEntity} from './entities/UserRequestEntity';
import {CredentialEntity} from './entities/CredentialEntity';
import {WalletDetailEntity} from './entities/WalletDetailEntity';
import {WithdrawEntity} from './entities/WithdrawEntity';
import {BillEntity} from './entities/BillEntity';
import {
  MomentCommentEntity,
  MomentEntity,
  MomentImageEntity,
  MomentLikeEntity,
} from './entities/MomentEntity';
import {MomentNotiEntity} from './entities/MomentNotiEntity';
import {ChatEntity} from './entities/ChatEntity';
import {MessageEntity} from './entities/MessageEntity';

export const useDatabase = () => {
  const [isConnected, setConnected] = React.useState(false);
  const connect = React.useCallback(async () => {
    try {
      await createConnection({
        type: 'expo',
        database: 'wechat.db',
        driver: require('expo-sqlite'),
        entities: [
          UserEntity,
          ContactEntity,
          UserRequestEntity,
          CredentialEntity,
          WalletDetailEntity,
          WithdrawEntity,
          BillEntity,
          MomentEntity,
          MomentImageEntity,
          MomentLikeEntity,
          MomentCommentEntity,
          MomentNotiEntity,
          ChatEntity,
          MessageEntity,
        ],
        synchronize: true,
      });
      setConnected(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    if (!isConnected) connect();
  }, [isConnected]);

  return isConnected;
};
