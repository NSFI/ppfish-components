# PPFish Components 网易云商服组件库

## Introduction

PPFish Components is a set of React UI components.

## Features

- Babel with ES6
- Hot reloading
- Testing
- Linting
- Working example app

## Initial Machine Setup

- Install [Node.js](https://nodejs.org/en/)
- （Optional）Install taobao NPM image

   ```bash
   $ npm install -g cnpm --registry=https://registry.npm.taobao.org
   ```

## Install

```bash
npm install ppfish --save
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { AnimationImageLoader } from 'ppfish';

ReactDOM.render(
  <AnimationImageLoader
    extraCls="u-nav-icon"
    src={require('./create_POI@2x.png')}
    zoom={0.5}
  />, document.getElementById('app')
);

```

## Development

  Install npm(or cnpm) package
  ```
  $ npm install
  ```
  
  Start development in your default browser
  ```
  $ npm start
  ```
  
Open your browser and visit http://127.0.0.1:5000

## Build

  Build scripts ``````and css etc.
  ```
  $ npm run build
  ```

  Build site
  ```
  $ npm run build:site
  ```

## Links

- [ant-design](http://ant.design/)
- [react](https://github.com/facebook/react)
- [WebPack](http://webpack.github.io/docs/)
- [Less](https://github.com/less/less.js)
- [Jest](https://facebook.github.io/jest/)
- [enzyme](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)


## The directory structure

```
.
├── /coverage/                # 运行npm run test:cover输出的测试覆盖率文件
├── /dist/                    # 构建输出的文件会在这里
├── /docs/                    # 项目文档
├── /node_modules/            # 第三方类库和工具
├── /site/                    # 页面入口文件
| ├── /assets                 # css、images等资源
| ├── /docs                   # 组件库官网markdown
| ├── /localse                # 本地化文案
| ├── /pages                  # 组件库官网页面入口
| ├── /styles                 # 组件库官网页面样式
| ├── /home.js                # 组件库官网首页
| ├── /index.html             # 组件库官网html模板
| ├── /index.js               # 组件库官网入口文件
| ├── /page.js                # 组件库官网组件页面
| └── /spec.js                # 组件库官网设计语言页面
├── /source/                  # 应用源码
│ ├── /assets/                # 可编译静态资源文件
│ ├── /components/            # React components
│ ├── /config/                # 环境变量配置文件
│ ├── /constants/             # 常量配置文件
│ ├── /utils/                 # 工具函数
│ └── /vendor/                # 不需要编译的静态资源文件，在生产环境可以使用publicPath路径引用
├── /tools/                   # 项目运行脚本
├── .babelrc                  # babel配置文件, https://babeljs.io/docs/usage/babelrc/
├── .editorconfig             # 代码风格配置文件, http://editorconfig.org
├── .eslintrc                 # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .eslintignore             # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .gitignore                # git配置文件, https://help.github.com/articles/ignoring-files/
├── package.json              # 配置入口文件地址、依赖和 scripts
├── postcss.config.js         # postcss配置文件, https://github.com/postcss/postcss-loader
├── proxy.config.js           # 代理配置文件, 用于 mock 和在线调试
└── webpack.config.dev.js     # webpack开发环境配置
└── webpack.config.prod.js    # webpack生产环境配置
```

## Coding styles
- javascript: use eslint:recommended, see https://eslint.org/docs/rules/ and .eslintrc file for more details
- directory、html、css、js: named using hump form
- react component and react container: named using hump form and uppercase characters at the beginning
- test file: named with Component + .test + .js format
- css: https://nsfi.github.io/blog/2017/12/06/Less%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/
