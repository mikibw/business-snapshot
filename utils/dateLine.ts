import moment from 'moment';

export default function dateLine(date: Date): string {
  const now = moment(new Date());
  const other = moment(date);

  const days = now.diff(other, 'days');
  if (days < 1) {
    return other.format('HH:mm');
  } else if (days === 1) {
    return `昨天 ${other.format('HH:mm')}`;
  } else if (days < 7) {
    const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const day = other.format('d');
    return `${weeks[parseInt(day)]} ${other.format('HH:mm')}`;
  }

  const years = now.diff(other, 'years');
  if (years > 0) {
    return other.format('yyyy年MM月DD日 HH:mm');
  } else {
    return other.format('MM月DD日 HH:mm');
  }
}
