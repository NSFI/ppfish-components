// 暴露给外部的接口
// 使用方式
// import {util} from 'ppfish';
// util.dom.getSiblings(e);
import * as bom from './bom';
import * as dom from './dom';
import * as other from './other';
import * as upload from './upload';

export default {
  bom, dom, other, upload
};
