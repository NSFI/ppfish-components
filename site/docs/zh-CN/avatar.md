# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。


## 基本

:::demo 头像有三种尺寸，两种形状可选。

```js
render(){
  return(
  <div id="components-avatar-demo-basic">
    <div>
      <Avatar size="large" icon="user" />
      <Avatar icon="user" />
      <Avatar size="small" icon="user" />
    </div>
    <div>
      <Avatar shape="square" size="large" icon="user" />
      <Avatar shape="square" icon="user" />
      <Avatar shape="square" size="small" icon="user" />
    </div>
  </div>)
  }
```
:::

<style>
#components-avatar-demo-basic .fishd-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
</style>

## 类型

:::demo 支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。

```js
render(){
  return(
  <div id="components-avatar-demo-type">
    <Avatar icon="user" />
    <Avatar>U</Avatar>
    <Avatar>USER</Avatar>
    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
  </div>)
  }
```
:::

<style>
#components-avatar-demo-type .fishd-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
</style>

## 自动调整字符大小

:::demo 对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

```js
  constructor(props) {
    super(props);
    this.state = {
      user: 'U',
      color: '#f56a00',
    };
  }

  changeUser = () => {
    const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const index = UserList.indexOf(this.state.user);
    this.setState({
      user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
      color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
    });
  }

  render() {
    return (
      <div>
        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
          {this.state.user}
        </Avatar>
        <Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }} onClick={this.changeUser}>
          Change
        </Button>
      </div>
    );
  }
```

:::

## 带徽标的头像

:::demo 通常用于消息提示。

```js
render(){
  return(
  <div>
    <span style={{ marginRight: 24 }}>
      <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
    </span>
    <span>
      <Badge dot><Avatar shape="square" icon="user" /></Badge>
    </span>
  </div>)
  }
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 类名 | String | - |
| icon | 设置头像的图标类型，参考 `Icon` 组件 | String | - |
| shape | 指定头像的形状 | Enum {'circle', 'square'} | 'circle' |
| size | 设置头像的大小 | Enum {'large', 'small', 'default'} | 'default' |
| src | 图片类头像的资源地址 | String | - |
| alt | 图像无法显示时的替代文本 | String | - |
| onError | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | ()=>boolean | - |
