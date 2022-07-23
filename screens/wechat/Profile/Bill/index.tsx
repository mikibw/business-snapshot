import React from 'react';
import {Text, StyleSheet, SectionList} from 'react-native';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import ContainerView from '@components/ContainerView';
import CrossOut from '@components/CrossOut';
import {WechatStackProps} from '@navigation/wechat';
import {observeBillsDidChange} from '@events';
import {getBillService} from '@database/services/BillService';
import {BillListSectionData} from '../types';
import Separator from '@screens/wechat/Common/Separator';
import BillCell from './BillCell';
import BillHeader from './BillHeader';
import BillSectionHeader from './BillSectionHeader';
import moment from 'moment';
import {BillType} from '@database/entities/BillEntity';

export default function Bill({navigation}: WechatStackProps<'Bill'>) {
  useNavigationOptions({
    headerLeft: () => <CrossOut onPress={navigation.goBack} />,
    headerRight: () => (
      <Text style={styles.problems} onPress={() => navigation.navigate('AddBill')}>
        常见问题
      </Text>
    ),
  });

  const [sections, setSections] = React.useState<BillListSectionData[]>([]);

  const fetchBills = async () => {
    const bills = await getBillService().findAllBills();

    const monthGroupMaps: any = {};
    bills.forEach(bill => {
      const month = moment(bill.date).format('yyyy年MM月');
      if (!monthGroupMaps[month]) monthGroupMaps[month] = {};
      if (!monthGroupMaps[month].data) monthGroupMaps[month].data = [];
      if (!monthGroupMaps[month].in) monthGroupMaps[month].in = 0;
      if (!monthGroupMaps[month].out) monthGroupMaps[month].out = 0;
      monthGroupMaps[month].data.push(bill);
      if (
        [BillType.PhoneTopUp, BillType.Withdraw].includes(bill.billType) ||
        bill.inout === false
      ) {
        monthGroupMaps[month].out = monthGroupMaps[month].out + parseFloat(bill.amount);
      } else {
        monthGroupMaps[month].in = monthGroupMaps[month].in + parseFloat(bill.amount);
      }
    });
    const monthGroups: BillListSectionData[] = Object.keys(monthGroupMaps).map(month => ({
      stat: {
        month,
        in: monthGroupMaps[month].in.toFixed(2),
        out: monthGroupMaps[month].out.toFixed(2),
      },
      data: monthGroupMaps[month].data,
    }));
    monthGroups.forEach((section, index) => {
      let data = section.data;
      data = data.sort((b1, b2) => {
        return b1.date > b2.date ? -1 : 1;
      });
      monthGroups[index].data = data;
    });
    setSections(monthGroups);
  };

  React.useEffect(() => {
    fetchBills();
    const observer = observeBillsDidChange(fetchBills);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={sections}
        ItemSeparatorComponent={() => <Separator left={spacing[18]} />}
        ListHeaderComponent={() => <BillHeader />}
        renderSectionHeader={({section}) => {
          return <BillSectionHeader stat={section.stat} />;
        }}
        renderItem={({item}) => {
          return <BillCell bill={item} />;
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
  problems: {
    marginRight: spacing[3],
    ...wechatTypographics.title(false),
  },
});
