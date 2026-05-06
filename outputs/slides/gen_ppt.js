"use strict";
const PptxGenJS = require("pptxgenjs");
const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";

// ─── Design System ───────────────────────────────────────────────────────────
const C = {
  NAVY:        "1E2761",
  NAVY_LIGHT:  "2A3A80",
  ICE:         "CADCFC",
  GOLD:        "F5A623",
  OFF_WHITE:   "F4F7FB",
  WHITE:       "FFFFFF",
  DARK_TEXT:   "1A1A2E",
  MID_TEXT:    "4A5568",
  MUTED:       "94A3B8",
  GREEN:       "10B981",
  RED:         "EF4444",
  CARD_BORDER: "E2E8F0",
  MID_BLUE:    "3B5BA5",
};

const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.10 });

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Add dark-page chrome: navy bg + gold top bar */
function darkPage(slide) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.NAVY }, line: { width: 0 } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.07, fill: { color: C.GOLD }, line: { width: 0 } });
}

/** Add light-page chrome: off-white bg + left navy bar */
function lightPage(slide) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.OFF_WHITE }, line: { width: 0 } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.08, h: 5.625, fill: { color: C.NAVY }, line: { width: 0 } });
}

/** Add page header title + optional subtitle */
function pageHeader(slide, title, subtitle) {
  slide.addShape(pres.ShapeType.rect, { x: 0.08, y: 0, w: 9.92, h: 0.85, fill: { color: C.OFF_WHITE }, line: { width: 0 } });
  slide.addText(title, { x: 0.28, y: 0.08, w: 9.4, h: 0.42, fontSize: 22, bold: true, color: C.NAVY, fontFace: "Calibri", valign: "middle" });
  if (subtitle) {
    slide.addText(subtitle, { x: 0.28, y: 0.5, w: 9.4, h: 0.28, fontSize: 10, color: C.MUTED, fontFace: "Calibri Light", italic: true });
  }
}

/** White card with shadow */
function addCard(slide, opts) {
  const { x, y, w, h, text, textOpts, topBarColor } = opts;
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: C.WHITE },
    line: { color: C.CARD_BORDER, width: 0.75 },
    shadow: makeShadow(),
  });
  if (topBarColor) {
    slide.addShape(pres.ShapeType.rect, { x, y, w, h: 0.06, fill: { color: topBarColor }, line: { width: 0 } });
  }
}

// ─── SLIDE 1: Cover ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkPage(s);

  // Decorative circles
  s.addShape(pres.ShapeType.ellipse, { x: 7.2, y: 0.5, w: 3.5, h: 3.5, fill: { color: C.NAVY_LIGHT, transparency: 60 }, line: { width: 0 } });
  s.addShape(pres.ShapeType.ellipse, { x: 8.5, y: 3.2, w: 1.5, h: 1.5, fill: { color: C.GOLD, transparency: 80 }, line: { width: 0 } });

  s.addText("猎头 AI 效能助手", { x: 0.6, y: 1.4, w: 6.2, h: 1.0, fontSize: 42, bold: true, color: C.WHITE, fontFace: "Calibri" });
  s.addText("产品需求报告  ·  CEO 汇报版", { x: 0.6, y: 2.5, w: 6, h: 0.5, fontSize: 18, color: C.ICE, fontFace: "Calibri Light" });

  // Gold separator line
  s.addShape(pres.ShapeType.line, { x: 0.6, y: 3.15, w: 2.5, h: 0, line: { color: C.GOLD, width: 2 } });

  s.addText("从 JD 到推荐报告，数天变数小时", { x: 0.6, y: 3.4, w: 6, h: 0.45, fontSize: 14, italic: true, color: C.ICE, fontFace: "Calibri Light" });
  s.addText("2026年5月  ·  产品团队", { x: 0.6, y: 5.1, w: 5, h: 0.3, fontSize: 11, color: C.MUTED, fontFace: "Calibri Light" });
}

// ─── SLIDE 2: 五个战略判断 ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkPage(s);

  s.addText("五个战略判断", { x: 0.5, y: 0.22, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.WHITE, fontFace: "Calibri" });
  s.addText("一页看懂全局", { x: 0.5, y: 0.78, w: 9, h: 0.3, fontSize: 13, color: C.ICE, fontFace: "Calibri Light" });

  const cards = [
    { num: "01", title: "市场规模", desc: "1,600-1,800 亿市场，AI工具渗透率极低，18-24个月窗口期" },
    { num: "02", title: "竞争格局", desc: "国内无全功能AI猎头工具，六大竞品均有明显功能缺口" },
    { num: "03", title: "核心差异化", desc: "三大全行业空白：推荐报告生成 · HM协作入口 · 团队经验沉淀" },
    { num: "04", title: "MVP方向", desc: "AI Native提效引擎，以浏览器插件切入，不碰交易" },
    { num: "05", title: "商业逻辑", desc: "PLG个人付费 → 团队版升级，知识库越用越难迁移" },
  ];

  cards.forEach((c, i) => {
    const y = 1.25 + i * 0.78;
    // Card bg
    s.addShape(pres.ShapeType.rect, { x: 0.6, y, w: 8.8, h: 0.72, fill: { color: C.NAVY_LIGHT }, line: { width: 0 } });
    // Gold left bar
    s.addShape(pres.ShapeType.rect, { x: 0.6, y, w: 0.05, h: 0.72, fill: { color: C.GOLD }, line: { width: 0 } });
    // Number circle
    s.addShape(pres.ShapeType.ellipse, { x: 0.85, y: y + 0.17, w: 0.38, h: 0.38, fill: { color: C.GOLD }, line: { width: 0 } });
    s.addText(c.num, { x: 0.85, y: y + 0.17, w: 0.38, h: 0.38, fontSize: 10, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    // Title
    s.addText(c.title, { x: 1.38, y: y + 0.06, w: 2.0, h: 0.3, fontSize: 13, bold: true, color: C.WHITE, fontFace: "Calibri" });
    // Desc
    s.addText(c.desc, { x: 1.38, y: y + 0.36, w: 7.7, h: 0.28, fontSize: 10, color: C.ICE, fontFace: "Calibri Light" });
  });
}

// ─── SLIDE 3: 市场规模与行业结构 ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "市场规模与行业结构", "来源：共研网（2023）· 脉脉高聘（2023）· DataHorizzon Research（2024）");

  const nums = [
    { big: "1,600-1,800亿", label: "国内猎头市场规模（2023）", note: "含中端招聘，广义口径", x: 0.4 },
    { big: "5-6万家", label: "猎头公司数量", note: "以5-20人小微企业为主", x: 2.6 },
    { big: "50万人", label: "猎头顾问总人数", note: "80%以上为35岁以下", x: 4.8 },
    { big: "< 1%", label: "最大单家市占率", note: "市场极度碎片化，无垄断者", x: 7.0 },
  ];

  nums.forEach(n => {
    addCard(s, { x: n.x, y: 1.1, w: 2.1, h: 1.8, topBarColor: C.NAVY });
    s.addText(n.big, { x: n.x + 0.1, y: 1.22, w: 1.9, h: 0.65, fontSize: 20, bold: true, color: C.NAVY, fontFace: "Calibri", align: "center" });
    s.addText(n.label, { x: n.x + 0.08, y: 1.88, w: 1.94, h: 0.4, fontSize: 10, color: C.MID_TEXT, fontFace: "Calibri Light", align: "center" });
    s.addText(n.note, { x: n.x + 0.08, y: 2.3, w: 1.94, h: 0.3, fontSize: 9, color: C.MUTED, fontFace: "Calibri Light", align: "center", italic: true });
  });

  // Bottom conclusion bar
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 4.85, w: 9.4, h: 0.55, fill: { color: C.NAVY }, line: { width: 0 } });
  s.addText("结论：一个等待整合的碎片化巨量市场，是 AI 工具的天然切入窗口", {
    x: 0.5, y: 4.85, w: 9.0, h: 0.55, fontSize: 12, color: C.WHITE, fontFace: "Calibri", bold: true, valign: "middle"
  });
}

