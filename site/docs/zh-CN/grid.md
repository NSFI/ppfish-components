# Grid 栅格系统 【交互：李东岳 |视觉：徐剑杰 |开发：高志友】

24 栅格系统。

## 设计理念

<div class="grid-demo">
<div class="fishd-row demo-row">
  <div class="fishd-col-24 demo-col demo-col-1">
    100%
  </div>
</div>
<div class="fishd-row demo-row">
  <div class="fishd-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="fishd-col-6 demo-col demo-col-3">
    25%
  </div>
  <div class="fishd-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="fishd-col-6 demo-col demo-col-3">
    25%
  </div>
</div>
<div class="fishd-row demo-row">
  <div class="fishd-col-8 demo-col demo-col-4">
    33.33%
  </div>
  <div class="fishd-col-8 demo-col demo-col-5">
    33.33%
  </div>
  <div class="fishd-col-8 demo-col demo-col-4">
    33.33%
  </div>
</div>
<div class="fishd-row demo-row">
  <div class="fishd-col-12 demo-col demo-col-1">
    50%
  </div>
  <div class="fishd-col-12 demo-col demo-col-3">
    50%
  </div>
</div>
<div class="fishd-row demo-row">
  <div class="fishd-col-16 demo-col demo-col-4">
    66.66%
  </div>
  <div class="fishd-col-8 demo-col demo-col-5">
    33.33%
  </div>
</div>
</div>

在多数业务情况下，Fish Design 需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

- 通过`row`在水平方向建立一组`column`（简写col）
- 你的内容应当放置于`col`内，并且，只有`col`可以作为`row`的直接元素
- 栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列可以使用`.col-8`来创建
- 如果一个`row`中的`col`总和超过 24，那么多余的`col`会作为一个整体另起一行排列

我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。

Flex 布局是基于 24 栅格来定义每一个『盒子』的宽度，但排版则不拘泥于栅格。


## 基本使用

:::demo 从堆叠到水平排列。使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 `Row` 内。

```js

  render() {
    return (
      <div className="grid-demo">
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </div>
    );
  }
```
:::


## 区块间隔

:::demo 栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔。(n 是自然数)
如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。

```js

  render() {
    return (
      <div className="grid-demo gutter-example">
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>
      </div>
    );
  }
```
:::

<style>
  .gutter-example .fishd-row > div {
    background: transparent;
    border: 0;
  }
  .gutter-box {
    background: #00A0E9;
    padding: 5px 0;
  }
</style>


## 左右偏移

:::demo 列偏移。
使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。

```js

  render() {
    return (
      <div className="grid-demo">
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8} offset={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>col-6 col-offset-6</Col>
          <Col span={6} offset={6}>col-6 col-offset-6</Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>col-12 col-offset-6</Col>
        </Row>
      </div>
    );
  }
```
:::

## 列排序

:::demo 列排序。
通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

```js

  render() {
    return (
      <div className="grid-demo">
        <Row>
          <Col span={18} push={6}>col-18 col-push-6</Col>
          <Col span={6} pull={18}>col-6 col-pull-18</Col>
        </Row>
      </div>
    );
  }
```
:::

## 弹性布局-水平对齐

:::demo 弹性布局-水平对齐。

使用 `row-flex` 定义 `flex` 布局，其子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。


```js

  render() {
    return (
      <div className="grid-demo">
        <p>左边对齐-Align Left</p>
        <Row type="flex" justify="start">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>

        <p>居中对齐-Align Center</p>
        <Row type="flex" justify="center">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>

        <p>右边对齐-Align Right</p>
        <Row type="flex" justify="end">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>

        <p>等宽分布-Monospaced Arrangement</p>
        <Row type="flex" justify="space-between">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>

        <p>横向充满-Align Full</p>
        <Row type="flex" justify="space-around">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
      </div>
    );
  }
```
:::


## 弹性布局-垂直对齐

:::demo Flex 子元素垂直对齐。

```js

  render() {
    const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
    return (
      <div className="grid-demo">
        <p>顶部对齐-Align Top</p>
        <Row type="flex" justify="center" align="top">
          <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
        </Row>

        <p>居中对齐-Align Middle</p>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
        </Row>

        <p>底部对齐-Align Bottom</p>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
        </Row>
      </div>
    );
  }
```
:::


## 弹性布局-排序

:::demo 通过 Flex 布局的 Order 来改变元素的排序。

```js

  render() {
    return (
      <div className="grid-demo">
        <Row type="flex">
          <Col span={6} order={4}>1 col-order-4</Col>
          <Col span={6} order={3}>2 col-order-3</Col>
          <Col span={6} order={2}>3 col-order-2</Col>
          <Col span={6} order={1}>4 col-order-1</Col>
        </Row>
      </div>
    );
  }
```
:::


## 响应式布局

