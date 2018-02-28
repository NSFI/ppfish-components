/**
 * 打包文件已将constants整体打包到vendor.js，为了合理利用浏览器缓存，
 * 其他页面引用constants请使用import from '../constants'，
 * 引用整个文件夹就行了，不需要指定引用到'../constants/limit'
 */
import { limit } from './limit';
const json = Object.assign({}, limit);
export default json;
