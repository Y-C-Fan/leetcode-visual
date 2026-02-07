# LeetCode Hot 100 题目可视化开发指南

## 概述

本文档提供了一套完整的 LeetCode Hot 100 题目可视化开发规范和模板。遵循本指南，可以快速生成统一风格、高质量的可视化界面。

## 命名规范

### 文件命名
- 格式：`{题号}_{题目英文小写下划线分隔}.html`
- 示例：`0005_coin_change_ii.html`
- 注意：题号统一使用 4 位数字，不足左侧补零

## 技术栈

### 前端技术
- **HTML5**：语义化标签
- **CSS3**：原生 CSS，使用 CSS 变量
- **JavaScript (ES6+)**：原生 JS，无框架依赖

### 设计风格
- **配色方案**：Tokyo Night 风格深色主题
- **UI 框架**：Material Design 原则
- **响应式**：支持桌面端和移动端

## 项目结构

```
00v/
├── 0005_coin_change_ii.html          # 示例：零钱兑换 II
├── LEETCODE_HOT100_VISUALIZATION_GUIDE.md  # 本文档
└── (更多题目可视化文件...)
```

## HTML 模板结构

### 1. 文档头部
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{题目名称} 可视化</title>
  <style>
    /* CSS 样式 */
  </style>
</head>
```

### 2. CSS 变量定义（必选）
```css
:root {
  --bg: #1a1b26;        /* 背景色 */
  --panel: #24283b;     /* 面板背景 */
  --card: #292e42;      /* 卡片背景 */
  --text: #a9b1d6;      /* 主文本 */
  --muted: #565f89;     /* 次要文本 */
  --accent: #bb9af7;    /* 主强调色（紫色） */
  --accent-2: #7aa2f7;  /* 次强调色（蓝色） */
  --good: #9ece6a;      /* 成功/正确（绿色） */
  --warn: #e0af68;      /* 警告/注意（黄色） */
}
```

### 3. 基础样式（必选）
```css
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  background: radial-gradient(circle at 50% 0%, #24283b, var(--bg));
  color: var(--text);
  min-height: 100vh;
}
```

### 4. 页面布局（推荐）
```html
<header>
  <h1>{题目名称}：{副标题}</h1>
  <p>{示例/说明}</p>
</header>

<div class="container">
  <section class="panel">
    <!-- 左侧：可视化交互区域 -->
    <!-- 控制按钮、状态显示、网格/图表、日志 -->
  </section>

  <section class="panel explain">
    <!-- 右侧：算法解释区域 -->
    <!-- 算法原理、公式推导、示例说明 -->
  </section>
</div>
```

## 核心组件

### 1. 控制按钮组
```html
<div class="controls">
  <button id="btnPrev">上一步</button>
  <button id="btnNext">下一步</button>
  <button id="btnPlay" class="secondary">自动播放</button>
  <button id="btnReset" class="ghost">重置</button>
