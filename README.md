# dsh-sanrio-skin

三丽鸥 Sanrio 皮肤 —— DeepSeek Harness（DSH）Web UI **原生客户端插件**。

5 角色（Hello Kitty / Kuromi / 玉桂狗 / My Melody / 布丁狗）× 日/夜双模式。皮肤通过 DSH 原生
**ThemeRuntime**（`ctx.theme.register`）注册为主题，在 **设置 → 插件 → 三丽鸥皮肤**
标签页里切换；吉祥物、品牌覆盖、好友列等装饰层以 DOM 注入实现（宿主侧
`/sanrio-skin-assets` 路由喂素材，素材不塞进 bundle）。

> 本仓库是一个原生插件包，**插件本体位于仓库根目录**。此前的浏览器层版本（Tampermonkey
> 脚本 / 控制台注入）已删除；原始图片素材（`布丁狗/`、`hellokitty/`）及插件用到的
> `assets/` 保留。

## 结构

| 文件 | 作用 |
| --- | --- |
| `package.json` | `dsh.bundle.patch` / `dsh.client.inject` / exports |
| `cordis.patch.yml` | profile 补丁层：向 DSH profile 插入 loader 条目 |
| `src/index.ts` | 宿主侧：`/sanrio-skin-assets` 路由（loopback 守卫） |
| `src/client.tsx` | 浏览器侧：Cordis 客户端插件（注册主题 + 插件区标签页 + 装饰层） |
| `src/themes.ts` | 5 角色 × 日夜 token 表（唯一配色数据源） |
| `src/decor.ts` | 装饰层 DOM 注入 |
| `scripts/build.mjs` | esbuild 构建（`lib/index.js` + `lib/client.js`） |
| `scripts/smoke.mjs` | 无 DSH 进程的构建产物冒烟测试 |
| `assets/` | 装饰图片（mascot.gif / peek.png / brandlogo.png / friend-*.png…） |

## 开发

```sh
npm install
npm run build      # 构建 lib/
npm run watch      # 监听重建（profile 若以 link: 安装，改完即生效）
npx tsc --noEmit   # 类型检查
node scripts/smoke.mjs   # 构建产物级冒烟测试（无需 DSH）
```

## 安装（本地验证）

```sh
dsh plugin --profile web add "C:\Users\shxdf\Documents\DSH\DSH皮肤"
# 重启 DSH 一次，然后 设置 → 插件 → 三丽鸥皮肤 标签页切换皮肤
```

## 发布后安装（npm）

```sh
dsh plugin --profile web add dsh-sanrio-skin
```

## 功能

- **5 个角色卡片** + **白天 / 黑夜 / 跟随系统**；选中态用描边环（`inset box-shadow`），
  不叠加背景高亮，避免与各角色配色冲突。
- **跟随系统**：`matchMedia('(prefers-color-scheme: dark)')` 实时跟随 OS 深浅色。
- **持久化**：`sanrio-skin:enabled` / `:character` / `:mode` 存 localStorage，
  设成什么，重启/刷新就保持什么。
- **还原系统皮肤**：关闭皮肤、交还给内建「外观」，重启后保持关闭。
- 装饰层：布丁狗专属吉祥物 / 偷看 / 好友列 / 品牌覆盖；全部角色显示顶部品牌字。

## 已知约定 / 待修

- 主题偏好存 localStorage（Host settings wire 只放行白名单 namespace）。
- 客户端 bundle 的 `require("react")` / `require("@deepseek-ai/...")` 在浏览器里
  解析到 DSH shell 的模块表，构建时保持 external。
- **待修**：皮肤/设置按钮仍会残留浏览器默认的黑色 `:focus` 描边（详见 `AGENTS.md`
  第 10 节），后续用常驻 focus 描边环接管视觉。

## 版权

配色与原创小徽标致敬三丽鸥风格，未使用官方受版权保护角色素材；仅限个人自用，
勿用于商业发布。
