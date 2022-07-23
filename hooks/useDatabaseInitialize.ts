import React from 'react';
import {useDatabase} from '@database';
import {getUserService} from '@database/services/UserService';
import {getWalletDetailService} from '@database/services/WalletDetailService';
import {getUserRequestService} from '@database/services/UserRequestService';
import {getContactService} from '@database/services/ContactService';
import {getChatService} from '@database/services/ChatService';

export default function useDatabaseInitialize() {
  const isDataBaseConnected = useDatabase();
  const [isInitComplete, setInitComplete] = React.useState(true);

  React.useEffect(() => {
    async function initDataSource() {
      await getUserService().initialize();
      await getWalletDetailService().initialize();
      const contact = await getContactService().initDefaultContact();
      contact && (await getChatService().createP2pChat(contact.user, '欢迎使用微商截图软件'));
      await getUserRequestService().initialize();
      setInitComplete(true);
    }
    if (isDataBaseConnected) initDataSource();
  }, [isDataBaseConnected]);

  return isInitComplete;
}
