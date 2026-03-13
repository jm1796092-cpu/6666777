export interface SemanticAnalysis {
  mainTopic: string;
  subTopic: string;
  keywords: string[];
  intent: IntentType;
  emotionalTone: EmotionalTone;
  visualFocus: string;
  logicalStructure: LogicalStructure;
  confidence: number;
}

export type IntentType = 
  | "business_report"
  | "academic_presentation"
  | "creative_pitch"
  | "government_speech"
  | "technology_demo"
  | "education_training"
  | "personal_story"
  | "product_launch"
  | "team_building"
  | "unknown";

export type EmotionalTone = 
  | "professional"
  | "formal"
  | "enthusiastic"
  | "serious"
  | "friendly"
  | "innovative"
  | "traditional"
  | "modern"
  | "mixed";

export type LogicalStructure = 
  | "sequential"
  | "comparative"
  | "hierarchical"
  | "chronological"
  | "problem_solution"
  | "mixed";

export interface IntentPattern {
  intent: IntentType;
  keywords: string[];
  patterns: RegExp[];
  weight: number;
}

export interface EmotionalPattern {
  tone: EmotionalTone;
  keywords: string[];
  patterns: RegExp[];
  weight: number;
}

export const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: "business_report",
    keywords: ["报告", "汇报", "总结", "业绩", "销售", "市场", "数据", "分析", "季度", "年度", "预算", "投资", "收益", "成本"],
    patterns: [/汇报|报告|总结|业绩|销售|市场|数据|分析/gi],
    weight: 1.0
  },
  {
    intent: "academic_presentation",
    keywords: ["研究", "论文", "学术", "实验", "理论", "方法", "结论", "数据", "分析", "科学", "技术", "创新"],
    patterns: [/研究|论文|学术|实验|理论|方法|结论/gi],
    weight: 1.0
  },
  {
    intent: "creative_pitch",
    keywords: ["创意", "设计", "灵感", "想象", "创新", "艺术", "美学", "风格", "潮流", "时尚", "品牌", "营销"],
    patterns: [/创意|设计|灵感|想象|创新|艺术|美学/gi],
    weight: 1.0
  },
  {
    intent: "government_speech",
    keywords: ["党政", "政府", "政策", "党建", "国家", "社会", "民生", "发展", "建设", "改革", "服务", "人民"],
    patterns: [/党政|政府|政策|党建|国家|社会|民生/gi],
    weight: 1.0
  },
  {
    intent: "technology_demo",
    keywords: ["科技", "技术", "AI", "人工智能", "数字化", "智能", "创新", "未来", "算法", "数据", "云计算", "区块链"],
    patterns: [/科技|技术|AI|人工智能|数字化|智能|创新|未来/gi],
    weight: 1.0
  },
  {
    intent: "education_training",
    keywords: ["教育", "教学", "学习", "培训", "课程", "知识", "学生", "教师", "学校", "成长", "技能", "能力"],
    patterns: [/教育|教学|学习|培训|课程|知识|学生|教师/gi],
    weight: 1.0
  },
  {
    intent: "personal_story",
    keywords: ["经历", "故事", "成长", "感悟", "人生", "梦想", "挑战", "成功", "失败", "经验", "教训"],
    patterns: [/经历|故事|成长|感悟|人生|梦想|挑战/gi],
    weight: 1.0
  },
  {
    intent: "product_launch",
    keywords: ["产品", "发布", "新品", "上市", "推广", "营销", "品牌", "市场", "用户", "功能", "特性", "优势"],
    patterns: [/产品|发布|新品|上市|推广|营销|品牌/gi],
    weight: 1.0
  },
  {
    intent: "team_building",
    keywords: ["团队", "协作", "合作", "沟通", "管理", "领导", "组织", "文化", "价值观", "使命", "愿景"],
    patterns: [/团队|协作|合作|沟通|管理|领导|组织/gi],
    weight: 1.0
  }
];

export const EMOTIONAL_PATTERNS: EmotionalPattern[] = [
  {
    tone: "professional",
    keywords: ["专业", "严谨", "准确", "规范", "标准", "质量", "效率", "优化"],
    patterns: [/专业|严谨|准确|规范|标准|质量|效率/gi],
    weight: 1.0
  },
  {
    tone: "formal",
    keywords: ["正式", "庄重", "严肃", "权威", "官方", "标准", "规范"],
    patterns: [/正式|庄重|严肃|权威|官方|标准/gi],
    weight: 1.0
  },
  {
    tone: "enthusiastic",
    keywords: ["热情", "激动", "兴奋", "充满", "活力", "激情", "热烈", "积极"],
    patterns: [/热情|激动|兴奋|充满|活力|激情|热烈/gi],
    weight: 1.0
  },
  {
    tone: "serious",
    keywords: ["严肃", "认真", "重要", "关键", "核心", "根本", "必须", "务必"],
    patterns: [/严肃|认真|重要|关键|核心|根本|必须|务必/gi],
    weight: 1.0
  },
  {
    tone: "friendly",
    keywords: ["友好", "亲切", "温暖", "关怀", "帮助", "支持", "合作", "共赢"],
    patterns: [/友好|亲切|温暖|关怀|帮助|支持|合作|共赢/gi],
    weight: 1.0
  },
  {
    tone: "innovative",
    keywords: ["创新", "突破", "革命", "颠覆", "变革", "转型", "前沿", "领先"],
    patterns: [/创新|突破|革命|颠覆|变革|转型|前沿|领先/gi],
    weight: 1.0
  },
  {
    tone: "traditional",
    keywords: ["传统", "经典", "历史", "文化", "传承", "延续", "稳定", "保守"],
    patterns: [/传统|经典|历史|文化|传承|延续|稳定|保守/gi],
    weight: 1.0
  },
  {
    tone: "modern",
    keywords: ["现代", "时尚", "潮流", "前沿", "领先", "先进", "未来", "数字化"],
    patterns: [/现代|时尚|潮流|前沿|领先|先进|未来|数字化/gi],
    weight: 1.0
  }
];

