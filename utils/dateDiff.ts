import moment from 'moment';

export default function dateDiff(date: Date): string {
  const now = moment(new Date());
  const other = moment(date);

  const years = now.diff(other, 'years');
  if (years >= 1) {
    return '1年前';
  }

  const days = now.diff(other, 'days');
  if (days > 1) {
    return `${days}天前`;
  } else if (days === 1) {
    return '昨天';
  }

  const hours = now.diff(other, 'hours');
  if (hours > 1) {
    return `${hours}小时前`;
  }

  const minutes = now.diff(other, 'minutes');
  if (minutes > 1) {
    return `${minutes}分钟前`;
  }

  return '刚刚';
}
