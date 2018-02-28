// 用户信息辅助方法
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import Cookies from 'js-cookie';
import constants from '../constants/';
import { getConfig } from '../config';
const config = getConfig();
const { ACCESS_TOKEN, USER_INFO } = constants;

// password 加密
export const generateAuthPassword = (password) => {
  return encHex.stringify(md5(password));
};
export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};
export const setAccessToken = (accessToken) => {
  accessToken = accessToken || true;
  Cookies.set(ACCESS_TOKEN, accessToken);
};
export const removeAccessToken = () => {
  return Cookies.remove(ACCESS_TOKEN);
};
export const getHeadpic = (headpic) => {
  const defaultHeadpic = require('../assets/image/components/default-avatar.png');
  return (headpic && headpic.trim && headpic.trim()) || defaultHeadpic;
};

// 跳登录页面
export const redirectLogin = (originUrl, errorMsg) => {
  // isRedirectLogin 是否跳登录页面
  if (!config.isRedirectLogin) {
    return;
  }
  const url = originUrl || location.href;
  // 回跳地址还是登录页面，不合理
  if ( url.indexOf(config.url.login) > -1 ) {
    return;
  }
  let redirectURL = `${config.url.login}?redirectURL=${encodeURIComponent(url)}`;
  // 需要在登录页面显示的错误信息
  if ( errorMsg ) {
    redirectURL += `&errorMsg=${errorMsg}`;
  }
  location.replace(redirectURL);
};
