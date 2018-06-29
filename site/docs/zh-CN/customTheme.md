# 定制主题
ppfish在设计规范上支持一定程度的样式定制。

## 样式变量
ppfish的样式使用了 Less 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。
 - [默认样式变量](https://github.com/NSFI/ppfish-components/blob/master/source/assets/css/lib/ant-theme-vars.less)

## 定制方式


1.  安装依赖包


```js
npm install ppfish --save-dev
npm install babel-plugin-import --save-dev
npm install less-vars-to-js --save-dev
npm install less less-loader css-loader style-loader --save-dev
```
  
  
2.  配置Babel-loader


```js
//.babelrc
{ 
  "presets: [...]
  "plugins": [
    ["import", {"libraryName": "antd", "style": true} ],
    ...
  ]
}
// webpack.config.js
module: {
  rules: [
    {
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js$/,
      options: {
        presets: [...]
        plugins: [
          ['import', { libraryName: "antd", style: true }]
        ]
      },
    },
  ]
}
```


3.  创建自定义主题 .less文件


```js
// custom-theme-vars.less
// Available theme variables can be found in
// https://github.com/NSFI/ppfish-components/blob/master/source/assets/css/lib/ant-theme-vars.less
@primary-color: #193D71; // 这里是自定义的颜色
```

4.  配置webpack less-loader


```js
// webpack.config.js
const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './custom-theme-vars.less'), 'utf8'));

module: {
  rules: [
    {
      test: /\.less$/,
      use: [
        {loader: "style-loader"},
        {loader: "css-loader"},
        {loader: "less-loader",
          options: {
            modifyVars: themeVariables
          }
        }
      ]
    }
  ]
}
```
  
  
5. fonts配置


```js
// webpack.config.js
const path = require('path');
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './custom-theme-vars.less'), 'utf8'));
// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'//localhost:8080/fonts/iconfont'";
```
