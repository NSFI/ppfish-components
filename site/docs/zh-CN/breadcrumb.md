# Breadcrumb 面包屑 【交互：叶婧婕 |视觉：徐剑杰 |开发：高志友】

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 基本

:::demo 最简单的用法。

```js

render() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
```
:::

## 带有图标的

:::demo 图标放在文字前面。

```js
render() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <img className="img-icon-14 fishdicon" src="./static/icons/demo-grid.svg" />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <img className="img-icon-14 fishdicon" src="./static/icons/demo-pie.svg" />
        <span>Application List</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <img className="img-icon-14 fishdicon" src="./static/icons/demo-mail.svg" />
        <span>Application</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
```
:::

## 分隔符

:::demo 使用 `separator=">"` 可以自定义分隔符。

```js
render() {
  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
      <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | String | - |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | - |
| maxWidth | Breadcrumb Item 的最大宽度，超出后显示省略号。默认展示全部内容 | Number | - |
| params | 路由的参数 | Object | - |
| routes | router 的路由栈信息 | Array<{path: String, breadcrumbName: String}> | - |
| separator | 分隔符自定义 | String \| ReactNode | '/' |
| style | 容器样式 | Object | - |

### 和 browserHistory 配合

和 react-router 一起使用时，默认生成的 url 路径是带有 `#` 的，如果和 browserHistory 一起使用的话，你可以使用 `itemRender` 属性定义面包屑链接。

```js
import { Link } from 'react-router';

const routes = [{
  path: 'index',
  breadcrumbName: '首页'
}, {
  path: 'first',
  breadcrumbName: '一级面包屑'
}, {
  path: 'second',
  breadcrumbName: '当前页面'
}];
function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

return <Breadcrumb itemRender={itemRender} routes={routes}/>;
```
