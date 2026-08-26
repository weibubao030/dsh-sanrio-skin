# AGENTS.md — dsh-sanrio-skin（DSH 原生皮肤插件）

> 本文件是项目的总指引。目标是**把三丽鸥皮肤做进 DeepSeek Harness（DSH）Web UI 的
> 原生外观体系**：`dsh plugin --profile web add` 一行安装，皮肤注册进 ThemeRuntime，
> 在 **设置 → 插件 → 三丽鸥皮肤** 标签页里出现皮肤切换器；吉祥物/品牌覆盖等装饰层
> 以 DOM 注入实现（宿主侧 /sanrio-skin-assets 路由喂素材）。
> 这是 2026-08 的一次重构：仓库根目录的浏览器层旧版（`sanrio-skin.user.js` /
> `sanrio-skin.js` / `sanrio-skin.css` / `skin-assets.json` / `build-skin.js`）已**删除**，
> 插件本体（package.json / src / scripts / assets）直接位于仓库根目录；图片素材
> （`布丁狗/`、`hellokitty/` 以及插件 `assets/`）保留。

---

## 1. 架构总览

插件是 DSH 的「双半」客户端插件包，结构与官方 `ui-*` 包一致：

```
┌─ 宿主侧 lib/index.js（Node 进程）──────────────────────────┐
│  · Cordis 插件：inject ["webServer"]                       │
│  · 注册 /sanrio-skin-assets/* 路由（loopback 守卫）         │
│  · 把包内 assets/ 图片喂给浏览器侧（避免 2MB base64 进 bundle）│
└────────────────────────────────────────────────────────────┘
┌─ 浏览器侧 lib/client.js（dsh-client-modules 加载）─────────┐
│  · Cordis 客户端插件：inject ["slots","locale","theme"]    │
│  · ctx.theme.register × 10（5 角色 × 日夜）→ 原生主题运行时  │
│  · ctx.slots.inject("settings.plugins.tab") → 插件区的皮肤标签页 │
│  · localStorage 持久化 + boot 恢复 + auto 跟随系统          │
│  · 装饰层 DOM 注入（品牌字/吉祥物/peek/好友列/品牌覆盖）      │
└────────────────────────────────────────────────────────────┘
```

**安装链路**：`dsh plugin --profile web add <路径>` → 在 `~/.dsh/profiles/web` 执行
`pnpm add`（相对路径按调用目录锚定，支持 `file:`/`link:` 前缀）→ 成功后调和
`dsh.profile.bundles`：**凡 package.json 声明了 `dsh.bundle.patch` 的依赖自动进入
bundles 层栈**。本地开发用 `link:` 依赖（junction 指向源码目录，重建即时生效）。

**生效时机**：新增 bundle 需要**重启 DSH**（client-modules 启动时扫描 loader 条目）。
之后的皮肤切换热生效，无需重启。

## 2. 目录结构

> 重构后插件本体直接位于仓库根目录（不再是 `dsh-sanrio-skin/` 子目录）。

```
├── package.json          # dsh.bundle.patch / dsh.client.inject / exports
├── cordis.patch.yml      # 向 profile 插入 loader 条目 {id, name}
├── src/
│   ├── index.ts          # 宿主侧：asset 路由（webServer）
│   ├── client.tsx        # 浏览器侧：Cordis 客户端插件主逻辑
│   ├── themes.ts         # 5 角色 × 日夜 token 表（唯一配色数据源）
│   └── decor.ts          # 装饰层 DOM 注入（mount/remove）
├── scripts/
│   ├── build.mjs         # esbuild：index.ts→lib/index.js；client.tsx→lib/client.js
│   └── smoke.mjs         # 无 DSH 进程的构建产物冒烟测试
├── assets/               # 装饰图片（mascot.gif/peek.png/brandlogo.png/friend-*.png…）
├── lib/                  # 构建产物（不提交）
├── AGENTS.md             # 本指引
├── README.md             # 项目说明
├── LICENSE
└── 布丁狗/ hellokitty/   # 保留的原始图片素材
```

## 3. 常用命令

```sh
# 在仓库根目录（插件本体所在）
npm install                          # devDeps: esbuild/typescript/react/@types/*
npm run build                        # 构建 lib/（必须：改 src 后）
npm run watch                        # 监听重建（link: 安装下改完即生效）
npx tsc --noEmit                     # 类型检查
node scripts/smoke.mjs               # 无 DSH 进程的构建产物冒烟测试（10 主题注册/路由出图/防护）

# 安装 / 更新 / 移除（本地开发，安装根目录）
dsh plugin --profile web add  "C:\Users\shxdf\Documents\DSH\DSH皮肤"
dsh plugin --profile web update dsh-sanrio-skin
dsh plugin --profile web remove dsh-sanrio-skin
```

