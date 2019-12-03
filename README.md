<p align="center">
  <a href="https://nsfi.github.io/ppfish-components/#/home">
    <img width="150" height="150" src="http://ysf.nosdn.127.net/kornketgjocydxcldzywnyfdtclwugdl">
  </a>
</p>

<h1 align="center">Fish Design 网易云商服UI组件库</h1>

## Introduction
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNSFI%2Fppfish-components.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FNSFI%2Fppfish-components?ref=badge_shield)


Fish Design is an enterprise-class UI component library which based on React, helps designers and developers quickly build systems.

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
import { Button } from 'ppfish';

ReactDOM.render(
  <Button type="primary">Primary</Button>, document.getElementById('app')
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
├── /coverage/                        # 运行npm run test:cover输出的测试覆盖率文件
├── /dist/                            # 构建输出的文件，使用全局变量方式引用，可用于发布到CDN
├── /es/                              # 构建输出的文件，使用ES Module规范引用，可用于tree shaking优化
├── /lib/                             # 构建输出的文件，使用commonjs规范引用
├── /node_modules/                    # 第三方类库和工具
├── /site/                            # 页面入口文件
| ├── /assets                         # css、images等资源
| ├── /componentsPage                 # 组件库官网markdown
| ├── /docs                           # 组件库官网markdown
| ├── /locales                        # 本地化文案
| ├── /pages                          # 组件库官网页面入口
| ├── /static                         # 组件库官网Demo使用的icon
| ├── /styles                         # 组件库官网页面样式
| ├── /index.html                     # 组件库官网html模板
| └── /index.js                       # 组件库官网入口文件
├── /source/                          # 应用源码
│ ├── /assets/                        # 可编译静态资源文件
│ ├── /components/                    # React components
│ ├── /constants/                     # 常量配置文件
│ └── /utils/                         # 工具函数
├── /tools/                           # 项目运行脚本
├── .babelrc                          # babel配置文件, https://babeljs.io/docs/usage/babelrc/
├── .editorconfig                     # 代码风格配置文件, http://editorconfig.org
├── .eslintignore                     # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .eslintrc                         # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .gitignore                        # git配置文件, https://help.github.com/articles/ignoring-files/
├── .npmignore                        # npm配置文件，配置不需要发布到npm仓库的文件黑名单列表
├── .stylelintignore                  # stylelint配置文件
├── .stylelintrc                      # stylelint配置文件
├── jets.config.js                    # jest配置文件
├── package.json                      # 配置入口文件地址、依赖和 scripts
├── postcss.config.js                 # postcss配置文件, https://github.com/postcss/postcss-loader
├── README.md                         # readme
├── tsconfig.json                     # TypeScript配置文件
├── webpack.config.dev.site.js        # 文档网站本地开发编译配置
├── webpack.config.prod.components.js # 组件源码生产环境编译配置
└── webpack.config.prod.site.js       # 文档网站生产环境编译配置
```

## Coding styles
- javascript: use eslint:recommended, see https://eslint.org/docs/rules/ and /site/docs/ESLint规则清单.md  for more details
- directory、html、css、js: named using hump form
- react component and react container: named using hump form and uppercase characters at the beginning
- test file: named with Component + .test + .js format
- Less:  use stylelint:recommended，see /site/docs/LESS代码规范.md for more details


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNSFI%2Fppfish-components.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FNSFI%2Fppfish-components?ref=badge_large)