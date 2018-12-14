# Switch 开关 【交互：蒋蕊遥 |视觉：徐剑杰 |开发：王晓玲】

功能的开关组件。

## 何时使用

- 适用于在开关状态，或两个互斥状态中进行切换。切换的结果会即时作用于页面。
- 和 `checkbox`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 基本用法
:::demo 最简单的用法。
```js
  onChange = (checked) => {
    console.log(`switch to ${checked}`);
  }
  
  render() {
    return (
      <Switch defaultChecked onChange={this.onChange} />
    )
  }
```
:::

## 不可用
:::demo Switch 失效状态。
```js
  state = {
    disabled: true,
  }

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} defaultChecked />
        <br />
        <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
      </div>
    );
  }
```

```less
.fishd-switch{
  margin-bottom: 8px;
}
```
:::

## 文字和图标
:::demo 带有文字和图标。
```js
  render() {
    return (
      <div>
        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
        <br />
        <Switch checkedChildren="1" unCheckedChildren="0" />
        <br />
        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
      </div>
    );
  }
```
```less
.fishd-switch{
  margin-bottom: 8px;
}
```
:::

## 三种大小
:::demo `size="small"` 表示小号开关；`size="large"` 表示大号开关
```js
  render() {
    return (
      <div>
        <Switch size="small" defaultChecked />
        <br />
        <Switch defaultChecked />
        <br />
        <Switch size="large" defaultChecked />
        <br />
        <Switch size="small" defaultChecked checkedChildren="开" unCheckedChildren="关"/>
        <br />
        <Switch defaultChecked checkedChildren="开" unCheckedChildren="关"/>
        <br />
        <Switch size="large" defaultChecked checkedChildren="开" unCheckedChildren="关"/>
      </div>
    );
  }
```
```less
.fishd-switch{
  margin-bottom: 8px;
}
```
:::

## 加载中
:::demo 标识开关操作仍在执行中。
```js
  render() {
    return (
      <div>
        <Switch size="small" loading />
        <br />
        <Switch loading defaultChecked />
        <br />
        <Switch size="large" loading />
      </div>
    );
  }
```
```less
.fishd-switch{
  margin-bottom: 8px;
}
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 组件自动获取焦点 | Boolean | false |
| checked | 指定当前是否选中 | Boolean | false |
| checkedChildren | 选中时的内容 | String \| ReactNode | - |
| className | 选择器的className | String | - |
| defaultChecked | 初始是否选中 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| loading | 加载中的开关 | Boolean | false |
| onChange | 变化时回调函数 | (checked:Boolean) => Void | - |
| size | 开关大小 | Enum {'default', 'small', 'large'} | 'default' |
| unCheckedChildren | 非选中时的内容 | String \| ReactNode | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
