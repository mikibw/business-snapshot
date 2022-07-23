import React from 'react';
import {View, Image, SectionList, StyleSheet, TouchableOpacity, Text} from 'react-native';
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
import {contact_selected, contact_unselected} from '@assets/images/wechat/contact';
import useNavigationOptions from '@hooks/useNavigationOptions';

export default function SelectContactMultiple({
  route,
  navigation,
}: WechatStackProps<'SelectContactMultiple'>) {
  const {onComplete} = route.params;

  const [sections, setSections] = React.useState<ContactListSectionData[]>([]);

  useNavigationOptions(
    {
      headerRight: () => (
        <Text style={styles.confirm} onPress={confirm}>
          确定
        </Text>
      ),
    },
    [sections],
  );

  const confirm = async () => {
    const ids = sections.reduce((previous: number[], current) => {
      const sectionIds = current.data.filter(item => item.selected === true).map(item => item.id);
      return [...previous, ...sectionIds];
    }, []);
    navigation.goBack();
    const contacts = await getContactService().findContactsInUserIds(ids);
    onComplete && onComplete(contacts);
  };

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

  const onContactPress = async (sectionKey: string, itemIndex: number) => {
    const sectionIndex = sections.findIndex(s => s.key === sectionKey);
    if (sectionIndex === -1) return;

    const section = sections[sectionIndex];
    const items = section.data;
    const item = items[itemIndex];
    item.selected = !item.selected;
    items[itemIndex] = item;
    section.data = items;
    sections[sectionIndex] = section;

    setSections(Object.assign([], sections));
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
        renderItem={({section, item, index}) => {
          return (
            <TouchableOpacity
              style={styles.cell}
              onPress={() => onContactPress(section.key, index)}>
              <Image
                source={item.selected ? contact_selected : contact_unselected}
                style={styles.selectIcon}
              />
              <ContactListCell key={item.id} contact={item} style={{flex: 1}} />
            </TouchableOpacity>
          );
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
  confirm: {
    fontSize: 16,
    color: '#07C160',
    marginRight: spacing[3],
  },
  cell: {
    height: 55,
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectIcon: {
    width: 24,
    height: 24,
  },
});
