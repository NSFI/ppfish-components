# 贡献指南

这篇指南会指导你如何为 组件库 贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## 行为准则

- 每一次的组件变更应该始于需求(or bug)的提出, 终于需求(or bug)的关闭。
- 确认需求后，设计组件API之前，对于要新增的组件需要考虑和其他组件的职责边界划分。力求组件整体职责划分清晰，没有交叉。
- 组件API设计完成之后，务必进行组件API设计的review。非常重要，API是组件对外的契约，一旦你制定了一纸契约，你必须遵守它，且不要轻易改动它。使用契约的人越多，改动的代价越大。breaking change的数量一定程度上体现你组件设计时考虑的不周全之处的数量。
- 开始编码前, 务必先设计组件API，并通过组件API设计文档的review。
- 遵循编码规范并通过`npm run lint`

## 分支管理

新的开发周期开始后，从 master 分支切一个 feature 分支出来（比如 feature-1.1 分支用来发布 1.1 版本）。 如果你要修一个 bug，那么请发 pull request 到 master；如果你要提一个增加新功能的 pull request，那么请基于 feature 分支来做。

## 开发流程

1.  记录需求：将jira提出需求拆分成需要组件实现的关键点并记录
1.  待交互稿交付后进行组件API设计: 基于需求设计出组件参数调整及响应的变化, 及实现思路。目前使用组件API使用文档替代组件API设计文档。
1.  组件API设计: 基于需求设计出组件参数调整及响应的变化, 及实现思路。目前使用组件API使用文档替代组件API设计文档,你需要做以下步骤：
  - 在`site/docs/zh-CN`路径下添加markdown文件，添加：组件名、使用场景、组件demo、API使用文档
  - 在`site/componentsPage/index.js`中新增组件文件描述对象，设置类型和状态
1.  组件API设计文档Review / 讨论
1.  组件API设计文档Review通过后，基于组件的API编写组件测试用例
1.  在`source/components`路径下新增组件文件夹，并在`source/components/index.js`引入，开始组件编码、完善demo内容
1.  组件Code Review，代码编写完后，发起Pull Request进行Code Review
1.  代码合并后发布一个beta版本, 更新演示环境并通知测试
1.  Publish

## Pull Request

使用jira维护需求和bug，每个Pull Request都需要对应jira上的id.
PR 标题规则：[ bug fix / breaking change / new feature ] 组件名字（英文，首字母大写）：修改内容描述（中文）
例如：[new feature] PicturePreview: 添加放大和缩小图标
  -   前面方括号用来区分 PR / issue 的类型：bug fix - 组件 bug 修复；breaking change - 不兼容的改动；new feature - 新功能
  -   修改内容尽可能言简意赅，总结 PR 的改动或者描述 issue

## 组件代码审查清单

- API设计文档
- 可演示的demo
- 通过`npm run lint`
- 提供测试用例，并通过`npm run test`
- 组件classname使用统一的ppfish class前缀及模块classname命名空间
- 为了支持按需加载，需要确保`source/components/{组件名}/index.js`可以读取到组件。

## changelog

`git log dev...site --pretty=format:'<li> <a target="_blank" href="https://github.com/NSFI/ppfish-components/commit/%H">view commit &bull;</a> %s</li> ' --reverse | grep -v Merge`

