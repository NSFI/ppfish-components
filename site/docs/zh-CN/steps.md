# 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 基本用法
:::demo 简单的步骤条。
```js
  render() {
    return (
      <Steps current={1}>
        <Steps.Step title="Finished" description="This is a description." />
        <Steps.Step title="In Progress" description="This is a description." />
        <Steps.Step title="Waiting" description="This is a description." />
      </Steps>
    )
  }
```
:::

## 迷你版
:::demo 迷你版的步骤条，通过设置 `<Steps size="small">` 启用.
```js
  render() {
    return (
      <Steps size="small" current={1}>
        <Steps.Step title="Finished" />
        <Steps.Step title="In Progress" />
        <Steps.Step title="Waiting" />
      </Steps>
    )
  }
```
:::

## 带图标的步骤条
:::demo 通过设置 Steps.Step 的 `icon` 属性，可以启用自定义图标。
```js
  render() {
    return (
      <Steps>
        <Steps.Step status="finish" title="Login" icon={<Icon type="user" />} />
        <Steps.Step status="finish" title="Verification" icon={<Icon type="solution" />} />
        <Steps.Step status="process" title="Pay" icon={<Icon type="loading" />} />
        <Steps.Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
      </Steps>
    )
  }
```
:::

## 步骤切换
:::demo 通常配合内容及按钮使用，表示一个流程的处理进度。
```js
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const Step = Steps.Step;
    
    const steps = [{
      title: 'First',
      content: 'First-content',
    }, {
      title: 'Second',
      content: 'Second-content',
    }, {
      title: 'Last',
      content: 'Last-content',
    }];
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
```
:::

## 竖直方向的步骤条
:::demo 简单的竖直方向的步骤条。
```js
  render() {
    const Step = Steps.Step;
    return (
      <Steps direction="vertical" current={1}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
    )
  }
```
:::

## 竖直方向的小型步骤条
:::demo 简单的竖直方向的小型步骤条。
```js
  render() {
    const Step = Steps.Step;
    return (
      <Steps direction="vertical" size="small" current={1}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
    )
  }
```
:::

## 步骤运行错误
:::demo 使用 Steps 的 `status` 属性来指定当前步骤的状态。
```js
  render() {
    const Step = Steps.Step;
    return (
      <Steps current={1} status="error">
        <Step title="Finished" description="This is a description" />
        <Step title="In Process" description="This is a description" />
        <Step title="Waiting" description="This is a description" />
      </Steps>
    )
  }
```
:::

## 点状步骤条
:::demo 包含步骤点的进度条。
```js
  render() {
    const Step = Steps.Step;
    return (
      <Steps progressDot current={1}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
    )
  }
```
:::

## 自定义点状步骤条
:::demo 为点状步骤条增加自定义展示。
```js
  render() {
    const Step = Steps.Step;
    const customDot = (dot, { status, index }) => (
      <Popover content={<span>step {index} status: {status}</span>}>
        {dot}
      </Popover>
    );
    return (
      <Steps current={1} progressDot={customDot}>
        <Step title="Finished" description="You can hover on the dot." />
        <Step title="In Progress" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
      </Steps>
    )
  }
```
:::

## API

```js
<Steps>
  <Step title="第一步" />
  <Step title="第二步" />
  <Step title="第三步" />
</Steps>
```

### Steps

整体步骤条。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number | 0 |
| direction | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | horizontal |
| progressDot | 点状步骤条，可以设置为一个 function | Boolean or (iconDot, {index, status, title, description}) => ReactNode | false |
| size | 指定大小，目前支持普通（`default`）和迷你（`small`） | string | default |
| status | 指定当前步骤的状态，可选 `wait` `process` `finish` `error` | string | process |

### Steps.Step

步骤条内的每一个步骤。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 步骤的详情描述，可选 | string\|ReactNode | - |
| icon | 步骤图标的类型，可选 | string\|ReactNode | - |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | string | wait |
| title | 标题 | string\|ReactNode | - |


<style>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