export const LOGICAL_STRUCTURE_PATTERNS = {
  sequential: [/首先|其次|最后|第一步|第二步|第三步|步骤|流程|顺序/gi],
  comparative: [/对比|比较|差异|区别|优劣势|vs|versus|异同|优劣/gi],
  hierarchical: [/核心|主要|次要|关键|重要|基础|根本|本质|层次|级别/gi],
  chronological: [/时间|年代|时期|阶段|历史|发展|演进|过程|经历/gi],
  problem_solution: [/问题|挑战|困难|解决|方案|对策|措施|建议|改进/gi]
};

export function extractMainTopic(text: string): string {
  const sentences = text.split(/[。！？\n]/).filter(s => s.trim().length > 0);
  
  const shortSentences = sentences.filter(s => s.trim().length <= 20);
  
  if (shortSentences.length > 0) {
    return shortSentences[0].trim();
  }
  
  const words = text.split(/[\s，、；：,;:]+/).filter(w => w.trim().length > 0);
  return words[0] || "未命名主题";
}

export function extractSubTopic(text: string, mainTopic: string): string {
  const sentences = text.split(/[。！？\n]/).filter(s => s.trim().length > 0);
  
  const otherSentences = sentences.filter(s => !s.includes(mainTopic) && s.trim().length > 0);
  
  if (otherSentences.length > 0) {
    return otherSentences[0].trim().substring(0, 30);
  }
  
  return "";
}

export function extractKeywords(text: string): string[] {
  const stopWords = ["的", "了", "在", "是", "我", "有", "和", "就", "不", "人", "都", "一", "一个", "上", "也", "很", "到", "说", "要", "去", "你", "会", "着", "没有", "看", "好", "自己", "这"];
  
  const words = text.split(/[\s，。！？；：、,;:?!]+/);
  const wordFreq: { [key: string]: number } = {};
  
  words.forEach(word => {
    const trimmed = word.trim();
    if (trimmed.length >= 2 && !stopWords.includes(trimmed)) {
      wordFreq[trimmed] = (wordFreq[trimmed] || 0) + 1;
    }
  });
  
  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
  
  return sortedWords;
}

export function detectIntent(text: string): { intent: IntentType; confidence: number } {
  const textLower = text.toLowerCase();
  let bestMatch: IntentType = "unknown";
  let highestScore = 0;
  
  INTENT_PATTERNS.forEach(pattern => {
    let score = 0;
    
    pattern.keywords.forEach(keyword => {
      if (textLower.includes(keyword.toLowerCase())) {
        score += pattern.weight;
      }
    });
    
    pattern.patterns.forEach(regex => {
      const matches = text.match(regex);
      if (matches) {
        score += matches.length * pattern.weight * 0.5;
      }
    });
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = pattern.intent;
    }
  });
  
  const confidence = Math.min(highestScore / 3, 1);
  return { intent: bestMatch, confidence };
}

export function detectEmotionalTone(text: string): { tone: EmotionalTone; confidence: number } {
  const textLower = text.toLowerCase();
  let bestMatch: EmotionalTone = "mixed";
  let highestScore = 0;
  
  EMOTIONAL_PATTERNS.forEach(pattern => {
    let score = 0;
    
    pattern.keywords.forEach(keyword => {
      if (textLower.includes(keyword.toLowerCase())) {
        score += pattern.weight;
      }
    });
    
    pattern.patterns.forEach(regex => {
      const matches = text.match(regex);
      if (matches) {
        score += matches.length * pattern.weight * 0.5;
      }
    });
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = pattern.tone;
    }
  });
  
  const confidence = Math.min(highestScore / 2, 1);
  return { tone: bestMatch, confidence };
}

export function detectLogicalStructure(text: string): LogicalStructure {
  const textLower = text.toLowerCase();
  let bestMatch: LogicalStructure = "mixed";
  let highestScore = 0;
  
  Object.entries(LOGICAL_STRUCTURE_PATTERNS).forEach(([structure, patterns]) => {
    let score = 0;
    
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        score += matches.length;
      }
    });
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = structure as LogicalStructure;
    }
  });
  
  return bestMatch;
}

