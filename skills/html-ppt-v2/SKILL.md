---
name: html-ppt-v2
description: 从主题描述生成专业 HTML 幻灯片（36 主题 · 演示模式 · 动画 · 键盘驱动）。保存至 outputs/slides/。
---

# HTML 幻灯片 v2 技能

## 触发

```
/html-ppt-v2 <主题或内容描述>
```

可选参数（从用户输入推断）：
- **主题风格**：`tokyo-night`（默认暗色）/ `pitch-deck-vc`（融资）/ `corporate-clean`（企业）/ `minimal-white`（极简白）
- **张数**：默认 8–12 张
- **语言**：中文主体 + 英文技术词汇混排（默认）

---

## 执行步骤

### Step 1 — 分析需求
解析用户输入：主题、受众、幻灯片数量、语言风格、场景。

> **产品形态核查**：若内容涉及产品定位，必须在生成前明确产品形态（桌面端 / Web / 移动端 / 浏览器插件 / 小程序）。不确定时询问用户，**不允许凭猜测默认**。

### Step 2 — 规划大纲
| 序号 | 页面类型 | 功能 |
|---|---|---|
| 1 | 封面 | 标题 + 副标题 + 标签 |
| 2 | 核心判断 | 一句话 Thesis |
| 3–4 | 现状/问题 | 数据驱动，1–2 张 |
| 5–7 | 机会/方案 | 逐一展开 |
| 8–9 | 行动计划 | MVP / 路径 / 红线 |
| 10 | 结语 | CTA + 快捷键提示 |

### Step 3 — 读取框架模板
`Read skills/html-ppt-v2/_frame.html` — 获取框架 HTML。

复制时必须保留 `<head>` 中的**全部 4 个** CSS 链接，缺一不可：
```html
<link rel="stylesheet" href="../../skills/html-ppt-v2/fonts.css">
<link rel="stylesheet" href="../../skills/html-ppt-v2/base.css">
<link rel="stylesheet" id="theme-link" href="../../skills/html-ppt-v2/themes/{{THEME}}.css">
<link rel="stylesheet" href="../../skills/html-ppt-v2/animations/animations.css">  <!-- 经常遗漏！ -->
```

### Step 4 — 生成 HTML
替换模板中的：
- `{{TITLE}}` → 演示文稿标题
- `{{THEME}}` → 选定主题名（默认 `tokyo-night`）
- `<!-- SLIDES HERE -->` → 全部 `<section class="slide">` 元素

`<head>` 内必须包含以下完整 `<style>` 块（直接复制，**不可精简**）：

```html
<style>
/* Frame layout */
.slide>header+div,.slide>header+ul{flex:1;min-height:0}
.stretch>.col{display:flex;flex-direction:column}
.stretch>.col>.card{flex:1;min-height:0}
.card,.card-accent,.card-soft,.card-outline{overflow:hidden}
.slide>header+ul.nlist{justify-content:space-evenly}
.stretch{align-items:stretch!important}
.col{display:flex;flex-direction:column;gap:14px}
/* Split 布局 — 每个修饰类都含 display:grid，可单独使用无需加 .split */
.split{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
.split-32{display:grid;grid-template-columns:3fr 2fr;gap:24px}
.split-23{display:grid;grid-template-columns:2fr 3fr;gap:24px}
.split-13{display:grid;grid-template-columns:1fr 3fr;gap:24px}
/* 组件类 — 在 base.css 中不存在，必须在此定义 */
.huge-number{font-size:128px;font-weight:800;line-height:1;letter-spacing:-.04em;margin:0}
.metric{display:flex;flex-direction:column;gap:4px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px 24px;box-shadow:var(--shadow)}
.metric b{font-size:44px;font-weight:800;line-height:1;letter-spacing:-.03em;display:block}
.metric span{font-size:13px;color:var(--text-3);line-height:1.4;margin-top:6px;display:block}
.quote{border-left:4px solid var(--accent);padding:16px 22px;background:var(--surface-2);border-radius:0 var(--radius) var(--radius) 0;font-size:17px;font-style:italic;line-height:1.65;color:var(--text-1);margin:0}
.quote cite{display:block;margin-top:8px;font-size:12px;color:var(--text-3);font-style:normal}
.closing-line{font-size:72px;font-weight:800;line-height:1.05;letter-spacing:-.03em;margin:0}
</style>
```

### Step 5 — 写入文件
```
outputs/slides/<主题英文缩写>-<YYYY-MM-DD>.html
```

写入后告诉用户：文件路径 + 快捷键。

---

## 幻灯片 HTML 结构

