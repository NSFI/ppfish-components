// ajax 辅助方法
import axios from 'axios';
import debug from 'debug';
import Cookies from 'js-cookie';
const ACCESS_TOKEN='__prophet_access_token';
let config ={
  code:"dc",
  ajaxPrefix: '/sms/api',
  url:{
    login:"",
     // iframe 父页面
     iframeP: '/pigeon/',
  },
  isRedirectLogin: true,
  useFrontCookie:true
};
const ajaxPrefix = config.ajaxPrefix;
const ajaxError = debug('ajax:error');
const ajaxLog = debug('ajax:log');

const defaultConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
if (config.code) {
  defaultConfig.params = {
    code: config.code
  };
}
const removeAccessToken = () => {
  return Cookies.remove(ACCESS_TOKEN);
};
const instance = axios.create(defaultConfig);
export const initConfig=(cfg)=>{
  config=Object.assign(config,cfg);
};
export const postMessage = (mesgObj) => {
  try {
    const targetUrl = `${location.protocol}//${location.host}${config.url.iframeP}`;
    window.parent.postMessage(mesgObj, targetUrl);
  } catch(e) {
    // do nothing
  }
};
/**
 * 基于Promise的ajax请求接口
 * @param {Object} param 参考axios的config
 * @param {String} param.url
 * @param {String} param.method
 * @param {String} param.params 使用Get方法传递参数时使用
 * @param {String} param.data 使用Post/Put/Delete/Patch等方法传递参数时使用
 * @return {Promise}
 */
export function request(param) {
  return new Promise((resolve, reject) => {
    instance(param).then(
      response => {
        const data = response.data;
        const code = data.code;
        if (code == 200) {
          resolve(data);
        }
        else {
          // 未登录或已超时、不存在或已停用企业
          if (code == 4001) {
            if (config.useFrontCookie) {
              removeAccessToken();
            }
            // 通知父级页面登出
            postMessage({
              type: 'logout'
            });
          // 企业短信功能被关闭
          // 6001, "很抱歉，您的短信发送功能已被关闭，请联系管理员"
          // 6002, "很抱歉，您的短信功能已被关闭，请联系管理员"
          } else if (code == 6002) {
            // 通知父级页面跳403
            postMessage({
              type: '403'
            });
          }
          reject(data);
        }
      },
      error => {
        if (axios.isCancel(error)) {
          ajaxLog(`ajax请求${param.url}被取消`, error);
          return;
        }
        reject(error.response ? error.response.data : { result: error.message });
      }
    );
  });
}
