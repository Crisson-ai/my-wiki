# 🧠 My Wiki — LLM 驱动的个人知识库

> 灵感来源：[Andrej Karpathy 的 LLM Knowledge Base 方法论](https://x.com/karpathy/status/2039805659525644595)

## 设计理念

**"停止检索，开始编译"** — 让 LLM 充当编译器和图书管理员，将碎片化信息编译为结构化知识。

```
你（研究者）→ 投入原始素材 → LLM（编译器）→ 输出结构化 Wiki
     ↑                                              ↓
     └────── 查询、验证、设定方向 ←──────────────────┘
```

## 目录结构

```
my_wiki/
├── README.md              ← 你正在看的文件
├── _inbox/                ← 📥 收件箱：随手丢入的待处理素材
├── _raw/                  ← 📦 原始素材：已归档但不做修改的源文件
│   ├── articles/          ← 网页文章、博客
│   ├── papers/            ← 学术论文
│   ├── clippings/         ← 摘抄、截图、语音转录
│   └── threads/           ← 社交媒体帖子、讨论串
├── wiki/                  ← 📖 编译产物：LLM 维护的结构化知识
│   ├── _index.md          ← Wiki 目录总索引
│   ├── AI/                ← 主题目录（示例）
│   ├── 产品/              ← 主题目录（示例）
│   └── ...
├── outputs/               ← 📤 输出物：基于知识库生成的成品
│   ├── slides/            ← 幻灯片
│   ├── reports/           ← 报告
│   └── drafts/            ← 草稿
├── skills/                ← 🔧 SKILL 插件：所有 AI Agent 扩展能力统一存放于此
├── templates/             ← 📋 模板：Wiki 页面和 prompt 的模板
└── .llm-wiki.md           ← ⚙️ LLM 编译指令（核心配置）
```

## 快速开始

1. **投入素材**：将文章/笔记丢进 `_inbox/`
2. **编译知识库**：将 `.llm-wiki.md` 作为系统 prompt，让 AI Agent 处理 inbox 并更新 wiki
3. **查询与使用**：基于 `wiki/` 中的结构化知识进行提问、生成输出
4. **定期维护**：让 AI Agent 执行"健康检查"，发现矛盾和知识缺口

## 工具推荐

- **IDE**: [Obsidian](https://obsidian.md) — 查看和手动编辑
- **AI Agent**: Claude Code / Gemini CLI / Cursor — 执行编译任务
- **版本控制**: Git — 追踪所有变更
- **剪藏工具**: Obsidian Web Clipper — 快速收集网页内容
