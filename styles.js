export const STYLE_PRESETS = {
  business: {
    name: "商业风格",
    keywords: ["商业", "企业", "公司", "市场", "营销", "销售", "投资", "金融", "经济", "管理", "战略", "商务"],
    colors: {
      primary: "1E3A8A",
      secondary: "3B82F6",
      accent: "00BFFF",
      background: "FFFFFF",
      text: "1F2937",
      title: "1E3A8A",
      content: "4B5563"
    },
    fonts: {
      title: "Microsoft YaHei",
      content: "Microsoft YaHei",
      numbers: "Arial"
    },
    layout: "professional",
    spacing: "compact"
  },
  academic: {
    name: "学术风格",
    keywords: ["学术", "研究", "论文", "科学", "技术", "数据", "分析", "实验", "理论", "方法", "结论"],
    colors: {
      primary: "1F2937",
      secondary: "4B5563",
      accent: "059669",
      background: "F9FAFB",
      text: "1F2937",
      title: "1F2937",
      content: "374151"
    },
    fonts: {
      title: "SimSun",
      content: "SimSun",
      numbers: "Times New Roman"
    },
    layout: "structured",
    spacing: "balanced"
  },
  creative: {
    name: "创意风格",
    keywords: ["创意", "设计", "艺术", "创新", "灵感", "想象", "视觉", "美学", "风格", "时尚", "潮流"],
    colors: {
      primary: "7C3AED",
      secondary: "A78BFA",
      accent: "F472B6",
      background: "FAF5FF",
      text: "1F2937",
      title: "7C3AED",
      content: "4B5563"
    },
    fonts: {
      title: "Microsoft YaHei",
      content: "Microsoft YaHei",
      numbers: "Arial"
    },
    layout: "dynamic",
    spacing: "generous"
  },
  government: {
    name: "党政风格",
    keywords: ["党政", "政府", "政策", "党建", "国家", "社会", "民生", "发展", "建设", "改革", "服务"],
    colors: {
      primary: "DC2626",
      secondary: "EF4444",
      accent: "F59E0B",
      background: "FEF2F2",
      text: "1F2937",
      title: "DC2626",
      content: "374151"
    },
    fonts: {
      title: "SimHei",
      content: "SimSun",
      numbers: "Arial"
    },
    layout: "formal",
    spacing: "standard"
  },
  technology: {
    name: "科技风格",
    keywords: ["科技", "技术", "AI", "人工智能", "数字化", "智能", "创新", "未来", "数据", "算法"],
    colors: {
      primary: "0F172A",
      secondary: "334155",
      accent: "06B6D4",
      background: "0F172A",
      text: "F1F5F9",
      title: "06B6D4",
      content: "CBD5E1"
    },
    fonts: {
      title: "Microsoft YaHei",
      content: "Microsoft YaHei",
      numbers: "Arial"
    },
    layout: "modern",
    spacing: "compact"
  },
  education: {
    name: "教育风格",
    keywords: ["教育", "教学", "学习", "培训", "课程", "知识", "学生", "教师", "学校", "成长"],
    colors: {
      primary: "059669",
      secondary: "10B981",
      accent: "F59E0B",
      background: "ECFDF5",
      text: "1F2937",
      title: "059669",
      content: "374151"
    },
    fonts: {
      title: "KaiTi",
      content: "KaiTi",
      numbers: "Arial"
    },
    layout: "friendly",
    spacing: "generous"
  }
};

export const LAYOUT_KEYWORDS = {
  comparison: {
    keywords: ["对比", "比较", "差异", "区别", "优劣势", "vs", "versus", "vs.", "优劣", "异同"],
    layout: "split",
    description: "左右分栏布局"
  },
  process: {
    keywords: ["流程", "步骤", "过程", "程序", "阶段", "环节", "顺序", "流程图", "工作流"],
    layout: "timeline",
    description: "时间轴布局"
  },
  list: {
    keywords: ["列表", "清单", "要点", "项目", "事项", "条目", "内容", "要素"],
    layout: "list",
    description: "列表布局"
  },
  data: {
    keywords: ["数据", "统计", "图表", "分析", "趋势", "增长", "下降", "比例", "占比", "分布"],
    layout: "chart",
    description: "图表布局"
  },
  swot: {
    keywords: ["SWOT", "优势", "劣势", "机会", "威胁", "分析", "评估", "诊断"],
    layout: "swot",
    description: "SWOT分析布局"
  },
  table: {
    keywords: ["表格", "对比表", "数据表", "统计表", "明细", "详情", "参数", "指标"],
    layout: "table",
    description: "表格布局"
  }
};

export const GOLDEN_SENTENCE_PATTERNS = [
  {
    pattern: /核心|关键|重要|根本|本质|精髓/g,
    weight: 0.8,
    style: "highlight"
  },
  {
    pattern: /必须|一定|务必|始终|永远|绝对/g,
    weight: 0.7,
    style: "bold"
  },
  {
    pattern: /创新|突破|革命|颠覆|变革|转型/g,
    weight: 0.9,
    style: "highlight"
  },
  {
    pattern: /成功|失败|经验|教训|启示|感悟/g,
    weight: 0.85,
    style: "highlight"
  },
  {
    pattern: /第一|首先|首要|根本|核心/g,
    weight: 0.75,
    style: "bold"
  },
  {
    pattern: /结论|总结|总之|因此|所以|由此/g,
    weight: 0.9,
    style: "highlight"
  },
  {
    pattern: /目标|愿景|使命|价值|意义/g,
    weight: 0.85,
    style: "highlight"
  },
  {
    pattern: /原则|理念|信念|宗旨/g,
    weight: 0.8,
    style: "highlight"
  }
];

export function detectStylePreset(theme) {
  const themeLower = theme.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  for (const [key, preset] of Object.entries(STYLE_PRESETS)) {
    let score = 0;
    preset.keywords.forEach(keyword => {
      if (themeLower.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = preset;
    }
  }

  return bestMatch || STYLE_PRESETS.business;
}

export function detectLayoutType(content) {
  const contentLower = content.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  for (const [key, layout] of Object.entries(LAYOUT_KEYWORDS)) {
    let score = 0;
    layout.keywords.forEach(keyword => {
      if (contentLower.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = layout;
    }
  }

  return bestMatch || { layout: "content", description: "标准内容布局" };
}

export function identifyGoldenSentences(content) {
  if (!content || typeof content !== 'string') {
    return [];
  }
  
  const sentences = content.split(/[。！？\n]/).filter(s => s.trim().length > 0);
  const goldenSentences = [];

  sentences.forEach(sentence => {
    let totalWeight = 0;
    let matchedPatterns = [];

    GOLDEN_SENTENCE_PATTERNS.forEach(pattern => {
      const matches = sentence.match(pattern.pattern);
      if (matches && matches.length > 0) {
        totalWeight += pattern.weight * matches.length;
        matchedPatterns.push(pattern.style);
      }
    });

    if (totalWeight > 0.6) {
      goldenSentences.push({
        text: sentence.trim(),
        weight: totalWeight,
        styles: [...new Set(matchedPatterns)]
      });
    }
  });

  return goldenSentences.sort((a, b) => b.weight - a.weight);
}

export function getTemplateFromStylePreset(preset) {
  return {
    id: preset.name,
    name: preset.name,
    coverBg: preset.colors.primary,
    coverText: preset.colors.text,
    accentColor: preset.colors.accent,
    titleColor: preset.colors.title,
    contentColor: preset.colors.content,
    previewBg: `linear-gradient(135deg, ${preset.colors.primary} 0%, ${preset.colors.secondary} 100%)`,
    font: preset.fonts
  };
}