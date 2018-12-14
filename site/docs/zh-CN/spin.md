# Spin 加载中 【交互：叶婧婕 |视觉：徐剑杰 |开发：吴圣筑】

用于页面和区块的加载中状态。

## 何时使用

系统与服务器交互时中间产生的等待状态，适用于短时间的交互提示。

## 基本用法

:::demo 独立使用状态：基本状态用圆形选装图标展示，loading一般设有默认值，超出一定时间后则会给到反馈，loading时间根据业务自定义。loading图标的动效为顺时针旋转的样式。

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

## 文字加载样式

:::demo 标点符号式的loading：在文案的结尾用省略号的形式展现loading，省略号的动效为依次出现，满3个后，全部消失，如此循环动效。

```js
render(){
  return(
    <Spin.TextLoading />
  )
}
```
:::

## 自定义指示符

:::demo 使用自定义指示符。

```js
render(){
  return(
    <Spin indicator={<Icon type="load-line" style={{ fontSize: 20 }} spinning />} />
  )
}
```
:::

## 指示符和自定义描述文案结合

:::demo 图标位于文案的前方，文案原则上不超过15个字。自定义描述文案建议为"加载中..."。

```js
render(){
  return(
    <div className="example">
      <Spin tip="加载中..." />
    </div>
  )
}
```

```less
.example {
  text-align: center;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
```
:::

## 作为容器

:::demo 可以将Spin作为容器，为内容加上毛玻璃效果和指示符。

```js
  state = { loading: false }

  toggle = (value) => {
    this.setState({ loading: value });
  }
  
  render(){
    return(
      <div>
        <Spin tip="加载中..." spinning={this.state.loading}>
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
    )
  }
```
:::

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
      <Spin />
    </Spin.Container>
  )
}
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delay | 延迟显示加载效果的时间（防止闪烁） | Number (毫秒) | - |
| indicator | 加载指示符 | ReactNode | - |
| size | 组件大小，可选值为 `'small'` `'default'` `'large'` | Enum {'small', 'default', 'large'} | 'default' |
| spinning | 是否旋转 | Boolean | true |
| tip | 当作为包裹元素时，可以自定义描述文案 | String | - |
| wrapperClassName | 包装器的类属性 | String | - |

### Spin.TextLoading

提供带动效的文字加载中样式，用法:
```js
<Spin.TextLoading />
```

### Spin.Container

提供居中的容器，用法:
```js
<Spin.Container style={{height: 540}}>
  <Spin tip="组件正在加载..." />
</Spin.Container>
```


### 静态方法
`Spin.setDefaultIndicator(indicator: ReactNode)`
同上 `indicator`，你可以自定义全局默认元素
