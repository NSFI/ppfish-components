### 注意事项
- 发布人需要熟悉npm文档，能够预计当前npm发布计划可能对即将要发布的代码可能产生的影响
- 处于npm版本资源有限和保持npm代码库版本可用的目的，请谨慎发布npm版本，不随意发布当前还处于开发状态的代码

### 详细文档
- [How to Publish & Update a Package](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [How to Label Packages with Dist-tags](https://docs.npmjs.com/getting-started/using-tags)

### 简易发布指南
1. 发布前，确认当前代码开发状态，确认当前版本号的tag是beta版本还是latest版本（正式版）
2. 发布前查看已有versions及tags
3. 使用npm version命令管理版本号，而不是手动修改版本号
4. 根据当前要发布的版本状态，使用npm publish 或 npm publish --tag beta 发布正式版或beta版本

```bash
#查看tags
npm view ppfish dist-tags

#查看versions
npm show ppfish versions

#预发布
git add -A && git commit -m "c
npm version prerelease
npm publish --tag beta 指定tag为beta并发布

#发布：
git add -A && git commit -m "c
npm version major/minor/patch
npm publish 默认以latest发布

#为ppfish1.1.0版本添加tag为latest:
npm dist-tags add ppfish@1.1.0 latest
```
