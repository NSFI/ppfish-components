# Modal 对话框 【交互：蒋蕊遥 | 视觉：徐剑杰 |开发：吴圣筑】

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `Modal.confirm()` 等方法。

## 基本

:::demo 第一个对话框。

```js
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
      </div>
    );
  }
```
:::

## 异步关闭

:::demo 点击确定后异步关闭对话框，例如提交表单。

```js
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
```
:::

## 确认对话框

:::demo 使用 `confirm()` 可以快捷地弹出确认框。

```js
showConfirm=() => {
  const confirm = Modal.confirm;
  confirm({
    title: 'Do you want to submit this file?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

showDeleteConfirm=() => {
  const confirm = Modal.confirm;
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

render(){
  return(
      <div className="demo-modal-btn-group">
        <Button onClick={this.showConfirm}>
          Confirm
        </Button>
        <Button onClick={this.showDeleteConfirm} type="dashed">
          Delete
        </Button>
      </div>
  )
}
```
:::

## 确认对话框Promise

:::demo 使用 `confirm()` 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭

```js

showConfirm=() => {
  const confirm = Modal.confirm;
  confirm({
    title: 'Do you want to submit this file?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

render(){
  return(
    <Button onClick={this.showConfirm}>
        Confirm
      </Button>
  )
}
```
:::

## 自定义页脚

:::demo 更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。

不需要默认确定取消按钮时，你可以把 `footer` 设为 `null`。

```js
  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
```
:::

## 信息提示

:::demo 各种类型的信息提示，只提供一个按钮用于关闭。


```js
info=() => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

success=() => {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
}

error=() => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
}

warning=() => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

render(){
  return(
      <div className="demo-modal-btn-group">
        <Button onClick={this.info}>Info</Button>
        <Button onClick={this.success}>Success</Button>
        <Button onClick={this.error}>Error</Button>
        <Button onClick={this.warning}>Warning</Button>
      </div>
  )
}

```
:::

## 国际化

:::demo 设置 `okText` 与 `cancelText` 以自定义按钮文字。

```js
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  
  confirm=() => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  }

  render() {
    return (
      <div className="demo-modal-btn-group">
        <Button type="primary" onClick={this.showModal}>Modal</Button>
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
        <Button onClick={this.confirm}>Confirm</Button>
      </div>
    );
  }
  
```
:::

## 手动移除

:::demo 手动关闭modal。

```js

success=() => {
  const modal = Modal.success({
    title: 'This is a notification message',
    content: 'This modal will be destroyed after 3 second',
  });
  setTimeout(() => modal.destroy(), 3000);
}

render(){
  return(
    <Button onClick={this.success}>Success</Button>
  )
}

```
:::

## 自定义位置

:::demo 设置对话框位置。

```js
  state = {
    modal1Visible: false,
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setModal1Visible(true)}>Display a modal dialog at 20px to Top</Button>
        <Modal
          title="20px to Top"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  }
```
:::

<style>
.fishd-modal p {
  margin: 0;
}
.demo-modal-btn-group .fishd-btn{
 margin-right:8px;
}
</style>

## 拖动支持

:::demo 可拖动的对话框。

```js
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            draggable={true}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
      </div>
    );
  }
```
:::

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | (e) => Void | - |
| bodyStyle | Modal body 样式 | Object | {} |
| cancelText | 取消按钮文字 | String | 取消 |
| closable | 是否显示右上角的关闭按钮 | Boolean | true |
| confirmLoading | 确定按钮 loading | Boolean | - |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | Boolean | false |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `footer={null}` | String \| ReactNode | 确定取消按钮 |
| getContainer | 指定 Modal 挂载的 HTML 节点 | (instance) => HTMLElement | () => document.body |
| keyboard | 是否支持键盘esc关闭 | Boolean | true |
| mask | 是否展示遮罩 | Boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | Boolean | true |
| maskStyle | 遮罩样式 | Object | {} |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | (e) => Void | - |
| onOk | 点击确定回调 | (e) => Void | - |
| okText | 确认按钮文字 | String | 确定 |
| okType | 确认按钮类型 | String | primary |
| style | 可用于设置浮层的样式，调整浮层位置等 | Object | - |
| title | 标题 | String | ReactNode | - |
| visible | 对话框是否可见 | Boolean | - |
| width | 宽度 | String | Number | 520 |
| wrapClassName | 对话框外层容器的类名 | String | - |
| zIndex | 设置 Modal 的 `z-index` | Number | 1000 |

#### 注意

> `<Modal />` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 `destroyOnClose`。

### Modal.method()

包括：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

以上均为一个函数，参数为 Object，具体属性如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cancelText | 取消按钮文字 | String | '取消' |
| className | 容器类名 | String | - |
| content | 内容 | String \| ReactNode | - |
| draggable	| 模态框是否支持拖动	 | Boolean | false |
| iconType | 图标 Icon 类型 | String | 'hints-descriptions' |
| maskClosable | 点击蒙层是否允许关闭 | Boolean | false |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | (e) => Void | - |
| onOk | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | (e) => Void | - |
| okText | 确认按钮文字 | String | '确定' |
| okType | 确认按钮类型 | Enum {'default', 'primary', 'ghost', 'dashed', 'danger'} | 'primary' |
| title | 标题 | String \| ReactNode | - |
| width | 宽度 | String \| Number | 416 |
| zIndex | 设置 Modal 的 `z-index` | Number | 1000 |

以上函数调用后，会返回一个引用，可以通过该引用关闭弹窗。

```js
const ref = Modal.info();
ref.destroy();
```

<style>
.code-box-demo .fishd-btn {
  margin-right: 8px;
}
</style>
