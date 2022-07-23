import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MomentEntity} from '@database/entities/MomentEntity';
import {spacing} from '@design-system';
import dateDiff from '@utils/dateDiff';
import {moment_partially} from '@assets/images/wechat/discovery';

interface IToolBarProps {
  moment: MomentEntity;
  onDelete?: () => void;
  onAction?: () => void;
}

export default function ToolBar({moment, onDelete, onAction}: IToolBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.date}>{dateDiff(moment.publishDate)}</Text>
        {!!moment.source && <Text style={styles.source}>{moment.source}</Text>}
        {moment.user.id === 1 && moment.partiallyVisibile && (
          <Image source={moment_partially} style={styles.partiallyVisible} />
        )}
        {moment.user.id === 1 && (
          <Text style={styles.deleteText} onPress={onDelete}>
            删除
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.action} onPress={onAction}>
        <View style={styles.dot} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#B5B5B5',
  },
  source: {
    marginLeft: spacing[3],
    fontSize: 12,
    color: '#B5B5B5',
  },
  partiallyVisible: {
    marginLeft: spacing[3],
    width: 15,
    height: 10,
  },
  deleteText: {
    marginLeft: spacing[3],
    fontSize: 12,
    color: '#576B95',
  },
  action: {
    width: 30,
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: spacing[1] / 2,
    backgroundColor: '#576B95',
  },
});
