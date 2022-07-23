import useNavigationOptions from '@hooks/useNavigationOptions';
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, SectionList} from 'react-native';
import {icon_settings} from '@assets/images/wechat/index/index';
import {spacing, wechatColors} from '@design-system';
import PayTabBar from './PayTabBar';
import {observeCredentialsDidChange} from '@events';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {getCredentialService} from '@database/services/CredentialService';
import {CredentialEntity, CredentialType} from '@database/entities/CredentialEntity';
import ContainerView from '@components/ContainerView';
import {WechatStackProps} from '@navigation/wechat';
import {CredentialListSectionData} from './types';
import CredentialCell from './CredentialCell';
import {useDateTimePicker} from '@components/DateTimePicker';

export default function Credential({navigation}: WechatStackProps<'Credential'>) {
  useNavigationOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onSettingsPress}>
        <Image source={icon_settings} style={styles.settings} />
      </TouchableOpacity>
    ),
  });

  const {showActionSheetWithOptions} = useActionSheet();
  const {showDateTimePicker} = useDateTimePicker();

  const [sections, setSections] = React.useState<CredentialListSectionData[]>([]);

  const onSettingsPress = () => {
    showActionSheetWithOptions(
      {
        options: ['支付凭证', '应用内付款', '退款凭证', '取消'],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) {
          navigation.navigate('AddCredential', {
            credentialType: CredentialType.Payment,
          });
          return;
        }
        if (buttonIndex === 1) {
          navigation.navigate('AddCredential', {
            credentialType: CredentialType.InnerAppPayment,
          });
          return;
        }
        if (buttonIndex === 2) {
          navigation.navigate('AddCredential', {
            credentialType: CredentialType.Refund,
          });
          return;
        }
      },
    );
  };

  const onItemPress = (item: CredentialEntity) => {
    async function updateDate(date: Date) {
      item.displayDate = date;
      await getCredentialService().saveCredential(item);
      await findAllCredentials();
    }
    async function deleteCredential() {
      await getCredentialService().deleteCredential(item.id);
      await findAllCredentials();
    }
    async function changeCredential() {
      navigation.navigate('AddCredential', {credentialType: item.type, credential: item});
    }
    showActionSheetWithOptions(
      {
        options: ['添加时间', '删除消息', '修改消息', '取消'],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) {
          showDateTimePicker({
            title: '选择时间',
            completion: updateDate,
          });
          return;
        }
        if (buttonIndex === 1) {
          deleteCredential();
          return;
        }
        if (buttonIndex === 2) {
          changeCredential();
          return;
        }
      },
    );
  };

  const findAllCredentials = async () => {
    const credentials = await getCredentialService().findAllCredentials();
    const data = credentials.map(credential => ({
      key: credential.id.toString(),
      data: [credential],
    }));
    setSections(data);
  };

  React.useEffect(() => {
    findAllCredentials();
    const observer = observeCredentialsDidChange(findAllCredentials);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <View style={styles.sectionList}>
        <SectionList
          sections={sections}
          renderItem={({item}) => (
            <CredentialCell credential={item} onLongPress={() => onItemPress(item)} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <PayTabBar />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7E6',
  },
  settings: {
    width: 20,
    height: 20,
    marginRight: spacing[4],
  },
  sectionList: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
});
