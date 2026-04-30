# Karpathy: LLM Knowledge Bases

来源: https://x.com/karpathy/status/2039805659525644595
日期: 2026-04-02
作者: Andrej Karpathy

## 原文要点

Andrej Karpathy 分享了他最近使用 LLM 构建个人知识库的经验：

> "Something I'm finding very useful recently: using LLMs to build personal knowledge bases for various topics of research interest. In this way, a large fraction of my recent token throughput is going less into manipulating code, and more into manipulating knowledge."

## 核心方法论

### 编译器模型 vs RAG 模型
- **传统 RAG**：像解释器，每次查询从头检索原始文档
- **编译模型**：像编译器，先将原始数据"编译"为结构化 Wiki，查询时基于编译产物

### 工作流
1. 原始素材（论文、文章、截图）存入 `/raw` 目录
2. LLM Agent 读取原始素材，编译为结构化 Wiki
3. Agent 负责维护交叉链接、分类、健康检查
4. 用户查询基于编译后的 Wiki，非原始数据

### 工具选择
- IDE: Obsidian（本地优先，纯 Markdown）
- AI Agent: Claude Code 等具备文件系统访问能力的 Agent
- 版本控制: Git

### 关键洞察
- 知识管理失败的首要原因是维护负担，LLM 解决了这个问题
- 人类负责方向设定和事实验证，AI 负责组织和维护
- 输出可以是 Markdown、幻灯片（Marp）、图表等多种格式

## 社区反馈
- 被广泛讨论，被称为"停止检索，开始编译"
- 批评者指出对企业级场景不适用
- 存在 LLM 幻觉引入错误信息的风险
- 发布了 llm-wiki.md 模板文件，被社区大量采用
