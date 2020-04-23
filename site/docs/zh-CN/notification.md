# Notification 通知提醒框 【交互：叶婧婕 | 视觉：徐剑杰 |开发：吴圣筑】

全局展示通知提醒信息。

## 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 基本

:::demo 最简单的用法，4.5 秒后自动关闭。

```js
openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

render(){
  return(
      <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
  )
}
```
:::

## 自动关闭的延时

:::demo 自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0` 即可。

```js
openNotification = () => {
  const args = {
    message: 'Notification Title',
    description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
    duration: 0,
  };
  notification.open(args);
};

render(){
  return(
      <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
  )
}
```
:::

## 带有图标的通知提醒框

:::demo 通知提醒框左侧有图标。

```js
openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

render(){
  return(
     <div className="code-notification-demo">
        <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
      </div>
  )
}
```

```less
.code-notification-demo .fishd-btn {
  margin-right: 1em;
}
```
:::

## 自定义按钮

:::demo 自定义关闭按钮的样式和文字。

```js
close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Notification Title',
    description: 'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
    btn,
    key,
    onClose: this.close,
  });
};

render(){
  return(
      <Button type="primary" onClick={this.openNotification}>
        Open the notification box
      </Button>
  )
}
```
:::

## 自定义图标

:::demo 图标可以被自定义。

```js
openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: <Icon type="richeditor-expressio" style={{ color: '#108ee9' }} />,
  });
};

render(){
  return(
      <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
  )
}
```
:::

## 位置

:::demo 可以设置通知从右上角、右下角、左下角、左上角弹出。

```js
openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

render(){
  const { Option } = Select;
  const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  return(
      <div>
        <Select
          defaultValue="topRight"
          style={{ width: 120, marginRight: 10 }}
          onChange={(val) => {
            notification.config({
              placement: val,
            });
          }}
        >
          {options.map(val => <Option key={val} value={val}>{val}</Option>)}
        </Select>
        <Button
          type="primary"
          onClick={this.openNotification}
        >
          Open the notification box
        </Button>
      </div>
  )
}
```
:::

## 自定义样式

:::demo 使用 style 和 className 来定义样式。

```js
openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    style: {
      width: 600,
      marginLeft: 335 - 600,
    },
  });
};

render(){
  return(
      <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
  )
}

```
:::

## 更新消息内容

:::demo 可以通过唯一的 key 来更新内容。

```js
openNotification = () => {
  notification.open({
    key:'updatable',
    message: 'Notification Title',
    description: 'description.',
  });
  setTimeout(() => {
    notification.open({
      key:'updatable',
      message: 'New Title',
      description: 'New description.',
    });
  }, 1000);
};

render(){
  return(
      <Button type="primary" onClick={this.openNotification}>Open the notification box</Button>
  )
}
```
:::

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.close(key: String)`
- `notification.destroy()`

config 参数如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| btn | 自定义关闭按钮 | ReactNode | - |
| className | 自定义 CSS class | String | - |
| description | 通知提醒内容，必选 | String | ReactNode | - |
| duration | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭 | Number | 4.5 |
| icon | 自定义图标 | ReactNode | - |
| key | 当前通知唯一标志 | String | - |
| message | 通知提醒标题，必选 | String | ReactNode | - |
| onClose | 点击默认关闭按钮时触发的回调函数，函数参数 key 为关闭方式，manual 表示点击关闭按钮关闭；auto 表示自动关闭 | (key: String) => Void | - |
| placement | 弹出位置，可选 `'topLeft'` `'topRight'` `'bottomLeft'` `'bottomRight'` | Enum {'topLeft', 'topRight', 'bottomLeft', 'bottomRight'} | 'topRight' |
| style | 自定义内联样式 | Object | - |

还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

- `notification.config(options)`

```js
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bottom | 消息从底部弹出时，距离底部的位置，单位像素。 | Number | 24 |
| duration | 默认自动关闭延时，单位秒 | Number | 4.5 |
| getContainer | 配置渲染节点的输出位置 | () => HTMLElement | () => document.body |
| placement | 弹出位置，可选 `'topLeft'` `'topRight'` `'bottomLeft'` `'bottomRight'` | Enum {'topLeft', 'topRight', 'bottomLeft', 'bottomRight'} | 'topRight' |
| top | 消息从顶部弹出时，距离顶部的位置，单位像素。 | Number | 24 |
