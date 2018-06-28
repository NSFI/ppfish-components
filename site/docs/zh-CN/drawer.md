# 抽屉组件

## 何时使用

当需要整理、收纳一些模块内容的展示时，可以考虑用抽屉组件。

## 基本使用

:::demo 基本使用方式。

```js
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleOpen = e => {
    this.setState({
      visible: true
    });
  };

  handleClose = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {visible} = this.state;

    return (
      <div>
        <p>The container should be relative positioned and overflow hidden.</p>
        <div className="g-container" 
          style={{
            height:400, 
            position:"relative",
            overflow:"hidden",
            border:"1px solid #ccc",
            backgroundColor: "#fff",
            marginBottom:20
          }}
        >
          <Drawer 
            visible={visible}
            style={{width: 650}}
            onClose={this.handleClose}>
            <div style={{padding:"20px"}}>This is custom contents.</div>
          </Drawer>
        </div>
        <button onClick={this.handleOpen}>Open Drawer</button>
      </div>
    );
  }
```
:::


## API
| 属性      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
| visible  | 是否打开抽屉 | bool  | false |
| className  | 设置类名 | string  | - |
| style  | 设置样式 | object | - |
| container  | 指定挂载的 HTML 节点 |  (instance): HTMLElement | - |
| onClose  | 关闭抽屉时的回调函数 | function   | - |
