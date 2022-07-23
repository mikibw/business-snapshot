import * as React from 'react';
import {Image, SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {spacing, wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import {contact_add} from '@assets/images/wechat/contact';
import {ContactListItem, ContactListSectionData} from '../types';
import {contactTopItems} from '../constants';
import ContactListCell from '../Common/ContactListCell';
import ContactListSectionHeader from '../Common/ContactListSectionHeader';
import {getContactService} from '@database/services/ContactService';
import {getFirstLetter} from '@utils/getFirstLetter';
import ContactListFooter from './ContactListFooter';
import ContactListIndexes from './ContactListIndexes';
import FakeSearchBar from '@components/FakeSearchBar.tsx';
import {
  observeUserProfileDidChange,
  observeContactsDidChange,
  observeNewFriendsDidChange,
} from '@events';
import {useActionSheet} from '@expo/react-native-action-sheet';
import Separator from '@screens/wechat/Common/Separator';
import useNavigationOptions from '@hooks/useNavigationOptions';
import ContainerView from '@components/ContainerView';
import {UserRequestEntity} from '@database/entities/UserRequestEntity';
import {getUserRequestService} from '@database/services/UserRequestService';
import NewFriendsCell from './NewFriendsCell';

export default function Contact({navigation}: WechatStackProps<'Contact'>) {
  useNavigationOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onBarButtonPress}>
        <Image source={contact_add} style={styles.contactAdd} />
      </TouchableOpacity>
    ),
  });

  const [requests, setRequests] = React.useState<UserRequestEntity[]>([]);
  const [sections, setSections] = React.useState<ContactListSectionData[]>([]);
  const [count, setCount] = React.useState(0);
  const [indexes, setIndexes] = React.useState<string[]>([]);

  const {showActionSheetWithOptions} = useActionSheet();

  const deleteContacts = async (count: number) => {
    await getContactService().deleteContacts(count);
    await findContacts();
  };

  const insertContacts = async (count: number) => {
    await getContactService().insertContacts(count);
    await findContacts();
  };

  const onBarButtonPress = () => {
    async function deleteContacts(all: boolean, count: number = 0) {
      if (all) {
        await getContactService().deleteAllContacts();
      } else {
        await getContactService().deleteContacts(count);
      }
      await findContacts();
    }
    async function insertContacts(count: number) {
      await getContactService().insertContacts(count);
      await findContacts();
    }
    function showAutoOptions() {
      showActionSheetWithOptions(
        {
          options: ['添加10个', '删除10个', '取消'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 2) return;
          if (buttonIndex === 0) insertContacts(10);
          if (buttonIndex === 1) deleteContacts(false, 10);
        },
      );
    }
    function addContactMannually() {
      navigation.navigate('CreateContact', {
        completion: findContacts,
      });
    }
    showActionSheetWithOptions(
      {
        options: ['自动添加', '手动添加', '删除20个好友', '删除全部好友', '取消'],
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        if (buttonIndex === 4) return;
        if (buttonIndex === 0) showAutoOptions();
        if (buttonIndex === 1) addContactMannually();
        if (buttonIndex === 2) deleteContacts(false, 20);
        if (buttonIndex === 3) deleteContacts(true);
      },
    );
  };

  const onItemPress = (item: ContactListItem) => {
    if (item.id === -1) {
      navigation.navigate('UserRequests');
    } else if (item.id > 0) {
      navigation.navigate('UserDetail', {userId: item.id, isInContacts: true});
    }
  };

  const findContacts = React.useCallback(async () => {
    let data: ContactListSectionData[] = [
      {
        key: 'top',
        data: contactTopItems,
      },
    ];

    const contacts = await getContactService().findAllContacts();
    setCount(contacts.length);

    const groups: {[key: string]: ContactListItem[]} = {};
    if (contacts.length === 0) {
      groups['empty'] = [];
    } else {
      contacts.forEach(contact => {
        const key = getFirstLetter(contact.user.name);
        if (!groups[key]) groups[key] = [];
        groups[key].push({
          id: contact.user.id,
          avatar: contact.user.avatar,
          name: contact.user.name,
        });
      });
    }

    let userSections: ContactListSectionData[] = Object.keys(groups)
      .filter(key => key !== 'empty')
      .map(key => {
        return {key, data: groups[key]};
      });
    userSections = userSections.sort((s1, s2) => {
      return s1.key.localeCompare(s2.key);
    });
    setIndexes(userSections.map(section => section.key));

    data = data.concat(userSections);
    setSections(data);

    setRequests(await getUserRequestService().findAllNewFriendRequests());
  }, []);

  React.useEffect(() => {
    findContacts();
    const observers = [
      observeNewFriendsDidChange(findContacts),
      observeUserProfileDidChange(findContacts),
      observeContactsDidChange(findContacts),
    ];
    return () => observers.forEach(observer => observer.remove());
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={sections}
        ItemSeparatorComponent={info => {
          const fill = info.leadingItem.id === -1 && requests.length > 0;
          return <Separator left={fill ? 0 : spacing[16]} />;
        }}
        ListHeaderComponent={() => <FakeSearchBar />}
        ListFooterComponent={() => <ContactListFooter count={count} />}
        renderSectionHeader={({section}) => {
          if (section.key === 'top') return null;
          return <ContactListSectionHeader title={section.key} />;
        }}
        renderItem={({item}) => {
          if (item.id === -1 && requests.length > 0) {
            return <NewFriendsCell requests={requests} onPress={() => onItemPress(item)} />;
          }
          return <ContactListCell key={item.id} contact={item} onPress={() => onItemPress(item)} />;
        }}
        keyExtractor={item => item.id.toString()}
      />
      <ContactListIndexes style={styles.indexes} indexes={indexes} />
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
  indexes: {
    height: '100%',
    position: 'absolute',
    right: spacing[2],
  },
});
