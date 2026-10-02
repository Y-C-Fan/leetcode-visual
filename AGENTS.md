# AGENTS.md — leetcode-visual

个人 LeetCode / MySQL 可视化网页集合，已发布为公开站点。
以下约定由仓库所有者（Y-C-Fan）逐条确认，后续任何改动都必须遵守。

---

## 1. 硬性约束：题目页不可修改

**已完成的题目 HTML 一律保持原样，不做任何内容、样式、结构上的改动。**

- 包括：不注入"返回首页"导航、不加水印、不重排版、不替换配色、不改页面内文案。
- **允许**移动位置与重命名文件（归类整理属于此类，已获授权）。
- 需要新增能力时只在首页或站点外壳上解决，绝不回写题目页。

**Why:** 题目页是已定稿的作品，逐页改动会破坏作者既有排版与交互。
**How to apply:** 若某需求只能靠改题目页满足，先向用户说明，不要擅自修改。

### 例外记录：`回溯/0046_permutations.html` 已按用户要求改版式（2026-10-02）

用户明确要求"改成横屏、电脑上不用往下滚"，故**仅此页**动了版式：

- 控件 / 预设 / 状态芯片 / 图例 提到顶部 `.toolbar` 整行；主体由"1100px 两列、左列竖堆 9 块"改为**三栏**：`.col-tree`（公式+树+nums+path）、`.col-state`（res+调用栈+日志）、`.col-code`（代码+讲解）。
- `@media (min-width:1100px)` 下 `body{display:flex;overflow:hidden}`，页面不滚、三栏各自内部滚动；窄屏回退为单列正常滚动。
- 验收硬指标（满载 Step 67/67 实测全过）：`document.documentElement.scrollHeight === innerHeight`，覆盖 1920×1080 / 1440×900 / 1366×768；900px 宽时确认回退为可滚动、内容不裁切。
- **只改版式与 DOM 归属，未动算法与 JS**：19 个元素 ID 全保留、无重复，标签配平，`<script>` 未改。

**How to apply:** 这是逐例授权，不构成"题目页可随意改版式"的通则；其它 35 页仍受上面硬约束，别页要一屏版式需用户再点名。改版式照此页思路：工具条上提 + 多栏内部滚动，**不要靠缩小字号或 `transform: scale()` 硬塞**。

验证工具：`../screen-test.mjs`（本机 Chrome headless + CDP，可指定视口与推进步数并截图）：

```bash
node ../screen-test.mjs "<页面绝对路径>" 1920 1080 shot.png 67   # 末尾参数=推进到第几步
```

内置 in-app Browser 视口只有 638px，**不会触发 `min-width:1100px`**，量不了桌面一屏，必须用上面这个脚本。

## 2. 目录结构：按 LeetCode 热题 100 官方 17 类

题型划分**以官方题单为准**，不凭记忆归类。已核实来源：
`https://leetcode.cn/studyplan/top-100-liked/`

```
哈希/ 双指针/ 滑动窗口/ 子串/ 普通数组/ 矩阵/
链表/ 二叉树/ 图论/ 回溯/ 二分查找/ 栈/ 堆/
贪心算法/ 动态规划/ 多维动态规划/ 技巧/
数据库/          # 官方 17 类之外，放 MySQL 事务与 MVCC
```

**文件命名**（沿用仓库原有规范）：`{4位题号}_{题目英文小写下划线}.html`。
例：`动态规划/0322_coin_change.html`、`双指针/0015_3sum.html`。

### 归类要点（都是纠正过的，别改回去）

| 题 | 正确归类 | 常见误判 |
|---|---|---|
| 53 最大子数组和 | **普通数组** | 以为是动态规划 |
| 32 最长有效括号 | **动态规划** | 以为是栈 |
| 84 柱状图中最大的矩形 | **栈**（单调栈） | 以为是 DP 或"其他" |
| 121 买卖股票 | **贪心算法** | 以为是 DP |
| 5 最长回文子串 | **多维动态规划** | 以为是一维 DP |