```html
<section class="slide" data-title="页面简短标题">

  <header>
    <p class="eyebrow">CATEGORY · LABEL</p>
    <h2 class="h2">幻灯片标题即结论</h2>
  </header>

  <!-- 内容区域（见组件参考）-->

  <div class="notes">演讲者逐字稿，不显示给观众。直接写要说的话。</div>
</section>
```

> **注意**：`h1`/`h2`/`h3`/`h4` 标签在此系统中需要同时加上 `.h1`/`.h2`/`.h3`/`.h4` class 才能应用字体样式。

---

## 关键布局规则（必须遵守）

**规则 1 — header 后只有一个直接子节点**

CSS 自动让 `header` 之后第一个 `div` 或 `ul` 填满剩余高度。
如有多个并列块（如 mrow + grid，或 cards + quote），用 wrapper 包裹：

```html
<!-- ✅ 正确 -->
<header>...</header>
<div style="flex:1;min-height:0;display:flex;flex-direction:column;gap:18px">
  <div class="metric-strip">...</div>
  <div class="grid g2 stretch" style="flex:1">...</div>
</div>

<!-- ❌ 错误：两个块直接并列在 slide 下 -->
<div class="metric-strip">...</div>
<div class="grid g2 mt-m">...</div>
```

**规则 2 — 多列布局加 `.stretch`，col 内 card 自动填充**

```html
<div class="split-23 stretch" style="margin-top:18px">
  <div class="col">
    <div class="card card-accent">...</div>
    <div class="card card-soft">...</div>
  </div>
  <div class="card" style="display:flex;flex-direction:column;justify-content:center">
    ...
  </div>
</div>
```

**规则 3 — 右侧堆叠卡片用 `.col`，不要改造其他组件**

```html
<div class="col">
  <div class="card card-accent" style="flex:1">...</div>
  <div class="card" style="flex:1">...</div>
</div>
```

**规则 4 — g3 + quote 组合**

```html
<div style="flex:1;min-height:0;display:flex;flex-direction:column;gap:14px">
  <div class="grid g3 stretch" style="flex:1;align-items:stretch">...</div>
  <blockquote class="quote" style="flex-shrink:0">...</blockquote>
</div>
```

**规则 5 — 流程图最多 4 步，禁止多行折返**

线性流程图：每行最多 4 个节点（`1fr 40px 1fr 40px 1fr 40px 1fr`，共 7 列）。
步骤超过 4 步时，拆成编号列表或两张幻灯片，**不允许写多行折返流程**。

```html
<!-- ✅ 正确：4 步线性流程 -->
<div style="display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr 40px 1fr;gap:12px;align-items:stretch">
  <div class="card card-soft" style="padding:18px">
    <p style="font-size:11px;color:var(--accent);font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Step 1</p>
    <h4 class="h4">步骤标题</h4>
    <p class="dim" style="margin-top:6px;font-size:13px;line-height:1.6">说明文字。</p>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:24px;font-weight:900">→</div>
  <div class="card card-accent" style="padding:18px">...</div>
  <div style="display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:24px;font-weight:900">→</div>
  <div class="card card-soft" style="padding:18px">...</div>
  <div style="display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:24px;font-weight:900">→</div>
  <div class="card card-soft" style="padding:18px">...</div>
</div>

<!-- ❌ 错误：多行折返、calc(1fr) 无效 CSS、grid-column 跨行对齐 -->
<div style="padding-right:calc(3*(1fr + 36px + 10px))">...</div>
```

---

## 组件参考

### 封面

```html
<section class="slide" data-title="封面"
         style="justify-content:flex-end;padding-bottom:96px">
  <div>
    <p class="kicker">PRODUCT BRIEF · 2026</p>
    <h1 class="h1" style="margin-top:12px;max-width:18ch">
      不造平台，<br><span class="gradient-text">只造锋利的工具</span>
    </h1>
    <p class="lede" style="margin-top:18px">
      从行业真实摩擦力出发，推导首发 MVP。
    </p>
    <div class="row wrap" style="margin-top:20px;gap:10px">
      <span class="pill pill-accent">AI Native</span>
      <span class="pill">低摩擦冷启动</span>
      <span class="pill">B 端工具</span>
    </div>
  </div>
  <div class="notes">开场只讲一句：这不是平台故事，是工具故事。</div>
</section>
```

### 超大数字 + 列表（核心判断页）

