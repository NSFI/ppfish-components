# Trend 趋势标记 【交互：李东岳 |视觉：徐剑杰 |开发：高志友】

趋势符号，标记上升和下降趋势。

## 何时使用

用于标记上升和下降趋势，通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外。

## 基本使用

:::demo 在数值背后添加一个小图标来标识涨跌情况。

```js

  render() {
    return (
      <div>
        <Trend flag="up" >88万</Trend>
        <Trend flag="down" style={{ marginLeft: 20 }}>88万</Trend>
        <Trend flag="up" style={{ marginLeft: 20 }} value={'5%'}>88万</Trend>
        <Trend flag="down" style={{ marginLeft: 20 }} value={'5%'}>88万</Trend>
      </div>
    );
  }
```
:::

## 颜色反转

:::demo 颜色反转。

```js

  render() {
    return (
      <div>
        <Trend flag="up" reverseColor={true} >88万</Trend>
        <Trend flag="down" reverseColor={true} style={{ marginLeft: 20 }}>88万</Trend>
        <Trend flag="up" reverseColor={true} style={{ marginLeft: 20 }} value={'5%'}>88万</Trend>
        <Trend flag="down" reverseColor={true} style={{ marginLeft: 20 }} value={'5%'}>88万</Trend>
      </div>
    );
  }
```
:::

## 大小

:::demo 设置标识的大小。

```js
  state = { size: 'small' };

  onChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.onChange} style={{ marginBottom: 20 }}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="normal">Normal</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
        <br/>
        <Trend flag="up" size={size}>88万</Trend>
        <Trend flag="down" style={{ marginLeft: 20 }} size={size}>88万</Trend>
        <Trend flag="up" style={{ marginLeft: 20 }} value={'5%'} size={size}>88万</Trend>
        <Trend flag="down" style={{ marginLeft: 20 }} value={'5%'} size={size}>88万</Trend>
      </div>
    );
  }

```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| className | 容器类名 | String | - |
| colorful | 是否使用彩色标记 | Boolean | true |
| flag | 上升或下降的标识 | Enum {'up', 'down'} | - |
| reverseColor | 颜色反转 | Boolean | false |
| size | 标识的大小 | Enum {'small', 'normal', 'large'} | 'small' |
| style | 容器样式 | Object | - |
| value | 上升或下降的值 | String | - |
