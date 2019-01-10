# 快速上手

## 安装
推荐使用 npm 的方式安装，它能更好地和`webpack`打包工具配合使用。
若安装缓慢报错，可尝试用 cnpm 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`。

```shell
npm i ppfish --save
```

## 使用

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'ppfish';

ReactDOM.render(
  <Button type="primary">Primary</Button>, document.getElementById('app')
);

```

## 按需加载

通常情况下可能只使用了部分组件，如果你使用 `import { Button } from 'ppfish'`，babel通常会把整个ppfish打包出来。
你可以使用babel插件，比如 [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)，将这种写法在编译时自动转换成 `import Button from 'ppfish/es/components/Button'`; 
不过你需要告诉 [babel-plugin-transform-imports]((https://www.npmjs.com/package/babel-plugin-transform-imports)) 插件ppfish组件的路径名规则。

```js
// 列举babel7支持的babel.config.js配置写法：
module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);
  return {
    plugins: [
      "transform-imports", {
        "ppfish": {
          "transform": "ppfish/es/components/${member}"
        },
      }
    ]
  };
};

```

__注意：由于组件引入公共样式时使用的是 reference 方式，按需加载时公共的样式不会打包出去，需要使用 `import 'ppfish/es/assets/css/index.less'` 手动引入。__


## 使用CDN上的ppfish组件库

请使用已经存在的CDN资源或自行打包并上传至CDN上。从CDN上引入ppfish组件库与使用CDN上的React库文件的方式是一样的，都是在html文件中使用script标签引用CDN资源。由于ppfish组件库依赖于react、react-dom这两个库文件，所以请确保这两个文件的位置在组件库的CDN资源之前。另外还需要手动引入组件库的样式CDN资源。

使用CDN上的组件库时，如果需要自定义主题，需要在项目中安装ppfish组件库作为依赖，然后在代码中引入 `ppfish/dist/style.less` 这个样式文件。具体细节，可参考**开发指南 - 定制主题**。
```html
<html>
  <head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ppfish@1.5.2/dist/ppfish.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.3.0/umd/react.production.min.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.3.0/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ppfish@1.5.2/dist/ppfish.min.js"></script>

    <script type="text/jsx">
      console.log(window['ppfish'])
      const Select = window['ppfish'].Select;
      const Button = window['ppfish'].Button;
      class App extends React.Component {
        render() {
          return (
            <div className="demo-select">
              <Select mode={'multiple'} errorMessage={'最多仅能选择3项'} labelClear maxCount={3} style={{width: 300, margin: 10}} showSelectAll>
                <Select.Option value={"1"}>{'选项1'}</Select.Option>
                <Select.Option value={"2"} disabled>{'选项2'}</Select.Option>
                <Select.Option value={"3"}>{'选项3'}</Select.Option>
                <Select.Option value={"4"}>{'比较长的选项比较长的选项-选项4'}</Select.Option>
                <Select.Option value={"5"}>{'选项5'}</Select.Option>
              </Select>
            </div>
          )
        }
      }

      ReactDOM.render(<App/>, document.getElementById('root'));
    </script>
  </body>
</html>
```

## 演示环境

[Fish Design 演示环境](https://nsfi.github.io/ppfish-demo/#/homePage/home)