// ─── SLIDE 4: 为什么AI工具现在有机会 ──────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "为什么 AI 工具现在有机会");

  // Left card
  addCard(s, { x: 0.3, y: 1.0, w: 4.3, h: 3.2 });
  s.addText("LLM 成本拐点", { x: 0.5, y: 1.1, w: 3.9, h: 0.38, fontSize: 14, bold: true, color: C.NAVY, fontFace: "Calibri" });
  const leftItems = [
    "简历解析准确率：60% → 98%（LLM多模态）",
    "非结构化→结构化输出成本断崖下降",
    "推理成本已降至工具商业化可接受范围",
  ];
  leftItems.forEach((t, i) => {
    s.addText(t, { x: 0.5, y: 1.6 + i * 0.5, w: 3.9, h: 0.4, fontSize: 11, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: true });
  });

  // Right card
  addCard(s, { x: 4.8, y: 1.0, w: 4.3, h: 3.2 });
  s.addText("数字化渗透率极低", { x: 5.0, y: 1.1, w: 3.9, h: 0.38, fontSize: 14, bold: true, color: C.NAVY, fontFace: "Calibri" });
  const rightItems = [
    "中小猎头仍依赖：微信 + Excel + 平台原生功能",
    "专业ATS/CRM渗透率估计 < 10%",
    "近6成从业者年薪不足15万，效率即生死线",
  ];
  rightItems.forEach((t, i) => {
    s.addText(t, { x: 5.0, y: 1.6 + i * 0.5, w: 3.9, h: 0.4, fontSize: 11, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: true });
  });

  // Gold banner
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 4.3, w: 9.4, h: 0.65, fill: { color: C.GOLD }, line: { width: 0 } });
  s.addText("窗口期判断：18-24 个月内  |  晚于此节点，头部平台将完成闭环", {
    x: 0.5, y: 4.3, w: 9.0, h: 0.65, fontSize: 12, color: C.DARK_TEXT, fontFace: "Calibri", bold: true, valign: "middle"
  });
}

// ─── SLIDE 5: 付费能力基础 ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "付费能力基础");

  // Big number
  s.addText("年薪的 20-30%", { x: 0.8, y: 1.1, w: 8.4, h: 0.85, fontSize: 44, bold: true, color: C.NAVY, fontFace: "Calibri", align: "center" });
  s.addText("猎头每单佣金，单次服务费通常在数万元至数十万元", { x: 0.8, y: 1.95, w: 8.4, h: 0.4, fontSize: 14, color: C.MID_TEXT, fontFace: "Calibri Light", align: "center" });

  // Flow chart
  const flows = ["效率提升 10%", "同期交付量增加", "佣金转化率提升", "月收入直接增长"];
  const fxList = [0.5, 2.7, 4.9, 7.1];
  flows.forEach((txt, i) => {
    s.addShape(pres.ShapeType.rect, { x: fxList[i], y: 2.7, w: 2.0, h: 0.75, fill: { color: C.NAVY }, line: { width: 0 } });
    s.addText(txt, { x: fxList[i], y: 2.7, w: 2.0, h: 0.75, fontSize: 11, bold: true, color: C.WHITE, fontFace: "Calibri", align: "center", valign: "middle" });
    if (i < 3) {
      s.addShape(pres.ShapeType.line, { x: fxList[i] + 2.0, y: 3.075, w: 0.7, h: 0, line: { color: C.GOLD, width: 2 } });
    }
  });

  // Bottom data bars
  addCard(s, { x: 0.3, y: 3.7, w: 4.5, h: 0.7 });
  s.addText("简历筛选占日常工作时间约 25%（来源：LinkedIn 2018）", { x: 0.5, y: 3.75, w: 4.1, h: 0.6, fontSize: 11, color: C.MID_TEXT, fontFace: "Calibri Light", valign: "middle" });
  addCard(s, { x: 5.0, y: 3.7, w: 4.6, h: 0.7 });
  s.addText("AI介入后可节省约 50% 基础工作时间（来源：北森 2019）", { x: 5.2, y: 3.75, w: 4.2, h: 0.6, fontSize: 11, color: C.MID_TEXT, fontFace: "Calibri Light", valign: "middle" });
}

