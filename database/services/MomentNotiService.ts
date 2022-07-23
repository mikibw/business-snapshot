import {MomentEntity, MomentType} from '@database/entities/MomentEntity';
import {
  MomentNotiAccessoryType,
  MomentNotiEntity,
  MomentNotiType,
} from '@database/entities/MomentNotiEntity';
import {UserEntity} from '@database/entities/UserEntity';
import {MomentNotiRepository} from '@database/repositories/MomentNotiRepository';
import {createGlobalState} from 'react-hooks-global-state';
import {getCustomRepository} from 'typeorm';

class MomentNotiService {
  private getMomentNotiRepository() {
    return getCustomRepository(MomentNotiRepository);
  }

  public async count() {
    return await this.getMomentNotiRepository().count();
  }

  public async findLatestMomentNoti() {
    return await this.getMomentNotiRepository().findLatest();
  }

  public async findAllMomentNotis() {
    return await this.getMomentNotiRepository().findAll();
  }

  public async clearAllNotis() {
    await this.getMomentNotiRepository().delete({});
  }

  public async insertLikeMomentNoti(moment: MomentEntity, users: UserEntity[]) {
    const notis = users.map(user => {
      const noti = new MomentNotiEntity();
      noti.momentNotiType = MomentNotiType.Like;
      noti.avatar = user.avatar;
      noti.name = user.name;
      this.setAccessoryValues(noti, moment);
      return noti;
    });
    await this.getMomentNotiRepository().save(notis);
  }

  public async insertCommentMomentNoti(
    moment: MomentEntity,
    content: string,
    user: UserEntity,
    toUser?: UserEntity,
  ) {
    const noti = new MomentNotiEntity();
    noti.momentNotiType = MomentNotiType.Comment;
    noti.avatar = user.avatar;
    noti.name = user.name;
    noti.content = content;
    if (toUser) noti.toName = toUser.name;
    this.setAccessoryValues(noti, moment);
    await this.getMomentNotiRepository().save(noti);
  }

  private setAccessoryValues(noti: MomentNotiEntity, moment: MomentEntity) {
    const source = moment.images[0]?.source;
    if (source) {
      noti.accessory = source;
      noti.momentNotiAccessoryType = moment.videoStyle
        ? MomentNotiAccessoryType.video
        : MomentNotiAccessoryType.Image;
    } else {
      switch (moment.momentType) {
        case MomentType.Normal:
          noti.accessory = moment.content;
          break;
        case MomentType.Link:
          noti.accessory = moment.linkTitle;
          break;
      }
      noti.momentNotiAccessoryType = MomentNotiAccessoryType.Text;
    }
  }
}

const {getGlobalState} = createGlobalState({
  momentNotiService: new MomentNotiService(),
});

export function getMomentNotiService() {
  return getGlobalState('momentNotiService');
}
