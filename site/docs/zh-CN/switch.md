# 开关

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
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
:::

## 两种大小
:::demo `size="small"` 表示小号开关。
```js
  render() {
    return (
      <div>
        <Switch defaultChecked />
        <br />
        <Switch size="small" defaultChecked />
      </div>
    );
  }
```
:::

## 加载中
:::demo 标识开关操作仍在执行中。
```js
  render() {
    return (
      <div>
        <Switch loading defaultChecked />
        <br />
        <Switch size="small" loading />
      </div>
    );
  }
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 组件自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| checkedChildren | 选中时的内容 | string\|ReactNode |  |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| loading | 加载中的开关 | boolean | false |
| size | 开关大小，可选值：`default` `small` | string | default |
| unCheckedChildren | 非选中时的内容 | string\|ReactNode |  |
| onChange | 变化时回调函数 | Function(checked:Boolean) |  |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

<style> .ant-switch { margin-bottom: 8px; } </style>