// ─── SLIDE 6: 三类目标用户 ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "三类目标用户");

  const cols = [
    {
      x: 0.3, barColor: C.NAVY, circleColor: C.NAVY, role: "猎头", sub: "付费主体",
      items: ["50万人，分布于5-6万家猎头公司", "对AI态度：极度渴求，愿意付费", "核心诉求：即插即用，不打断筛选流"]
    },
    {
      x: 3.4, barColor: C.MID_BLUE, circleColor: C.MID_BLUE, role: "企业 HR", sub: "协同用户",
      items: ["流程合规导向", "对AI态度：审慎欢迎，关注数据安全", "核心诉求：查重自动化、进度透明"]
    },
    {
      x: 6.5, barColor: C.GOLD, circleColor: C.GOLD, role: "Hiring Manager", sub: "隐形决策者",
      items: ["招聘最终拍板人，现有产品体系几乎不服务此角色", "面试反馈靠HR人工催收，平均3天", "产品机会：打通此角色可显著缩短反馈周期"],
      badge: "全行业产品空白"
    },
  ];

  cols.forEach(col => {
    addCard(s, { x: col.x, y: 0.95, w: 2.9, h: 3.6 });
    // Left color bar
    s.addShape(pres.ShapeType.rect, { x: col.x, y: 0.95, w: 0.07, h: 3.6, fill: { color: col.barColor }, line: { width: 0 } });
    // Badge if any
    if (col.badge) {
      s.addShape(pres.ShapeType.rect, { x: col.x + 0.15, y: 1.05, w: 2.55, h: 0.28, fill: { color: C.GOLD }, line: { width: 0 } });
      s.addText(col.badge, { x: col.x + 0.15, y: 1.05, w: 2.55, h: 0.28, fontSize: 9, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    }
    // Role circle
    const circleY = col.badge ? 1.4 : 1.1;
    s.addShape(pres.ShapeType.ellipse, { x: col.x + 0.95, y: circleY, w: 0.95, h: 0.95, fill: { color: col.circleColor }, line: { width: 0 } });
    s.addText(col.role, { x: col.x + 0.15, y: circleY, w: 2.6, h: 0.95, fontSize: col.role.length > 5 ? 9 : 12, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    // Sub label
    const subY = circleY + 0.95;
    s.addText(col.sub, { x: col.x + 0.15, y: subY + 0.05, w: 2.6, h: 0.3, fontSize: 10, color: C.MUTED, align: "center", fontFace: "Calibri Light" });
    // Items
    col.items.forEach((item, idx) => {
      s.addText(item, { x: col.x + 0.2, y: subY + 0.4 + idx * 0.55, w: 2.55, h: 0.5, fontSize: 10, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: true });
    });
  });
}

// ─── SLIDE 7: 用户旅程痛点地图 ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "用户旅程痛点地图", "猎头主线");

  const steps = ["收到JD", "解析/分发", "搜索", "初筛/评估", "背调", "撰写报告", "面试协调", "Offer谈判", "入职"];
  const stepX = [0.2, 1.3, 2.4, 3.5, 4.6, 5.7, 6.8, 7.9, 9.0];

  steps.forEach((t, i) => {
    s.addShape(pres.ShapeType.rect, { x: stepX[i], y: 1.1, w: 0.88, h: 0.6, fill: { color: C.NAVY }, line: { width: 0 } });
    s.addText(t, { x: stepX[i], y: 1.1, w: 0.88, h: 0.6, fontSize: 8, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    if (i < 8) {
      s.addShape(pres.ShapeType.line, { x: stepX[i] + 0.88, y: 1.4, w: 0.11, h: 0, line: { color: C.GOLD, width: 1.5 } });
    }
  });

  const pains = [
    { txt: "重复录入\n20-40min", x: 1.3 },
    { txt: "跨行JD\n看不懂", x: 2.4 },
    { txt: "海量简历\n难筛选", x: 3.5 },
    { txt: "背调靠电话\n1-2天", x: 4.6 },
    { txt: "手写报告\n20-60min", x: 5.7 },
    { txt: "面试反馈\n靠微信催", x: 6.8 },
    { txt: "缺乏数据\n支撑", x: 7.9 },
    { txt: "候选人\n临时变卦", x: 9.0 },
  ];

  pains.forEach(p => {
    // Dashed connector
    s.addShape(pres.ShapeType.line, { x: p.x + 0.44, y: 1.7, w: 0, h: 0.35, line: { color: C.RED, width: 1, dashType: "dash" } });
    s.addShape(pres.ShapeType.rect, { x: p.x, y: 2.05, w: 0.9, h: 0.75, fill: { color: C.RED }, line: { width: 0 } });
    s.addText(p.txt, { x: p.x, y: 2.05, w: 0.9, h: 0.75, fontSize: 7.5, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
  });

  // Bottom conclusion
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 4.9, w: 9.4, h: 0.45, fill: { color: C.NAVY }, line: { width: 0 } });
  s.addText("以上痛点均可通过 AI 工具介入解决，且用户付费意愿已被市场验证", {
    x: 0.5, y: 4.9, w: 9.0, h: 0.45, fontSize: 11, color: C.WHITE, fontFace: "Calibri", bold: true, valign: "middle"
  });
}

// ─── SLIDE 8: 痛点优先级 ──────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "痛点优先级");

  const rows = [
    {
      y: 1.1, h: 1.1, barColor: C.NAVY, bgColor: "F0F2FA",
      label: "P0 · 机械劳动 · 高频刚需", labelBg: C.NAVY,
      items: ["职位搬运工", "跨行认知壁垒", "繁琐推荐报告", "时间竞争"]
    },
    {
      y: 2.45, h: 1.1, barColor: C.MID_BLUE, bgColor: "EAF0FB",
      label: "P1 · 溢价与转化", labelBg: C.MID_BLUE,
      items: ["沟通孤岛", "信任构建", "低效漏斗", "候选人变卦", "数据合规"]
    },
    {
      y: 3.78, h: 0.85, barColor: C.MUTED, bgColor: "F5F5F5",
      label: "P2 · 管理与长效", labelBg: C.MUTED,
      items: ["数据洞察", "雇主品牌", "关系维护", "知识传承", "内推管理"]
    },
  ];

  rows.forEach(row => {
    s.addShape(pres.ShapeType.rect, { x: 0.2, y: row.y, w: 9.6, h: row.h, fill: { color: row.bgColor }, line: { color: C.CARD_BORDER, width: 0.5 } });
    s.addShape(pres.ShapeType.rect, { x: 0.2, y: row.y, w: 0.08, h: row.h, fill: { color: row.barColor }, line: { width: 0 } });
    // Label
    s.addShape(pres.ShapeType.rect, { x: 0.35, y: row.y + 0.12, w: 2.2, h: 0.4, fill: { color: row.labelBg }, line: { width: 0 } });
    s.addText(row.label, { x: 0.35, y: row.y + 0.12, w: 2.2, h: 0.4, fontSize: 9, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    // Item cards
    row.items.forEach((item, idx) => {
      const ix = 2.7 + idx * 1.4;
      s.addShape(pres.ShapeType.rect, {
        x: ix, y: row.y + 0.12, w: 1.3, h: row.h - 0.25,
        fill: { color: C.WHITE }, line: { color: C.CARD_BORDER, width: 0.5 }, shadow: makeShadow()
      });
      s.addText(item, { x: ix, y: row.y + 0.12, w: 1.3, h: row.h - 0.25, fontSize: 10, color: C.DARK_TEXT, align: "center", valign: "middle", fontFace: "Calibri" });
    });
  });
}

// ─── SLIDE 9: 竞品全景 ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "竞品全景对比", "六大主流产品 vs 本产品功能覆盖");

  const cols = ["竞品", "推荐报告生成", "HM协作入口", "团队知识库", "Offer谈判", "国内覆盖", "猎头工作流"];
  const rows = [
    ["HireEZ（国际）", "✗", "✗", "✗", "✗", "弱", "弱"],
    ["SeekOut（国际）", "✗", "✗", "✗", "✗", "弱", "弱"],
    ["LinkedIn HA（国际）", "✗", "✗", "✗", "✗", "受限", "弱"],
    ["猎聘AI企业版", "△", "✗", "✗", "✗", "强", "弱"],
    ["BOSS南北阁", "✗", "✗", "✗", "✗", "强", "✗"],
    ["世纪云猎", "△", "✗", "✗", "✗", "中", "中"],
  ];

  const colW = [2.0, 1.4, 1.35, 1.35, 1.1, 1.1, 1.1];
  const colX = [];
  let cx = 0.3;
  colW.forEach(w => { colX.push(cx); cx += w; });

  const rowH = 0.44;
  const hdrY = 1.0;

  // Header
  cols.forEach((c, ci) => {
    s.addShape(pres.ShapeType.rect, { x: colX[ci], y: hdrY, w: colW[ci], h: rowH, fill: { color: C.NAVY }, line: { color: C.WHITE, width: 0.5 } });
    s.addText(c, { x: colX[ci] + 0.05, y: hdrY, w: colW[ci] - 0.1, h: rowH, fontSize: 9, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = hdrY + rowH + ri * rowH;
    const bg = ri % 2 === 0 ? "FFFFFF" : "F8FAFC";
    row.forEach((cell, ci) => {
      s.addShape(pres.ShapeType.rect, { x: colX[ci], y: ry, w: colW[ci], h: rowH, fill: { color: bg }, line: { color: C.CARD_BORDER, width: 0.5 } });
      let cellColor = C.DARK_TEXT;
      if (cell === "✗") cellColor = C.RED;
      else if (cell === "△") cellColor = C.GOLD;
      else if (cell === "强") cellColor = C.GREEN;
      else if (cell === "弱" || cell === "受限") cellColor = C.RED;
      s.addText(cell, { x: colX[ci] + 0.05, y: ry, w: colW[ci] - 0.1, h: rowH, fontSize: 10, color: cellColor, align: "center", valign: "middle", fontFace: "Calibri" });
    });
  });

  s.addText("△ = 部分支持  |  ✗ = 不支持  |  本产品目标：全列覆盖", {
    x: 0.3, y: 4.85, w: 9.4, h: 0.3, fontSize: 10, color: C.MUTED, fontFace: "Calibri Light", italic: true
  });
}

// ─── SLIDE 10: 三大全行业空白 ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkPage(s);

  s.addText("三大全行业产品空白", { x: 0.5, y: 0.22, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.WHITE, fontFace: "Calibri" });
  s.addText("这是我们的差异化护城河", { x: 0.5, y: 0.78, w: 9, h: 0.3, fontSize: 13, color: C.ICE, fontFace: "Calibri Light" });

  const cards = [
    { num: "01", title: "推荐报告专业化生成", desc: "所有竞品最多做简历解析，无法生成符合猎头交付格式的完整推荐报告（含访谈整合+风险预警+格式自定义）", y: 1.35 },
    { num: "02", title: "Hiring Manager 轻量协作入口", desc: "面试反馈仍靠HR用微信邮件人工催收，无任何产品设计了无需下载App的轻量HM协作入口", y: 2.55 },
    { num: "03", title: "团队经验沉淀系统", desc: "招聘行业知识沉淀机制几乎为零，资深猎头离职即带走全部能力，每个猎头都是信息孤岛", y: 3.75 },
  ];

  cards.forEach(c => {
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: c.y, w: 8.8, h: 1.05, fill: { color: C.NAVY_LIGHT }, line: { width: 0 } });
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: c.y, w: 0.08, h: 1.05, fill: { color: C.GOLD }, line: { width: 0 } });
    // Number circle
    s.addShape(pres.ShapeType.ellipse, { x: 0.9, y: c.y + 0.28, w: 0.5, h: 0.5, fill: { color: C.GOLD }, line: { width: 0 } });
    s.addText(c.num, { x: 0.9, y: c.y + 0.28, w: 0.5, h: 0.5, fontSize: 11, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    s.addText(c.title, { x: 1.55, y: c.y + 0.1, w: 7.6, h: 0.38, fontSize: 15, bold: true, color: C.WHITE, fontFace: "Calibri" });
    s.addText(c.desc, { x: 1.55, y: c.y + 0.5, w: 7.6, h: 0.48, fontSize: 10, color: C.ICE, fontFace: "Calibri Light" });
  });
}

// ─── SLIDE 11: 差异化定位 ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "差异化定位");

  // Left - Do
  addCard(s, { x: 0.3, y: 1.0, w: 4.1, h: 3.2 });
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 1.0, w: 0.07, h: 3.2, fill: { color: C.GREEN }, line: { width: 0 } });
  s.addText("我们做", { x: 0.5, y: 1.1, w: 3.7, h: 0.38, fontSize: 14, bold: true, color: C.GREEN, fontFace: "Calibri" });
  const doItems = [
    "信息录入自动化（RPA+语义映射）",
    "行业知识对齐辅助",
    "推荐文档生成与标准化",
    "风险排查与预警",
    "候选人关系维护SOP",
    "团队经验沉淀（护城河）",
  ];
  doItems.forEach((t, i) => {
    s.addText(t, { x: 0.5, y: 1.55 + i * 0.38, w: 3.7, h: 0.36, fontSize: 11, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: { type: "number", color: C.GREEN } });
  });

  // Right - Don't
  addCard(s, { x: 4.8, y: 1.0, w: 4.1, h: 3.2 });
  s.addShape(pres.ShapeType.rect, { x: 4.8, y: 1.0, w: 0.07, h: 3.2, fill: { color: C.RED }, line: { width: 0 } });
  s.addText("我们不做", { x: 5.0, y: 1.1, w: 3.7, h: 0.38, fontSize: 14, bold: true, color: C.RED, fontFace: "Calibri" });
  const dontItems = [
    "替代猎头进行核心谈判与面试",
    "建立全国候选人数据库",
    "与Boss直聘/猎聘正面竞争撮合交易",
    "替代人情关系与信任构建",
  ];
  dontItems.forEach((t, i) => {
    s.addText(t, { x: 5.0, y: 1.55 + i * 0.5, w: 3.7, h: 0.45, fontSize: 11, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: true });
  });

  // Gold moat bar
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 4.3, w: 9.4, h: 0.6, fill: { color: C.GOLD }, line: { width: 0 } });
  s.addText("护城河：团队知识库随使用数据持续积累，越用越难迁移 — 这是团队版付费的核心锁定机制", {
    x: 0.5, y: 4.3, w: 9.0, h: 0.6, fontSize: 11, color: C.DARK_TEXT, fontFace: "Calibri", bold: true, valign: "middle"
  });
}

