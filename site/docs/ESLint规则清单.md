# ESLint规则清单

<a name="hgisui"></a>
# 一、ESLint配置
> 规则取值：
> "off" 或 0：关闭规则
> "warn" 或 1：开启规则，使用警告级别的提示
> "error" 或 2：开启规则，使用错误级别的提示


```json
{
  "parser": "babel-eslint",
  "plugins": [
    "import",
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "import/ignore": [
      "\\.(jpg|png|less|css|json)$"
    ]
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
  },
  "rules": {
    "no-compare-neg-zero": 2,
    "no-cond-assign": 2,
    "no-constant-condition": 2,
    "no-control-regex": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 1,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 1,
    "no-extra-semi": 1,
    "no-func-assign": 1,
    "no-inner-declarations": 1,
    "no-invalid-regexp": 1,
    "no-irregular-whitespace": 1,
    "no-obj-calls": 1,
    "no-regex-spaces": 1,
    "no-sparse-arrays": 1,
    "no-unexpected-multiline": 1,
    "no-unreachable": 1,
    "no-unsafe-finally": 1,
    "no-unsafe-negation": 2,
    "use-isnan": 2,
    "valid-typeof": 2,
    "no-case-declarations": 1,
    "no-empty-pattern": 1,
    "no-fallthrough": 1,
    "no-global-assign": 1,
    "no-octal": 1,
    "no-redeclare": 2,
    "no-self-assign": 2,
    "no-unused-labels": 2,
    "no-useless-escape": 1,
    "no-delete-var": 2,
    "no-undef": 1,
    "no-mixed-spaces-and-tabs": 1,
    "constructor-super": 1,
    "no-class-assign": 1,
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-new-symbol": 2,
    "no-this-before-super": 2,
    "require-yield": 2,
    "quotes": 0,
    "no-console": 1,
    "no-debugger": 1,
    "no-var": 1,
    "no-unused-vars": 0,
    "semi": [1, "always"],
    "no-trailing-spaces": 0,
    "max-len": ["error", 121],
    "eol-last": 0,
    "no-underscore-dangle": 0,
    "no-alert": 0,
    "no-lone-blocks": 0,
    "jsx-quotes": 1,
    "import/named": 0,
    "import/extensions": 0,
    "import/default": 0,
    "import/namespace": 0,
    "import/no-unresolved": 2,
    "import/export": 2,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-duplicates": 1,
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": [1, { "ignoreStateless": true }],
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/jsx-wrap-multilines": 1,
    "react/jsx-no-comment-textnodes": 1,
    "react/jsx-no-target-blank": 1,
    "react/no-children-prop": 1,
    "react/no-danger-with-children": 1,
    "react/no-deprecated": 1,
    "react/no-find-dom-node": 0,
    "react/no-is-mounted": 1,
    "react/no-render-return-value": 1,
    "react/no-string-refs": 0,
    "react/no-unescaped-entities": 1,
    "react/require-render-return": 1
  },
  "globals": {
    "define": true,
    "AMap": true
  }
}
```

