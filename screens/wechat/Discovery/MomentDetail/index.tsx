import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import MomentCell from '../Moments/MomentCell';
import ContainerView from '@components/ContainerView';
import {spacing, wechatColors} from '@design-system';
import useNavigationOptions from '@hooks/useNavigationOptions';
import {WechatStackProps} from '@navigation/wechat';
import {facial} from '@assets/images/icons';
import Interaction from './Interaction';

export default function MomentDetail({route, navigation}: WechatStackProps<'MomentDetail'>) {
  const {moment} = route.params;

  useNavigationOptions({
    headerLeft: () => (
      <Text style={styles.cancel} onPress={navigation.goBack}>
        完成
      </Text>
    ),
  });

  return (
    <ContainerView style={styles.container}>
      <ScrollView style={styles.top}>
        <MomentCell moment={moment} showInteraction={false} />
        {(moment.likes.length > 0 || moment.comments.length > 0) && <Interaction moment={moment} />}
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.input}>
          <Text style={styles.inputText}>评论</Text>
        </View>
        <Image source={facial} style={styles.emoji} />
      </View>
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
    fontSize: 16,
    color: '#07C160',
  },
  top: {
    backgroundColor: wechatColors.white,
  },
  bottom: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
  },
  input: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: wechatColors.white,
  },
  inputText: {
    fontSize: 15,
    color: '#BEBEBE',
    marginLeft: spacing[3],
  },
  emoji: {
    width: 26,
    height: 26,
    marginLeft: spacing[2],
  },
});
