import {arrow_forward} from '@assets/images/nav';
import {arrow_down} from '@assets/images/wechat/profile';
import {spacing, wechatTypographics} from '@design-system';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BillMonthStat} from '../types';

interface IBillSectionHeaderProps {
  stat: BillMonthStat;
}

export default function BillSectionHeader({stat}: IBillSectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.monthText}>{stat.month}</Text>
        <Image style={styles.dropDown} source={arrow_down} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.inoutText}>{`支出￥${stat.out} 收入￥${stat.in}`}</Text>
        <View style={styles.stat}>
          <View style={styles.line} />
          <Text style={styles.statText}>统计</Text>
          <Image style={styles.arrow} source={arrow_forward} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: spacing[5],
    backgroundColor: '#F6F6F6',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    ...wechatTypographics.title(true),
  },
  dropDown: {
    width: 10,
    height: 5,
    marginLeft: spacing[3],
  },
  bottom: {
    marginTop: spacing[1],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inoutText: {
    ...wechatTypographics.body(true),
    color: '#989898',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: 18,
    marginRight: spacing[6],
    backgroundColor: '#D8D8D8',
  },
  statText: {
    marginRight: spacing[2],
    ...wechatTypographics.body(false),
    color: '#989898',
  },
  arrow: {
    width: 5,
    height: 10,
  },
});