**变体跟随母题**：不在官方题单里的扩展，归到其母题所在的类。
- 122 / 123 / 188 / 309 / 714 → 跟 121 进 `贪心算法/`
- 213 → 跟 198 进 `动态规划/`；518 → 跟 322 进 `动态规划/`
- 63 / 120 → 跟 62 进 `多维动态规划/`；97 / 115 → 双串模型，进 `多维动态规划/`

新增题目时先查官方题单确认归属，查不到就按上面的"变体跟随母题"处理。

## 3. 源码与构建产物分离

```
site/index.html   # 首页源文件，受版本控制
build.mjs         # 装配 dist/
dist/             # 构建产物，已 gitignore，不入库
agent/            # 内部开发文档（进度表、可视化规范），不上传站点
docs/images/      # MySQL 隔离级别示意图（当前未被页面引用，保留备用）
```

- **首页只有一份源文件在 `site/index.html`**，`dist/index.html` 是它的副本，改源码改 `site/` 那份。
- 题目 HTML 直接放在各题型目录，`build.mjs` 会扫描官方 17 类 + `数据库/` 目录并复制进 `dist/`。
- 空的官方类目（哈希、链表、图论等）不建目录也没关系，`build.mjs` 会跳过；首页侧栏会自动显示"待补充"。

**上传范围 = 只有 HTML。** `build.mjs` 会拒绝 dist 内出现的非 HTML 文件。已线上实测：`/AGENTS.md`、`/agent/*.md`、`/package.json`、`/docs/**` 全部 404。

## 4. 首页信息架构

首页是可直接检索的**题目集工作台**，不是宣传页；首屏必须出现搜索框与题目卡片。

### 4.1 标题不得以 DP 为中心

站点会逐步覆盖 Hot 100 全部题型：

- H1 = `Hot 100 的每一步，都看得见`；副标题列举"双指针、单调栈、二叉树到多维动态规划"。
- 统计位由 JS 从 `TAXONOMY` 计算，**不要写死**（HTML 里的默认值仅防首屏闪烁，改动数据时一并同步）：`36 可视化页面 / 23 已覆盖官方热题 / 9 建档题型 · 17 / 7 难度 Hard`。
- `已覆盖官方热题` 数 = 带 `hot: true` 的条目数。`hot` 必须严格按官方题单标注，当前 23 题：
  5, 15, 32, 46, 53, 62, 64, 70, 72, 84, 102, 121, 124, 139, 152, 198, 236, 279, 300, 322, 416, 438, 1143。
- `建档题型` 只数官方 17 类里有内容的（`id !== 'db'`），别把"数据库"算进去。

### 4.2 左侧可折叠树形目录（三级）

`.toc` 固定左栏，宽 292px、`position: sticky`（吸附在 52px 顶条下方）、自身独立滚动：

**大类（`<details>` 可折叠）> 子类（锚点，滚动定位）> 具体题目（跳题目页）**

- 18 个大类全部列出：官方 17 类 + 数据库。无内容的渲染为 `.empty`，计数位显示"待补充"，作为 Hot 100 覆盖路线图。
- 目录由 `render()` 内的 `buildToc()` 与卡片同时重建，**搜索和筛选时必须同步收缩**（已实测 34→4→21→7→2→34）。
- 子类 id 命名：`tp-meet`、`sw-var`、`ar-kadane`、`bt-path`、`st-mono`、`gr-stock`、`dp-intro`/`dp-knapsack`/`dp-robber`/`dp-is`/`dp-string`、`d2d-grid`/`d2d-twoway`、`db-iso`。
- 滚动高亮 `updateSpy()`：以视口顶部 100px 为读行，取最后一个 `top <= 100` 的子类，并**自动展开其所属大类**。
  - **不要用 IntersectionObserver 检测带方案**：窄带在页尾失效，宽带一次命中相邻两类会整体错位一组（都实测踩过）。
  - 末个大类（数据库）滚不到读行，因此目录点击会即时高亮作为兜底，删掉会让末类点不亮。
- 1023px 以下隐藏侧栏，靠首屏搜索与顶条导航兜底；该断点下侧栏不可见属预期。

