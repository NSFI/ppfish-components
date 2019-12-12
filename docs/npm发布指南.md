# npm发布指南

## 注意事项
- 发布人需要熟悉npm文档，能够预计当前npm发布计划可能对即将要发布的代码可能产生的影响
- 处于npm版本资源有限和保持npm代码库版本可用的目的，请谨慎发布npm版本，不随意发布当前还处于开发状态的代码

## 官方文档
- [How to Publish & Update a Package](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [How to Label Packages with Dist-tags](https://docs.npmjs.com/getting-started/using-tags)

## 简易发布指南
1. 发布前，确认当前代码开发状态，确认当前版本号的tag是beta版本还是latest版本（正式版）
2. 发布前查看已有versions及tags，我们使用了以下tag：
  - latest 最新稳定版本，用户默认安装的版本就是latest
  - beta 测试版本
  - alpha 试验版本
3. 使用npm version命令管理版本号，而不是手动修改版本号。
当然如果你非常清楚[semantic version](https://docs.npmjs.com/misc/semver)，使用类似`1.3.2-alpha.1`也OK
4. 根据当前要发布的版本状态，使用npm publish 或 npm publish --tag beta 发布正式版或beta版本
5. cnpm每隔10分钟同步一次，着急使用可以移步[TAONPM](https://npm.taobao.org/package/ppfish)点击SNYC链接手动同步。

```bash****
# 查看tags
npm view ppfish dist-tags

# 查看versions
npm show ppfish versions

# 预发布
git add -A && git commit -m "c"
npm version prerelease
npm publish --tag beta 指定tag为beta并发布

# 发布
git add -A && git commit -m "c"
npm version major/minor/patch
npm publish 默认以latest发布

#为Github项目打tag
git push origin master --tags

# 当前版本1.3.2出现了BUG，需要切回之前的版本或者指定的1.3.1版本
npm dist-tags ls
npm dist-tags rm ppfish@1.3.2 latest
npm dist-tags add ppfish@1.3.1 latest
```

## 实际发布流程举例
对于大型项目来说，发布一个大版本，大致会经过以下的流程，即预发一些预备版本。

v1.3.2-alpha.1
v1.3.2-beta.1
v1.3.2-beta.2
v1.3.2-rc.1
v1.3.2-rc.2
v1.3.2
操作步骤如下。

```bash
# 更新版本号
$ npm version 1.3.2-alpha.1

# 打包dist（可选，提供umd规范的包）
$ npm run build:dist

# 编译 es 和 lib
$ npm run build:others

# 在本地测试打包，检查打包后的文件是否完整，测试该包
$ npm pack

# 使用alpha标签发布该版本 (可选，默认使用latest发布)
$ npm publish --tag alpha

# 安装使用该版本
npm i ppfish@alpha
```
