// ajax 辅助方法
import axios from 'axios';
import debug from 'debug';
import { redirectLogin, removeAccessToken } from './userInfo';
import { getConfig } from '../config';
const config = getConfig();
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
  defaultConfig.params={
    code: config.code
  };
}
const instance = axios.create(defaultConfig);
/**
 * 基于Promise的ajax请求接口
 * @param {Object} param 参考axios的config
 * @param {String} param.url
 * @param {String} param.method
 * @param {String} param.params 使用Get方法传递参数时使用
 * @param {String} param.data 使用Post/Put/Delete/Patch等方法传递参数时使用
 * @author hzmajianglong@corp.netease.com
 * @return {Promise}
 */
export function request(param){
  return new Promise((resolve, reject)=>{
    instance(param).then(
      response =>{
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
            redirectLogin(undefined, data.result);
          }
          // 权限不足，跳转到landing页面
          else if (code == 4002) {
            location.replace(config.url.landing);
          }
          reject(data);
        }
      },
      error =>{
        if (axios.isCancel(error)) {
          ajaxLog(`ajax请求${param.url}被取消`, error);
          return;
        }
        reject(error.response ? error.response.data : {result: error.message});
      }
    );
  });
}
