import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import PageEntryItem, {IPageEntryItemProps} from './PageEntryItem';
import range from '@utils/range';
import {colors, spacing, typographics} from '@design-system';

interface IPageEntryViewProps {
  title: string;
  entrys: IPageEntryItemProps[];
}

const colums = 4;

function PageEntryView(props: IPageEntryViewProps) {
  const count = props.entrys.length;
  const rows = Math.floor((count + colums - 1) / colums);
  return (
    <>
      <Text style={styles.title}>{props.title}</Text>
      {range(0, rows - 1).map(row => {
        return (
          <View key={row} style={styles.row}>
            {range(0, colums - 1).map(colum => {
              const index = row * colums + colum;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => {
                    const onPress = props.entrys[index]?.onPress;
                    onPress && onPress();
                  }}>
                  {props.entrys[index] ? <PageEntryItem {...props.entrys[index]} /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  title: {
    ...typographics.subtitle,
    color: colors.text.grey3,
    marginTop: spacing[4],
    marginLeft: spacing[4],
  },
});

export default PageEntryView;