## 4. 插件包协议（照抄即用）

**package.json 关键字段**：

```jsonc
"dsh": {
  "bundle": { "patch": "./cordis.patch.yml" },          // 声明为 profile bundle
  "client": {
    "inject": [                                          // 浏览器侧依赖的官方 client 包
      "@deepseek-ai/dsh-client-runtime",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-client-ui-theme",
      "@deepseek-ai/dsh-client-ui-settings",
      "@deepseek-ai/dsh-client-ui-settings-general"
    ],
    "platform": "web"
  }
},
"exports": { ".": "./lib/index.js", "./client": "./lib/client.js", "./package.json": "./package.json" }
```

**cordis.patch.yml**（loader 条目，id/name 均取包名）：

```yaml
- insert:
    - id: dsh-sanrio-skin
      name: 'dsh-sanrio-skin'
```

**浏览器侧 bundle 格式**（esbuild CJS + 手工包裹；react 与 `@deepseek-ai/*` 保持 external，
运行时解析到 DSH shell 模块表）：

```js
window.__ModuleLoader__.load({
  id: "dsh-sanrio-skin",
  factory: (require) => {
    // ...CJS bundle（esbuild 产物，含 module.exports = __toCommonJS(...)）
    return module.exports;
  }
});
```

## 5. 主题系统（Token 模型）

- **注册**：`ctx.theme.register({ id, colorScheme, tokens })`；`id` 形如
  `sanrio-<character>-<mode>`（如 `sanrio-pudding-dark`），共 10 个。
  `colorScheme` 驱动 `body[data-ds-dark-theme]`；`tokens` 由 ThemePresenter
  内联为 `<body>` 上的 CSS 自定义属性。
- **token 即 CSS 变量**：`--dsw-alias-*`（语义色）、`--dsw-specific-*`（组件专属）、
  `--shiki-*`（代码高亮）。**未覆盖的 token 回落 DSH 默认主题**——与旧版浏览器层
  皮肤只覆盖若干 key 的行为一致。
- **唯一配色数据源**：`src/themes.ts` 的 `PALETTES`（从旧版 `sanrio-skin.css` 移植）。
  改配色只动这一个文件。
