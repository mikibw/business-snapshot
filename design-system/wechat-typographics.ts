import wechatColors from './wechat-colors';

const wechatTypographics = {
  headLine: sans => ({
    fontSize: 22,
    fontFamily: sans ? 'WeChatSansSS-Medium' : undefined,
    color: wechatColors.alpha90,
  }),
  emTitle: sans => ({
    fontSize: 16,
    fontFamily: sans ? 'WeChatSansSS-Medium' : undefined,
    color: wechatColors.alpha90,
  }),
  title: sans => ({
    fontSize: 16,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha90,
  }),
  emGroupTitle: sans => ({
    fontSize: 15,
    fontFamily: sans ? 'WeChatSansSS-Medium' : undefined,
    color: wechatColors.alpha90,
  }),
  groupTitle: sans => ({
    fontSize: 14,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha50,
  }),
  body: sans => ({
    fontSize: 16,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha50,
  }),
  text: sans => ({
    fontSize: 16,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha90,
  }),
  emDesc: sans => ({
    fontSize: 14,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha50,
  }),
  desc: sans => ({
    fontSize: 14,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha30,
  }),
  footnote: sans => ({
    fontSize: 12,
    fontFamily: sans ? 'WeChatSansStd-Regular' : undefined,
    color: wechatColors.alpha30,
  }),
};

export default wechatTypographics;