// ─── SLIDE 12: 产品定位 ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkPage(s);

  s.addText("产品定位", { x: 0.5, y: 0.22, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.WHITE, fontFace: "Calibri" });

  // Quote block
  s.addShape(pres.ShapeType.rect, { x: 0.6, y: 1.1, w: 8.8, h: 1.3, fill: { color: C.NAVY_LIGHT }, line: { width: 0 } });
  s.addShape(pres.ShapeType.rect, { x: 0.6, y: 1.1, w: 0.1, h: 1.3, fill: { color: C.GOLD }, line: { width: 0 } });
  s.addText([
    { text: "“猎头不需要一个新的 CRM 系统，", options: { breakLine: true } },
    { text: "他们需要一个能插在现有流程上的‘智能义体’。”", options: {} },
  ], { x: 0.85, y: 1.18, w: 8.3, h: 1.15, fontSize: 17, italic: true, color: C.WHITE, fontFace: "Calibri Light", valign: "middle" });

  // KPI visual
  // Left box
  s.addShape(pres.ShapeType.rect, { x: 1.0, y: 2.85, w: 2.5, h: 1.2, fill: { color: C.NAVY_LIGHT }, line: { width: 0 } });
  s.addText("拿到 JD", { x: 1.0, y: 2.9, w: 2.5, h: 0.5, fontSize: 14, bold: true, color: C.WHITE, align: "center", fontFace: "Calibri" });
  s.addText("行业现状：3-7天", { x: 1.0, y: 3.4, w: 2.5, h: 0.45, fontSize: 12, color: C.RED, align: "center", fontFace: "Calibri" });

  // Arrow
  s.addShape(pres.ShapeType.line, { x: 3.6, y: 3.45, w: 2.7, h: 0, line: { color: C.GOLD, width: 3 } });
  s.addText("猎头 AI 效能助手", { x: 3.6, y: 2.95, w: 2.7, h: 0.45, fontSize: 11, bold: true, color: C.GOLD, align: "center", fontFace: "Calibri" });

  // Right box
  s.addShape(pres.ShapeType.rect, { x: 6.5, y: 2.85, w: 2.5, h: 1.2, fill: { color: C.GREEN }, line: { width: 0 } });
  s.addText("输出推荐报告", { x: 6.5, y: 2.9, w: 2.5, h: 0.5, fontSize: 14, bold: true, color: C.WHITE, align: "center", fontFace: "Calibri" });
  s.addText("产品目标：3-8小时", { x: 6.5, y: 3.4, w: 2.5, h: 0.45, fontSize: 12, color: C.WHITE, align: "center", fontFace: "Calibri" });

  s.addText("形态：浏览器插件 + 轻量Web端  ·  策略：不碰交易，专做AI能力外包", {
    x: 0.5, y: 4.3, w: 9.0, h: 0.35, fontSize: 12, color: C.ICE, fontFace: "Calibri Light", align: "center", italic: true
  });
}

