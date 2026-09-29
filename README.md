# dsh-sanrio-skin

三丽鸥皮肤，面向 DeepSeek Harness 0.2.0-rc.1 的 Web 与官方 Desktop 客户端。

这是一个最小 DSH bundle：`cordis.patch.yml` 插入一个 Host 插件条目，`package.json` 的 `dsh.client` 声明浏览器插件。浏览器侧通过官方 `ctx.theme.overrideTokens()` 覆盖浅色和深色 token，在 `plugins.bundle.config` 槽位提供角色选择。四套皮肤共用相同的图片位置：`sidebar.brand.mark` 放角色图标，`conversation.hero.brand.mark` 放新会话页角色图标，`conversation.input.overlay` 在会话输入框上缘放右侧大图，`conversation.session.header.actions` 挂载标题栏下沿的好友条，`shell.overlay` 放左下角不拦截点击的吉祥物。角色选择通过 DSH 的 Host 配置表单保存；DSH 自带的「浅色 / 深色 / 跟随系统」继续控制模式。在插件管理页禁用或移除本 bundle 即恢复默认外观。

## 安装

本仓库已包含可运行的 `index.js` 和 `client.js`，无需构建。**从源码目录安装前**，先在本仓库运行以下命令，让链接目标拥有自己的运行依赖：

```sh
npm install --omit=dev --legacy-peer-deps --ignore-scripts --package-lock=false
```

DSH 官方的本地目录安装会将仓库链接到 profile；链接目标需保有自己的 `node_modules`。本插件的 Host 入口使用 `@deepseek-ai/schemastery`，没有上述依赖时会在导入阶段失败。这个准备步骤只针对目录安装；从 npm 包或 `.tgz` 安装由包管理器处理依赖。

- **官方 Desktop**：完成上述目录准备后，在应用内的「插件」页选择本仓库的绝对路径进行安装。若插件显示「运行中」且皮肤已出现，即可使用；若管理器提示需要重启或组件未运行，再完全退出并重开应用。Desktop 使用独立的 `desktop` profile；不要用外部 `dsh` CLI 修改它。
- **Web**：`dsh plugin --profile web add <本仓库绝对路径>`，然后重启 `dsh web`。

## 皮肤设置

在左侧「插件」页打开 `dsh-sanrio-skin` 详情，选中布丁狗、Hello Kitty、酷洛米或玉桂狗即立即切换并保存，没有单独的确认按钮。默认布丁狗。角色设置由官方配置接口持久化；页面重新打开后读取已保存的选择。

四个角色各有浅色、深色配色、品牌图标、一张吉祥物、一张输入框右侧大图和一组好友图；跟随系统由 DSH 内建外观设置负责。大图贴在输入卡上缘，不占用输入区高度，也不接收鼠标操作。图片由 Host 的精确 `/sanrio-skin-assets/*` 路由提供。My Melody 没有对应的成套图片素材，不纳入计划。

| 皮肤 | 配色 | 左下角吉祥物 | 侧栏／新会话图标 | 输入框右侧大图 |
| --- | --- | --- | --- | --- |
| 布丁狗 | 奶油黄、红棕 | `pudding/mascot.gif` | `pudding/brand.png` | `pudding/peek.png` |
| Hello Kitty | 柔白、蝴蝶结红 | `hello-kitty/mascot.gif` | `hello-kitty/brand.png` | `hello-kitty/peek.png` |
| 酷洛米 | 雾紫、灰粉 | `kuromi/mascot.gif` | `kuromi/brand.png` | `kuromi/peek.png` |
| 玉桂狗 | 蓝白、天空蓝 | `cinnamoroll/mascot.png` | `cinnamoroll/brand.png` | `cinnamoroll/peek.png` |

`shell.overlay` 是覆盖整个应用框架的浮层，包括右侧边栏，不能作为对话列专属背景。因此大图放在官方 `conversation.input.overlay` 内，跟随输入卡布局，右侧边栏打开时也留在对话列。该槽位的宿主锚点是绝对定位、零高度；大图以低透明度作装饰。布丁狗和酷洛米素材本身是探头构图；Hello Kitty 和玉桂狗素材是完整插画。不通过宿主内部 DOM 定位来模拟它。

好友条使用仓库现成图片：布丁狗 15 张、Hello Kitty 12 张、酷洛米 11 张、玉桂狗 10 张，分别放在角色的 `friends/` 目录，以 `00.png` 起顺序编号。它从官方标题栏动作槽挂载一个零高度组件，测量所在标题栏的下沿，让图片沿着对话列标题栏底边排列。该槽位并非专用装饰槽位；测量依赖标题栏的语义 `header` 元素，不依赖 CSS-module hash。图片不接收点击，右侧边栏打开时随对话列移动。更改图片路径后，请完全退出并重开 DSH，再手动验收。

布丁狗配色以吉祥物的奶油黄和红棕色为参考：浅色保持奶油白底，深色使用暖深灰底，仅在操作和选中状态使用焦糖色。

另外三套沿用同一调色原则：Hello Kitty 用柔白底与蝴蝶结红，酷洛米用灰紫底与紫粉强调，玉桂狗用浅蓝白底与天空蓝强调。深色模式的底色均保持低彩度，不把角色强调色铺满整页。

没有 localStorage 或额外字体依赖。好友条的精确定位仍受 DSH 标题栏布局变更影响。

## 文件

| 文件 | 作用 |
| --- | --- |
| `package.json`、`cordis.patch.yml` | 官方 bundle 与 client 模块声明 |
| `index.js` | Host 侧角色配置 schema 和图片路由 |
| `client.js` | 浏览器侧主题覆盖、插件详情配置、品牌图标、标题栏好友条、输入框装饰和左下角吉祥物 |
| `assets/<角色>/` | 插件实际使用的图片：`mascot`、`brand.png`、`peek.png` 和 `friends/00.png` 起编号的好友图；仅此目录进入发布包 |
| `source-assets/<角色>/` | 原项目的未加工素材，保留原始文件名；`pudding/avatar-derived.jpg` 是旧版生成但现在未使用的头像图 |

仓库根目录只保留插件入口、包声明和文档。旧浏览器脚本、旧构建脚本与 TypeScript 插件实现已从当前目录移除；原素材统一存放在 `source-assets/`，运行图片统一存放在 `assets/`。

官方协议参考：[bundle 发布指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md)、[客户端模块](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/client-modules.md)、[主题服务](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-theme/src/client/index.ts)、[Slots 规范](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/slots.zh.md)、[对话槽位定义](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-conversation/src/client/contract/slots.ts)、[侧栏品牌槽位](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-sidebar/src/client/contract/slots.ts)、[浮层槽位](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-layout/src/client/AppFrame.tsx)。
