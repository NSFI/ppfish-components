# 快速上手

## 安装
推荐使用 npm 的方式安装，它能更好地和`webpack`打包工具配合使用。
若安装缓慢报错，可尝试用 cnpm 或别的镜像源自行安装：rm -rf node_modules && cnpm install。

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

## 自定义编译

Fish Design使用了react和Typescript，在编译时除了需要配置babel-loader，还需要使用ts-loader或awesome-typescript-loader编译tsx代码。
以下列举了Typescript编译所需的步骤：

1. 安装依赖包

```shell
npm install typescript awesome-typescript-loader@^4.0.1 @types/node @types/react @types/react-dom --save-dev
```

注意：如果项目webpack版本是3.x，awesome-typescript-loader版本不能高于4.xw

2. 配置awesome-typescript-loader


```js
// webpack.config.js
{
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'source'),
          // issues: [Symlinks in project - loader not working when using include](https://github.com/webpack/webpack/issues/1643)
          fs.realpathSync(__dirname + '/node_modules/ppfish') // 指定使用awesome-typescript-loader编译ppfish源码
        ],
        use: [{
          loader: 'awesome-typescript-loader'
        }]
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'source'),
          fs.realpathSync(__dirname + '/node_modules/ppfish') // 指定使用babel-loader编译ppfish
        ],
        // exclude: /(node_modules|vendor)\/(?!(ppfish)\/).*/, // 优先于include，排除ppfish
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
    ],
  }
}
```


## 使用CDN上的ppfish组件库

请先将组件库上传至CDN上。从CDN上引入ppfish组件库与使用CDN上的React库文件的方式是一样的，直接在html文件中加入一个script标签，这个标签地址是CDN上的ppfish组件库地址。由于ppfish组件库依赖于react、react-dom、react-dom/server这三个库文件，所以请确保这三个文件在组件库的script的标签之前就已经加载了。可能还需要手动引入组件库的样式。

使用CDN上的组件库时，如果需要自定义主题，需要在项目中安装ppfish组件库作为依赖，然后在代码中引入 `ppfish/dist/style.less` 这个样式文件。具体细节，可参考**开发指南 - 定制主题**。
```html
<html>
  <head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
      <link rel="stylesheet" href="ppfish.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.3.0/umd/react.production.min.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.3.0/umd/react-dom.production.min.js"></script>
    <script src="ppfish.js"></script>

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
