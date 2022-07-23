import React from 'react';
import {StyleSheet, SectionList, View, Image, Text} from 'react-native';
import {radius, spacing, wechatColors} from '@design-system';
import {DiscoveryListSectionData} from './types';
import IndicatorCell from '@screens/wechat/Common/IndicatorCell';
import Separator from '@screens/wechat/Common/Separator';
import ContainerView from '@components/ContainerView';
import {WechatStackProps} from '@navigation/wechat';
import {getMomentNotiService} from '@database/services/MomentNotiService';
import {observeMomentNotisDidChange} from '@events';
import {
  discovery_game,
  discovery_minigram,
  discovery_moment,
  discovery_nearby,
  discovery_scan,
  discovery_search,
  discovery_shake,
  discovery_shop,
  discovery_watch,
} from '@assets/images/wechat/discovery';

function MomentPrompt(props: {uri: any}) {
  return (
    <View>
      <Image source={props.uri} style={{width: 30, height: 30, borderRadius: radius[1]}} />
      <View
        style={{
          backgroundColor: '#F15151',
          position: 'absolute',
          top: -4,
          right: -4,
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
      />
    </View>
  );
}

function MomentBadge(props: {badge: string}) {
  return (
    <Text
      style={{
        width: 16,
        height: 16,
        marginLeft: spacing[3],
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 16,
        color: wechatColors.white,
        borderRadius: 8,
        backgroundColor: '#F15151',
      }}>
      {props.badge}
    </Text>
  );
}

export default function Discovery({navigation}: WechatStackProps<'Discovery'>) {
  const [data, setData] = React.useState<DiscoveryListSectionData[]>([]);

  const generateDataSource = async () => {
    const badge = await getMomentNotiService().count();
    const noti = await getMomentNotiService().findLatestMomentNoti();

    const sections: DiscoveryListSectionData[] = [];

    sections.push({
      key: '0',
      data: [
        {
          icon: discovery_moment,
          name: '朋友圈',
          badge: badge > 0 ? <MomentBadge badge={`${badge}`} /> : undefined,
          node: noti ? <MomentPrompt uri={{uri: noti.avatar}} /> : undefined,
        },
      ],
    });

    sections.push({
      key: '1',
      data: [
        {
          icon: discovery_scan,
          name: '扫一扫',
        },
        {
          icon: discovery_shake,
          name: '摇一摇',
        },
      ],
    });

    sections.push({
      key: '2',
      data: [
        {
          icon: discovery_watch,
          name: '看一看',
        },
        {
          icon: discovery_search,
          name: '搜一搜',
        },
      ],
    });

    sections.push({
      key: '3',
      data: [
        {
          icon: discovery_nearby,
          name: '附近的人',
        },
      ],
    });

    sections.push({
      key: '4',
      data: [
        {
          icon: discovery_shop,
          name: '购物',
        },
        {
          icon: discovery_game,
          name: '游戏',
        },
      ],
    });

    sections.push({
      key: '5',
      data: [
        {
          icon: discovery_minigram,
          name: '小程序',
        },
      ],
    });

    setData(sections);
  };

  const onItemPress = (sectionKey: string, index: number) => {
    if (sectionKey === '0' && index === 0) {
      navigation.navigate('Moments');
    }
  };

  React.useEffect(() => {
    generateDataSource();
    const observer = observeMomentNotisDidChange(generateDataSource);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView style={styles.container}>
      <SectionList
        sections={data}
        ItemSeparatorComponent={() => <Separator left={50} />}
        renderSectionFooter={() => <View style={{height: 8}}></View>}
        renderItem={({section, item, index}) => {
          return (
            <IndicatorCell
              icon={item.icon}
              name={item.name}
              accessory={item.badge}
              node={item.node}
              onPress={() => onItemPress(section.key, index)}
            />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.greyBG,
  },
});