**侧栏可读性下限（用户明确投诉过"字太小看不清"）：**

侧栏是主动扫读的导航面，不是苹果的 12px 全局栏，**不得再用小字 + 负字距**：

| 元素 | 字号 | 字重 | 字距 | 颜色 |
|---|---|---|---|---|
| `目录` 标签 | 13px | 400 | normal | `--muted` |
| 大类 summary | 16px | 600（空类目 400） | normal | `--ink`（空类目 `--muted`） |
| 子类 t-sub | 13px | 600 | normal | `--ink-80` |
| 题目 t-prob | 15px | 400 | normal | `--ink` |
| 题号 / 计数 | 12px mono | 400 | normal | `--muted` |

- 第 5 节"负字距"规则**只适用于 >17px 的标题**；侧栏这类小字号一律 `letter-spacing: 0`。
- 子类标签原用 `--muted` `#7a7a7a` 配 `#f5f5f7` 底只有约 3.5:1 对比度，13px 下不达 WCAG AA，已提到 `--ink-80`。
- 侧栏宽 `--toc-w: 312px`；改字号后必须复测 `.t-zh` 的 `scrollWidth > clientWidth`，当前 36 题**零截断**。


### 4.3 内容区

只渲染有内容的大类，顺序即 `TAXONOMY` 顺序（官方 17 类次序 + 数据库垫底）。数据库类用 `.invert` 深色整屏。

**与仓库文档的一处出入（有意为之）：** `agent/LEETCODE_HOT100_DP_LIST.md` 把 53 标为 Easy、并把 53/84/121/32 等归入 DP。首页按 LeetCode 现行标注与官方分类修正，53 为 Medium，Hard 总数为 7。

## 5. 首页视觉：苹果设计语言

首页用 Apple 设计系统规范值，**与题目页的 Tokyo Night 风格刻意不同**（用户明确选择，题目页不改）。

必须守住：

- **单一交互色**：可点击元素只用 Action Blue `#0071e3`，链接文字 `#0066cc`，深色底上 `#2997ff`。不引入第二种强调色。
- **UI 层不加阴影**（`No shadows on UI chrome`）。层次靠 1px hairline `rgba(0,0,0,.08)` 与背景色阶 `#ffffff` / `#fafafc` / `#f5f5f7`。
- **文字色**：主文 `#1d1d1f`，次要 `#7a7a7a`，深色底 `#ffffff` / `#a1a1a6`。
- **>17px 标题一律负字距**；正文锁定 `17px/400/1.47/-.374px`。Hero `56px/600/1.07/-.28px`，Section `40px/600/1.10`，Tagline `21px/600`，Caption `14px/-.224px`，Fine print `12px/-.12px`。
- **形状语法**：pill `9999px` = 可操作件；`8px` = 工具件；`11px` = 搜索框；`18px` = 卡片容器。
- **间距**：4/8/12/17/24/32/48，章节 `80px`，标题上方至少 `64px`。
- **字体栈**：SF Pro 优先，Windows 回落 Segoe UI，中文 PingFang SC / Microsoft YaHei。**不加载 Web 字体**（站点须自包含）。
- 磨砂条 `backdrop-filter: saturate(180%) blur(20px)`。
- 难度点用 Apple 系统色：Easy `#34c759`、Medium `#ff9500`、Hard `#ff3b30`（信息标记，不受单一交互色限制）。
- 尊重 `prefers-reduced-motion`。

规范来源：
- https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/apple/DESIGN.md
- https://github.com/yc-software/qm/blob/main/skills-seed/popular-web-designs/templates/apple.md

## 6. 并行工作线：已并入（2026-09-29）

仓库根目录仍有两个**未跟踪**目录，是用户另一条工作线的原始版本：

- `leetcode-viz/` — `max-path-sum/index.html`(124)、`lca/index.html`(236)，另含其自带 `AGENTS.md` 与入口页。
- `levelorder-viz/` — 单个 `index.html`（102 层序遍历）。

