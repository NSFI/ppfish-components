# Breadcrumb 面包屑 【交互：叶婧婕 |视觉：徐剑杰 |开发：高志友】

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 基本使用

:::demo 最简单的用法。

```js

render() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="">APP Center</Breadcrumb.Item>
      <Breadcrumb.Item href="">APP List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
```
:::

## 前方带图标

:::demo 图标放在文字前面。

```js
render() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <IconGrid style={{ marginRight: 4 }}/>
        <span>Home</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <IconPie style={{ marginRight: 4 }}/>
        <span>APP List</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <IconMail style={{ marginRight: 4 }}/>
        <span>Application</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
```
:::

## 自定义分隔符

:::demo 使用 `separator=">"` 可以自定义分隔符。

```js
render() {
  return (
    <Breadcrumb separator="/">
      <Breadcrumb.Item href="">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="">APP Center</Breadcrumb.Item>
      <Breadcrumb.Item href="">APP List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
```
:::

## API

### Breadcrumb
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | String | - |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | - |
| maxWidth | Breadcrumb Item 的最大宽度，超出后显示省略号。默认展示全部内容 | Number | - |
| params | 路由的参数 | Object | - |
| routes | router 的路由栈信息 | Array< {path: String, breadcrumbName: String} > | - |
| separator | 自定义分隔符 | String \| ReactNode | `<Icon type="arrow-line-regular" />` |
| size | 自定义大小 | Enum {'default', 'small'} | 'default' |
| style | 容器样式 | Object | - |

### Breadcrumb.Item
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | String | - |
| href | 链接的目的地	 | String | - |
| onClick | 单击事件 |(e:MouseEvent) => void	| - |

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