</div>
```

### 2. 状态芯片
```html
<span class="chip" id="stepInfo">Step 0</span>
<span class="chip" id="iInfo">i: -</span>
<span class="chip" id="jInfo">j: -</span>
```

### 3. 网格/单元格
```html
<div class="dp-grid" id="dpGrid"></div>
```
```css
.dp-grid {
  display: grid;
  grid-template-columns: repeat({列数}, minmax(60px, 1fr));
  gap: 8px;
}
.cell {
  background: var(--card);
  padding: 10px 8px;
  border-radius: 10px;
  border: 1px solid #2d2d3d;
  text-align: center;
  transition: all 0.3s ease;
}
.cell.active { outline: 2px solid var(--accent); background: #2f334d; }
.cell.source { outline: 2px dashed var(--good); background: #223733; }
```

### 4. 公式展示框
```html
<div id="formulaBox" class="formula-display">
  <div class="formula-title">公式标题</div>
  <div class="formula-content">公式内容</div>
</div>
```
```css
.formula-display {
  background: #1a1b26;
  border: 1px solid #414868;
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: var(--text);
}
.formula-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #2d2d3d;
}
.formula-content {
  font-size: 17px;
  line-height: 1.6;
}
.formula-content b { color: var(--accent); }
.formula-content .highlight { color: var(--good); font-weight: bold; }
.formula-content .math { color: var(--warn); }
```

### 5. 操作日志
```html
<div class="log" id="log"></div>
```
```css
.log {
  max-height: 240px;
  overflow: auto;
  background: #16161e;
  border-radius: 12px;
  border: 1px solid #24283b;
  padding: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: #a9b1d6;
}
```

### 6. 图例
```html
<div class="legend">
  <span><i class="dot active"></i>当前操作</span>
  <span><i class="dot source"></i>数据来源</span>
</div>
```
```css
.legend { display: flex; gap: 15px; flex-wrap: wrap; margin-bottom: 10px; }
.legend span { display: inline-flex; gap: 6px; align-items: center; font-size: 13px; color: var(--muted); }
.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
```

## 代码展示规范

### 1. 代码随想录思路
- **核心思想**：按照代码随想录的动态规划五部曲进行展示
  1. **确定dp数组（dp table）以及下标的含义**：在解释区域明确说明 dp[i] 或 dp[i][j] 的具体含义
  2. **确定递推公式**：在公式展示框中突出显示递推公式,并用实际数值代入演示
  3. **dp数组如何初始化**：在初始化步骤中明确说明初始值及其原因
  4. **确定遍历顺序**：在可视化中通过日志和步骤展示遍历顺序
  5. **举例推导dp数组**：通过步骤-by-步骤的动画展示完整推导过程

### 2. Java 代码展示
- **语言选择**：优先使用 Java 展示完整代码实现
- **代码风格**：
  - 遵循阿里巴巴 Java 开发手册规范
  - 使用语义化的变量命名（如 `dp`, `nums`, `text1`, `text2`）
  - 适当添加注释说明关键步骤
- **代码块样式**：
  ```css
  .code-block {
    background: #16161e;
    border: 1px solid #414868;
    border-radius: 12px;
    padding: 16px;
    margin: 16px 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    color: #a9b1d6;
    overflow-x: auto;
  }
  .code-block .keyword { color: var(--accent); }
  .code-block .type { color: var(--accent-2); }
  .code-block .method { color: var(--good); }
  .code-block .comment { color: var(--muted); font-style: italic; }
  ```

### 3. 核心逻辑高可读性
- **突出重点**：
  - 使用颜色区分不同类型的代码元素（关键字、类型、方法名、注释）
  - 在注释中标注"递推公式"、"初始化"等关键步骤
  - 公式展示框中用不同颜色突出显示关键数值和变量
- **逻辑清晰**：
  - 代码结构清晰,层次分明
  - 避免过度优化,优先保证可读性
  - 每个关键步骤都有对应注释
- **示例代码格式**：
  ```java
  public int methodName(int[] nums) {
      if (nums == null || nums.length == 0) return 0;
      
      int[] dp = new int[nums.length];
      dp[0] = nums[0];           // 初始化
      
      for (int i = 1; i < nums.length; i++) {
          dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);  // 递推公式
      }
      
      return dp[nums.length - 1];
  }
  ```

## JavaScript 实现规范

### 1. 数据结构
```javascript
// 步骤数组
const steps = [
  {
    step: 1,           // 步骤编号
    // 算法特定字段...
    snapshot: [...],   // 当前状态快照
    // 其他元数据
  }
];
```

### 2. 核心函数

#### 步骤生成函数
```javascript
function buildSteps() {
  steps.length = 0;
  // 根据算法逻辑生成所有步骤
  // 每次状态变化都记录一个步骤
}
```

#### 渲染函数
```javascript
function renderGrid(snapshot, activeIndex, sourceIndex) {
  // 渲染网格/数据结构
}

function renderLog(entry) {
  // 渲染操作日志
}

function renderStep(idx) {
  // 渲染当前步骤的所有状态
}
```

#### 控制函数
```javascript
function nextStep() { /* 下一步 */ }
function prevStep() { /* 上一步 */ }
function play() { /* 自动播放 */ }
function stopPlay() { /* 停止播放 */ }
function resetAll() { /* 重置 */ }
```

### 3. 事件绑定
```javascript
document.getElementById('btnNext').addEventListener('click', nextStep);
document.getElementById('btnPrev').addEventListener('click', prevStep);
document.getElementById('btnPlay').addEventListener('click', () => {
  if (playing) stopPlay();
  else play();
});
document.getElementById('btnReset').addEventListener('click', () => {
  stopPlay();
  resetAll();
});
```

### 4. 初始化
```javascript
// 生成步骤
buildSteps();
// 初始化显示
resetAll();
```

## 响应式设计

```css
@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; }
  .dp-grid { grid-template-columns: repeat({减少列数}, minmax(60px, 1fr)); }
}
```

## 开发流程

1. **创建文件**：按命名规范创建 HTML 文件
2. **复制模板**：使用本文档提供的模板结构
3. **定制内容**：
   - 修改标题和描述
   - 实现特定算法的步骤生成逻辑
   - 调整可视化展示方式（网格、树、图等）
4. **编写解释**：在右侧面板添加算法原理说明
5. **测试验证**：确保所有交互功能正常

## 注意事项

1. **不使用框架**：保持纯原生实现，确保可移植性
2. **统一风格**：严格遵循配色和样式规范
3. **性能优化**：大量数据时考虑虚拟滚动或分页
4. **可访问性**：使用语义化标签，确保键盘可操作
5. **代码质量**：保持代码简洁、可读、可维护
6. **键盘控制**：所有页面必须支持键盘快捷键（←、→、空格），详见"JavaScript 实现规范"部分

## 示例参考

完整示例请参考：`0518_coin_change_ii.html`

该示例展示了：
- 动态规划表格可视化
- 公式实时展示
- 步骤控制（上一步/下一步/自动播放）
- 组合/排列模式切换
- 详细的算法解释

## 常见可视化类型

### 1. 数组/网格
- 适用：动态规划、数组操作
- 实现：CSS Grid 布局

### 2. 树结构
- 适用：二叉树遍历、递归算法
- 实现：SVG 或 Canvas 绘制

### 3. 链表
- 适用：链表操作
- 实现：Flexbox 布局 + 箭头

### 4. 图结构
- 适用：图算法
- 实现：Canvas 或 SVG

### 5. 栈/队列
- 适用：栈/队列操作
- 实现：垂直 Flexbox 布局

---

**最后更新**：2026-01-30
**维护者**：iFlow CLI