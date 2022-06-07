<p align="center">
  <a href="https://nsfi.github.io/ppfish-components/#/home">
    <img width="150" height="150" src="https://ysf.qiyukf.net/kornketgjocydxcldzywnyfdtclwugdl">
  </a>
</p>

<h1 align="center">Fish Design</h1>

<div align="center">

[![Travis branch](https://api.travis-ci.org/NSFI/ppfish-components.svg?branch=master)](https://www.travis-ci.org/NSFI/ppfish-components) ![CI Status](https://github.com/NSFI/ppfish-components/workflows/test/badge.svg) [![](https://badgen.net/npm/v/ppfish?icon=npm)](https://www.npmjs.com/package/ppfish) [![NPM downloads](http://img.shields.io/npm/dm/ppfish.svg?style=flat-square)](https://www.npmjs.com/package/ppfish) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNSFI%2Fppfish-components.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FNSFI%2Fppfish-components?ref=badge_shield)

</div>

## Introduction

Fish Design is an enterprise-class UI component library which based on React, helps designers and developers quickly build systems.

## Features

- Babel with ES6
- Hot reloading
- Testing
- Linting
- Working example app
- Server side rendering

## Browsers Support

- Modern browsers and Internet Explorer 11+

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --- | --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

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

Browser

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'ppfish';

ReactDOM.render(<Button type="primary">Primary</Button>, document.getElementById('app'));
```

Node.js SSR

```js
const { renderToString } = require('react-dom/server');
const Button = require('ppfish/node/components/Button');
const http = require('http');

http
  .createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      const html = renderToString(<Button type="primary">Primary</Button>);
      res.end(html);
    }
  })
  .listen(8080);
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

Build scripts and css etc.

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
├── /coverage/                        # 运行npm run test:cover输出的测试覆盖率文件
├── /dist/                            # 构建输出的文件，使用全局变量方式引用，可用于发布到CDN
├── /docs                             # 项目文档
├── /es/                              # 构建输出的文件，使用ES Module规范引用，可用于tree shaking优化
├── /lib/                             # 构建输出的文件，使用commonjs规范引用
├── /node/                            # 构建输出的文件，适合node环境运行
├── /node_modules/                    #
├── /site/                            # 组件库官网
| ├── /assets                         #
| ├── /componentsPage                 # 组件库官网页面
| ├── /docs                           # 组件库官网文档
| ├── /locales                        # 组件库官网本地化文案
| ├── /pages                          #
| ├── /static                         # 组件库官网Demo使用的icon
| ├── /styles                         #
| ├── /index.html                     #
| └── /index.js                       #
├── /source/                          # 组件源码
│ ├── /assets/                        #
│ ├── /components/                    # React components
│ ├── /hooks/                         #
│ ├── /typings /                      #
│ └── /utils/                         #
├── /tools/                           # 项目脚本
├── .babelrc                          #
├── .editorconfig                     #
├── .eslintignore                     #
├── .eslintrc                         #
├── .gitignore                        #
├── .npmignore                        #
├── .stylelintignore                  #
├── .stylelintrc                      #
├── .travis.yml                       #
├── jets.config.js                    #
├── package.json                      #
├── postcss.config.js                 #
├── README.md                         #
├── tsconfig.json                     #
├── webpack.config.dev.site.js        # 文档网站本地开发编译配置
├── webpack.config.prod.components.js # 组件源码生产环境编译配置
└── webpack.config.prod.site.js       # 文档网站生产环境编译配置
```