```html
<header>
  <p class="eyebrow">THESIS · 核心判断</p>
  <h2 class="h2">效率提升 10% 即可跑通商业闭环</h2>
</header>
<div class="split-23 stretch" style="margin-top:18px">
  <div class="card card-accent" style="display:flex;flex-direction:column;justify-content:center;padding:36px 40px">
    <p class="huge-number gradient-text">10%</p>
    <h3 class="h3" style="margin-top:14px">效率即收入</h3>
    <p class="dim lede" style="font-size:17px">高客单价意味着只要缩短交付周期，就有付费空间。</p>
  </div>
  <div class="col">
    <div class="card" style="display:grid;grid-template-columns:56px 1fr;gap:16px;align-items:start">
      <span style="font-size:28px;font-weight:900;color:var(--accent);line-height:1">01</span>
      <div><h4 class="h4">别教育市场</h4><p class="dim">中小猎企只愿为立刻缩短交付周期的工具付费。</p></div>
    </div>
    <div class="card" style="display:grid;grid-template-columns:56px 1fr;gap:16px;align-items:start">
      <span style="font-size:28px;font-weight:900;color:var(--accent);line-height:1">02</span>
      <div><h4 class="h4">别改变工作流</h4><p class="dim">真实工作流在微信、招聘站、PDF 之间流动。</p></div>
    </div>
    <div class="card" style="display:grid;grid-template-columns:56px 1fr;gap:16px;align-items:start">
      <span style="font-size:28px;font-weight:900;color:var(--accent);line-height:1">03</span>
      <div><h4 class="h4">先做判断增强</h4><p class="dim">AI 入口应贴近候选人阅读现场，而非要求录入系统。</p></div>
    </div>
  </div>
</div>
```

### 指标条（3 个大数字）

```html
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px">
  <div class="metric"><b>1,800亿</b><span>国内猎头市场规模，无平台型垄断</span></div>
  <div class="metric"><b style="color:var(--accent-2)">&lt;1%</b><span>任何机构的最高市占率</span></div>
  <div class="metric"><b style="color:var(--accent-3)">5–20人</b><span>典型猎企规模，决策链极短</span></div>
</div>
```

### 卡片网格

```html
<!-- 2列 -->
<div class="grid g2 stretch" style="margin-top:18px">
  <div class="card card-accent"><h4 class="h4">极简交互</h4><p>在任意页面划取简历文本，即可弹出 AI 解析。</p></div>
  <div class="card card-soft"><h4 class="h4">跨行扫盲</h4><p>实时解释垂直行业术语、公司背景、岗位语境。</p></div>
</div>

<!-- 3列 -->
<div class="grid g3 stretch" style="margin-top:18px">
  <div class="card card-accent"><h4 class="h4">标题</h4><p>说明文字。</p></div>
  <div class="card card-soft"><h4 class="h4">标题</h4><p>说明文字。</p></div>
  <div class="card card-outline"><h4 class="h4">标题</h4><p>说明文字。</p></div>
</div>
```

### 好坏对比

```html
<div class="grid g2 stretch" style="margin-top:18px">
  <div class="card" style="border-top:3px solid var(--bad)">
    <h4 class="h4">竞品死局</h4>
    <ul style="padding-left:1.2em;margin-top:10px;color:var(--text-2);line-height:1.8">
      <li>平台型 SaaS，采纳阻力大</li>
      <li>要求迁移数据，改变工作流</li>
    </ul>
  </div>
  <div class="card" style="border-top:3px solid var(--good)">
    <h4 class="h4">我们的路径</h4>
    <ul style="padding-left:1.2em;margin-top:10px;color:var(--text-2);line-height:1.8">
      <li>外挂工具，贴近工作现场</li>
      <li>无需迁移，即装即用</li>
    </ul>
  </div>
</div>
```

### 表格

```html
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:18px">
  <thead>
    <tr style="border-bottom:2px solid var(--border-strong)">
      <th style="padding:10px 12px;text-align:left;color:var(--text-3);font-size:11px;letter-spacing:.1em;text-transform:uppercase">维度</th>
      <th style="padding:10px 12px;text-align:left;color:var(--text-3);font-size:11px;letter-spacing:.1em;text-transform:uppercase">重型 SaaS</th>
      <th style="padding:10px 12px;text-align:left;color:var(--text-3);font-size:11px;letter-spacing:.1em;text-transform:uppercase">外挂工具（我们）</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border)">
      <td style="padding:10px 12px;color:var(--text-1);font-weight:600">采纳成本</td>
      <td style="padding:10px 12px;color:var(--bad)">高，需迁移数据</td>
      <td style="padding:10px 12px;color:var(--good)">极低，即装即用</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;color:var(--text-1);font-weight:600">付费决策人</td>
      <td style="padding:10px 12px;color:var(--text-2)">管理层，周期长</td>
      <td style="padding:10px 12px;color:var(--text-2)">用户自主，随时购买</td>
    </tr>
  </tbody>
</table>
```