// ─── SLIDE 13: Phase 1 MVP ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "Phase 1 MVP — 产品核心");

  // Badge
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 0.88, w: 1.4, h: 0.25, fill: { color: C.GOLD }, line: { width: 0 } });
  s.addText("已确认方向", { x: 0.3, y: 0.88, w: 1.4, h: 0.25, fontSize: 9, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });

  const features = [
    { num: "F0", numBg: C.GOLD, title: "划词解析工具", desc: "任意页面划取文本 → 弹出AI解析，外部LLM API驱动" },
    { num: "F1", numBg: C.NAVY, title: "RPA 填表外挂", desc: "一键提取JD，多平台同步填充" },
    { num: "F2", numBg: C.NAVY, title: "跨行业 JD 解读", desc: "实时术语解释 + 搜索关键词推荐" },
    { num: "F3", numBg: C.NAVY, title: "智能推荐报告引擎", desc: "访谈笔记 → 完整报告，含风险预警" },
    { num: "F4", numBg: C.NAVY, title: "风险预警雷达", desc: "空窗期/跳槽频率自动扫描" },
    { num: "F5", numBg: C.NAVY, title: "智能抢位提醒", desc: "候选人动态实时监测" },
  ];

  features.forEach((f, i) => {
    const fy = 1.15 + i * 0.62;
    addCard(s, { x: 0.3, y: fy, w: 4.7, h: 0.58 });
    s.addShape(pres.ShapeType.ellipse, { x: 0.42, y: fy + 0.1, w: 0.38, h: 0.38, fill: { color: f.numBg }, line: { width: 0 } });
    s.addText(f.num, { x: 0.42, y: fy + 0.1, w: 0.38, h: 0.38, fontSize: 8, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    s.addText(f.title, { x: 0.88, y: fy + 0.06, w: 3.9, h: 0.25, fontSize: 11, bold: true, color: C.NAVY, fontFace: "Calibri" });
    s.addText(f.desc, { x: 0.88, y: fy + 0.31, w: 3.9, h: 0.22, fontSize: 9, color: C.MID_TEXT, fontFace: "Calibri Light" });
  });

  // Prototype placeholder
  s.addShape(pres.ShapeType.rect, {
    x: 5.3, y: 1.1, w: 4.1, h: 3.3,
    fill: { color: C.WHITE }, line: { color: C.CARD_BORDER, width: 1, dashType: "dash" }
  });
  s.addText("产品原型图", { x: 5.3, y: 2.2, w: 4.1, h: 0.45, fontSize: 16, color: C.MID_TEXT, bold: true, align: "center", fontFace: "Calibri" });
  s.addText("（HTML 格式文件，待插入）", { x: 5.3, y: 2.7, w: 4.1, h: 0.35, fontSize: 12, color: C.MUTED, align: "center", fontFace: "Calibri Light" });
  s.addText("预留插入位置", { x: 5.3, y: 3.15, w: 4.1, h: 0.3, fontSize: 11, color: C.MUTED, align: "center", fontFace: "Calibri Light" });
}

// ─── SLIDE 14: 三阶段路线图 ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "三阶段产品路线图");

  // Timeline axis
  s.addShape(pres.ShapeType.line, { x: 0.5, y: 2.1, w: 9.0, h: 0, line: { color: C.NAVY, width: 2 } });

  const phases = [
    {
      x: 0.5, w: 2.8, nodeColor: C.GOLD, label: "0-6个月",
      titleBg: C.NAVY, title: "插件核心",
      items: ["划词解析工具（MVP首个功能）", "推荐报告引擎", "风险预警雷达", "抢位提醒"],
      milestone: "100个种子用户 · NPS > 40",
    },
    {
      x: 3.7, w: 2.8, nodeColor: C.MID_BLUE, label: "6-12个月",
      titleBg: C.MID_BLUE, title: "协同与合规",
      items: ["Hiring Manager协作入口", "Offer谈判辅助引擎", "合规护盾（PIPL）", "智能沟通助理"],
      milestone: "50家企业HR绑定 · 反馈周期缩短40%",
    },
    {
      x: 6.9, w: 2.5, nodeColor: C.GREEN, label: "12-24个月",
      titleBg: C.GREEN, title: "团队版护城河",
      items: ["团队知识库（护城河核心）", "招聘数据驾驶舱", "关系运营SOP"],
      milestone: "团队版转化率20% · 月流失率<3%",
    },
  ];

  phases.forEach(p => {
    const nodeX = p.x + p.w / 2 - 0.25;
    // Node circle on axis
    s.addShape(pres.ShapeType.ellipse, { x: nodeX, y: 1.85, w: 0.5, h: 0.5, fill: { color: p.nodeColor }, line: { width: 0 } });
    s.addText(p.label, { x: p.x, y: 1.35, w: p.w, h: 0.38, fontSize: 10, color: C.MID_TEXT, align: "center", fontFace: "Calibri Light" });

    // Title box
    s.addShape(pres.ShapeType.rect, { x: p.x, y: 2.45, w: p.w, h: 0.38, fill: { color: p.titleBg }, line: { width: 0 } });
    s.addText(p.title, { x: p.x, y: 2.45, w: p.w, h: 0.38, fontSize: 12, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });

    // Content card
    addCard(s, { x: p.x, y: 2.85, w: p.w, h: 1.45 });
    p.items.forEach((item, idx) => {
      s.addText(item, { x: p.x + 0.1, y: 2.9 + idx * 0.33, w: p.w - 0.2, h: 0.3, fontSize: 9.5, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: true });
    });

    // Milestone
    s.addShape(pres.ShapeType.rect, { x: p.x, y: 4.35, w: p.w, h: 0.38, fill: { color: C.GOLD }, line: { width: 0 } });
    s.addText(p.milestone, { x: p.x, y: 4.35, w: p.w, h: 0.38, fontSize: 8, bold: true, color: C.DARK_TEXT, align: "center", valign: "middle", fontFace: "Calibri" });
  });
}

