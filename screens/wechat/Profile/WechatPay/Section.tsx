import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import range from '@utils/range';
import {radius, spacing, wechatColors, wechatTypographics} from '@design-system';

interface IItemProps {
  image: any;
  name: string;
  mark?: string;
}

function Item({image, name, mark}: IItemProps) {
  return (
    <View style={itemStyles.container}>
      <Image source={image} style={itemStyles.image} resizeMode="contain" />
      <Text style={itemStyles.name}>{name}</Text>
      {mark && <Text style={itemStyles.mark}>{mark}</Text>}
    </View>
  );
}

const itemStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 105,
    alignItems: 'center',
  },
  image: {
    // width: '100%',
    height: 40,
    marginTop: spacing[4],
  },
  name: {
    textAlign: 'center',
    fontSize: 14,
    color: '#1D1D1D',
    marginTop: spacing[3],
  },
  mark: {
    fontSize: 10,
    color: '#FA9D3B',
    marginTop: spacing[1],
  },
});

export interface ISectionProps {
  title: string;
  items: IItemProps[];
}

const colums = 4;

export default function Section(props: ISectionProps) {
  const count = props.items.length;
  const rows = Math.floor((count + colums - 1) / colums);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {range(0, rows - 1).map(row => {
        return (
          <View key={row} style={styles.row}>
            {range(0, colums - 1).map(colum => {
              const index = row * colums + colum;
              const item = props.items[index];
              if (item) {
                return <Item key={index} {...props.items[index]} />;
              } else {
                return <View key={index} style={{flex: 1}} />;
              }
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[2],
    marginHorizontal: spacing[2],
    paddingVertical: spacing[4],
    borderRadius: radius[2],
    backgroundColor: wechatColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    marginLeft: spacing[5],
    marginBottom: spacing[5],
    ...wechatTypographics.body(false),
  },
});
