import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {MomentNotiEntity} from '@database/entities/MomentNotiEntity';
import {getMomentNotiService} from '@database/services/MomentNotiService';
import MomentNotiCell from './MomentNotiCell';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {notifyMomentNotisDidChange} from '@events';

export default function MomentNotis() {
  const {showActionSheetWithOptions} = useActionSheet();

  useNavigationOptions({
    headerRight: () => (
      <Text style={styles.clear} onPress={alertClearAllNotis}>
        清空
      </Text>
    ),
  });

  async function clearAllNotis() {
    setData([]);
    await getMomentNotiService().clearAllNotis();
    notifyMomentNotisDidChange();
  }

  function alertClearAllNotis() {
    showActionSheetWithOptions(
      {
        options: ['删除所有消息', '取消'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 1) return;
        clearAllNotis();
      },
    );
  }

  const [data, setData] = React.useState<MomentNotiEntity[]>([]);

  React.useEffect(() => {
    async function fetchMomentNotis() {
      setData(await getMomentNotiService().findAllMomentNotis());
    }
    fetchMomentNotis();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return <MomentNotiCell noti={item} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
  clear: {
    marginRight: spacing[3],
    ...wechatTypographics.title(false),
  },
});
