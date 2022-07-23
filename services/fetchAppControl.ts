import {Platform} from 'react-native';
import Constants from 'expo-constants';

export enum AppProductState {
  Audit = '0',
  ProAliPayMainly = '1',
  ProWechatPayMainly = '2',
  ProAliPayOnly = '3',
  ProWechatPayOnly = '4',
}

export interface AppControl {
  id: number;
  version: string; //版本号
  is_onlie: AppProductState; //0表示审核版本 1表示线上版本
  app: string; //app名称
  product_id: string; //内购产品ID
  describe: string;
  button_desc: string; //审核版本订阅按钮文案
  button_desc_online: string; //线上版本订阅按钮文案
}

export const isAppProduction = (appControl: AppControl | null) => {
  if (!appControl) return false;
  if (appControl.is_onlie === AppProductState.Audit) return false;
  return true;
};

const fetchAppControl = () => {
  const app = Platform.OS === 'ios' ? 'LongshengIOS' : 'LongshengAndroid';
  const vv = Constants.manifest?.version ?? '';
  return fetch(`http://vvcontrol.rzrzrz.top/translate_config?app=${app}&vv=${vv}`)
    .then(resp => resp.json())
    .then(json => json.data as AppControl);
};

export default fetchAppControl;
