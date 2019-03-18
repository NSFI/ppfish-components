# Animate 动画 【交互：- | 视觉：- |开发：高志友】

添加动画。

## 何时使用

需要自定义动画时。


## 基本

:::demo 展示单个子元素的进场离场动画。

```js
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleToggle}>展示/隐藏</Button>
        <Animate animation={{
          enter: 'my-zoom-in',
          leave: 'my-zoom-out'
        }}>
          {this.state.visible ?
            <div className="basic-demo">自定义动画</div> :
            null}
        </Animate>
      </div>
    );
  }
```

```less
.basic-demo {
    font-size: 32px;
    text-align: center;
}

.my-zoom-in {
    opacity: 0;
}

.my-zoom-in-active {
    animation: my-zoom-in 500ms linear;
}

.my-zoom-out {
    opacity: 1;
}

.my-zoom-out-active {
    animation: my-zoom-out 500ms linear;
}

@keyframes my-zoom-in {
    from {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 1;
    }
}

@keyframes my-zoom-out {
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
    }

    to {
        opacity: 0;
    }
}
```
:::

## 展开收起动画

:::demo 展示单个子元素的展开收起动画。

```js
    constructor(props) {
        super(props);
        this.state = { expand: true };
        ['beforeEnter', 'onEnter', 'afterEnter', 'beforeLeave', 'onLeave', 'afterLeave', 'handleToggle'].forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    handleToggle() {
        this.setState({
            expand: !this.state.expand
        });
    }

    beforeEnter(node) {
        this.height = node.offsetHeight;
        node.style.height = '0px';
    }

    onEnter(node) {
        node.style.height = `${this.height}px`;
    }

    afterEnter(node) {
        this.height = null;
        node.style.height = null;
    }

    beforeLeave(node) {
        node.style.height = `${this.height}px`;
    }

    onLeave(node) {
        node.style.height = '0px';
    }

    afterLeave(node) {
        node.style.height = null;
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleToggle}>展开/收起</Button>
                <Animate animation="expand"
                    beforeEnter={this.beforeEnter}
                    onEnter={this.onEnter}
                    afterEnter={this.afterEnter}
                    beforeLeave={this.beforeLeave}
                    onLeave={this.onLeave}
                    afterLeave={this.afterLeave}>
                    {this.state.expand ?
                        <div className="notice"></div> :
                        null}
                </Animate>
            </div>
        );
    }
```

```less
.expand-enter {
    overflow: hidden;
}

.expand-enter-active {
    transition: height 0.3s ease-out;
}

.expand-leave {
    overflow: hidden;
}

.expand-leave-active {
    transition: height 0.3s ease-out;
}

.notice {
    width: 200px;
    height: 100px;
    margin-top: 20px;
    border: 1px solid #ccc;
    background: #eee;
}
```
:::


## 多个子元素动画

:::demo 展示多个子元素的进场离场动画。

```js
    constructor(props) {
        super(props);
        this.state = { items: ['Item 1', 'Item 2', 'Item 3'] };
    }

    handleAdd() {
        this.setState({
            items: [
                ...this.state.items,
                prompt('Enter some text')
            ]
        });
    }

    handleRemove(i) {
        const newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }

    render() {
        return (
            <div className="totolist-container">
                <Animate animationAppear animation="fade" className="todo-list" singleMode={false}
                    beforeAppear={() => console.log('before appear')}
                    onAppear={() => console.log('appear')}
                    afterAppear={() => console.log('after appear')}
                    beforeEnter={() => console.log('before enter')}
                    onEnter={() => console.log('enter')}
                    afterEnter={() => console.log('after enter')}
                    beforeLeave={() => console.log('before leave')}
                    onLeave={() => console.log('leave')}
                    afterLeave={() => console.log('after leave')}>
                    {this.state.items.map((item, i) => (
                        <div key={item}>
                            {item}
                            <Button onClick={() => this.handleRemove(i)}>
                                &times;
                            </Button>
                        </div>
                    ))}
                </Animate>
                <Button onClick={() => this.handleAdd()}>添加</Button>
            </div>
        );
    }
```

```less
.fade-appear {
  opacity: 0.01;
}

.fade-appear.fade-appear-active {
  opacity: 1;
  transition: opacity 1000ms ease-in;
}

.fade-enter {
  opacity: 0.01;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 1000ms ease-in;
}

.fade-leave {
  opacity: 1;
}

.fade-leave.fade-leave-active {
  opacity: 0.01;
  transition: opacity 800ms ease-in;
}

.totolist-container {
  padding: 20px;
  border: 1px solid #ccc;
  width: 200px;
  border-radius: 4px;
}

.todo-list > div {
  position: relative;
  width: 100%;
  height: 45px;
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}

.totolist-container .fishd-btn {
  position: absolute;
  right: 0;
  margin-left: 20px;
}

.totolist-container > .fishd-btn {
  position: relative;
  margin-top: 20px;
  margin-left: 0;
}
```
:::

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| animation       | 动画 className | String \| Object | - |
| animationAppear | 子元素第一次挂载时是否执行动画 | Boolean | true |
| component       | 包裹子元素的标签 | String | 'div' |
| singleMode      | 是否只有单个子元素，如果有多个子元素，请设置为 false | Boolean | true |
| children        | 子元素 | ReactElement \| Array< ReactElement > | - |
| beforeAppear    | 执行第一次挂载动画前触发的回调函数 | () => Void | () => {} |
| onAppear        | 执行第一次挂载动画，添加 'xxx-appear-active' 类名后触发的回调函数 | (node: HTMLElement) => Void | () => {} |
| afterAppear     | 执行完第一次挂载动画后触发的函数 | (node: HTMLElement) => Void | () => {} |
| beforeEnter     | 执行进场动画前触发的回调函数 | (node: HTMLElement) => Void | () => {} |
| onEnter         | 执行进场动画，添加 'xxx-enter-active' 类名后触发的回调函数 | (node: HTMLElement) => Void | () => {} |
| afterEnter      | 执行完进场动画后触发的回调函数 | (node: HTMLElement) => Void | () => {} |
| beforeLeave     | 执行离场动画前触发的回调函数 | (node: HTMLElement) => Void | () => {} |
| onLeave         | 执行离场动画，添加 'xxx-leave-active' 类名后触发的回调函数 | (node: HTMLElement) => Void | () => {} |
| afterLeave      | 执行完离场动画后触发的回调函数 | (node: HTMLElement) => Void | () => {} |
