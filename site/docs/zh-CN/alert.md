# 警告提示

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。


## 基本

:::demo 最简单的用法，适用于简短的警告提示。

```js
render(){
  return(
  <Alert message="Success Text" type="success" />)
}
```
:::

<style>
.ant-alert {
  margin-bottom: 16px;
}
</style>

## 四种样式

:::demo 共有四种样式 `success`、`info`、`warning`、`error`。

```js
render(){
  return(
    <div>
      <Alert message="Success Text" type="success" />
      <Alert message="Info Text" type="info" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />
    </div>
  )
}
```
:::


## 可关闭的警告提示

:::demo 显示关闭按钮，点击可关闭警告提示。

```js
onClose = (e)=> {
  console.log(e, 'I was closed.');
};

render(){
  return(
    <div>
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={this.onClose}
      />
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
        closable
        onClose={this.onClose}
      />
    </div>
    );
}
```
:::

## 含有辅助性文字介绍

:::demo 含有辅助性文字介绍的警告提示。

```js
render(){
  return(
  <div>
    <Alert
      message="Success Text"
      description="Success Description Success Description Success Description"
      type="success"
    />
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <Alert
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </div>)
}
```
:::

## 图标

:::demo 可口的图标让信息类型更加醒目。

```js
render(){
  return(
  <div>
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon />
    <Alert message="Error" type="error" showIcon />
    <Alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      showIcon
    />
    <Alert
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      showIcon
    />
    <Alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
    />
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </div>)
  }
```
:::

## 自定义关闭

:::demo 可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`。

```js

render(){
  return(<Alert message="Info Text" type="info" closeText="Close Now" />)
  }
```
:::

## 顶部公告

:::demo 页面顶部通告形式，默认有图标且`type` 为 'warning'。

```js
render(){
  return(
  <div>
    <Alert message="Warning text" banner />
    <br />
    <Alert message="Very long warning text warning text text text text text text text" banner closable />
    <br />
    <Alert showIcon={false} message="Warning text without icon" banner />
    <br />
    <Alert type="error" message="Error text" banner />
  </div>)
  }
```
:::

## 平滑地卸载

:::demo 平滑、自然的卸载提示

```js
  state = {
    visible: true,
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        {
          this.state.visible ? (
            <Alert
              message="Alert Message Text"
              type="success"
              closable
              afterClose={this.handleClose}
            />
          ) : null
        }
        <p>placeholder text here</p>
      </div>
    );
  }
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | 关闭动画结束后触发的回调函数 | () => void | - |
| banner | 是否用作顶部公告 | boolean | false |
| closable | 默认不显示关闭按钮 | boolean | 无 |
| closeText | 自定义关闭按钮 | string\|ReactNode | 无 |
| description | 警告提示的辅助性文字介绍 | string\|ReactNode | 无 |
| iconType | 自定义图标类型，`showIcon` 为 `true` 时有效 | string | - |
| message | 警告提示内容 | string\|ReactNode | 无 |
| showIcon | 是否显示辅助图标 | boolean | false，`banner` 模式下默认值为 true |
| type | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | string | `info`，`banner` 模式下默认值为 `warning` |
| onClose | 关闭时触发的回调函数 | (e: MouseEvent) => void | 无 |