// ─── SLIDE 15: 各阶段成功指标 ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "各阶段成功指标");

  const phases = [
    {
      x: 0.3, barColor: C.NAVY, title: "Phase 1 · 0-6个月",
      metrics: [
        { label: "周活跃率", value: "> 60%" },
        { label: "报告生成量", value: "> 3份/用户/周" },
        { label: "NPS", value: "> 40" },
      ]
    },
    {
      x: 3.4, barColor: C.MID_BLUE, title: "Phase 2 · 6-12个月",
      metrics: [
        { label: "HR绑定用户", value: "> 50家" },
        { label: "HM入口使用率", value: "> 60%" },
        { label: "面试反馈周期缩短", value: "> 40%" },
      ]
    },
    {
      x: 6.5, barColor: C.GREEN, title: "Phase 3 · 12-24个月",
      metrics: [
        { label: "团队版转化率", value: "20%" },
        { label: "月流失率", value: "< 3%" },
        { label: "新成员爬坡周期缩短", value: "> 50%" },
      ]
    },
  ];

  phases.forEach(p => {
    addCard(s, { x: p.x, y: 1.0, w: 2.9, h: 3.5 });
    s.addShape(pres.ShapeType.rect, { x: p.x, y: 1.0, w: 0.07, h: 3.5, fill: { color: p.barColor }, line: { width: 0 } });
    s.addText(p.title, { x: p.x + 0.2, y: 1.1, w: 2.55, h: 0.42, fontSize: 13, bold: true, color: C.NAVY, fontFace: "Calibri" });
    p.metrics.forEach((m, i) => {
      const my = 1.68 + i * 0.9;
      s.addShape(pres.ShapeType.rect, { x: p.x + 0.2, y: my, w: 2.5, h: 0.78, fill: { color: C.OFF_WHITE }, line: { color: C.CARD_BORDER, width: 0.5 } });
      s.addText(m.label, { x: p.x + 0.28, y: my + 0.05, w: 2.3, h: 0.28, fontSize: 9, color: C.MUTED, fontFace: "Calibri Light" });
      s.addText(m.value, { x: p.x + 0.28, y: my + 0.32, w: 2.3, h: 0.38, fontSize: 18, bold: true, color: p.barColor, fontFace: "Calibri" });
    });
  });
}

