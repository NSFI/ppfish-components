# Less代码规范

## Less代码校验规则遵循stylelint:recommended
- [stylelint:recommended](https://github.com/stylelint/stylelint-config-recommended/blob/master/index.js)
- [stylelint详细规则](https://stylelint.io/user-guide/rules/)

## 目录

  1. [术语](#terminology)
    - [规则声明](#rule-declaration)
    - [选择器](#selectors)
    - [属性](#properties)
  1. [文件分类](#classify)
  1. [命名规则](#naming)
  1. [格式](#formatting)
  1. [注释](#comments)
  1. [书写顺序](#order)
    - [Less书写顺序](#less-order)
    - [属性书写顺序](#rule-order)
  1. [最佳实践](#good)
  1. [典型错误](#bad)
  1. [参考](#reference)

<a name="terminology"></a>
## 术语

<a name="rule-declaration"></a>
### 规则声明

我们把一个（或一组）选择器和一组属性称之为 “规则声明”。举个例子：

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

<a name="selectors"></a>
### 选择器

在规则声明中，“选择器” 负责选取 DOM 树中的元素，这些元素将被定义的属性所修饰。选择器可以匹配 HTML 元素，也可以匹配一个元素的类名、ID, 或者元素拥有的属性。以下是选择器的例子：

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

<a name="properties"></a>
### 属性

最后，属性决定了规则声明里被选择的元素将得到何种样式。属性以键值对形式存在，一个规则声明可以包含一或多个属性定义。以下是属性定义的例子：

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

<a name="classify"></a>
## 文件分类
页面的样式入口文件按顺序引入以下Less文件。
1. globals.less 全局文件
1. components.less 组件
1. sections.less 区块
1. main.less 页面主体内容

```less
/* globals.less */
@import "globals/mixins";
@import "globals/colors";
@import "globals/fonts";

/* components.less */
@import "components/tabs";
@import "components/modals";

/* sections.less */
@import "sections/header";
@import "sections/footer";

/* main.less */
@import "app/main";
```
<a name="naming"></a>
## 命名规则

CSS的命名规则

1. 统一处理：建议在这个位置统一调用背景图（这里指多个布局或模块或元件共用的图）和清除浮动（这里指通用性较高的布局、模块、元件内的清除）等统一设置处理的样式！
1. 布局（grid）（.g-）：将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等！
1. 模块（module）（.m-）：通常是一个语义化的可以重复使用的较大的整体！比如导航、登录、注册、各种列表、评论、搜索等！
1. 元件（unit）（.u-）：通常是一个不可再分的较为小巧的个体，通常被重复用于各种模块中！比如按钮、输入框、loading、图标等！
1. 功能（function）（.f-）：为方便一些常用样式的使用，我们将这些使用率较高的样式剥离出来，按需使用，通常这些选择器具有固定样式表现，比如清除浮动等！不可滥用！
1. 皮肤（skin）（.s-）：如果你需要把皮肤型的样式抽离出来，通常为文字色、背景色（图）、边框色等，非换肤型网站通常只提取文字色！非换肤型网站不可滥用此类！
1. 状态（.z-）：为状态类样式加入前缀，统一标识，方便识别，她只能组合使用或作为后代出现（.u-ipt.z-dis{}，.m-list li.z-sel{}），具体详见命名规则的扩展相关项。
功能类和皮肤类样式为表现化的样式，请不要滥用！以上顺序可以按需求适当调整。

```less
/* 统一清除浮动 */
.g-bdc:after,
.m-dimg ul:after,
.u-tab:after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  overflow: hidden;
  content: '.';
}
.g-bdc,
.m-dimg ul,
.u-tab {
  zoom: 1;
}
/* 布局 */
.g-sd {
  float: left;
  width: 300px;
}
/* 模块 */
.m-logo {
  width: 200px;
  height: 50px;
}
/* 元件 */
.u-btn {
  height: 20px;
  border: 1px solid #333;
}
/* 功能 */
.f-tac {
  text-align: center;
}
/* 皮肤 */
.s-fc,
a.s-fc:hover {
  color: #fff;
}
```

<a name="formatting"></a>
## 格式

* 使用 2 个空格作为缩进。
* 类名建议使用破折号代替驼峰法。
* 在一个规则声明中应用了多个选择器时，每个选择器独占一行。
* 在规则声明的左大括号 `{` 前加上一个空格。
* 在属性的冒号 `:` 后面加上一个空格，前面不加空格。
* 规则声明的右大括号 `}` 独占一行。
* 规则声明之间用空行分隔开。

<a name="comments"></a>
## 注释

* 建议使用行注释代替块注释。
* 建议注释独占一行。避免行末注释。
* 给没有自注释的代码写上详细说明，比如：
  - 为什么用到了 z-index 
  例如，// modals are 6000, saving messages are 5500, header is 2000
  - 兼容性处理或者针对特定浏览器的 hack
  
  
<a name="order"></a>
## 书写顺序

<a name="less-order"></a>
### LESS书写顺序
1. Extend （扩展）
1. Mixins (混合)
1. 常规样式，在extends和mixins之后添加常规样式允许我们正确地覆盖这些属性（如果需要）。
1. 伪元素和伪类样式
1. 嵌套样式
```less
.weather {
  &:extend(.module);
  .transition(all 0.3s ease-out);
  background: LightCyan;
  &:hover {
    background: DarkCyan;
  }
  &::before {
    content: "";
    display: block;
  }
  > h3 {
    .transform(rotate(90deg));
    border-bottom: 1px solid white;
  }
  ...
}
```

<a name="rule-order"></a>
### 属性书写顺序

| → | 显示属性   | 自身属性 | 文本属性和其他修饰 |
|---|------------|------------|--------------------|
|   | display    | width      | font               |
|   | visibility | height     | text-align         |
|   | position   | margin     | text-decoration    |
|   | float      | padding    | vertical-align     |
|   | clear      | border     | white-space        |
|   | list-style | overflow   | color              |
|   | top        | min-width  | background         |

<a name="good"></a>
## 最佳实践
- 使用变量命名常用的数字和颜色

<a name="bad"></a>
## 典型错误
- 不要使用 ID 选择器。
- 不要使用!important
- 不要使用浏览器私有前缀，使用autoprefixer替代。
- 嵌套选择器的深度不要超过 3 层！
```less
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```
- 不要使用class作为javascript钩子，在react中可使用refs替代javascript钩子。
- 嵌套选择器的行数不要超过 50 行!

<a name="reference"></a>
## 参考
- [Airbnb CSS / Sass 指南](https://github.com/Zhangjd/css-style-guide)
- [Netease CSS规范](http://nec.netease.com/standard/css-sort.html)
- [Sass Style Guide](https://css-tricks.com/sass-style-guide/)
