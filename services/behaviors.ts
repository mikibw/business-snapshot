import {Platform} from 'react-native';

const baseURL = 'http://maidian.rzrzrz.top/save.php';

type Behavior = 'open' | 'sellpage' | 'click_buy' | 'buy_success';
type Source = 'wp' | 'ap' | 'iap';

const getConfig = (behavior: Behavior, source?: Source) => {
  const getBody = () => {
    const body = {
      ip: '',
      uid: '',
      remark: '',
      key: behavior,
      source: source || '',
      sub_type: Platform.OS === 'ios' ? 'LongshengIOS' : 'LongshengAndroid',
    };
    return Object.keys(body)
      .map(key => `${key}=${body[key]}`)
      .join('&');
  };
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: getBody(),
  };
};

export const enterApplication = async () => {
  try {
    await fetch(baseURL, getConfig('open'));
  } catch (error) {
    console.log(error);
  }
};

export const enterSellpage = async () => {
  try {
    await fetch(baseURL, getConfig('sellpage'));
  } catch (error) {
    console.log(error);
  }
};

export const clickWechatPay = async () => {
  try {
    await fetch(baseURL, getConfig('click_buy', 'wp'));
  } catch (error) {
    console.log(error);
  }
};

export const clickAliPay = async () => {
  try {
    await fetch(baseURL, getConfig('click_buy', 'ap'));
  } catch (error) {
    console.log(error);
  }
};

export const succeedInnerAppPurchase = async () => {
  try {
    await fetch(baseURL, getConfig('buy_success', 'iap'));
  } catch (error) {
    console.log(error);
  }
};

export const succeedWechatPay = async () => {
  try {
    await fetch(baseURL, getConfig('buy_success', 'wp'));
  } catch (error) {
    console.log(error);
  }
};

export const succeedAliPay = async () => {
  try {
    await fetch(baseURL, getConfig('buy_success', 'ap'));
  } catch (error) {
    console.log(error);
  }
};

export const clickInnerAppPurchase = async () => {
  try {
    await fetch(baseURL, getConfig('click_buy', 'iap'));
  } catch (error) {
    console.log(error);
  }
};