### 引用

```html
<!-- 使用 .quote 类（已在必须包含的 <style> 块中定义） -->
<blockquote class="quote">
  "我每天最怕的不是找不到人，是看完简历不知道问什么。"
  <cite>— 受访猎头顾问，猎聘 5 年经验</cite>
</blockquote>

<!-- 配合 g3 使用时加 flex-shrink:0 防止被压缩 -->
<blockquote class="quote" style="flex-shrink:0">...</blockquote>
```

### 流程图（最多 4 步）

```html
<div style="display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr 40px 1fr;gap:12px;align-items:stretch">
  <div class="card card-soft" style="padding:18px">
    <p style="font-size:11px;color:var(--accent);font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Step 1</p>
    <h4 class="h4">前端工作流</h4>
    <p class="dim" style="margin-top:6px;font-size:13px;line-height:1.6">工具嵌入任意平台，不要求迁移数据。</p>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:24px;font-weight:900">→</div>
  <div class="card card-accent" style="padding:18px">
    <p style="font-size:11px;color:var(--accent);font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Step 2</p>
    <h4 class="h4">判断增强</h4>
    <p class="dim" style="margin-top:6px;font-size:13px;line-height:1.6">跨行扫盲和风险排雷，给出第二视角。</p>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:24px;font-weight:900">→</div>
  <div class="card card-soft" style="padding:18px">
    <p style="font-size:11px;color:var(--accent);font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Step 3</p>
    <h4 class="h4">结果展示</h4>
    <p class="dim" style="margin-top:6px;font-size:13px;line-height:1.6">弹窗就近呈现，不打断阅读流。</p>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:24px;font-weight:900">→</div>
  <div class="card card-soft" style="padding:18px">
    <p style="font-size:11px;color:var(--accent);font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Step 4</p>
    <h4 class="h4">后端沉淀</h4>
    <p class="dim" style="margin-top:6px;font-size:13px;line-height:1.6">推荐报告生成、团队知识库积累。</p>
  </div>
</div>
```

### 结语（居中页）

```html
<section class="slide center" data-title="结语">
  <div style="max-width:820px;width:100%">
    <p class="kicker">CLOSING</p>
    <div class="divider-accent" style="margin:14px auto 0"></div>
    <p class="closing-line h1 gradient-text" style="margin-top:20px">先做工具，<br>再做引擎。</p>
    <p class="lede dim" style="margin:20px auto 0;max-width:50ch;text-align:center">
      当用户习惯了毫秒级 AI 判断增强，再顺势切入报告生成与团队知识沉淀。
    </p>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:28px;flex-wrap:wrap">
      <span class="pill pill-accent" style="padding:7px 18px;font-size:13px;font-weight:600">V1.0 · 核心链路</span>
      <span class="pill" style="padding:7px 18px;font-size:13px">V1.1 · 效率补齐</span>
      <span class="pill" style="padding:7px 18px;font-size:13px">Phase 3 · 知识图谱</span>
    </div>
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid var(--border)">
      <p class="dim2" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase">
        ← → 翻页 &nbsp;·&nbsp; T 换主题 &nbsp;·&nbsp; F 全屏 &nbsp;·&nbsp; S 演示模式 &nbsp;·&nbsp; O 概览 &nbsp;·&nbsp; N 备注
      </p>
    </div>
  </div>
  <div class="notes">收束到一句话。三个阶段清晰展示增长飞轮。</div>
</section>
```

---

## CSS 变量速查

| 变量 | 含义 |
|---|---|
| `--bg` | 页面背景色 |
| `--surface` | 卡片/面板背景 |
| `--surface-2` | 次级背景（更浅/更深） |
| `--border` | 细描边色 |
| `--border-strong` | 粗描边色 |
| `--text-1` | 主文字色 |
| `--text-2` | 次要文字色 |
| `--text-3` | 第三层/占位文字 |
| `--accent` | 主强调色（蓝/主色） |
| `--accent-2` | 第二强调色（紫） |
| `--accent-3` | 第三强调色（粉红/橙） |
| `--good` | 正面状态色（绿） |
| `--warn` | 警告色（黄） |
| `--bad` | 危险色（红） |
| `--grad` | 渐变（accent → accent-2） |
| `--radius` | 卡片圆角 |
| `--shadow` | 卡片阴影 |

## 实用 class 速查

