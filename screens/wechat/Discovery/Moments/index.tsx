import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ContainerView from '@components/ContainerView';
import {wechatColors} from '@design-system';
import {WechatStackProps} from '@navigation/wechat';
import Header from './Header';
import MomentCell from './MomentCell';
import Separator from '@screens/wechat/Common/Separator';
import useNavigationTransition from './useNavigationTransition';
import {getMomentService} from '@database/services/MomentService';
import {notifyMomentNotisDidChange, observeMomentsDidChange} from '@events';
import {MomentCommentEntity, MomentEntity} from '@database/entities/MomentEntity';
import {useActionSheet} from '@expo/react-native-action-sheet';
import moment from 'moment';
import {getContactService} from '@database/services/ContactService';
import Toast from '@components/Toast';
import {UserEntity} from '@database/entities/UserEntity';
import {getUserService} from '@database/services/UserService';
import {getMomentNotiService} from '@database/services/MomentNotiService';
import {usePrompt} from '@components/Prompt';

export default function Moments({navigation}: WechatStackProps<'Moments'>) {
  const toast = React.useRef<Toast>(null);
  const {showPrompt} = usePrompt();
  const {showActionSheetWithOptions} = useActionSheet();

  const handleScroll = useNavigationTransition({
    onGoBack: navigation.goBack,
    onPublish: () => navigation.navigate('AddMoment'),
  });

  const headerComponent = React.useMemo(() => {
    return () => (
      <Header
        onProfilePress={() => navigation.navigate('PersonalInfo')}
        onMessagePress={() => navigation.navigate('MomentNotis')}
      />
    );
  }, []);

  const [data, setData] = React.useState<MomentEntity[]>([]);

  function alertDeleteMoment(id: number) {
    showActionSheetWithOptions(
      {
        title: '确定删除朋友圈?',
        options: ['确定', '取消'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 1) return;
        deleteMoment(id);
      },
    );
  }

  async function deleteMoment(id: number) {
    await getMomentService().deleteMoment(id);
    await fetchMoments();
  }

  async function moveUp(id: number, index: number) {
    if (index === 0) return;
    const previous = data[index - 1];
    const date = moment(previous.publishDate).add({seconds: 1}).toDate();
    await getMomentService().updatePublishDate(id, date);
    await fetchMoments();
  }

  async function moveDown(id: number, index: number) {
    if (index === data.length - 1) return;
    const latter = data[index + 1];
    const date = moment(latter.publishDate).subtract({seconds: 1}).toDate();
    await getMomentService().updatePublishDate(id, date);
    await fetchMoments();
  }

  async function likeMoment(moment: MomentEntity, count: number) {
    const ids = moment.likes.map(like => like.user.id);
    const contacts = await getContactService().findContactsNotInUserIds(ids, count);
    if (contacts.length === 0) {
      toast.current?.show('联系人数量不足，请添加后重试');
      return;
    }
    const users = contacts.map(contact => contact.user);
    await getMomentService().insertLikes(moment, users);
    await fetchMoments();

    if (moment.user.id === 1) {
      await getMomentNotiService().insertLikeMomentNoti(moment, users);
      notifyMomentNotisDidChange();
    }
  }

  function alertLikeMoment(moment: MomentEntity) {
    showActionSheetWithOptions(
      {
        options: ['1个赞', '10个赞', '自定义', '取消'],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 3) return;
        if (buttonIndex === 0) {
          likeMoment(moment, 1);
        } else if (buttonIndex === 1) {
          likeMoment(moment, 10);
        } else if (buttonIndex === 2) {
          showPrompt({
            title: 'N个赞',
            placeholder: '输入赞个数',
            completion: text => {
              if (!text) return;
              const count = parseInt(text);
              if (isNaN(count) || count <= 0) return;
              likeMoment(moment, count);
            },
          });
        }
      },
    );
  }

  function alertLikeAction(moment: MomentEntity, likeId: number) {
    showActionSheetWithOptions(
      {
        title: '确定删除点赞?',
        options: ['删除点赞', '取消'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        if (buttonIndex === 1) return;
        deleteLike(moment, likeId);
      },
    );
  }

  async function deleteLike(moment: MomentEntity, likeId: number) {
    await getMomentService().deleteLike(moment, likeId);
    await fetchMoments();
  }

  function alertCommentAction(moment: MomentEntity, comment: MomentCommentEntity) {
    showActionSheetWithOptions(
      {
        options: ['删除', '回复', '取消'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        if (buttonIndex === 0) {
          deleteComment(moment, comment.id);
        } else if (buttonIndex === 1) {
          replyComment(moment, comment.user);
        }
      },
    );
  }

  async function replyComment(moment: MomentEntity, toUser: UserEntity) {
    const self = await getUserService().findSelf();
    if (!self) return;
    inputComment(moment, self, toUser);
  }

  async function deleteComment(moment: MomentEntity, commentId: number) {
    await getMomentService().deleteComment(moment, commentId);
    await fetchMoments();
  }

  function inputComment(moment: MomentEntity, user: UserEntity, toUser?: UserEntity) {
    showPrompt({
      title: '输入评论',
      placeholder: toUser ? `回复${toUser.name}` : '请输入评论',
      completion: text => {
        const content = text.trim();
        if (!content) return;
        comment(moment, content, user, toUser);
      },
    });
  }

  async function comment(
    moment: MomentEntity,
    content: string,
    user: UserEntity,
    toUser?: UserEntity,
  ) {
    await getMomentService().insertComment(moment, content, user, toUser);
    await fetchMoments();
    if (moment.user.id === 1) {
      await getMomentNotiService().insertCommentMomentNoti(moment, content, user, toUser);
      notifyMomentNotisDidChange();
    }
  }

  function alertActionMoment(moment: MomentEntity, index: number) {
    showActionSheetWithOptions(
      {
        options: ['赞N', '评论', '详情', '上移', '下移', '删除', '取消'],
        cancelButtonIndex: 6,
      },
      buttonIndex => {
        if (buttonIndex === 6) return;
        if (buttonIndex === 0) {
          alertLikeMoment(moment);
        } else if (buttonIndex === 1) {
          navigation.navigate('SelectContact', {
            onComplete: contact => inputComment(moment, contact.user),
          });
        } else if (buttonIndex === 2) {
          navigation.navigate('MomentDetail', {moment});
        } else if (buttonIndex === 3) {
          moveUp(moment.id, index);
        } else if (buttonIndex === 4) {
          moveDown(moment.id, index);
        } else if (buttonIndex === 5) {
          alertDeleteMoment(moment.id);
        }
      },
    );
  }

  async function fetchMoments() {
    setData(await getMomentService().findAllMoments());
  }

  React.useEffect(() => {
    fetchMoments();
    const observer = observeMomentsDidChange(fetchMoments);
    return () => observer.remove();
  }, []);

  return (
    <ContainerView ignoreSafeArea style={styles.container}>
      <FlatList
        data={data}
        ListHeaderComponent={headerComponent}
        ItemSeparatorComponent={() => <Separator left={0} />}
        renderItem={({item, index}) => {
          return (
            <MomentCell
              moment={item}
              showInteraction
              onDelete={() => alertDeleteMoment(item.id)}
              onAction={() => alertActionMoment(item, index)}
              onLikePress={likeId => alertLikeAction(item, likeId)}
              onCommentPress={comment => alertCommentAction(item, comment)}
            />
          );
        }}
        onScroll={e => handleScroll(e.nativeEvent.contentOffset.y)}
        keyExtractor={(_, index) => index.toString()}
      />
      <Toast ref={toast} />
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wechatColors.white,
  },
});
