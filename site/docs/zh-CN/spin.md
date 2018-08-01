# 加载中

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 基本用法

:::demo 一个简单的 loading 状态。

```js
render(){
  return(
    <Spin />
  )
}
```
:::

## 各种大小

:::demo 小的用于文本加载，默认用于卡片容器级加载，大的用于**页面级**加载。

```js
render(){
  return(
    <div>
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </div>
  )
}
```
:::

<style>
.ant-spin {
  margin-right: 16px;
}
</style>

## 容器

:::demo 放入一个容器中。

```js
render(){
  return(
    <div className="example">
        <Spin />
      </div>
  )
}
```
:::
<style>
.example {
  text-align: center;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>

## 自定义描述文案

:::demo 自定义描述文案。

```js
render(){
  return(
    <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
  )
}
```
:::

## 自定义指示符

:::demo 使用自定义指示符。

```js
render(){
  return(
    <Spin indicator={<Icon type="load-line" style={{ fontSize: 24 }} spin />} />
  )
}
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delay | 延迟显示加载效果的时间（防止闪烁） | number (毫秒) | - |
| indicator | 加载指示符 | ReactElement | - |
| size | 组件大小，可选值为 `small` `default` `large` | string | 'default' |
| spinning | 是否旋转 | boolean | true |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | - |
| wrapperClassName | 包装器的类属性 | string | - |
