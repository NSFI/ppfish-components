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
.fishd-spin {
  margin-right: 16px;
}
</style>

## 放入一个容器中

:::demo 放入一个容器中，通过容器的样式控制Spin的位置。

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

## 使用带居中效果的容器

:::demo 使用Spin.Contaner作为容器，实现居中显示。

```js
render(){
  return(
    <Spin.Container style={{height: 200}}>
      <Spin tip="Loading..." />
    </Spin.Container>
  )
}
```
:::

## 自定义描述文案

:::demo 自定义描述文案为"Loading..."。

```js
render(){
  return(
    <div className="example">
      <Spin tip="Loading..." />
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

## 卡片加载中

:::demo 可以直接把内容内嵌到 `Spin` 中，将现有容器变为加载状态。

```js
  state = { loading: false }

  toggle = (value) => {
    this.setState({ loading: value });
  }

  render() {
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        <div style={{ marginTop: 16 }}>
          Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
        </div>
      </div>
    );
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

## 作为容器

:::demo 作为容器，为内容加上毛玻璃效果和指示符。

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

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delay | 延迟显示加载效果的时间（防止闪烁） | number (毫秒) | - |
| indicator | 加载指示符 | ReactElement | - |
| size | 组件大小，可选值为 `small` `default` `large` | string | 'default' |
| spinning | 是否旋转 | boolean | true |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | - |
| wrapperClassName | 包装器的类属性 | string | - |

## Spin.Container

提供居中的容器，用法:
```js
<Spin.Container style={{height: 540}}>
  <Spin tip="组件正在加载..." />
</Spin.Container>
```


## 静态方法
`Spin.setDefaultIndicator(indicator: ReactElement)`
同上 `indicator`，你可以自定义全局默认元素