// ─── SLIDE 16: 四档定价策略 ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "四档定价策略", "PLG 切入 → 个人病毒传播 → 团队升级 → 企业锁定");

  const plans = [
    {
      x: 0.3, dark: false, topColor: C.MUTED,
      name: "个人免费版", price: "免费", priceNote: null,
      items: ["基础报告生成（每月5份）", "行业知识图谱", "划词解析工具"],
    },
    {
      x: 2.55, dark: false, topColor: C.NAVY,
      name: "个人专业版", price: "¥299-499 /月", priceNote: "（示意数字）",
      items: ["无限报告生成", "风险预警雷达", "抢位提醒", "背调辅助"],
    },
    {
      x: 4.8, dark: true, topColor: C.GOLD,
      name: "团队版", price: "¥2,000-5,000 /月/团队", priceNote: "（示意数字）",
      items: ["全部专业版功能", "团队知识库（护城河）", "合规护盾", "数据驾驶舱", "权限管理"],
      badge: "推荐",
    },
    {
      x: 7.05, dark: false, topColor: C.GOLD,
      name: "企业版", price: "定制报价", priceNote: null,
      items: ["私有化部署", "ATS系统集成", "专属行业图谱", "SLA保障"],
    },
  ];

  plans.forEach(p => {
    const bgColor = p.dark ? C.NAVY : C.WHITE;
    const textColor = p.dark ? C.WHITE : C.DARK_TEXT;
    const priceColor = p.dark ? C.WHITE : C.NAVY;
    const itemColor = p.dark ? C.ICE : C.MID_TEXT;

    s.addShape(pres.ShapeType.rect, {
      x: p.x, y: 1.0, w: 2.1, h: 3.2,
      fill: { color: bgColor }, line: { color: C.CARD_BORDER, width: 0.75 }, shadow: makeShadow()
    });
    s.addShape(pres.ShapeType.rect, { x: p.x, y: 1.0, w: 2.1, h: 0.07, fill: { color: p.topColor }, line: { width: 0 } });

    if (p.badge) {
      s.addShape(pres.ShapeType.rect, { x: p.x + 1.3, y: 1.08, w: 0.7, h: 0.25, fill: { color: C.GOLD }, line: { width: 0 } });
      s.addText(p.badge, { x: p.x + 1.3, y: 1.08, w: 0.7, h: 0.25, fontSize: 8, bold: true, color: C.DARK_TEXT, align: "center", valign: "middle", fontFace: "Calibri" });
    }

    s.addText(p.name, { x: p.x + 0.1, y: 1.15, w: 1.9, h: 0.38, fontSize: 12, bold: true, color: textColor, align: "center", fontFace: "Calibri" });
    s.addText(p.price, { x: p.x + 0.05, y: 1.55, w: 2.0, h: 0.45, fontSize: p.price.length > 10 ? 13 : 18, bold: true, color: priceColor, align: "center", fontFace: "Calibri" });
    if (p.priceNote) {
      s.addText(p.priceNote, { x: p.x + 0.05, y: 1.98, w: 2.0, h: 0.22, fontSize: 9, color: p.dark ? C.ICE : C.MUTED, align: "center", fontFace: "Calibri Light" });
    }

    p.items.forEach((item, idx) => {
      s.addText(item, { x: p.x + 0.1, y: 2.25 + idx * 0.37, w: 1.9, h: 0.34, fontSize: 9.5, color: itemColor, fontFace: "Calibri Light", bullet: true });
    });
  });

  // PLG arrows
  const arrowLabels = ["病毒传播", "团队升级", "企业锁定"];
  const arrowX = [2.4, 4.65, 6.9];
  arrowLabels.forEach((lbl, i) => {
    s.addShape(pres.ShapeType.line, { x: arrowX[i], y: 2.5, w: 0.2, h: 0, line: { color: C.GOLD, width: 2 } });
    s.addText(lbl, { x: arrowX[i] - 0.1, y: 4.3, w: 0.5, h: 0.35, fontSize: 8, color: C.GOLD, align: "center", fontFace: "Calibri" });
  });
}

// ─── SLIDE 17: 关键商业指标 ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "关键商业指标", "以下数字均为规划示意，待商业验证后确认");

  const kpis = [
    { big: "¥6,000-15,000", label: "用户 LTV", note: "个人专业版年费×留存2年", x: 0.4 },
    { big: "20%", label: "个人→团队转化率目标", note: "知识库绑定后迁移成本高", x: 2.65 },
    { big: "< 3%", label: "团队版月流失率目标", note: "护城河效应降低流失", x: 4.9 },
    { big: "Phase 2末期", label: "盈亏平衡预测", note: "团队版规模化后转正", x: 7.15 },
  ];

  kpis.forEach(k => {
    addCard(s, { x: k.x, y: 1.2, w: 2.1, h: 2.0, topBarColor: C.NAVY });
    s.addText(k.big, { x: k.x + 0.05, y: 1.35, w: 2.0, h: 0.7, fontSize: k.big.length > 8 ? 16 : 26, bold: true, color: C.NAVY, align: "center", fontFace: "Calibri" });
    s.addText(k.label, { x: k.x + 0.05, y: 2.05, w: 2.0, h: 0.5, fontSize: 10, color: C.MID_TEXT, align: "center", fontFace: "Calibri Light" });
    s.addText(k.note, { x: k.x + 0.05, y: 2.55, w: 2.0, h: 0.45, fontSize: 9, color: C.MUTED, align: "center", italic: true, fontFace: "Calibri Light" });
  });

  // Disclaimer
  s.addShape(pres.ShapeType.rect, { x: 0.3, y: 4.7, w: 0.06, h: 0.55, fill: { color: C.GOLD }, line: { width: 0 } });
  addCard(s, { x: 0.3, y: 4.7, w: 9.4, h: 0.55 });
  s.addText("以上数字为商业规划示意值，不作对外承诺使用", {
    x: 0.55, y: 4.72, w: 9.0, h: 0.5, fontSize: 10, color: C.MUTED, fontFace: "Calibri Light", italic: true, valign: "middle"
  });
}

