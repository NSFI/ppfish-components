## Introduction

### bom
新增

### dom
新增了这个文件，从table.js里提取出getSiblings，保留table.js作为其他组件的辅助工具

### number
增加了方法bytesToSize；修改了注释

### other
其他不好命名及归类的放这

### upload
新增

## 建议export配置
```js
import * as bom from '../utils/bom';

import * as dom from '../utils/dom';

import * as number from '../utils/number';

import * as other from '../utils/other';

import * as upload from '../utils/upload';

import {iframeC} from './src/utils/iframeC';

const util = {
  bom, dom, number, other, upload, iframeC
}

export {util};
```
## Usage

```js
import {util} from 'ppfish';

util.dom.getSiblings(e);
util.iframeC.openNumberInput();

```
