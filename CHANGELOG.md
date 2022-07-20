## [1.8.9](https://github.com/NSFI/ppfish-components/compare/v1.8.8...v1.8.9) (2022-07-20)


### Bug Fixes

* 在内容尾部插入视频后，再次编辑时出现尾部光标丢失问题 ([a7ef5e9](https://github.com/NSFI/ppfish-components/commit/a7ef5e996d5895a73a132d5e7371536f6044dc3c))



## [1.8.8](https://github.com/NSFI/ppfish-components/compare/v1.8.8-alpha.6...v1.8.8) (2022-07-14)


### Bug Fixes

* 修复ellipsis组件无法设置className问题 ([e1f9d25](https://github.com/NSFI/ppfish-components/commit/e1f9d255bff1ecb1e0fe552424d1cd6399f293a4))
* ts 高版本导致 jest 报错问题修改 ([b4d2058](https://github.com/NSFI/ppfish-components/commit/b4d205872e2883fa292fab3a37cc22abfc653e12))


### Performance Improvements

* 优化日期多语言结构 ([60513d3](https://github.com/NSFI/ppfish-components/commit/60513d38ea1aec8c252c4cc54644ea31eb18493e))
* 优化ts类型 ([05a0e20](https://github.com/NSFI/ppfish-components/commit/05a0e208c39ed019d5bcf8724714d2a97e815b02))
* remove useless code ([77a1841](https://github.com/NSFI/ppfish-components/commit/77a1841d0e9a4d036cc6c40e17ba044d8d634cad))
* update other lang file ([fd0c123](https://github.com/NSFI/ppfish-components/commit/fd0c12376da1b52f3728ba763d396ccd6e97eb45))


### Reverts

* Revert "feat: set optional href attr" ([9c44d78](https://github.com/NSFI/ppfish-components/commit/9c44d789c693c02e01ee32691f8fc355890f9975))



## [1.8.8-alpha.6](https://github.com/NSFI/ppfish-components/compare/v1.8.8-alpha.5...v1.8.8-alpha.6) (2022-06-07)


### Features

* set optional href attr ([e1fa253](https://github.com/NSFI/ppfish-components/commit/e1fa253bbf9a0d12a6f9dd942d76c97e7df28211))



## [1.8.8-alpha.5](https://github.com/NSFI/ppfish-components/compare/v1.8.8-alpha.4...v1.8.8-alpha.5) (2022-06-06)


### Bug Fixes

* 用冒泡方式监听paste及drop事件无法阻止默认行为，改为捕获方式 ([37013a1](https://github.com/NSFI/ppfish-components/commit/37013a1ad288e80742a59e2e3501da064aaeed02))
* Data URL方式插入图片异常 ([fa22c3c](https://github.com/NSFI/ppfish-components/commit/fa22c3c376a7515a786176c8a6f0c9c319ace6ac))



## [1.8.8-alpha.4](https://github.com/NSFI/ppfish-components/compare/v1.8.8-alpha.3...v1.8.8-alpha.4) (2022-05-18)


### Features

* 附件属性兼容 ([f431315](https://github.com/NSFI/ppfish-components/commit/f43131517415d0a9d2e68c85b5fd745ea540afab))



## [1.8.8-alpha.3](https://github.com/NSFI/ppfish-components/compare/v1.8.8-alpha.2...v1.8.8-alpha.3) (2022-05-11)


### Bug Fixes

* list 的判断, class 问题修复 ([c8fdbc4](https://github.com/NSFI/ppfish-components/commit/c8fdbc467e9559a190363f95afd7f8a0d058a7c3))



## [1.8.8-alpha.2](https://github.com/NSFI/ppfish-components/compare/v1.8.7...v1.8.8-alpha.2) (2022-05-11)


### Bug Fixes

* 行高对于空字符串的判断 ([bd11371](https://github.com/NSFI/ppfish-components/commit/bd11371a0bb8fd5abec670c4a9b24f78b0b3915d))
* 修复在Windows系统中粘贴时出现html的空值问题 ([f16f205](https://github.com/NSFI/ppfish-components/commit/f16f205389b05e553922d68e9a714fae93b3db4d))
* list 初始化的修改 ([4262f16](https://github.com/NSFI/ppfish-components/commit/4262f16f8f356dc92a9a563712c9bf4b8838e3be))


### Features

* 样式注释 ([03df6dc](https://github.com/NSFI/ppfish-components/commit/03df6dc32d02d64dc38d287fa1e17ce22abde51e))
* 样式注释, 避免最后字数过大 ([5137dba](https://github.com/NSFI/ppfish-components/commit/5137dba66f9d00bbfa57df6490bc69f827d50255))
* lineHeight 判断修改, 背景色的重现问题解决 ([a1943c0](https://github.com/NSFI/ppfish-components/commit/a1943c0d61c883c3b8b558dab9e3165178c44a40))



## [1.8.7](https://github.com/NSFI/ppfish-components/compare/v1.8.7-alpha.6...v1.8.7) (2022-05-05)



## [1.8.7-alpha.6](https://github.com/NSFI/ppfish-components/compare/v1.8.7-alpha.5...v1.8.7-alpha.6) (2022-04-26)


### Bug Fixes

* 查找与历史的冲突问题 ([13cc592](https://github.com/NSFI/ppfish-components/commit/13cc5928bce0f8fbe53ff3114fe465dbbc772d49))


### Features

* 查找模式关闭的操作 ([2f8b5f0](https://github.com/NSFI/ppfish-components/commit/2f8b5f058e39d42116ffe1121dcb8980e98af4db))



## [1.8.7-alpha.5](https://github.com/NSFI/ppfish-components/compare/v1.8.7-alpha.4...v1.8.7-alpha.5) (2022-04-25)


### Bug Fixes

* 按钮对于 list 的判断修改 ([6260c80](https://github.com/NSFI/ppfish-components/commit/6260c809ae6184ec0d9631d4e446924b8e8f471c))


### Features

* 默认表情只支持 emoji ([7514d20](https://github.com/NSFI/ppfish-components/commit/7514d20e02fc15f39e6a3d7101ca37aadf71c355))
* 遗留 css 补充 ([94ad574](https://github.com/NSFI/ppfish-components/commit/94ad5748449fb2c4cfdec60e03d7443b94c7ca35))



## [1.8.7-alpha.4](https://github.com/NSFI/ppfish-components/compare/v1.8.7-alpha.3...v1.8.7-alpha.4) (2022-04-24)



## [1.8.7-alpha.3](https://github.com/NSFI/ppfish-components/compare/v1.8.7-alpha.1...v1.8.7-alpha.3) (2022-04-21)


### Bug Fixes

* QuillResize parchment error ([10a1f93](https://github.com/NSFI/ppfish-components/commit/10a1f937ff69951ad6e2416c6f1a5ccfc3cdcb23))


### Features

* 查找滚动的逻辑处理 ([f025eb3](https://github.com/NSFI/ppfish-components/commit/f025eb3fc707d6392b9baf32a9d747ea8037b5d3))
* 特殊符号的转义恢复 ([cd8ee2a](https://github.com/NSFI/ppfish-components/commit/cd8ee2a80a81bdf569f9ba16d4211da36c5cb7bd))
* 样式的调整 ([8054f15](https://github.com/NSFI/ppfish-components/commit/8054f15d9db759ba6c7a038625fc3b3fe1c42f69))
* add pasteFormater API ([960ada5](https://github.com/NSFI/ppfish-components/commit/960ada5d6ce98ad28b3d4b232afe935ce8dc72a8))
* auto adjust table menu vertically ([a2bb2b5](https://github.com/NSFI/ppfish-components/commit/a2bb2b537524cd2807a0e44ac26cd130ac3983d1))
* pasteFormater API ([ff16321](https://github.com/NSFI/ppfish-components/commit/ff163210264e294c47a4faf180ce70be116b5713))



## [1.8.7-alpha.1](https://github.com/NSFI/ppfish-components/compare/v1.8.7-alpha.0...v1.8.7-alpha.1) (2022-04-20)


### Bug Fixes

* 错误的判断 ([bd25a02](https://github.com/NSFI/ppfish-components/commit/bd25a02bb565a7d89478a568a5f20704ae380293))
* 直接依赖hoist-non-react-statics缺失 ([2c78ebf](https://github.com/NSFI/ppfish-components/commit/2c78ebfe2c2217b2585d340607b7150171096ede))
* PlainClipboard onPaste ([a570e00](https://github.com/NSFI/ppfish-components/commit/a570e0004f30160eb88c5b636585cefffd0de0b6))


### Features

* 查找的active状态修改, 样式分离 ([e03c100](https://github.com/NSFI/ppfish-components/commit/e03c100b5c3df0df9dc34dc8fe7289e753cf8389))
* 查找与替换的多语言功能 ([a685578](https://github.com/NSFI/ppfish-components/commit/a68557860a6af235650c1dcda23c4b541faf5e69))
* 替换的置灰, 同时可替换为空 ([bdce5bf](https://github.com/NSFI/ppfish-components/commit/bdce5bff68391953b06efde12968377c64fc523d))
* disable nested table ([2e72c7c](https://github.com/NSFI/ppfish-components/commit/2e72c7c8ef7f226b3e3a1cc8256c64cc70b98fb2))
* dynamic adjustment when the menu cannot be displayed completely ([1be709e](https://github.com/NSFI/ppfish-components/commit/1be709e20267e1091e0e85705fe1b6ddc946e2b6))
* fobid nest table ([26312ee](https://github.com/NSFI/ppfish-components/commit/26312ee58314ab38e4357afc06600effa62cc1f8))
* new table menu layout ([b4a0d19](https://github.com/NSFI/ppfish-components/commit/b4a0d193456f5fb99a71e99900cb2501cdbfdb3d))



## [1.8.7-alpha.0](https://github.com/NSFI/ppfish-components/compare/v1.8.6...v1.8.7-alpha.0) (2022-04-19)



## [1.8.6](https://github.com/NSFI/ppfish-components/compare/v1.8.6-alpha.0...v1.8.6) (2022-04-14)


### Features

* 可选表情包功能 ([4f47820](https://github.com/NSFI/ppfish-components/commit/4f47820f24a8da099985be37475edc95ad0feadb))



## [1.8.6-alpha.0](https://github.com/NSFI/ppfish-components/compare/v1.8.5...v1.8.6-alpha.0) (2022-04-11)


### Bug Fixes

* 查找的符号添加, 导入继续修改 ([8c89284](https://github.com/NSFI/ppfish-components/commit/8c8928431de31968a663993254fd59f9457d5911))
* import 和 require 问题修改 ([96b2e5b](https://github.com/NSFI/ppfish-components/commit/96b2e5bb915feeacff98091fcef6b4ee0321f141))
* quill component 的导出修复 ([b128242](https://github.com/NSFI/ppfish-components/commit/b1282422fad22c340ad5f2541768d9cc3d4310b8))



## [1.8.5](https://github.com/NSFI/ppfish-components/compare/v1.8.4...v1.8.5) (2022-04-11)


### Bug Fixes

* [#85](https://github.com/NSFI/ppfish-components/issues/85) ([c6fb60d](https://github.com/NSFI/ppfish-components/commit/c6fb60d86645ec5ceddfaa5e18e0c5f5672971b5))
* npm & removeEventListener ([28582cc](https://github.com/NSFI/ppfish-components/commit/28582cc887f430e7e2b164fcad6f2cdebe9ca697))
* toggle and menu separate from the table ([939f18f](https://github.com/NSFI/ppfish-components/commit/939f18ffdeddc5deb41cb545fa955bc04a45a1ad))


### Features

* 插入表格的面板添加 ([c46d561](https://github.com/NSFI/ppfish-components/commit/c46d561c5237e607bd0db3ef18be414eac9cb499))
* 插入表格点击回调完成 ([21d5d09](https://github.com/NSFI/ppfish-components/commit/21d5d09f6dd03e402cf4209f64c93ea2fd488775))
* 查找的大概功能 ([f88ed40](https://github.com/NSFI/ppfish-components/commit/f88ed40bca7bbcfdcd4717524b8f0bd945fbb10c))
* 查找的上一步操作 ([b915846](https://github.com/NSFI/ppfish-components/commit/b9158468cb2af70318161e1013171671defc1dc9))
* 查找的下一个完成 ([8c7566b](https://github.com/NSFI/ppfish-components/commit/8c7566b6bcfdf3ebfe9a6aad3a0bcbbab307c2a3))
* 查找功能-下一个 ([c94f260](https://github.com/NSFI/ppfish-components/commit/c94f2608cbb2ee32ac01d045b41c15c08c590dc3))
* 查找功能部分 ([5c3605f](https://github.com/NSFI/ppfish-components/commit/5c3605f371afd4944d422ed65b428016a14e6f0d))
* 查找功能部分 ([7f7a2ac](https://github.com/NSFI/ppfish-components/commit/7f7a2ac92f6ee2610277365b41b031e85448a599))
* 代码优化 ([e5b81e1](https://github.com/NSFI/ppfish-components/commit/e5b81e13a79ce794026ae7ee9897d8ceb50aae12))
* 更新 demo 快照, 避免报错 ([0c60378](https://github.com/NSFI/ppfish-components/commit/0c603788aca48655b8d4614e462676771805215b))
* 节流时间调整 ([1c8d093](https://github.com/NSFI/ppfish-components/commit/1c8d093fb1b185360edf849f881cc71d18979d39))
* 屏幕外跳转功能 ([4763194](https://github.com/NSFI/ppfish-components/commit/4763194b0fd34253a5a8d8d3d4ed85e815921a93))
* 数据设置的结构修改, 全部替换功能 ([635447c](https://github.com/NSFI/ppfish-components/commit/635447cfe06fd0faa6641aa0f8c562063921fc95))
* 替换尝试 ([d48f734](https://github.com/NSFI/ppfish-components/commit/d48f73446fb3d19642d84c1108c09b9547a070e6))
* 替换的基础样式 ([539180d](https://github.com/NSFI/ppfish-components/commit/539180d1cb6c354cd6cf2574743bae8791a47472))
* 替换功能完成 ([d7f8a30](https://github.com/NSFI/ppfish-components/commit/d7f8a3020f950b35d84b125b1edaeaabafff3126))
* 图标整理 ([e60370b](https://github.com/NSFI/ppfish-components/commit/e60370bbd48c871d3f4034394b546383504c0679))
* 新增表格相关图标 ([dd5df77](https://github.com/NSFI/ppfish-components/commit/dd5df77ba2272cdad18c84811c3b75563d54c2da))
* 遗漏图标补充 ([8031dfb](https://github.com/NSFI/ppfish-components/commit/8031dfb4bed64fe33f0e4b5987ba6c1dfc29e79f))
* 遗漏依赖补充 ([b0bc25b](https://github.com/NSFI/ppfish-components/commit/b0bc25b6ff397c18e14eeff12a4d9e66f8419e6f))
* 用户输入的场景监听, 添加注释 ([90e372f](https://github.com/NSFI/ppfish-components/commit/90e372f605a4c57de38b87a5da0d6f40f9f1df75))
* 原组件报错修改 ([e00288b](https://github.com/NSFI/ppfish-components/commit/e00288b558ad5d1962156d33c4a27283a29c7aaa))
* adjust options ([8502e8c](https://github.com/NSFI/ppfish-components/commit/8502e8c1733af10a12819508962aea50ced65f00))
* quill 本地维护 ([30632e3](https://github.com/NSFI/ppfish-components/commit/30632e35f766634f44d58ebf73003cd36c6273a8))
* remove throttle ([edc1319](https://github.com/NSFI/ppfish-components/commit/edc1319be5c0e321b9d9b0098f7ed91c05f53de3))
* support table ([288020d](https://github.com/NSFI/ppfish-components/commit/288020d9a979e7770800c5b82891f8e92dce1767))
* table ui ([0b66926](https://github.com/NSFI/ppfish-components/commit/0b66926cc014ce954af775a40901f03a468315c1))
* update table icons ([aab30ca](https://github.com/NSFI/ppfish-components/commit/aab30caa44fa18da09e1ac7de0793091139618b4))



## [1.8.4](https://github.com/NSFI/ppfish-components/compare/v1.8.2-rc.2...v1.8.4) (2022-03-30)


### Bug Fixes

* 报错修改 ([c2bd1a4](https://github.com/NSFI/ppfish-components/commit/c2bd1a4260c2df4a79656077fb09f31a9a2ee674))
* 大小字的位置调整 ([70fe631](https://github.com/NSFI/ppfish-components/commit/70fe631792c15fdfdc5396fab720a81ce720283d))
* 光标可能消失的 bug ([8d44bb5](https://github.com/NSFI/ppfish-components/commit/8d44bb5ba4ed634bf7fa6e3ea1b0bd0c32d29763))
* 兼容格式化的问题, 字体大小和背景色的冲突问题 ([9a083f9](https://github.com/NSFI/ppfish-components/commit/9a083f9a182f1e805de0946adac4f3d01c222b00))
* 修复背景色的 bug ([d4a3bce](https://github.com/NSFI/ppfish-components/commit/d4a3bced3b6bfe0942a2386434bafa7014259887))
* clean 的时候针对 size 的清理 ([04aa3a2](https://github.com/NSFI/ppfish-components/commit/04aa3a2c5d280b29367a32bf2dee57c4c88d8c79))


### Features

* 编辑器的缩放修改 ([173f557](https://github.com/NSFI/ppfish-components/commit/173f55765699a1fc639f5ad696fed2cb956b31c4))
* 编辑器格式化问题 ([0f1b7d7](https://github.com/NSFI/ppfish-components/commit/0f1b7d7240447299fab1f0e21da6331e6d555cc2))
* 标签的样式调整 ([00a432b](https://github.com/NSFI/ppfish-components/commit/00a432bbbc15a2ff7e2a4200aa158144de452ff9))
* 表情的静态配置 ([b6f3993](https://github.com/NSFI/ppfish-components/commit/b6f3993c7f547afc98c7feafab113658cd73a7ea))
* 撤销的配置项添加入口 ([28697b5](https://github.com/NSFI/ppfish-components/commit/28697b5dcc7c3dc4ee660efff2aab17710571bd8))
* 错误情况排除 ([443b7be](https://github.com/NSFI/ppfish-components/commit/443b7be582ee40e9eab5a3223af0d8c26b5ae9bd))
* 单测例子更新 ([00bde79](https://github.com/NSFI/ppfish-components/commit/00bde797a7e567d65ee46210910aba5724b0bc63))
* 多语言问题, header 暂时注释 ([23895be](https://github.com/NSFI/ppfish-components/commit/23895bea3e7231e096f678ab8ea7e686873925bd))
* 附件的标签格式 ([924bb3f](https://github.com/NSFI/ppfish-components/commit/924bb3fae2363a442a1102318a2e43f18bea2b81))
* 附件优化 ([ebbf400](https://github.com/NSFI/ppfish-components/commit/ebbf400f014e06ebdce81fc225fbb5d66fc1ecbf))
* 富文本 全屏的按钮 ([772c9cd](https://github.com/NSFI/ppfish-components/commit/772c9cd9922b5daf6ab3a92ac14465064b618d57))
* 快照更新 ([ca7e7d1](https://github.com/NSFI/ppfish-components/commit/ca7e7d1281d250c0b13baebbf06a8bad41520926))
* 泡泡表情清晰度优化 ([bb8c1c9](https://github.com/NSFI/ppfish-components/commit/bb8c1c9ae11a173124e8726fff2796d57ad735ea))
* 清除格式的 bug 修改 ([c370b2b](https://github.com/NSFI/ppfish-components/commit/c370b2b63dfccaf581217b4ac1ef382534f09c95))
* 添加 toolbar header ([daf1f47](https://github.com/NSFI/ppfish-components/commit/daf1f47bb8927aeb477c72939ac388e249152a22))
* 添加斜体的 clean ([841c830](https://github.com/NSFI/ppfish-components/commit/841c83003cfb3e8abdb20bab4321cc0b2d12bbae))
* 图片的拖拽 自然获取长宽修改 ([5fa91d2](https://github.com/NSFI/ppfish-components/commit/5fa91d26a890dd7fdb6040b064f3b487d5909caa))
* 图片的拖拽修改 ([969d98d](https://github.com/NSFI/ppfish-components/commit/969d98d1ca84edb9b8c169d23d57a7ff6d9a0844))
* 图片缩放 微调 ([0ccc8bd](https://github.com/NSFI/ppfish-components/commit/0ccc8bd2dab386f879db32b20c1f988b56a0cb2b))
* 图片缩放功能完成 ([3946494](https://github.com/NSFI/ppfish-components/commit/39464948a2167b5504b5f4639e866394ffef5162))
* 拖拽文件的修改 ([175f5e8](https://github.com/NSFI/ppfish-components/commit/175f5e80c727e4ae851876e6c67fcd639550b064))
* 文本升级, 文档优化, 表情包添加(未完成 ([18341fd](https://github.com/NSFI/ppfish-components/commit/18341fd7cce665544463d1f12ffbe418b2e1ed75))
* 行高的修改 ([3781e8c](https://github.com/NSFI/ppfish-components/commit/3781e8cecd24523a615f3e58c97fbc693590fc1b))
* 行距的功能添加, icon 未添加 ([f4552ab](https://github.com/NSFI/ppfish-components/commit/f4552ab74f1f4ffcebc6c0f2c5e97b01bdf08c3b))
* 行距的文本显示问题 ([a275740](https://github.com/NSFI/ppfish-components/commit/a27574009190cfb217a7c57d95aec19322d132ae))
* 修改附件标签 ([1e4e263](https://github.com/NSFI/ppfish-components/commit/1e4e26397cc832d9ae95d24f46101eea2ef606a8))
* 遗留的表情添加 ([a6f0b6c](https://github.com/NSFI/ppfish-components/commit/a6f0b6c491754d46470c490ec1d47c57689b1bba))
* 优化点击体验 ([20e4fb5](https://github.com/NSFI/ppfish-components/commit/20e4fb5a1ae451cc407cef9f29f766bfef4163c8))
* emoji 的初始化 ([d5c5f99](https://github.com/NSFI/ppfish-components/commit/d5c5f9960b27d06834c9095c4801d6364efae3b3))
* iconfont 的更新 ([c617cae](https://github.com/NSFI/ppfish-components/commit/c617cae7ffcfb573fa26cdecc194e1aa63fa43a6))
* lineHeight 的调整, 避免初始值的错误 ([657940c](https://github.com/NSFI/ppfish-components/commit/657940c188f6f533b43f12f96f0ee24a5af558e2))
* lineHeight 的一些调整 ([3076e00](https://github.com/NSFI/ppfish-components/commit/3076e009a8bb6ea829f3311de328937ae3532650))
* undo, redo ([17a79a4](https://github.com/NSFI/ppfish-components/commit/17a79a47da0d046a0286c8a50de12e7cee3ccb1b))
* update changelogs and build config ([1565881](https://github.com/NSFI/ppfish-components/commit/1565881a5e66aae672268f4d85e3fa6b2f5370b0))



## [1.8.2-rc.2](https://github.com/NSFI/ppfish-components/compare/v1.8.2-rc.1...v1.8.2-rc.2) (2021-08-13)


### Bug Fixes

* 修复Select组件部分事件的函数签名不正确的问题。修复Select组件多选模式下取消选择时也会触发onSelect事件的问题；同时添加onDeselect作为该事件的触发承载。 ([36f5293](https://github.com/NSFI/ppfish-components/commit/36f529324303d655ba2814ba5134a3107684df7b))
* 修复table在少数列且存在fixed属性时，会重复展示fixed列的问题 ([2bf648d](https://github.com/NSFI/ppfish-components/commit/2bf648d766236a38b35aa7a2e66a4719bbec568f))



## [1.8.2-rc.1](https://github.com/NSFI/ppfish-components/compare/v1.8.2-beta.4...v1.8.2-rc.1) (2021-07-16)


### Bug Fixes

* 删除Guide组件中的不恰当的readonly修饰符 ([8a49af4](https://github.com/NSFI/ppfish-components/commit/8a49af45b59fd5b28b7825de637045b6a51820ea))
* 修复modal在嵌套使用复杂子组件时动画卡顿的问题 ([72f646a](https://github.com/NSFI/ppfish-components/commit/72f646a47ff6310f910ecd2c07b898f43fd56f89))



## [1.8.2-beta.4](https://github.com/NSFI/ppfish-components/compare/v1.8.2-beta.3...v1.8.2-beta.4) (2021-06-11)



## [1.8.2-beta.3](https://github.com/NSFI/ppfish-components/compare/v1.8.2-beta.2...v1.8.2-beta.3) (2021-05-27)



## [1.8.2-beta.2](https://github.com/NSFI/ppfish-components/compare/v1.8.2-beta.1...v1.8.2-beta.2) (2021-05-21)


### Bug Fixes

* remove tabs warnings ([70aa50d](https://github.com/NSFI/ppfish-components/commit/70aa50dd75ddca91220dbdfb6c9e271747fb3e9f))
* typings of Drawer & Guide ([50abc7e](https://github.com/NSFI/ppfish-components/commit/50abc7e630071cf22ddf16117eaf46991265e87e))


### Features

* 更新getPopupContainer的types使其函数签名一致；修复LoadMore中className和status属性为必需的问题 ([3b9c55d](https://github.com/NSFI/ppfish-components/commit/3b9c55d67cc991d8e463cad1a7a805e89115a55a))



## [1.8.2-alpha.3](https://github.com/NSFI/ppfish-components/compare/v1.8.2-alpha.2...v1.8.2-alpha.3) (2021-04-21)


### Features

* 升级marked；修复richEditor placeholder展示问题；richEditor文件前缀现在固定展示为File；修复繁体语言包中链接文案为空的问题 ([4fafd80](https://github.com/NSFI/ppfish-components/commit/4fafd8054af8af3996b5631e602244c371f896d3))



## [1.8.2-alpha.2](https://github.com/NSFI/ppfish-components/compare/v1.8.2-alpha.1...v1.8.2-alpha.2) (2021-04-13)



## [1.8.2-alpha.1](https://github.com/NSFI/ppfish-components/compare/v1.8.1...v1.8.2-alpha.1) (2021-04-12)


### Features

* 对伪类元素的content内容进行国际化处理 ([9672ece](https://github.com/NSFI/ppfish-components/commit/9672ece35cb507bcc2b8bfe06024fb0a361b28e8))



## [1.8.1](https://github.com/NSFI/ppfish-components/compare/v1.8.1-rc.3...v1.8.1) (2021-03-18)



## [1.8.1-rc.3](https://github.com/NSFI/ppfish-components/compare/v1.8.1-rc.2...v1.8.1-rc.3) (2021-03-09)



## [1.8.1-rc.2](https://github.com/NSFI/ppfish-components/compare/v1.8.1-rc.1...v1.8.1-rc.2) (2021-02-25)


### Bug Fixes

* **PicturePreview:** preserve natural size ([183cac5](https://github.com/NSFI/ppfish-components/commit/183cac52131b071c3f09f0c10e86fe5dc84d5e71))



## [1.8.1-rc.1](https://github.com/NSFI/ppfish-components/compare/v1.8.1-beta.3...v1.8.1-rc.1) (2021-01-26)


### Bug Fixes

* 修复Select组件获取Option属性时type属性可能不存在的问题 ([204c920](https://github.com/NSFI/ppfish-components/commit/204c920a90ef532706cb4949efcf977cacf5b48e))



## [1.8.1-beta.3](https://github.com/NSFI/ppfish-components/compare/v1.8.1-beta.2...v1.8.1-beta.3) (2021-01-25)


### Bug Fixes

* **DatePicker:** locale ([d223f3c](https://github.com/NSFI/ppfish-components/commit/d223f3ccc03b76c337085c3ffcef8954ecda5d0e))



## [1.8.1-beta.2](https://github.com/NSFI/ppfish-components/compare/v1.8.1-beta.1...v1.8.1-beta.2) (2021-01-22)


### Bug Fixes

* 版本号更改 ([f7a22e3](https://github.com/NSFI/ppfish-components/commit/f7a22e39bf7878206888a4c1670343592ebef4f8))
* 修复rutimeLocale默认语言设置不正确的问题 ([66f42ca](https://github.com/NSFI/ppfish-components/commit/66f42ca7933ee9473cb045737a7959db90832cca))
* 修复TimePanel接受属性中selectableRange被props参数覆盖的问题 ([0026ad4](https://github.com/NSFI/ppfish-components/commit/0026ad4b91e25491817b51cb9ca7127f692895ad))
* **Animate:** add timeout ([9a533b1](https://github.com/NSFI/ppfish-components/commit/9a533b186a5efd78410585885fbf5f9c66feca8c))
* **build:** entry d.ts file ([e14fc26](https://github.com/NSFI/ppfish-components/commit/e14fc2660c51838451c2150f0acf047f8fce44a4))
* **Collapse:** docs & component state ([cc2f200](https://github.com/NSFI/ppfish-components/commit/cc2f2009c51c0c7c59c806908dda36f6a79fd797))
* ConfigProvider文档链接变更 ([392e75a](https://github.com/NSFI/ppfish-components/commit/392e75ad0efa1905b813a71ed679b4d4712559f6))
* **DatePicker:** props ([fee18d4](https://github.com/NSFI/ppfish-components/commit/fee18d4533c3d1a199a6c719d5652e7fe202d5e1))
* **DatePicker:** time select formatter ([656f317](https://github.com/NSFI/ppfish-components/commit/656f317c4df34a092d6b859f48e6e9bee9db436f))
* **DatePicker:** time select formatter ([e5d7fcf](https://github.com/NSFI/ppfish-components/commit/e5d7fcfb82fba598371a44b2b599a8e3f2f28de0))
* **Drawer:** wrapperClassName ([6f78275](https://github.com/NSFI/ppfish-components/commit/6f78275022f47156dfff193bfcca1d1d0b563c9e))
* entry file ([16126ea](https://github.com/NSFI/ppfish-components/commit/16126ea09ff8cc8eb53176215254ec8df1bac84a))
* **PicturePreview:** active state & unit test ([5dee6af](https://github.com/NSFI/ppfish-components/commit/5dee6af371afc5783a96fbe33acaae9cbd1d99aa))
* **Select:** 修复Select组件 多选模式下的取消确定按钮未被国际化的问题 ([32322c1](https://github.com/NSFI/ppfish-components/commit/32322c1e994e5ba0abec132a279e91a45df46f4c))
* **Select:** option click handler ([3cc1e55](https://github.com/NSFI/ppfish-components/commit/3cc1e55969f3349e2074352d8d1943748cdb2f53))


### Features

* 多语言功能完成，新增多语言使用说明文档 ([40a36cd](https://github.com/NSFI/ppfish-components/commit/40a36cd369ab1c1d71c83964f4afd908b787f8ab))
* 国际化新增 繁体中文（中国台湾）(zh_TW)语言包 ([15d1849](https://github.com/NSFI/ppfish-components/commit/15d1849f34d17b9057a66d211bbe0117cd6f72fa))
* 新增多语言相关文件和demo ([58c6403](https://github.com/NSFI/ppfish-components/commit/58c640305e29391ba3ae82c5d629148bc8e601b2))
* 增加高阶组件ref透传 ([63e19ce](https://github.com/NSFI/ppfish-components/commit/63e19ce94afa1f97675b06ea14b9335f7f231900))
* 增加runtimeLocale函数  对Modal，Pagination，RichEditor，VideoViewer完成多语言改造 ([691c72b](https://github.com/NSFI/ppfish-components/commit/691c72b61ff13d2551d6b075263d2f9e28b8fcea))
* 支持tree、treeSelect组件单向联动，支持单独禁用treeNode的checkbox ([#30](https://github.com/NSFI/ppfish-components/issues/30)) ([38c4fd7](https://github.com/NSFI/ppfish-components/commit/38c4fd751c2bad6daa0621aee5fbacfae6a79d3a))
* 支持tree、treeSelect组件单向联动，支持单独禁用treeNode的checkbox ([#30](https://github.com/NSFI/ppfish-components/issues/30)) ([be5ad43](https://github.com/NSFI/ppfish-components/commit/be5ad434cccc112bcea620b3b8bd86e00cbd40be))
* commands for generating d.ts files ([cb3e166](https://github.com/NSFI/ppfish-components/commit/cb3e166150fd6b75bc7b0d6e2025d15452f3f3f1))
* Config，Locale组件暴露方式变更 ([cf8f7f0](https://github.com/NSFI/ppfish-components/commit/cf8f7f08390f91a8e567cd6ca1f16c745949f19b))
* **DatePicker:** i18n ([45b57e8](https://github.com/NSFI/ppfish-components/commit/45b57e8cc3236e520e12cdb9bcabfd8d116efa07))
* runtimeLocale增加默认Locale ([dacb1af](https://github.com/NSFI/ppfish-components/commit/dacb1af951f55a68b4d6fdb6dde839098d91c042))
* Table 默认展示数据项可按column位置展示，不统一在底部展示 ([aed8604](https://github.com/NSFI/ppfish-components/commit/aed86044b8c86559a1508596c862763490763f5c))
* Transfer、TreeSelect、Upload add i18n ([824e5f9](https://github.com/NSFI/ppfish-components/commit/824e5f9200a21a24776fd9b634ec61fb63d07b34))
* withLocale增加ts支持 ([8b7197a](https://github.com/NSFI/ppfish-components/commit/8b7197ab2ca89cc82461024536fd62ea8531cadc))



## [1.7.5-alpha.1](https://github.com/NSFI/ppfish-components/compare/v1.7.4...v1.7.5-alpha.1) (2020-06-23)



## [1.7.3](https://github.com/NSFI/ppfish-components/compare/v1.7.3-beta.2...v1.7.3) (2019-12-19)



## [1.7.4](https://github.com/NSFI/ppfish-components/compare/v1.7.4-beta.2...v1.7.4) (2020-06-02)



## [1.7.4-beta.2](https://github.com/NSFI/ppfish-components/compare/v1.7.4-beta.1...v1.7.4-beta.2) (2020-05-12)


### Bug Fixes

* 修复Layout/Sider组件safari下响应式报错问题 ([4d082db](https://github.com/NSFI/ppfish-components/commit/4d082dbd39c670c0ce8d8dfc8f8f80f4f6ab72c4))


### Performance Improvements

* 注释单元测试 ([fdd0cd1](https://github.com/NSFI/ppfish-components/commit/fdd0cd10af48739f95fef5e24579105b91bd3ac0))



## [1.7.4-beta.1](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.8...v1.7.4-beta.1) (2020-04-24)


### Features

* **notification:** 优化 onClose 函数, 新增 key 参数 ([e737e50](https://github.com/NSFI/ppfish-components/commit/e737e505621b273728479a82b7d5d128dab96669))



## [1.7.4-alpha.8](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.7...v1.7.4-alpha.8) (2020-04-22)



## [1.7.4-alpha.7](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.6...v1.7.4-alpha.7) (2020-04-22)



## [1.7.4-alpha.6](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.5...v1.7.4-alpha.6) (2020-04-15)



## [1.7.4-alpha.5](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.4...v1.7.4-alpha.5) (2020-04-09)



## [1.7.4-alpha.4](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.3...v1.7.4-alpha.4) (2020-04-09)



## [1.7.4-alpha.3](https://github.com/NSFI/ppfish-components/compare/v1.7.4-alpha.2...v1.7.4-alpha.3) (2020-04-08)



## [1.7.4-alpha.2](https://github.com/NSFI/ppfish-components/compare/v1.7.3...v1.7.4-alpha.2) (2020-01-09)



## [1.7.3](https://github.com/NSFI/ppfish-components/compare/v1.7.3-beta.2...v1.7.3) (2019-12-19)



## [1.7.3-beta.2](https://github.com/NSFI/ppfish-components/compare/v1.7.3-beta.1...v1.7.3-beta.2) (2019-12-11)



## [1.7.3-beta.1](https://github.com/NSFI/ppfish-components/compare/v1.4.0...v1.7.3-beta.1) (2019-12-05)


### Bug Fixes

* npm编译打出的es包，有部分文件没有编译为es5语法,修改打包脚本处理 ([04f7e73](https://github.com/NSFI/ppfish-components/commit/04f7e73e760c6e2df68e5f31e4c16596b82db95b))
* select组件在disable状态下,文字颜色修正 ([3f6d23c](https://github.com/NSFI/ppfish-components/commit/3f6d23c2f66c6f060cfe4345dfa97e789e3d41c1))


### Reverts

* Revert "Update README.md" ([c5af6b5](https://github.com/NSFI/ppfish-components/commit/c5af6b565732bc2e94d3b9e6f9ee7268fe79e55f))
* Revert "demo中的icon迁移" ([8594c60](https://github.com/NSFI/ppfish-components/commit/8594c600c03f7a756b2a7287e3b9f32d612cdd85))



# [1.4.0](https://github.com/NSFI/ppfish-components/compare/v1.3.3...v1.4.0) (2018-10-23)



## [1.3.3](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.17...v1.3.3) (2018-10-17)



## [1.3.2-alpha.17](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.16...v1.3.2-alpha.17) (2018-09-26)



## [1.3.2-alpha.16](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.15...v1.3.2-alpha.16) (2018-09-25)


### Bug Fixes

* delete 修改为 close ([7555d83](https://github.com/NSFI/ppfish-components/commit/7555d83fae6eceb32e10b7357725f4673661f4f6))



## [1.3.2-alpha.15](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.14...v1.3.2-alpha.15) (2018-09-20)



## [1.3.2-alpha.14](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.12...v1.3.2-alpha.14) (2018-09-17)



## [1.3.2-alpha.12](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.2...v1.3.2-alpha.12) (2018-09-12)


### Bug Fixes

* demo测试递归找到最高层的组件；用闭包隔离每个demo的环境，避免变量声明重复; ([f3230a3](https://github.com/NSFI/ppfish-components/commit/f3230a350721e7c9ac19233691f4e0f59f4201a6))
* markdownDemoTransformer支持const Demo = Form.create(class extends Component{})这种形式的赋值 ([73f77de](https://github.com/NSFI/ppfish-components/commit/73f77de52f421541ead2a366038f9f8340d6400f))


### Reverts

* Revert "修复编译错误" ([96e2719](https://github.com/NSFI/ppfish-components/commit/96e271928d87275c6a81da893c991f87c49065e3))



## [1.3.2-alpha.2](https://github.com/NSFI/ppfish-components/compare/v1.3.2-alpha.1...v1.3.2-alpha.2) (2018-08-15)



## [1.3.2-alpha.1](https://github.com/NSFI/ppfish-components/compare/v1.3.0...v1.3.2-alpha.1) (2018-08-10)



# [1.3.0](https://github.com/NSFI/ppfish-components/compare/v1.2.0...v1.3.0) (2018-08-01)



# [1.2.0](https://github.com/NSFI/ppfish-components/compare/9d494870f283c652fb258eefb1bc8f93d1e62f6b...v1.2.0) (2018-08-01)


### Bug Fixes

* 引用错误 ([9d49487](https://github.com/NSFI/ppfish-components/commit/9d494870f283c652fb258eefb1bc8f93d1e62f6b))


### Reverts

* Revert "setup(jest+typescript): 修改jest配置，使测试支持typescript" ([297f53d](https://github.com/NSFI/ppfish-components/commit/297f53d78704386abe3667f257ad2a7a861ac40b))



