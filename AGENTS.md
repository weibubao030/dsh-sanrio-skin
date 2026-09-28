# AGENTS.md — dsh-sanrio-skin

## 目标

按 DeepSeek Harness 官方 bundle、client module、ThemeRuntime、配置表单和 Slots 协议，提供能在官方 Desktop 0.2.0-rc.1 中使用的四角色皮肤。优先使用官方扩展点，不定位宿主内部 DOM，也不复制 DSH 的外观状态。

## 当前结构

- `package.json`：`dsh.bundle.patch`、`dsh.client`、导出和 Desktop 运行时版本约束。
- `cordis.patch.yml`：向 profile 增加一个 Host Loader 条目。
- `index.js`：Host `Config` 注册角色枚举，`settings.configure` 开放设置，`webServer` 精确路由提供使用到的图片。
- `client.js`：`window.__ModuleLoader__.load` 模块；`ctx.configForms.get('dsh-sanrio-skin')` 读写角色；`plugins.bundle.config` 显示插件详情配置；`ctx.theme.overrideTokens()` 根据角色覆盖浅色和深色 token；`sidebar.brand.mark` 和 `conversation.hero.brand.mark` 显示角色图标；`conversation.input.overlay` 在会话输入卡上缘显示零高度右侧大图；`shell.overlay` 显示左下角吉祥物。
- `assets/`：保留原项目四个角色的素材；发布包只包括使用到的图片。

四套角色共用相同的官方主题 token 集和图片槽位，均提供浅色、深色配色、吉祥物、品牌图和输入框右侧大图。好友排图片保留在源码仓库，暂不显示。My Melody 不在当前范围内。

没有构建步骤，包中直接提供可运行的 JS。改动客户端时，保持客户端模块格式和 `inject` 依赖与官方协议一致。

## 验证

用户负责手动安装、启用和验收；不要代替用户操作 DSH 或运行自动化验证测试。目录安装前需在仓库运行 `npm install --omit=dev --legacy-peer-deps --ignore-scripts --package-lock=false`，因为 DSH 把目录链接进 profile，而链接目标要有自己的 `node_modules`（官方发布指南）。用户已授权 Codex 在仓库运行这一步，安装成功。官方 Desktop 插件页安装目录后，若组件显示运行中且皮肤出现，无需额外重启；若管理器提示需要重启或组件未运行，再完全退出并重开应用。新增 Host 图片路由或 client 槽位后，手动验收时完整重启 DSH，确保加载到新插件代码。验收时打开插件详情，选择角色并保存，确认四个角色的颜色、侧栏图标、新会话页图标、吉祥物和输入框右侧大图对应；输入区不应因装饰额外增高；打开右侧边栏时装饰应留在对话列，不应进入边栏，也不应妨碍输入；刷新后选择保留；浅色/深色/跟随系统由内建外观控制；禁用后颜色和图片恢复。

Desktop 使用自己的 `desktop` profile，必须从应用内插件管理页操作，不能用外部 `dsh` CLI 修改它。不要读取或提交用户 profile 下的 `cordis.patch.yml`；它可能包含凭据。

## 后续范围

My Melody 没有成套图片素材，暂不实现。不要恢复旧版的设置切换器、localStorage 启动重试、CSS-module hash 定位或品牌 DOM 覆盖。品牌图使用官方 `sidebar.brand.mark` / `conversation.hero.brand.mark`，右侧大图使用 `conversation.input.overlay`；全框 `shell.overlay` 没有对话内容几何信息，不在右边缘固定放置探头。好友排理想位置在会话标题栏下沿，但当前没有合适的官方装饰槽位，不能把它强塞进输入卡。
