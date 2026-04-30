# 收件箱使用说明

将待处理的素材丢进这个目录即可。支持的素材类型：

- 📄 Markdown 文件（网页剪藏、笔记）
- 📝 纯文本文件
- 🔗 包含 URL 列表的文件
- 📋 任何你想让 AI 处理的文本内容

## 如何投入素材

### 方法 1：直接粘贴
新建一个 `.md` 文件，把内容粘贴进去。

### 方法 2：Obsidian Web Clipper
安装 Obsidian Web Clipper 浏览器插件，将剪藏目录设为此文件夹。

### 方法 3：快捷指令 / 自动化
设置 iOS Shortcuts 或 macOS Automator，将分享内容自动保存到此目录。

## 编译方法

素材投入后，打开 AI Agent（Claude Code / Gemini CLI 等），执行：

```
请阅读 .llm-wiki.md 中的编译指令，然后处理 _inbox/ 中的所有素材。
```

Agent 会自动：
1. 读取每个文件
2. 提取核心信息
3. 合并到 wiki/ 的对应主题页面
4. 将原始文件归档到 _raw/
5. 更新索引
