import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {spacing, wechatColors, wechatTypographics} from '@design-system';
import RedPocketImage from '@assets/images/redPocket.png';
import ReadRedPocketImage from '@assets/images/readRedPocket.png';
import TransferImage from '@assets/images/transfer.png';
import ReadTransferImage from '@assets/images/readTransfer.png';
import {MessageEntity, MessageType} from '@database/entities/MessageEntity';
import Triangle from 'react-native-triangle';

interface RedPocketProps {
  message: MessageEntity;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const RedPocket: React.FC<RedPocketProps> = ({message, onPress, onLongPress}) => {
  const fromMe = message.user.id === 1;

  const displayColor = message.accepted ? '#FDE0C2' : '#F09D47';

  let title = '';
  let titleFont: any = null;
  if (message.messageType === MessageType.RED_POCKET) {
    title = message.amountLabel;
    titleFont = {
      fontSize: 16,
    };
  } else {
    title = `￥${message.amount}`;
    titleFont = {
      ...wechatTypographics.emTitle(true),
      fontSize: 15,
    };
  }

  let image: any = null;
  let imageSize: any = null;
  if (message.messageType === MessageType.RED_POCKET) {
    image = message.accepted ? ReadRedPocketImage : RedPocketImage;
    imageSize = {
      width: 30,
      height: 36,
    };
  } else {
    image = message.accepted ? ReadTransferImage : TransferImage;
    imageSize = {
      width: 34,
      height: 34,
    };
  }

  let description = '';
  if (message.messageType === MessageType.RED_POCKET) {
    description = message.accepted ? '已领取' : '';
  } else {
    if (message.accepted) {
      description = message.isTransferRecipient ? '已收款' : '已被接收';
    } else {
      description = message.amountLabel;
      if (!description) {
        description = fromMe ? '你发起了一笔转账' : '转账给你';
      }
    }
  }
  const descriptionColor = {
    color: message.accepted ? wechatColors.white : '#FFF6DE',
  };

  let label = '';
  if (message.messageType === MessageType.RED_POCKET) {
    label = '微信红包';
  } else {
    label = '微信转账';
  }
  const labelColor = {
    color: message.accepted ? wechatColors.white : '#FFDCB9',
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, fromMe && {justifyContent: 'flex-end'}]}>
      {!fromMe && <Image source={{uri: message.user.avatar}} style={styles.avatar} />}
      {!fromMe && (
        <View style={[styles.triangle, {marginLeft: spacing[1]}]}>
          <Triangle width={4} height={8} color={displayColor} direction={'left'} />
        </View>
      )}
      <View style={[styles.content, {backgroundColor: displayColor}]}>
        <View style={styles.row}>
          <Image source={image} style={[styles.image, imageSize]} />
          <View>
            <Text style={[titleFont, styles.title]}>{title}</Text>
            <Text style={[styles.description, descriptionColor]}>{description}</Text>
          </View>
        </View>
        <View style={styles.labelWrapper}>
          <Text style={[styles.label, labelColor]}>{label}</Text>
        </View>
      </View>
      {fromMe && (
        <View style={[styles.triangle, {marginRight: spacing[1]}]}>
          <Triangle width={4} height={8} color={displayColor} direction={'right'} />
        </View>
      )}
      {fromMe && <Image source={{uri: message.user.avatar}} style={styles.avatar} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing[4],
    marginHorizontal: spacing[3],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  triangle: {
    paddingTop: spacing[3],
  },
  content: {
    width: 236,
    height: 80,
    borderRadius: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing[3],
  },
  image: {
    marginRight: spacing[3],
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: wechatColors.white,
  },
  description: {
    fontSize: 11,
    marginTop: spacing[1],
  },
  labelWrapper: {
    height: 20,
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.22)',
  },
  label: {
    fontSize: 11,
  },
});
