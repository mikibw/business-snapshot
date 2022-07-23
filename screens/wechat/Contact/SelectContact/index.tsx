import React from 'react';
import {Image, SectionList, StyleSheet, TouchableOpacity} from 'react-native';
import ContainerView from '@components/ContainerView';
import {ContactListItem, ContactListSectionData} from '../types';
import {getContactService} from '@database/services/ContactService';
import {getFirstLetter} from '@utils/getFirstLetter';
import Separator from '@screens/wechat/Common/Separator';
import FakeSearchBar from '@components/FakeSearchBar.tsx';
import {spacing, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import ContactListSectionHeader from '../Common/ContactListSectionHeader';
import ContactListCell from '../Common/ContactListCell';
import {getChatService} from '@database/services/ChatService';
import moment from 'moment';
import {getUserService} from '@database/services/UserService';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {contact_add} from '@assets/images/wechat/contact';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {notifyContactsDidChange} from '@events';

export default function SelectContact({route, navigation}: WechatStackProps<'SelectContact'>) {
  const {destination, onComplete} = route.params;

  const {showActionSheetWithOptions} = useActionSheet();

  useNavigationOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onBarButtonPress}>
        <Image source={contact_add} style={styles.contactAdd} />
      </TouchableOpacity>
    ),
  });

  const deleteContacts = async (count: number) => {
    await getContactService().deleteContacts(count);
    await findContacts();
    notifyContactsDidChange();
  };

  const insertContacts = async (count: number) => {
    await getContactService().insertContacts(count);
    await findContacts();
    notifyContactsDidChange();
  };

  const onBarButtonPress = () => {
    showActionSheetWithOptions(
      {
        options: ['添加10个', '删除10个', '取消'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 0) insertContacts(10);
        if (buttonIndex === 1) deleteContacts(10);
      },
    );
  };

  const [sections, setSections] = React.useState<ContactListSectionData[]>([]);

  const findContacts = React.useCallback(async () => {
    const contacts = await getContactService().findAllContacts();

    const groups: {[key: string]: ContactListItem[]} = {};
    contacts.forEach(contact => {
      const key = getFirstLetter(contact.user.name);
      if (!groups[key]) groups[key] = [];
      groups[key].push({
        id: contact.user.id,
        avatar: contact.user.avatar,
        name: contact.user.name,
      });
    });

    let userSections: ContactListSectionData[] = Object.keys(groups).map(key => {
      return {key, data: groups[key]};
    });
    userSections = userSections.sort((s1, s2) => {
      return s1.key.localeCompare(s2.key);
    });

    setSections(userSections);
  }, []);

  const onItemPress = async (item: ContactListItem) => {
    const contact = await getContactService().findByUserId(item.id);
    if (!contact) return;
    if (destination) {
      switch (destination) {
        case 'SingleChat': {
          const chat = await getChatService().createP2pChat(contact.user);
          navigation.navigate('ChatDetails', {chatId: chat.id});
          break;
        }
        case 'Transfer':
          navigation.navigate('TransferReceiveState', {
            name: contact.user.name,
            amount: '5.00',
            sendDate: moment(new Date()).subtract(1, 'minute').toDate(),
            receiveDate: new Date(),
          });
          break;
        case 'Redpocket': {
          const self = await getUserService().findSelf();
          navigation.navigate('RedpocketDetail', {
            sendUser: {
              name: self!.name,
              avatar: self!.avatar,
              comment: '恭喜发财，大吉大利',
            },
            receiveUsers: [
              {
                name: contact.user.name,
                avatar: contact.user.avatar,
                amount: '5.00',
                date: new Date(),
              },
            ],
          });
          break;
        }
        case 'ChatBackground': {
          const chat = await getChatService().createP2pChat(contact.user);
          navigation.navigate('ChatDetails', {chatId: chat.id});
          navigation.navigate('ChatEdit', {id: chat.id});
          break;
        }
        case 'PaySuccess':
          navigation.navigate('PaySuccess', {
            avatar: contact.user.avatar,
            name: contact.user.name,
          });
          break;
      }
    } else {
      onComplete?.(contact);
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    findContacts();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={sections}
        ItemSeparatorComponent={() => <Separator left={spacing[16]} />}
        ListHeaderComponent={() => <FakeSearchBar />}
        renderSectionHeader={({section}) => {
          if (section.key === 'top') return null;
          return <ContactListSectionHeader title={section.key} />;
        }}
        renderItem={({item}) => {
          return <ContactListCell key={item.id} contact={item} onPress={() => onItemPress(item)} />;
        }}
        keyExtractor={item => item.id.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  contactAdd: {
    width: 40,
    height: 40,
  },
});