| 类名 | 作用 | 来源 |
|---|---|---|
| `.gradient-text` | 渐变色文字（用在最重要的词） | base.css |
| `.huge-number` | 超大数字 128px | **必须在 `<style>` 中定义** |
| `.metric` | 大数字指标卡（含 b + span） | **必须在 `<style>` 中定义** |
| `.quote` | 引用 blockquote（左边框 + 斜体） | **必须在 `<style>` 中定义** |
| `.closing-line` | 结语大字行 72px | **必须在 `<style>` 中定义** |
| `.lede` | 大号副文本，浅灰 | base.css |
| `.eyebrow` | 灰色全大写小标签 | base.css |
| `.kicker` | 主色全大写标签 | base.css |
| `.dim` | 次要文字色 | base.css |
| `.dim2` | 第三层文字色 | base.css |
| `.card` | 标准卡片 | base.css |
| `.card-accent` | 卡片 + 顶部 accent 色边 | base.css |
| `.card-soft` | 浅背景卡片 | base.css |
| `.card-outline` | 描边卡片，透明背景 | base.css |
| `.pill` | 圆角标签 | base.css |
| `.pill-accent` | 主色标签 | base.css |
| `.grid .g2 .g3 .g4` | 网格布局 | base.css |
| `.row` | 横向排列（flex） | base.css |
| `.col` | 纵向堆叠（flex column） | `<style>` 块 |
| `.split-32 .split-23 .split-13` | 两栏分割（含 display:grid） | `<style>` 块 |
| `.stretch` | 让子项等高拉伸 | `<style>` 块 |
| `.center` | 全页居中 | base.css |
| `.fill` | flex: 1 | base.css |
| `.divider-accent` | 主色粗线装饰分隔符 | base.css |
| `.anim-fade-up` | 向上淡入动画 | animations.css |
| `.anim-zoom-pop` | 弹出缩放动画 | animations.css |
| `.anim-gradient-flow` | 渐变流动文字动画 | animations.css |
| `.anim-stagger-list` | 子元素依次淡入 | animations.css |

## 可用主题（T 键循环）

| 主题名 | 风格 |
|---|---|
| `tokyo-night` | 深蓝暗色（默认） |
| `pitch-deck-vc` | 融资简报白底 |
| `corporate-clean` | 企业商务深蓝白 |
| `minimal-white` | 极简纯白 |
| `aurora` | 极光渐变暗色 |
| `dracula` | 暗紫经典配色 |
| `nord` | 北欧冷色调 |
| `catppuccin-mocha` | 柔和暗色 |
| `glassmorphism` | 毛玻璃效果 |
| `neo-brutalism` | 新粗野主义 |

完整 36 个主题均可用（见 `skills/html-ppt-v2/themes/`）。

## 快捷键

| 键 | 功能 |
|---|---|
| `← → / Space / PgDn` | 前后翻页 |
| `Home / End` | 跳转首尾 |
| `F` | 全屏 |
| `T` | 切换主题 |
| `O` | 幻灯片概览 |
| `N` | 演讲者备注抽屉 |
| `S` | 演示模式（新窗口，含计时器） |
| `A` | 切换当前页动画效果 |

## 内容质量标准

1. **标题即结论**：不写"现状分析"，写"碎片化不是背景噪音，是产品定位的第一约束"
2. **数字优先**：能用数据说明的，不用形容词；无确切数据时给出可信估算范围
3. **每页只讲一件事**：一张幻灯片一个核心信息，多了就拆
4. **渐变文字用在最重要的一个词或短句上**：`<span class="gradient-text">核心洞见</span>`
5. **中英混排**：技术词汇保留英文（AI / SaaS / MVP / ATS），正文用中文
6. **备注 `.notes` 写逐字稿**：不是"这页讲…"，而是演讲者直接要说的话
7. **标题长度控制**：`.h2`（54px）每行约容纳 16–18 个汉字（含英文换算）。超出时方法优先级：① 缩短文案 → ② 在自然断句处加 `<br>` → ③ 加 `style="font-size:42px"`。不使用 `white-space:nowrap`（可能导致溢出）。

## 禁止事项

- 不在 `.slide` 内写 `<style>` 或 `<script>`
- 不在 `.notes` 里重复正文内容
- **不把其他组件改造成列容器**——堆叠卡片用 `.col`
- **不在 header 后放两个并列的直接子节点**——用 wrapper div 包裹（见布局规则 1）
- **不写超过一行的 emoji 装饰**
- **不在 CSS `calc()` 中使用 `1fr`**——`1fr` 是 Grid 单位，在 `calc()` 中无效
- **不写多行折返流程图**——步骤 >4 时改用编号列表或拆页（见规则 5）
- **不在不确定产品形态时默认填写「浏览器插件」**——在 Step 1 核实后再写定位页内容