**处理结果：** 按用户"以最新的为准"的指示，已把这三页复制进正式路径：
`二叉树/0124_...html`、`二叉树/0236_...html`（替换 15:37 入库的旧版）与新增的
`二叉树/0102_binary_tree_level_order_traversal.html`。替换依据是时间线（15:48 晚于 15:37）
与该目录 `AGENTS.md` 自述的"lca/index.html 是较新的干净实现"。

**How to apply:**
- 正式内容以 `二叉树/` 下的文件为准；`leetcode-viz/`、`levelorder-viz/` 现在是重复的原始副本，**仍未跟踪、未入库**。用户确认无误后可自行删除，Agent 不要主动删（未跟踪文件删了不可恢复）。
- 不要按那两个目录的命名规范（ASCII slug + `index.html`）去"统一"正式路径，也不要再改它们的页面内容——受第 1 条约束。
- 它们要求的"10 万棵随机树对拍"测试协议**本次未执行**，只做了语法检查与浏览器实测（渲染、逐步推进、答案 42 正确、SVG 节点定位无重叠、控制台零报错）。若要深挖算法正确性，按该目录 `AGENTS.md` 的协议补测。


## 7. 已发布站点身份（更新时复用，不要新建站点）

| 项 | 值 |
|---|---|
| 公开地址 | `https://leetcode-visual-2te5izbncde.qoder.website` |
| Project ID | `01a0ec34-abbe-7ef4-b47e-c944f9841e1a` |
| Site ID | `01a0ec34-abbf-7ed8-b90a-e33208108820` |
| 访问范围 | **public**（用户已明确授权公开） |

- 内容有变化时用**新的** `actionId` + 同一个 `projectId` 调 `prepare_site`（`projectRoot` 指向 `leetcode-visual`，`webDirectory` 填 `dist`），再 `publish_site`。地址与 Site ID 不变。
- **平台注入项**：每页会被注入可见的 `<qoder-sites-badge>`（约 147×32，`z-index: 2147483647`）与约 57KB 内联署名脚本。这是免费托管署名，不是缺陷，也不要试图绕过。
- **重排目录会改变已发布 URL**：`背包问题/`、`股票买卖问题/`、`子序列问题/`、`路径问题/`、`打家劫舍问题/`、`其他问题/`、`二叉树问题/` 及根目录散页已全部失效，外部旧链接不会自动跳转。

## 8. 同步与发布流程

```bash
git pull --ff-only                 # 拉取新题目页
node build.mjs                     # 装配 dist（只收官方题型目录下的 HTML）
node ../serve.mjs                  # 本地预览 http://127.0.0.1:4173/
# 然后 prepare_site(projectRoot=leetcode-visual, webDirectory=dist, projectId=…) → publish_site
git add -A && git commit && git push
```

首页题目数据内联在 `site/index.html` 的 `TAXONOMY` 数组（无构建步骤、纯客户端过滤）。**新增/删除题目页时必须同步维护该数组**，否则首页与站点内容不一致。

## 9. 浏览器 QA 的环境陷阱（都实测踩过）

内置 in-app Browser 页面 `document.hidden === true`、视口仅 638×1001：

- **`requestAnimationFrame` 回调不执行** —— 输入去抖一律用 `setTimeout`，用 rAF 会让搜索框完全失效。
- **`scroll` 事件投递严重延迟** —— 即使 `scrollIntoView` 后等 1500ms，滚动高亮仍可能是旧值。验证逻辑正确性用 `dispatchEvent(new Event('scroll'))` 手动催一次再看结果，别误判为 bug。
- 视口 638px 命中 `max-width:1023px` 会隐藏侧栏。量桌面布局需临时注入 `.toc{display:block!important}`。
- 截图工具在该环境下不可用（`viewport=0x0`），只能靠 `evaluate_script` 读几何与状态。

## 10. 协作方式

- 用户会**离开数小时后一次性验收**，期间不要逐项提问；按已有约定自行决策并交付成品。
- 只有当缺失信息会导致**功能性错误或需要授权**（如发布、改动仓库远程内容）时才打断用户。
- 交付前必须本地实测：全量链接可达、搜索/筛选正确、控制台零报错。