:::demo 参照 Bootstrap 的 [响应式设计](https://getbootstrap.com/docs/3.3/css/#grid-media-queries)，预设六个响应尺寸：`xs` 、 `sm` 、 `md` 、 `lg` 、 `xl` 、 `xxl`。

```js

  render() {
    return (
      <div className="grid-demo">
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>Col</Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>Col</Col>
        </Row>
      </div>
    );
  }
```
:::

## 其他属性的响应式

:::demo `span` 、 `pull` 、 `push` 、 `offset` 、 `order` 属性可以通过内嵌到 `xs` 、 `sm` 、 `md` 、 `lg` 、 `xl` 、 `xxl` 属性中来使用。

其中 `xs={6}` 相当于 `xs={{ span: 6 }}`。

```js

  render() {
    return (
      <div className="grid-demo">
        <Row>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
        </Row>
      </div>
    );
  }
```
:::

## 栅格配置器

:::demo 可以简单配置几种等分栅格和间距。

```js

  constructor() {
    super();
    this.gutters = {};
    this.colCounts = {};
    this.state = {
      gutterKey: 1,
      colCountKey: 2,
    };
    [8, 16, 24, 32, 40, 48].forEach((value, i) => { this.gutters[i] = value; });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => { this.colCounts[i] = value; });
  }

  onGutterChange = (gutterKey) => {
    this.setState({ gutterKey });
  }

  onColCountChange = (colCountKey) => {
    this.setState({ colCountKey });
  }

  render() {
    const { gutterKey, colCountKey } = this.state;
    const cols = [];
    const colCount = this.colCounts[colCountKey];
    let colCode = '';
    for (let i = 0; i < colCount; i++) {
      cols.push(
        <Col key={i.toString()} span={24 / colCount}>
          <div>Column</div>
        </Col>
      );
      colCode += `  <Col span={${24 / colCount}} />\n`;
    }
    return (
      <div className="grid-demo">
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 6 }}>Gutter (px): </span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(this.gutters).length - 1}
              value={gutterKey}
              onChange={this.onGutterChange}
              marks={this.gutters}
              step={null}
            />
          </div>
          <span style={{ marginRight: 6 }}>Column Count:</span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(this.colCounts).length - 1}
              value={colCountKey}
              onChange={this.onColCountChange}
              marks={this.colCounts}
              step={null}
            />
          </div>
        </div>
        <Row gutter={this.gutters[gutterKey]}>{cols}</Row>
        <pre>{`<Row gutter={${this.gutters[gutterKey]}}>\n${colCode}</Row>`}</pre>
      </div>
    );
  }
```
:::

<style>
.grid-demo [class^="fishd-col-"] {
  background: transparent;
  border: 0;
}
.grid-demo [class^="fishd-col-"] > div {
  background: #00A0E9;
  height: 120px;
  line-height: 120px;
  font-size: 13px;
}
.grid-demo pre {
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 16px;
}

.grid-demo .fishd-row {
  overflow: hidden;
  margin-bottom: 8px
}

.grid-demo .fishd-row-flex {
  background: #f5f5f5
}

.grid-demo .fishd-row-flex>div,.grid-demo .fishd-row>div {
  padding: 5px 0;
  text-align: center;
  border-radius: 0;
  min-height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #fff
}

.grid-demo .fishd-row-flex>div:not(.gutter-row),.grid-demo .fishd-row>div:not(.gutter-row) {
  background: #00a0e9;
  padding: 16px 0
}

.grid-demo .fishd-row-flex>div:not(.gutter-row):nth-child(odd),.grid-demo .fishd-row>div:not(.gutter-row):nth-child(odd) {
  background: rgba(0,160,233,.7)
}

.grid-demo .fishd-row .fishd-col,.grid-demo .code-box-demo .fishd-row .fishd-col {
  text-align: center;
  padding: 30px 0;
  color: #fff;
  font-size: 18px;
  border: none;
  margin-top: 0;
  margin-bottom: 0
}

.grid-demo .fishd-row .fishd-col-1 {
  background: rgba(0,160,233,.7)
}

.grid-demo .fishd-row .fishd-col-2,.grid-demo .code-box-demo .fishd-row .fishd-col-2 {
  background: rgba(0,160,233,.5)
}

.grid-demo .fishd-row .fishd-col-3,.grid-demo .code-box-demo .fishd-row .fishd-col-3 {
  background: hsla(0,0%,100%,.2);
  color: #999
}

.grid-demo .fishd-row .fishd-col-4,.grid-demo .code-box-demo .fishd-row .fishd-col-4 {
  background: rgba(0,160,233,.6)
}

.grid-demo .fishd-row .fishd-col-5,.grid-demo .code-box-demo .fishd-row .fishd-col-5 {
  background: hsla(0,0%,100%,.5);
  color: #999
}

.grid-demo .code-box-demo .height-100 {
  height: 100px;
  line-height: 100px
}

.grid-demo .code-box-demo .height-50 {
  height: 50px;
  line-height: 50px
}

.grid-demo .code-box-demo .height-120 {
  height: 120px;
  line-height: 120px
}

.grid-demo .code-box-demo .height-80 {
  height: 80px;
  line-height: 80px
}
</style>


## API

若此布局组件不能满足你的需求，你也可以直接使用社区的优秀布局组件：

- [react-flexbox-grid](http://roylee0704.github.io/react-flexbox-grid/)
- [react-blocks](http://whoisandy.github.io/react-blocks/)

### Row

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | flex 布局下的垂直对齐方式 | Enum {'top', 'middle', 'bottom'} | 'top' |
| className | 容器类名 | String | - |
| gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | Number \| Object | 0 |
| justify | flex 布局下的水平排列方式 | Enum {'start', 'end', 'center', 'space-around', 'space-between'} | 'start' |
| style | 容器样式 | Object | - |
| type | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效 | String | - |

### Col

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器类名 | String | - |
| lg | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | Number \| Object | - |
| md | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | Number \| Object | - |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | Number | 0 |
| order | 栅格顺序，`flex` 布局模式下有效 | Number | 0 |
| pull | 栅格向左移动格数 | Number | 0 |
| push | 栅格向右移动格数 | Number | 0 |
| sm | `≥576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | Number \| Object | - |
| span | 栅格占位格数，为 0 时相当于 `display: none` | Number | - |
| style | 容器样式 | Object | - |
| xl | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | Number \| Object | - |
| xs | `<576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | Number \| Object | - |
| xxl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | Number \| Object | - |

响应式栅格的断点扩展自 [BootStrap 4 的规则](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)（不包含链接里 `occasionally` 的部分)。
