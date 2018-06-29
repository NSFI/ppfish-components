# 栅格系统

24 栅格系统。

## 设计理念

<div class="grid-demo">
<div class="ant-row demo-row">
  <div class="ant-col-24 demo-col demo-col-1">
    100%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-3">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-3">
    25%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-8 demo-col demo-col-4">
    33.33%
  </div>
  <div class="ant-col-8 demo-col demo-col-5">
    33.33%
  </div>
  <div class="ant-col-8 demo-col demo-col-4">
    33.33%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-12 demo-col demo-col-1">
    50%
  </div>
  <div class="ant-col-12 demo-col demo-col-3">
    50%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-16 demo-col demo-col-4">
    66.66%
  </div>
  <div class="ant-col-8 demo-col demo-col-5">
    33.33%
  </div>
</div>
</div>

<style>

.grid-demo .code-box-demo .demo-row,.grid-demo .demo-row,[id^=components-grid-demo-] .code-box-demo .demo-row,[id^=components-grid-demo-] .demo-row {
  background-image: -webkit-gradient(linear,left top,right top,color-stop(4.16666667%,#f5f5f5),color-stop(4.16666667%,transparent),color-stop(8.33333333%,transparent),color-stop(8.33333333%,#f5f5f5),color-stop(12.5%,#f5f5f5),color-stop(12.5%,transparent),color-stop(16.66666667%,transparent),color-stop(16.66666667%,#f5f5f5),color-stop(20.83333333%,#f5f5f5),color-stop(20.83333333%,transparent),color-stop(25%,transparent),color-stop(25%,#f5f5f5),color-stop(29.16666667%,#f5f5f5),color-stop(29.16666667%,transparent),color-stop(33.33333333%,transparent),color-stop(33.33333333%,#f5f5f5),color-stop(37.5%,#f5f5f5),color-stop(37.5%,transparent),color-stop(41.66666667%,transparent),color-stop(41.66666667%,#f5f5f5),color-stop(45.83333333%,#f5f5f5),color-stop(45.83333333%,transparent),color-stop(50%,transparent),color-stop(50%,#f5f5f5),color-stop(54.16666667%,#f5f5f5),color-stop(54.16666667%,transparent),color-stop(58.33333333%,transparent),color-stop(58.33333333%,#f5f5f5),color-stop(62.5%,#f5f5f5),color-stop(62.5%,transparent),color-stop(66.66666667%,transparent),color-stop(66.66666667%,#f5f5f5),color-stop(70.83333333%,#f5f5f5),color-stop(70.83333333%,transparent),color-stop(75%,transparent),color-stop(75%,#f5f5f5),color-stop(79.16666667%,#f5f5f5),color-stop(79.16666667%,transparent),color-stop(83.33333333%,transparent),color-stop(83.33333333%,#f5f5f5),color-stop(87.5%,#f5f5f5),color-stop(87.5%,transparent),color-stop(91.66666667%,transparent),color-stop(91.66666667%,#f5f5f5),color-stop(95.83333333%,#f5f5f5),color-stop(95.83333333%,transparent));
  background-image: -webkit-linear-gradient(left,#f5f5f5 4.16666667%,transparent 0,transparent 8.33333333%,#f5f5f5 0,#f5f5f5 12.5%,transparent 0,transparent 16.66666667%,#f5f5f5 0,#f5f5f5 20.83333333%,transparent 0,transparent 25%,#f5f5f5 0,#f5f5f5 29.16666667%,transparent 0,transparent 33.33333333%,#f5f5f5 0,#f5f5f5 37.5%,transparent 0,transparent 41.66666667%,#f5f5f5 0,#f5f5f5 45.83333333%,transparent 0,transparent 50%,#f5f5f5 0,#f5f5f5 54.16666667%,transparent 0,transparent 58.33333333%,#f5f5f5 0,#f5f5f5 62.5%,transparent 0,transparent 66.66666667%,#f5f5f5 0,#f5f5f5 70.83333333%,transparent 0,transparent 75%,#f5f5f5 0,#f5f5f5 79.16666667%,transparent 0,transparent 83.33333333%,#f5f5f5 0,#f5f5f5 87.5%,transparent 0,transparent 91.66666667%,#f5f5f5 0,#f5f5f5 95.83333333%,transparent 0);
  background-image: linear-gradient(90deg,#f5f5f5 4.16666667%,transparent 0,transparent 8.33333333%,#f5f5f5 0,#f5f5f5 12.5%,transparent 0,transparent 16.66666667%,#f5f5f5 0,#f5f5f5 20.83333333%,transparent 0,transparent 25%,#f5f5f5 0,#f5f5f5 29.16666667%,transparent 0,transparent 33.33333333%,#f5f5f5 0,#f5f5f5 37.5%,transparent 0,transparent 41.66666667%,#f5f5f5 0,#f5f5f5 45.83333333%,transparent 0,transparent 50%,#f5f5f5 0,#f5f5f5 54.16666667%,transparent 0,transparent 58.33333333%,#f5f5f5 0,#f5f5f5 62.5%,transparent 0,transparent 66.66666667%,#f5f5f5 0,#f5f5f5 70.83333333%,transparent 0,transparent 75%,#f5f5f5 0,#f5f5f5 79.16666667%,transparent 0,transparent 83.33333333%,#f5f5f5 0,#f5f5f5 87.5%,transparent 0,transparent 91.66666667%,#f5f5f5 0,#f5f5f5 95.83333333%,transparent 0);
  overflow: hidden;
  margin-bottom: 8px
}

.grid-demo .ant-row-flex,.grid-demo .code-box-demo .ant-row-flex,[id^=components-grid-demo-] .ant-row-flex,[id^=components-grid-demo-] .code-box-demo .ant-row-flex {
  background: #f5f5f5
}

.grid-demo .ant-row-flex>div,.grid-demo .ant-row>div,.grid-demo .code-box-demo .ant-row-flex>div,.grid-demo .code-box-demo .ant-row>div,[id^=components-grid-demo-] .ant-row-flex>div,[id^=components-grid-demo-] .ant-row>div,[id^=components-grid-demo-] .code-box-demo .ant-row-flex>div,[id^=components-grid-demo-] .code-box-demo .ant-row>div {
  padding: 5px 0;
  text-align: center;
  border-radius: 0;
  min-height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #fff
}

.grid-demo .code-box-demo .ant-row-flex>div:not(.gutter-row),.grid-demo .code-box-demo .ant-row>div:not(.gutter-row),[id^=components-grid-demo-] .code-box-demo .ant-row-flex>div:not(.gutter-row),[id^=components-grid-demo-] .code-box-demo .ant-row>div:not(.gutter-row) {
  background: #00a0e9;
  padding: 16px 0
}

.grid-demo .code-box-demo .ant-row-flex>div:not(.gutter-row):nth-child(odd),.grid-demo .code-box-demo .ant-row>div:not(.gutter-row):nth-child(odd),[id^=components-grid-demo-] .code-box-demo .ant-row-flex>div:not(.gutter-row):nth-child(odd),[id^=components-grid-demo-] .code-box-demo .ant-row>div:not(.gutter-row):nth-child(odd) {
  background: rgba(0,160,233,.7)
}

.grid-demo .ant-row .demo-col,.grid-demo .code-box-demo .ant-row .demo-col,[id^=components-grid-demo-] .ant-row .demo-col,[id^=components-grid-demo-] .code-box-demo .ant-row .demo-col {
  text-align: center;
  padding: 30px 0;
  color: #fff;
  font-size: 18px;
  border: none;
  margin-top: 0;
  margin-bottom: 0
}

.grid-demo .ant-row .demo-col-1,[id^=components-grid-demo-] .ant-row .demo-col-1 {
  background: rgba(0,160,233,.7)
}

.grid-demo .ant-row .demo-col-2,.grid-demo .code-box-demo .ant-row .demo-col-2,[id^=components-grid-demo-] .ant-row .demo-col-2,[id^=components-grid-demo-] .code-box-demo .ant-row .demo-col-2 {
  background: rgba(0,160,233,.5)
}

.grid-demo .ant-row .demo-col-3,.grid-demo .code-box-demo .ant-row .demo-col-3,[id^=components-grid-demo-] .ant-row .demo-col-3,[id^=components-grid-demo-] .code-box-demo .ant-row .demo-col-3 {
  background: hsla(0,0%,100%,.2);
  color: #999
}

.grid-demo .ant-row .demo-col-4,.grid-demo .code-box-demo .ant-row .demo-col-4,[id^=components-grid-demo-] .ant-row .demo-col-4,[id^=components-grid-demo-] .code-box-demo .ant-row .demo-col-4 {
  background: rgba(0,160,233,.6)
}

.grid-demo .ant-row .demo-col-5,.grid-demo .code-box-demo .ant-row .demo-col-5,[id^=components-grid-demo-] .ant-row .demo-col-5,[id^=components-grid-demo-] .code-box-demo .ant-row .demo-col-5 {
  background: hsla(0,0%,100%,.5);
  color: #999
}

.grid-demo .code-box-demo .height-100,[id^=components-grid-demo-] .code-box-demo .height-100 {
  height: 100px;
  line-height: 100px
}

.grid-demo .code-box-demo .height-50,[id^=components-grid-demo-] .code-box-demo .height-50 {
  height: 50px;
  line-height: 50px
}

.grid-demo .code-box-demo .height-120,[id^=components-grid-demo-] .code-box-demo .height-120 {
  height: 120px;
  line-height: 120px
}

.grid-demo .code-box-demo .height-80,[id^=components-grid-demo-] .code-box-demo .height-80 {
  height: 80px;
  line-height: 80px
}
</style> 

在多数业务情况下，Ant Design需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

- 通过`row`在水平方向建立一组`column`（简写col）
- 你的内容应当放置于`col`内，并且，只有`col`可以作为`row`的直接元素
- 栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列可以使用`.col-8`来创建
- 如果一个`row`中的`col`总和超过 24，那么多余的`col`会作为一个整体另起一行排列

## Flex 布局

我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。

Flex 布局是基于 24 栅格来定义每一个『盒子』的宽度，但排版则不拘泥于栅格。

## API

Ant Design 的布局组件若不能满足你的需求，你也可以直接使用社区的优秀布局组件：

- [react-flexbox-grid](http://roylee0704.github.io/react-flexbox-grid/)
- [react-blocks](https://github.com/whoisandy/react-blocks/)

### Row

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | flex 布局下的垂直对齐方式：`top` `middle` `bottom` | string | `top` |
| gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number/object | 0 |
| justify | flex 布局下的水平排列方式：`start` `end` `center` `space-around` `space-between` | string | `start` |
| type | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效 | string |  |

### Col

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | number | 0 |
| order | 栅格顺序，`flex` 布局模式下有效 | number | 0 |
| pull | 栅格向左移动格数 | number | 0 |
| push | 栅格向右移动格数 | number | 0 |
| span | 栅格占位格数，为 0 时相当于 `display: none` | number | - |
| xs | `<576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| sm | `≥576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| md | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| lg | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| xl | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |
| xxl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |

响应式栅格的断点扩展自 [BootStrap 4 的规则](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)（不包含链接里 `occasionally` 的部分)。
