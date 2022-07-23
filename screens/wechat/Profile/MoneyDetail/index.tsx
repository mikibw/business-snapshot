import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import CrossOut from '@components/CrossOut';
import {WithdrawEntity} from '@database/entities/WithdrawEntity';
import Separator from '@screens/wechat/Common/Separator';
import MoneyDetailCell from './MoneyDetailCell';
import {getWithdrawService} from '@database/services/WithdrawService';
import {WechatStackProps} from '@navigation/wechat';

export default function MoneyDetail({navigation}: WechatStackProps<'MoneyDetail'>) {
  useNavigationOptions({
    headerLeft: () => <CrossOut onPress={navigation.goBack} />,
  });

  const [data, setData] = React.useState<WithdrawEntity[]>();

  React.useEffect(() => {
    async function fetchWithdraws() {
      setData(await getWithdrawService().findAllWithdraws());
    }
    fetchWithdraws();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Separator left={spacing[4]} />}
        renderItem={({item}) => {
          return <MoneyDetailCell withdraw={item} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.navigation,
  },
  cancel: {
    marginLeft: spacing[3],
    ...wechatTypographics.title(false),
  },
});
