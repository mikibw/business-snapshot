import pinyin from 'js-pinyin';

export function getFirstLetter(text: string) {
  let letter = text[0];
  if (!letter) return '#';
  letter = pinyin.getCamelChars(letter);
  if (/[a-zA-Z]/.test(letter)) return letter.toUpperCase();
  return '#';
}