<a name="pp7lmt"></a>
# 二、规则分类
<a name="lvc1bk"></a>
## 1、可能的错误或逻辑错误
| [no-compare-neg-zero](http://eslint.cn/docs/rules/no-compare-neg-zero) | 禁止与 -0 进行比较 |
| --- | --- |
| [no-cond-assign](http://eslint.cn/docs/rules/no-cond-assign) | 禁止条件表达式中出现赋值操作符 |
| [no-console](http://eslint.cn/docs/rules/no-console) | 禁用 console |
| [no-constant-condition](http://eslint.cn/docs/rules/no-constant-condition) | 禁止在条件中使用常量表达式 |
| [no-control-regex](http://eslint.cn/docs/rules/no-control-regex) | 禁止在正则表达式中使用控制字符 |
| [no-debugger](http://eslint.cn/docs/rules/no-debugger) | 禁用 debugger |
| [no-dupe-args](http://eslint.cn/docs/rules/no-dupe-args) | 禁止 function 定义中出现重名参数 |
| [no-dupe-keys](http://eslint.cn/docs/rules/no-dupe-keys) | 禁止对象字面量中出现重复的 key |
| [no-duplicate-case](http://eslint.cn/docs/rules/no-duplicate-case) | 禁止出现重复的 case 标签 |
| [no-empty](http://eslint.cn/docs/rules/no-empty) | 禁止出现空语句块 |
| [no-empty-character-class](http://eslint.cn/docs/rules/no-empty-character-class) | 禁止在正则表达式中使用空字符集 |
| [no-ex-assign](http://eslint.cn/docs/rules/no-ex-assign) | 禁止对 catch 子句的参数重新赋值 |
| [no-extra-boolean-cast](http://eslint.cn/docs/rules/no-extra-boolean-cast) | 禁止不必要的布尔转换 |
| [no-extra-semi](http://eslint.cn/docs/rules/no-extra-semi) | 禁止不必要的分号 |
| [no-func-assign](http://eslint.cn/docs/rules/no-func-assign) | 禁止对 function 声明重新赋值 |
| [no-inner-declarations](http://eslint.cn/docs/rules/no-inner-declarations) | 禁止在嵌套的块中出现变量声明或 function 声明 |
| [no-invalid-regexp](http://eslint.cn/docs/rules/no-invalid-regexp) | 禁止 RegExp 构造函数中存在无效的正则表达式字符串 |
| [no-irregular-whitespace](http://eslint.cn/docs/rules/no-irregular-whitespace) | 禁止在字符串和注释之外不规则的空白 |
| [no-obj-calls](http://eslint.cn/docs/rules/no-obj-calls) | 禁止把全局对象作为函数调用 |
| [no-regex-spaces](http://eslint.cn/docs/rules/no-regex-spaces) | 禁止正则表达式字面量中出现多个空格 |
| [no-sparse-arrays](http://eslint.cn/docs/rules/no-sparse-arrays) | 禁用稀疏数组 |
| [no-unexpected-multiline](http://eslint.cn/docs/rules/no-unexpected-multiline) | 禁止出现令人困惑的多行表达式 |
| [no-unreachable](http://eslint.cn/docs/rules/no-unreachable) | 禁止在 return、throw、continue 和 break 语句之后出现不可达代码 |
| [no-unsafe-finally](http://eslint.cn/docs/rules/no-unsafe-finally) | 禁止在 finally 语句块中出现控制流语句 |
| [no-unsafe-negation](http://eslint.cn/docs/rules/no-unsafe-negation) | 禁止对关系运算符的左操作数使用否定操作符 |
| [use-isnan](http://eslint.cn/docs/rules/use-isnan) | 要求使用 isNaN() 检查 NaN |
| [valid-typeof](http://eslint.cn/docs/rules/valid-typeof) | 强制 typeof 表达式与有效的字符串进行比较 |

<a name="i1rwwa"></a>
## 2、最佳实践
| [no-case-declarations](http://eslint.cn/docs/rules/no-case-declarations) | 不允许在 case 子句中使用词法声明 |
| --- | --- |
| [no-empty-pattern](http://eslint.cn/docs/rules/no-empty-pattern) | 禁止使用空解构模式 |
| [no-fallthrough](http://eslint.cn/docs/rules/no-fallthrough) | 禁止 case 语句落空 |
| [no-global-assign](http://eslint.cn/docs/rules/no-global-assign) | 禁止对原生对象或只读的全局对象进行赋值 |
| [no-octal](http://eslint.cn/docs/rules/no-octal) | 禁用八进制字面量 |
| [no-redeclare](http://eslint.cn/docs/rules/no-redeclare) | 禁止多次声明同一变量 |
| [no-self-assign](http://eslint.cn/docs/rules/no-self-assign) | 禁止自我赋值 |
| [no-unused-labels](http://eslint.cn/docs/rules/no-unused-labels) | 禁用出现未使用过的标 |
| [no-useless-escape](http://eslint.cn/docs/rules/no-useless-escape) | 禁用不必要的转义字符 |

<a name="y4hspz"></a>
## 3、变量声明相关
| [no-delete-var](http://eslint.cn/docs/rules/no-delete-var) | 禁止删除变量 |
| --- | --- |
| [no-undef](http://eslint.cn/docs/rules/no-undef) | 禁用未声明的变量，除非它们在 /* global */ 注释中被提到 |

<a name="prynex"></a>
## 4、代码风格指南相关
| [max-len](http://eslint.cn/docs/rules/max-len) | 强制一行的最大长度 |
| --- | --- |
| [no-mixed-spaces-and-tabs](http://eslint.cn/docs/rules/no-mixed-spaces-and-tabs) | 禁止空格和 tab 的混合缩进 |
| [semi](http://eslint.cn/docs/rules/semi) | 要求或禁止使用分号代替 ASI |

<a name="cgp4sd"></a>
## 5、ES6相关
| [constructor-super](http://eslint.cn/docs/rules/constructor-super) | 要求在构造函数中有 super() 的调用 |
| --- | --- |
| [no-class-assign](http://eslint.cn/docs/rules/no-class-assign) | 禁止修改类声明的变量 |
| [no-const-assign](http://eslint.cn/docs/rules/no-const-assign) | 禁止修改 const 声明的变量 |
| [no-dupe-class-members](http://eslint.cn/docs/rules/no-dupe-class-members) | 禁止类成员中出现重复的名称 |
| [no-new-symbol](http://eslint.cn/docs/rules/no-new-symbol) | 禁止 Symbol 操作符和 new 一起使用 |
| [no-this-before-super](http://eslint.cn/docs/rules/no-this-before-super) | 禁止在构造函数中，在调用 super() 之前使用 this 或 super |
| [no-var](http://eslint.cn/docs/4.0.0/rules/no-var) | 要求使用 let 或 const 而不是 var |
| [require-yield](http://eslint.cn/docs/rules/require-yield) | 要求 generator 函数内有 yield |

<a name="ngq3sh"></a>
## 6、React相关
| [jsx-quotes](http://eslint.cn/docs/rules/jsx-quotes) | 强制在 JSX 属性中一致地使用双引号或单引号 |
| --- | --- |
| [react/display-name](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md) | 要求定义组件时需要有 displayName 属性 |
| [react/forbid-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) | 禁止使用模糊的 prop types |
| [react/jsx-curly-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md) | 要求或禁止JSX属性花括号内的空格 |
| [react/jsx-key](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md) | 检测是否缺失 key 属性 |
| [react/jsx-no-duplicate-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md) | 禁止定义重复的属性 |
| [react/jsx-no-undef](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md) | 禁止使用未声明的变量 |
| [react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md) | 强制使用 PascalCase 风格定义组件名 |
| [react/jsx-uses-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md) | 当使用 JSX 时，阻止 React 被错误标记为未使用 |
| [react/jsx-uses-vars](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md) | 当在 JSX 内使用变量时，阻止该变量被错误标记为未使用 |
| [react/no-danger](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md) | 禁止使用危险的 JSX 属性，如 dangerouslySetInnerHTML |
| [react/no-did-mount-set-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md) | 禁止在 componentDidMount 内使用 setState |
| [react/no-did-update-set-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md) | 禁止在 componentDidUpdate 内使用 setState |
| [react/no-direct-mutation-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md) | 禁止直接修改 this.state |
| [react/no-multi-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md) | 禁止在单个文件内定义多个组件 |
| [react/no-unknown-property](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md) | 禁止使用未知的 DOM 属性 |
| [react/prefer-es6-class](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) | 强制使用 ES5 create-react-class 或 ES6 class 风格定义组件 |
| [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md) | 检测是否缺失 props 校验 |
| [react/react-in-jsx-scope](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md) | 检测使用 JSX 时是否缺失 React 依赖 |
| [react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md) | 当组件无 children 时，强制使用自关闭标签 |
| [react/sort-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md) | 限制书写组件生命周期方法的顺序 |
| [react/jsx-wrap-multilines](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md) | 检测多行 JSX 代码内是否缺失圆括号 |
| [react/jsx-no-comment-textnodes](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md) | 检测是否有注释被当做文本节点插入 JSX 代码 |
| [react/jsx-no-target-blank](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md) | 检测是否没有配合 rel='noreferrer noopener' 单独使用不安全的 target='_blank' |
| [react/no-children-prop](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md) | 禁止把 children 当作属性传递 |
| [react/no-danger-with-children](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md) | 禁止同时使用 children 和 dangerouslySetInnerHTML |
| [react/no-deprecated](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md) | 禁止使用过时的方法 |
| [react/no-find-dom-node](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md) | 禁止使用 findDOMNode 方法，该方法未来会被废弃 |
| [react/no-is-mounted](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md) | 禁止使用 isMounted 方法，该方法未来会被废弃 |
| [react/no-render-return-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md) | 禁止使用 ReactDOM.render 的返回值 |
| [react/no-string-refs](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md) | 禁止给 ref 属性赋值为字符串 |
| [react/no-unescaped-entities](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md) | 禁止在字符串内使用未被转义的文档标记 |
| [react/require-render-return](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md) | 要求 render 函数有返回值 |

<a name="y11vrt"></a>
## 7、Import相关
| [import/no-unresolved](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md) | 报告导入模块时该模块未被正确的解析 |
| --- | --- |
| [import/export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md) | 报告导出时有重复的默认导出关键字或导出名称 |
| [import/no-named-as-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md) | 报告使用导出的名称作为默认导出的本地导入名称 |
| [import/no-named-as-default-member](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md) | 报告使用导出的名称作为默认导出的属性 |
| [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md) | 报告重复导入已解析的路径 |


