# AGENTS.md — dsh-sanrio-skin

## 目标

按 DeepSeek Harness 官方 bundle、client module、ThemeRuntime、配置表单和 Slots 协议，提供能在官方 Desktop 0.2.0-rc.1 中使用的四角色皮肤。优先使用官方扩展点，不依赖 CSS-module hash，也不复制 DSH 的外观状态。好友条是一次基于官方槽位挂载、测量语义标题栏位置的实验。

## 当前结构

- `package.json`：`dsh.bundle.patch`、`dsh.client`、导出和 Desktop 运行时版本约束。
- `cordis.patch.yml`：向 profile 增加一个 Host Loader 条目。
- `index.js`：Host `Config` 注册角色枚举，`settings.configure` 开放设置，`webServer` 精确路由提供使用到的图片，包括四套好友图。
- `client.js`：`window.__ModuleLoader__.load` 模块；`ctx.configForms.get('dsh-sanrio-skin')` 读写角色；`plugins.bundle.config` 显示插件详情配置；`ctx.theme.overrideTokens()` 根据角色覆盖浅色和深色 token；`sidebar.brand.mark` 和 `conversation.hero.brand.mark` 显示角色图标；`conversation.input.overlay` 在会话输入卡上缘显示零高度右侧大图；`conversation.session.header.actions` 挂载零高度好友条；`shell.overlay` 显示可拖动的窗口内吉祥物与会话状态气泡。气泡读取官方 `useSessionStatus` 和当前 Session binding 的新 `turn/end` 事件。
- `assets/pudding/`、`assets/hello-kitty/`、`assets/kuromi/`、`assets/cinnamoroll/`：运行图片，每个角色有 `mascot`、`brand.png`、`peek.png` 和编号的 `friends/` 图片；只有 `assets/` 进入发布包。
- `source-assets/`：四套原始素材，保留原文件名；`pudding/avatar-derived.jpg` 是未使用的旧版派生图。这个目录不进入发布包。

四套角色共用相同的官方主题 token 集和图片槽位，均提供浅色、深色配色、吉祥物、品牌图、输入框右侧大图和好友条。四套配色都按角色素材重新调过：布丁狗奶油白与红棕，Hello Kitty 柔白与蝴蝶结红，酷洛米灰紫与紫粉，玉桂狗蓝白与天空蓝。My Melody 不在当前范围内。好友条槽位仅提供挂载点；组件测量最近的语义 `header` 下沿并观察其尺寸变化。这不是专用的官方装饰槽位，DSH 升级时需要人工验收。

没有构建步骤，包中直接提供可运行的 JS。改动客户端时，保持客户端模块格式和 `inject` 依赖与官方协议一致。

吉祥物初版复用现有图片，不切换动作，也没有点击台词。位置是浏览器本地偏好，与官方配置表单保存的角色选择分开。只对当前打开的会话显示气泡：`pendingInteraction` 持续提示需要输入；新发生的 `turn/end` 按 `reason.kind` 区分完成、受阻／错误／输出截断；主动停止不报受阻。不要把 `running: false` 或 `completionUnread` 当成任务成功。历史加载和重连不重播旧事件。

## 验证

用户负责手动安装、启用和验收；不要代替用户操作 DSH 或运行自动化验证测试。目录安装前需在仓库运行 `npm install --omit=dev --legacy-peer-deps --ignore-scripts --package-lock=false`，因为 DSH 把目录链接进 profile，而链接目标要有自己的 `node_modules`（官方发布指南）。用户已授权 Codex 在仓库运行这一步，安装成功。官方 Desktop 插件页安装目录后，若组件显示运行中且皮肤出现，无需额外重启；若管理器提示需要重启或组件未运行，再完全退出并重开应用。新增 Host 图片路由或 client 槽位后，手动验收时完整重启 DSH，确保加载到新插件代码。验收时打开插件详情，选中角色（选中即写入并切换，无保存按钮；写入失败时回滚选择并提示），确认四个角色的颜色、侧栏图标、新会话页图标、吉祥物、输入框右侧大图和好友条对应；检查好友条不遮挡标题与标签、不额外增高标题栏；打开右侧边栏时图片应留在对话列，不应进入边栏，也不应妨碍输入或点击；刷新后选择保留；浅色/深色/跟随系统由内建外观控制；禁用后颜色和图片恢复。

手动验收吉祥物时检查拖动和方向键、位置保留、窗口缩放、四角色切换、右边栏开合、气泡不挡按钮、等待输入、完成、受阻或错误及主动停止；只由用户操作 DSH。Desktop 使用自己的 `desktop` profile，必须从应用内插件管理页操作，不能用外部 `dsh` CLI 修改它。不要读取或提交用户 profile 下的 `cordis.patch.yml`；它可能包含凭据。

## 后续范围

My Melody 没有成套图片素材，暂不实现。不要恢复旧版的设置切换器、localStorage 启动重试、CSS-module hash 定位或品牌 DOM 覆盖。品牌图使用官方 `sidebar.brand.mark` / `conversation.hero.brand.mark`，右侧大图使用 `conversation.input.overlay`；全框 `shell.overlay` 没有对话内容几何信息，不在右边缘固定放置探头。好友条只从 `conversation.session.header.actions` 挂载，图片不塞进输入卡；定位依赖语义 `header` 和当前布局，右侧边栏开合时跟随对话列。