export function detectVisualFocus(text: string): string {
  const sentences = text.split(/[。！？\n]/).filter(s => s.trim().length > 0);
  
  const shortAndImportant = sentences.filter(s => {
    const trimmed = s.trim();
    return trimmed.length >= 4 && trimmed.length <= 15 && 
           (trimmed.includes("核心") || trimmed.includes("关键") || trimmed.includes("主要") || 
            trimmed.includes("重点") || trimmed.includes("主题") || trimmed.includes("目标"));
  });
  
  if (shortAndImportant.length > 0) {
    return shortAndImportant[0].trim();
  }
  
  const sentencesWithNumbers = sentences.filter(s => /^\d+[\.\、]/.test(s.trim()));
  if (sentencesWithNumbers.length > 0) {
    return sentencesWithNumbers[0].trim().replace(/^\d+[\.\、]\s*/, "");
  }
  
  return extractMainTopic(text);
}

export function performSemanticAnalysis(input: string): SemanticAnalysis {
  const mainTopic = extractMainTopic(input);
  const subTopic = extractSubTopic(input, mainTopic);
  const keywords = extractKeywords(input);
  const { intent, confidence: intentConfidence } = detectIntent(input);
  const { tone, confidence: toneConfidence } = detectEmotionalTone(input);
  const logicalStructure = detectLogicalStructure(input);
  const visualFocus = detectVisualFocus(input);
  
  const overallConfidence = (intentConfidence + toneConfidence) / 2;
  
  return {
    mainTopic,
    subTopic,
    keywords,
    intent,
    emotionalTone: tone,
    visualFocus,
    logicalStructure,
    confidence: overallConfidence
  };
}

export function generateSystemPrompt(analysis: SemanticAnalysis): string {
  const intentDescriptions: { [key in IntentType]: string } = {
    business_report: "这是一份商业报告，需要专业、严谨的语气，重点突出数据和业绩",
    academic_presentation: "这是一份学术演讲，需要科学、客观的语气，重点突出研究方法和结论",
    creative_pitch: "这是一个创意提案，需要活泼、创新的语气，重点突出灵感和想象力",
    government_speech: "这是一份党政演讲，需要庄重、正式的语气，重点突出政策和民生",
    technology_demo: "这是一个技术演示，需要专业、前沿的语气，重点突出创新和未来",
    education_training: "这是一份教育培训，需要亲切、耐心的语气，重点突出知识和技能",
    personal_story: "这是一个个人故事，需要真诚、感人的语气，重点突出经历和感悟",
    product_launch: "这是一个产品发布，需要热情、激动的语气，重点突出功能和优势",
    team_building: "这是一个团队建设，需要合作、共赢的语气，重点突出文化和价值观",
    unknown: "这是一个通用演示，需要根据内容自动调整语气和重点"
  };
  
  const toneDescriptions: { [key in EmotionalTone]: string } = {
    professional: "使用专业、严谨的语言风格",
    formal: "使用正式、庄重的语言风格",
    enthusiastic: "使用热情、激动的语言风格",
    serious: "使用严肃、认真的语言风格",
    friendly: "使用友好、亲切的语言风格",
    innovative: "使用创新、前沿的语言风格",
    traditional: "使用传统、经典的语言风格",
    modern: "使用现代、时尚的语言风格",
    mixed: "根据内容灵活调整语言风格"
  };
  
  const structureDescriptions: { [key in LogicalStructure]: string } = {
    sequential: "按照时间顺序或步骤流程组织内容",
    comparative: "采用对比分析的方式组织内容",
    hierarchical: "按照重要性层级组织内容",
    chronological: "按照时间发展脉络组织内容",
    problem_solution: "按照问题-解决方案的结构组织内容",
    mixed: "根据内容特点灵活组织结构"
  };
  
  return `你是一个专业的PPT内容生成专家。请根据以下语义分析结果生成高质量的PPT内容：

【主题信息】
- 主标题：${analysis.mainTopic}
- 副标题：${analysis.subTopic}
- 关键词：${analysis.keywords.join('、')}

【场景识别】
- 意图类型：${analysis.intent}
- ${intentDescriptions[analysis.intent]}

【情感基调】
- 情感倾向：${analysis.emotionalTone}
- ${toneDescriptions[analysis.emotionalTone]}

【逻辑结构】
- 结构类型：${analysis.logicalStructure}
- ${structureDescriptions[analysis.logicalStructure]}

【视觉重心】
- 视觉焦点：${analysis.visualFocus}

【生成要求】
1. 根据主标题生成封面页，突出视觉焦点
2. 根据逻辑结构组织内容页
3. 每页内容要围绕关键词展开
4. 使用符合情感基调的语言风格
5. 确保内容的专业性和可读性
6. 每页包含清晰的标题和支撑要点
7. 适当使用数据、案例和引用增强说服力

请生成JSON格式的PPT内容，包含每页的标题、类型和详细内容。`;
}