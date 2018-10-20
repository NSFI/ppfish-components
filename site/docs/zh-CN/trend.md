# Trend 趋势标记 【交互：翁宇宇 |视觉：徐剑杰 |开发：高志友】

趋势符号，标记上升和下降趋势。

## 何时使用

用于标记上升和下降趋势，通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外。

## 基本使用

:::demo 在数值背后添加一个小图标来标识涨跌情况。

```js

  render() {
    return (
      <div>
        <Trend flag="up" >12%</Trend>
        <Trend flag="down" style={{ marginLeft: 8 }}>11%</Trend>
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
        <Trend flag="up" reverseColor={true} >12%</Trend>
        <Trend flag="down" reverseColor={true} style={{ marginLeft: 8 }}>11%</Trend>
      </div>
    );
  }
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| className | 容器类名 | String | - |
| colorful | 是否彩色标记 | Boolean | true |
| flag | 上升下降标识 | Enum {'up', 'down'} | - |
| reverseColor | 颜色反转 | Boolean | false |
| style | 容器样式 | Object | - |
