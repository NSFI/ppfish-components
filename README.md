# ppfish-components 网易云商服组件库

React + ant-design starter kit / boilerplate with React.js、react-router、Redux、ant-design、WebPack、Less、Jest

## Features

- Babel with ES6
- Hot reloading
- Testing
- Linting
- Local mock server
- Working example app

## Initial Machine Setup

- Install [Node.js](https://nodejs.org/en/)
- （Optional）Install taobao NPM image

   ```bash
   $ npm install -g cnpm --registry=https://registry.npm.taobao.org
   ```
- (freemarker data mock require jdk & NEI)
  - Install [jdk](www.oracle.com/technetwork/java/javase/downloads/index.html)
  - Install nei
  ```
  $ npm install -g nei@3.5.5
  ```

## Get Started

  Install npm(or cnpm) package
  ```
  $ npm install
  ```
  
  Build or Update mock data from NEI
  ```
  $ nei build -k this_is_your_project_uuid
  $ nei update -k this_is_your_project_uuid
  ```
  
  Start development in your default browser
  ```
  $ npm start
  ```
  
  Run the local mock service
  ```
  $ npm run start:mock
  ```

  Build scripts ``````and css etc.
  ```
  $ npm run build
  ```
  
  Start production in your default browser
  ```
  $ npm run open:dist
  ```
  
完整命令请查阅package.json

## Links

- [ant-design](http://ant.design/)
- [react](https://github.com/facebook/react)
- [react-router](https://github.com/reactjs/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [redux](https://github.com/reactjs/redux)
- [redux-devtools](https://github.com/gaearon/redux-devtools)
- [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor)
- [WebPack](http://webpack.github.io/docs/)
- [Less](https://github.com/less/less.js)
- [Jest](https://facebook.github.io/jest/)
- [enzyme](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)
- [debug](https://github.com/visionmedia/debug)


## Demo

run npm start and open [react component demo](localhost:3000/demo) on browser

## The directory structure

```
.
├── /api-mocks/               # 用于api的mock数据，便于开发调试
├── /coverage/                # 运行npm run test:cover输出的测试覆盖率文件
├── /dist/                    # 构建输出的文件会在这里
├── /docs/                    # 项目文档
├── /ftl-mocks/               # 用于ftl文件的同步mock数据，便于开发调试
├── /nei.xxxx/                # 运行nei build构建输出的文件, https://nei.netease.com/
├── /node_modules/            # 第三方类库和工具
├── /source/                  # 应用源码
│ ├── /actions/               # 通用的actions和actionTypes文件
│ ├── /assets/                # 可编译静态资源文件
│ ├── /components/            # React components
│ ├── /config/                # 环境变量配置文件
│ ├── /constants/             # 常量配置文件
│ ├── /data/                  # 提供lite database供mock数据使用
│ ├── /entries/               # 多页打包入口目录
│ ├── /middleware/            # 业务层中间件,处理日志、打点等公共业务逻辑
│ ├── /pages/                 # 页面入口文件
│ | └── /App/                 # 页面目录
│ | | ├── /actions.js         # 页面actions
│ | | ├── /actionTypes.js     # 页面action类型
│ | | ├── /App.js             # 页面组件
│ | | ├── /App.test.js        # 页面组件单元测试文件
│ | | ├── /App.less           # 页面样式
│ | | ├── /index.js           # 页面对外暴露文件
│ | | ├── /rootReducer        # 页面reducer，视情况使用rootReducer文件或划分到reducer目录内
│ | | ├── /reducer/           # 页面reducer，视情况使用rootReducer文件或划分到reducer目录内
│ | | └── /view.js            # 页面视图
│ ├── /reducers/              # 通用的React reducers文件
│ ├── /store/                 # React Store
│ ├── /utils/                 # 工具函数
│ ├── /vendor/                # 不需要编译的静态资源文件，在生产环境可以使用publicPath路径引用
│ ├── /demo.html              # UI component demo
│ ├── /demo.js                # UI component demo
│ └── /favicon.ico            # favicon
├── /tools/                   # 项目运行脚本
├── /views/                   # java freeMarker 文件
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
- css: http://nec.netease.com/standard/css-sort.html