- **扩展 key 集**：目前每角色约 20–40 个 key（布丁狗最全）。若要做高保真，
  参照 [Solarized-dsh-theme](https://github.com/zhijun-dai/Solarized-dsh-theme) 的
  完整 alias/specific/shiki 三层表（100+ key）补齐各角色。
- **「跟随系统」**：`auto` 模式下用 `matchMedia('(prefers-color-scheme: dark)')`
  在 `resolveThemeId()` 里映射到具体主题，并监听 change 实时切换。
- **交互边界**：内建「外观」行只认内建 light/dark/system；第三方主题 id 由其自身
  的设置页管理（本插件即 设置 → 插件 → 三丽鸥皮肤 标签页）。

## 6. 设置页槽位（settings.plugins.tab）

```ts
// 行组件 store（defineStore 来自 @deepseek-ai/dsh-client-runtime/client）
const store = defineStore({ init: () => ({ preference, character, mode, revision: -1 }),
  actions: { sync(d, preference, character, mode, revision) { /* revision 递增才更新 */ } } });

// 注册：inject 工厂绑定 ctx.theme 并返回行组件的动作
ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
  name: "settings.plugins.tab", id: "sanrio", order: 5,
  label: () => t("tab.label"), store, locale: SETTINGS_NS, inject: themeInjected
}, SanrioSkinPanel));
```

- 标签内容组件 props：`{ t, setCharacter, setMode, restore, useStore }`。
- locale：`ctx.locale.register(SETTINGS_NS, { zh, en })`，key 集以 zh 为准。
- 注意：插件配置**卡片**槽 `settings.plugin.item` 按可配置的 Host settings namespace 枚举，
  用 localStorage 的第三方插件进不了；因此走的是**标签页**槽 `settings.plugins.tab`。

## 7. 持久化与启动恢复

- **为什么用 localStorage**：Host settings wire 只放行白名单 namespace
  （`dsh-host-apiproxy` 的 `WEB_SETTINGS_NAMESPACES`），第三方 namespace 会得到
  `settings-not-exposed`；localStorage 与产品对浏览器侧偏好的进程本地语义一致。
- key：`sanrio-skin:enabled`（on/off）、`sanrio-skin:character`、`sanrio-skin:mode`。
  全新安装默认 `enabled=on` + 布丁狗 + auto；「还原系统皮肤」把 enabled 置 off，
  下次启动不再套皮肤（交给内建外观）。
- **boot guard**：ThemeService 会在启动后异步采纳内建偏好并覆盖第三方过早的设置，
  因此在 5 秒窗口内（或 3 次 theme/change）重断言保存的主题，之后让位用户操作。
- `theme/change` 事件：订阅它做三件事——同步 store、挂/卸基础样式、挂/卸装饰层。

## 8. 装饰层（DOM 注入）

- 资源：`assets/`，由宿主 `/sanrio-skin-assets/<name>` 路由提供（loopback 守卫 +
  扁平文件名 + 防穿越；参考 dsh-workbench 的 `isLoopbackRequest`）。
- 挂载：`mountDecor(character)`；卸载：`removeDecor()`。仅当激活主题是 sanrio 时挂载。
- 元素：`sk-brandtext`（顶部品牌字，全部角色）、`sk-mascot` / `sk-peek` /
  `sk-friends-row` / `sk-brandbox`（**仅布丁狗**）、`sk-font`（Baloo 2 字体 link）。
- 选择器脆弱点：header 定位依赖 `header[class*="wSkVaW"]`——**DSH 升级可能改
  CSS-module hash**，届时需同步更新 `decor.ts`；同样，`settings.plugins.tab` 槽位名
  若变更会影响插件区标签页注册（`client.tsx`）。

## 9. 基础样式（圆角/滚动条/动效）

- `client.tsx` 里的 `BASE_CSS_RULES`（从旧版 `sanrio-skin.css` 的 base 段移植）。
- 仅在 sanrio 主题激活时挂载 `<style>`；选择器用 `:not(#dsh-sanrio)` 提权，
  压过官方 ui-* 表（官方表在我们的之后注入、同优先级时后者赢）。

## 10. 已知坑位与约定

> **待修（TODO）：皮肤/设置按钮仍会残留浏览器默认的黑色 :focus 描边。**
> 已在 `client.tsx` 的卡片/胶囊上加 `outline: "none"`，但实测点击后仍会有一圈黑色 focus 描边。
> 处理思路：给鼠标点击的按钮去掉默认 focus 环（`outline: none` 之外再处理 `:focus` /
> `:focus-visible`），或把选中态做成一个**常驻 focus 风格的描边环**（当前选中态已用
> `inset box-shadow` 描边环），彻底接管焦点视觉。**后续任务，暂缓。**（配色的"切换后颜色
> 不协调"问题已通过去掉背景高亮、只用描边环解决。）

- profile 的 `~/.dsh/profiles/web/pnpm-workspace.yaml`：`nodeLinker: hoisted`、
  `autoInstallPeers: false` → 插件 peerDeps 缺失**只警告不报错**。
- 用户自己的 `~/.dsh/profiles/web/cordis.patch.yml` 含 GitHub token，**永不提交**；
  本插件的 `cordis.patch.yml` 是包内补丁层，与它不冲突（一个 loader 条目一个 patch）。
- `dsh plugin` 是 pnpm 薄封装：相对路径按**调用目录**锚定（`./pkg` 会被改写成绝对路径）。
- git 托管插件首次安装需 `allowBuilds`（prepare 脚本）；本地 `link:` 安装无此问题。
- 发布 npm 后安装：`dsh plugin --profile web add dsh-sanrio-skin`；`files` 已含
  `lib`、`assets`、`cordis.patch.yml`。
- 装饰层是**非官方**手段，DSH 大版本升级后跑一遍阶段 4 回归清单。

## 11. 验证清单（阶段 4 验收）

1. `dsh plugin --profile web add <包路径>` 成功，`~/.dsh/profiles/web/package.json`
   的 `dsh.profile.bundles` 含 `dsh-sanrio-skin`。
2. `node scripts/smoke.mjs` 全绿（构建产物级验证，无需 DSH）。
3. 重启 DSH 后：
   - `GET http://127.0.0.1:3080/plugins/dsh-sanrio-skin/client.js` → 200；
   - `GET http://127.0.0.1:3080/sanrio-skin-assets/peek.png` → 200（宿主路由）。
3. 设置 → 插件：出现「三丽鸥皮肤」标签页；点标签页选角色 + 白天/黑夜/跟随系统立即换肤；
   选布丁狗出现吉祥物/peek/好友列/品牌覆盖；「还原系统皮肤」回退且装饰层消失。
4. 刷新页面：皮肤保持（localStorage + boot restore）。
5. 「跟随系统」：切换系统深浅色，皮肤实时跟随。
6. 切到内建主题（外观 → 浅色/深色）：sanrio 基础样式与装饰全部卸载，无残留。
7. DevTools Console 无报错；`[dsh-sanrio-skin] client plugin boot` 出现一次。
