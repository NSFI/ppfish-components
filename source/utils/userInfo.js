// 用户信息辅助方法
import { getConfig } from '../config';
const config = getConfig();

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