// ─── SLIDE 18: 主要风险与应对 ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  lightPage(s);
  pageHeader(s, "主要风险与应对");

  const risks = [
    {
      x: 0.3, barColor: C.RED, labelColor: C.RED,
      label: "技术风险  ·  高",
      risk: "平台反爬封号（LinkedIn/Boss直聘DOM动态混淆，自动化工具易封）",
      response: "不依赖爬虫，以用户主动输入/粘贴方式获取数据；与平台官方API谈合作",
    },
    {
      x: 3.4, barColor: C.GOLD, labelColor: C.GOLD,
      label: "合规风险  ·  高",
      risk: "PIPL数据合规（年龄/婚育/籍贯等敏感字段）",
      response: "Phase 1内置基础红线（敏感字段不采集、不存储原始简历）；Phase 2完整合规护盾",
    },
    {
      x: 6.5, barColor: C.MID_TEXT, labelColor: C.MID_TEXT,
      label: "市场风险  ·  中",
      risk: "头部平台封闭自研同类功能",
      response: "以私域数据（团队知识库）建立迁移壁垒；以HM协作入口双差异化，对方难快速复制",
    },
  ];

  risks.forEach(r => {
    addCard(s, { x: r.x, y: 1.0, w: 2.9, h: 3.2 });
    s.addShape(pres.ShapeType.rect, { x: r.x, y: 1.0, w: 0.07, h: 3.2, fill: { color: r.barColor }, line: { width: 0 } });
    // Label
    s.addShape(pres.ShapeType.rect, { x: r.x + 0.15, y: 1.1, w: 2.6, h: 0.3, fill: { color: r.barColor }, line: { width: 0 } });
    s.addText(r.label, { x: r.x + 0.15, y: 1.1, w: 2.6, h: 0.3, fontSize: 10, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    // Risk
    s.addText("风险：", { x: r.x + 0.18, y: 1.5, w: 2.55, h: 0.28, fontSize: 10, bold: true, color: C.DARK_TEXT, fontFace: "Calibri" });
    s.addText(r.risk, { x: r.x + 0.18, y: 1.78, w: 2.55, h: 0.75, fontSize: 10, color: C.MID_TEXT, fontFace: "Calibri Light" });
    // Response
    s.addText("应对措施", { x: r.x + 0.18, y: 2.6, w: 2.55, h: 0.28, fontSize: 10, bold: true, color: C.GREEN, fontFace: "Calibri" });
    s.addText(r.response, { x: r.x + 0.18, y: 2.9, w: 2.55, h: 1.0, fontSize: 9.5, color: C.MID_TEXT, fontFace: "Calibri Light" });
  });
}

// ─── SLIDE 19: 待CEO决策 ──────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkPage(s);

  s.addText("请 CEO 确认的三项决策", { x: 0.5, y: 0.22, w: 9, h: 0.55, fontSize: 24, bold: true, color: C.WHITE, fontFace: "Calibri" });
  s.addText("每项均附产品团队建议", { x: 0.5, y: 0.78, w: 9, h: 0.3, fontSize: 13, color: C.ICE, fontFace: "Calibri Light" });

  const decisions = [
    {
      y: 1.3, num: "①", title: "切入端",
      recommend: "猎头个人端优先。付费意愿强、决策链短、插件绕过企业采购，PMF验证最快",
      confirm: "是否锁定猎头个人端为Phase 1唯一目标客户？",
    },
    {
      y: 2.55, num: "②", title: "资源配置",
      recommend: "最小启动（2前端+1后端+1产品），重度依赖外部LLM API；6个月MVP，100个种子用户",
      confirm: "是否批准该团队配置与时间线？",
    },
    {
      y: 3.8, num: "③", title: "合规节奏",
      recommend: "Phase 1基础红线（不采集敏感字段）；Phase 2引入企业端时再做完整合规护盾",
      confirm: "是否同意分阶段合规策略？",
    },
  ];

  decisions.forEach(d => {
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: d.y, w: 8.8, h: 1.1, fill: { color: C.NAVY_LIGHT }, line: { width: 0 } });
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: d.y, w: 0.06, h: 1.1, fill: { color: C.GOLD }, line: { width: 0 } });

    // Number circle
    s.addShape(pres.ShapeType.ellipse, { x: 0.78, y: d.y + 0.3, w: 0.45, h: 0.45, fill: { color: C.GOLD }, line: { width: 0 } });
    s.addText(d.num, { x: 0.78, y: d.y + 0.3, w: 0.45, h: 0.45, fontSize: 12, bold: true, color: C.WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
    // Title
    s.addText(d.title, { x: 1.32, y: d.y + 0.1, w: 1.6, h: 0.88, fontSize: 14, bold: true, color: C.WHITE, fontFace: "Calibri", valign: "middle" });

    // Recommend
    s.addText("我们的建议", { x: 3.1, y: d.y + 0.08, w: 4.1, h: 0.28, fontSize: 9, color: C.ICE, fontFace: "Calibri Light" });
    s.addText(d.recommend, { x: 3.1, y: d.y + 0.36, w: 4.1, h: 0.65, fontSize: 9.5, color: C.WHITE, fontFace: "Calibri Light" });

    // Confirm
    s.addText("请确认", { x: 7.3, y: d.y + 0.08, w: 2.0, h: 0.28, fontSize: 9, color: C.GOLD, fontFace: "Calibri Light", bold: true });
    s.addText(d.confirm, { x: 7.3, y: d.y + 0.36, w: 2.0, h: 0.65, fontSize: 9, color: C.ICE, fontFace: "Calibri Light" });
  });
}

// ─── SLIDE 20: 下一步行动 ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkPage(s);

  s.addText("下一步行动", { x: 0.5, y: 0.22, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.WHITE, fontFace: "Calibri" });
  s.addText("CEO决策通过后，即刻启动", { x: 0.5, y: 0.78, w: 9, h: 0.3, fontSize: 13, color: C.ICE, fontFace: "Calibri Light" });

  const cols = [
    {
      x: 0.5, topColor: C.GOLD, title: "第1个月",
      items: [
        "完成核心团队组建（2+1+1）",
        "确认外部LLM API供应商选型",
        "完成划词解析工具原型（HTML版）",
        "启动种子猎头用户招募（目标20人）",
      ]
    },
    {
      x: 3.5, topColor: C.MID_BLUE, title: "第2-3个月",
      items: [
        "完成Phase 1全部6个功能开发",
        "灰度测试（50位种子猎头）",
        "收集NPS与核心使用数据",
        "完成推荐报告引擎与模板体系",
      ]
    },
    {
      x: 6.5, topColor: C.GREEN, title: "第4-6个月",
      items: [
        "正式发布Phase 1产品",
        "达成100个周活跃用户",
        "启动Phase 2需求规划",
        "启动企业HR侧用户访谈",
      ]
    },
  ];

  cols.forEach(col => {
    s.addShape(pres.ShapeType.rect, {
      x: col.x, y: 1.2, w: 2.7, h: 3.2,
      fill: { color: C.WHITE }, line: { color: C.CARD_BORDER, width: 0.75 }, shadow: makeShadow()
    });
    s.addShape(pres.ShapeType.rect, { x: col.x, y: 1.2, w: 2.7, h: 0.07, fill: { color: col.topColor }, line: { width: 0 } });
    s.addText(col.title, { x: col.x + 0.1, y: 1.32, w: 2.5, h: 0.38, fontSize: 14, bold: true, color: C.NAVY, fontFace: "Calibri" });
    col.items.forEach((item, idx) => {
      s.addText(item, { x: col.x + 0.1, y: 1.78 + idx * 0.58, w: 2.5, h: 0.52, fontSize: 10, color: C.MID_TEXT, fontFace: "Calibri Light", bullet: true });
    });
  });

  // Gold CTA banner
  s.addShape(pres.ShapeType.rect, { x: 0, y: 4.85, w: 10, h: 0.55, fill: { color: C.GOLD }, line: { width: 0 } });
  s.addText("今天需要的决策：锁定团队配置  ·  确认切入策略  ·  批准路线图", {
    x: 0.3, y: 4.85, w: 9.4, h: 0.55, fontSize: 13, bold: true, color: C.DARK_TEXT, fontFace: "Calibri", align: "center", valign: "middle"
  });
}

// ─── Save ─────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/crisson/Desktop/my_wiki/outputs/slides/猎头AI产品需求报告-CEO汇报版.pptx" })
  .then(() => { console.log("DONE"); })
  .catch(e => { console.error("ERROR", e); process.exit(1); });
