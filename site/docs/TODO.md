# todo list

## 打包组件为静态文件
- 不需要打包peerDependencies，目前打包后的代码包含antd是有问题的；
- 不需要打包图片，打包生成了2个默认图片

## 定制主题
- ppfish组件less整理: 需要定制的地方统一用变量 @各个组件owner

## 首页

## 设计规范页面

## 演示环境

## 组件文档demo开发体验优化
- 干掉libs/markdown/source.js的硬编码；建议改成读取site/componentsPage下的配置文件，不需要每次新增组件时都改libs。
- 干掉site/componentsPage的重复代码；建议改成读取site/componentsPage下的配置文件，不需要每次新增组件时都新增重复代码。

## 组件jest测试方案优化
- 干掉__test__目录下的demo.test.js文件，建议直接读取demo文件并测试，不需要每个组件都写一遍；
- 快照测试表现不符合预期，需要再调试看看

## 组件
 - audioPlayer缺少icon和视觉
