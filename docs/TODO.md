# TODO LIST

## ~~打包组件为静态文件~~
- 不需要打包peerDependencies
- 不需要打包图片，打包生成了2个默认图片

## ~~定制主题~~
- ppfish组件less整理: 需要定制的地方统一用变量 @各个组件owner

## ~~首页~~

## ~~设计规范页面~~

## ~~演示环境~~

## ~~组件文档demo开发体验优化~~
- 干掉libs/markdown/source.js的硬编码；建议改成读取site/componentsPage下的配置文件，不需要每次新增组件时都改libs。
- 干掉site/componentsPage的重复代码；建议改成读取site/componentsPage下的配置文件，不需要每次新增组件时都新增重复代码。

## 组件jest测试相关
- 干掉__test__目录下的demo.test.js文件，建议直接读取demo文件并测试，不需要每个组件都写一遍；@高志友
- ~~快照测试表现不符合预期，需要再调试看看；~~
- source/components下的组件需要补充测试用例；@各组件owner

## ~~组件~~
- ~~audioPlayer缺少icon和视觉；@王晓玲~~

## 组件库官网支持多文档
- 组件库需要写一个对应不同文档的路由组件；
- 组件库官网发布脚本更新支持多文档打包；

## switch导致的组件demo暂时去除，待switch完工后重新补充
- ~~table 自定义显示隐藏demo~~
- ~~spin demo~~

## ~~发布的npm包太大，site/assets占了一半大小，可以去掉~~

## ~~Icon 组件中列出支持的 icon 类型~~

## ~~更新React即将__UNSAFE的生命周期函数，使用新的生命周期函数做替换。[详情见](https://reactjs.org/docs/react-component.html#the-component-lifecycle)~~

## 组件支持SSR
- 编译打包支持打成node包，移除css引用供node环境使用
- datepicker，移除document is undefined错误
