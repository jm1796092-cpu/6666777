export interface BrainstormResult {
  primary_topic: string;
  visual_tone: string;
  logical_structure: string;
  key_assets: string[];
  confidence: number;
  reasoning: string;
}

export interface DesignTrend {
  name: string;
  description: string;
  color_schemes: {
    hex: string[];
    source_url: string;
  }[];
  layout_style: string;
  year: string;
}

export interface ReviewResult {
  score: number;
  issues: string[];
  suggestions: string[];
  passed: boolean;
  details: {
    layout_score: number;
    contrast_score: number;
    whitespace_score: number;
    typography_score: number;
    color_harmony_score: number;
  };
}

export interface DynamicLayoutConfig {
  mode: "golden_sentence" | "split_column" | "standard" | "minimal" | "data_visual";
  character_count: number;
  has_numbering: boolean;
  has_comparison: boolean;
  has_data: boolean;
  decorative_elements: number;
}

const BRAINSTORM_PROMPT = `你是一个专业的PPT设计顾问。在生成任何PPT内容之前，你必须先进行"脑暴"分析。

请分析用户输入，返回以下JSON结构（不要包含任何其他文字）：

{
  "primary_topic": "核心主题（最简短、最具概括性的短语）",
  "visual_tone": "视觉基调（professional/formal/enthusiastic/serious/friendly/innovative/traditional/modern）",
  "logical_structure": "页面逻辑（sequential/comparative/hierarchical/chronological/problem_solution）",
  "key_assets": ["需要搜索的关键词1", "关键词2", "关键词3"],
  "confidence": 0.95,
  "reasoning": "你的分析推理过程"
}

重要规则：
1. 如果识别到"爱国"、"党政"、"国家"等词汇，visual_tone必须为"formal"
2. 如果识别到"科技"、"AI"、"创新"等词汇，visual_tone必须为"modern"
3. 如果识别到"商业"、"企业"、"市场"等词汇，visual_tone必须为"professional"
4. primary_topic必须是输入中最短且最具概括性的短语
5. key_assets必须包含与主题相关的专业术语`;

const DESIGN_TREND_SEARCH_PROMPT = `请搜索2026年最新的商务设计趋势，重点关注以下风格：
- Bento Grid（便当盒布局）
- Glassmorphism（玻璃拟态）
- Neo-Brutalism（新粗野主义）
- Micro-interactions（微交互）

请返回3组真实的Hex配色方案，并标注来源URL。格式：

{
  "trends": [
    {
      "name": "趋势名称",
      "description": "趋势描述",
      "color_schemes": [
        {
          "hex": ["#FF0000", "#00FF00", "#0000FF"],
          "source_url": "https://example.com"
        }
      ],
      "layout_style": "布局风格描述",
      "year": "2026"
    }
  ]
}`;

const REVIEWER_PROMPT = `你是一位刻薄的资深PPT设计师。请对以下PPT布局进行严格评审。

评分标准（0-100分）：
1. 布局合理性（30分）：文字是否太挤？是否有足够的留白？
2. 对比度（25分）：文字与背景的对比度是否足够？
3. 排版质量（20分）：字体大小、行间距是否合理？
4. 色彩和谐度（15分）：配色是否协调？
5. 视觉层次（10分）：是否有清晰的视觉引导？

请返回JSON格式：

{
  "score": 85,
  "issues": ["问题1", "问题2"],
  "suggestions": ["建议1", "建议2"],
  "passed": true,
  "details": {
    "layout_score": 25,
    "contrast_score": 22,
    "whitespace_score": 18,
    "typography_score": 16,
    "color_harmony_score": 12
  }
}

如果总分低于80分，passed必须为false，必须列出具体问题。`;

export async function performBrainstorm(input: string, apiKey: string, baseUrl: string, model: string): Promise<BrainstormResult> {
  if (!apiKey) {
    return performLocalBrainstorm(input);
  }
  
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: BRAINSTORM_PROMPT
          },
          {
            role: 'user',
            content: `请分析以下输入：\n${input}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error('Brainstorm API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Brainstorm returned empty content');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Brainstorm returned invalid JSON');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    console.log('🧠 脑暴分析结果：');
    console.log(`  核心主题: ${result.primary_topic}`);
    console.log(`  视觉基调: ${result.visual_tone}`);
    console.log(`  逻辑结构: ${result.logical_structure}`);
    console.log(`  关键词: ${result.key_assets.join(', ')}`);
    console.log(`  置信度: ${(result.confidence * 100).toFixed(1)}%`);
    console.log(`  推理过程: ${result.reasoning}`);

    return result;
  } catch (error) {
    console.error('Brainstorm API failed, using local implementation:', error);
    return performLocalBrainstorm(input);
  }
}

function performLocalBrainstorm(input: string): BrainstormResult {
  const lowerInput = input.toLowerCase();
  
  let visualTone = 'professional';
  let logicalStructure = 'sequential';
  const keyAssets: string[] = [];
  
  if (lowerInput.includes('爱国') || lowerInput.includes('党政') || lowerInput.includes('国家')) {
    visualTone = 'formal';
    keyAssets.push('爱国主义', '国家发展', '民族精神');
  } else if (lowerInput.includes('科技') || lowerInput.includes('ai') || lowerInput.includes('创新') || lowerInput.includes('人工智能')) {
    visualTone = 'modern';
    keyAssets.push('科技创新', '人工智能', '数字化转型');
  } else if (lowerInput.includes('商业') || lowerInput.includes('企业') || lowerInput.includes('市场') || lowerInput.includes('经济')) {
    visualTone = 'professional';
    keyAssets.push('商业模式', '市场分析', '企业战略');
  } else if (lowerInput.includes('教育') || lowerInput.includes('学习') || lowerInput.includes('培训')) {
    visualTone = 'friendly';
    keyAssets.push('教育理念', '学习方法', '培训体系');
  } else if (lowerInput.includes('环保') || lowerInput.includes('绿色') || lowerInput.includes('可持续')) {
    visualTone = 'modern';
    keyAssets.push('环境保护', '可持续发展', '绿色生活');
  }
  
  if (lowerInput.includes('对比') || lowerInput.includes('差异') || lowerInput.includes('优缺点')) {
    logicalStructure = 'comparative';
  } else if (lowerInput.includes('步骤') || lowerInput.includes('流程') || lowerInput.includes('阶段')) {
    logicalStructure = 'chronological';
  } else if (lowerInput.includes('问题') && lowerInput.includes('解决')) {
    logicalStructure = 'problem_solution';
  } else if (lowerInput.includes('分析') || lowerInput.includes('评估') || lowerInput.includes('研究')) {
    logicalStructure = 'hierarchical';
  }
  
  const primaryTopic = input.split(/[，。、,.;;！!？?]/)[0].trim() || input.substring(0, 20);
  
  if (keyAssets.length === 0) {
    keyAssets.push('核心概念', '关键要点', '重要内容');
  }
  
  const result: BrainstormResult = {
    primary_topic: primaryTopic,
    visual_tone: visualTone,
    logical_structure: logicalStructure,
    key_assets: keyAssets,
    confidence: 0.85,
    reasoning: `基于关键词分析，识别到"${primaryTopic}"为核心主题，视觉基调为"${visualTone}"，逻辑结构为"${logicalStructure}"。`
  };
  
  console.log('🧠 本地脑暴分析结果：');
  console.log(`  核心主题: ${result.primary_topic}`);
  console.log(`  视觉基调: ${result.visual_tone}`);
  console.log(`  逻辑结构: ${result.logical_structure}`);
  console.log(`  关键词: ${result.key_assets.join(', ')}`);
  console.log(`  置信度: ${(result.confidence * 100).toFixed(1)}%`);
  console.log(`  推理过程: ${result.reasoning}`);
  
  return result;
}

export async function searchDesignTrends(apiKey: string, baseUrl: string, model: string): Promise<DesignTrend[]> {
  if (!apiKey) {
    return searchLocalDesignTrends();
  }
  
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: DESIGN_TREND_SEARCH_PROMPT
          },
          {
            role: 'user',
            content: '请搜索2026年最新的商务设计趋势'
          }
        ],
        temperature: 0.8,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('Design trend search failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Design trend search returned empty content');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Design trend search returned invalid JSON');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    console.log('🎨 已学习最新设计趋势：');
    result.trends.forEach((trend: DesignTrend) => {
      console.log(`  趋势名称: ${trend.name}`);
      console.log(`  描述: ${trend.description}`);
      console.log(`  布局风格: ${trend.layout_style}`);
      console.log(`  年份: ${trend.year}`);
      trend.color_schemes.forEach(scheme => {
        console.log(`    配色方案: ${scheme.hex.join(', ')}`);
        console.log(`    来源: ${scheme.source_url}`);
      });
    });

    return result.trends;
  } catch (error) {
    console.error('Design trend search API failed, using local implementation:', error);
    return searchLocalDesignTrends();
  }
}

function searchLocalDesignTrends(): DesignTrend[] {
  const trends: DesignTrend[] = [
    {
      name: "Bento Grid（便当盒布局）",
      description: "模块化的网格布局，每个内容块都有明确的边界，类似便当盒的分割方式",
      color_schemes: [
        {
          hex: ["#2C3E50", "#34495E", "#7F8C8D", "#ECF0F1", "#BDC3C7"],
          source_url: "https://dribbble.com/shots/20345678"
        },
        {
          hex: ["#E74C3C", "#C0392B", "#9B59B6", "#8E44AD", "#3498DB"],
          source_url: "https://behance.net/gallery/12345678"
        }
      ],
      layout_style: "模块化网格布局，强调内容分区和层次感",
      year: "2026"
    },
    {
      name: "Glassmorphism（玻璃拟态）",
      description: "半透明的毛玻璃效果，配合渐变背景和模糊效果，营造现代感",
      color_schemes: [
        {
          hex: ["#667EEA", "#764BA2", "#F093FB", "#F5576C", "#4FACFE"],
          source_url: "https://awwwards.com/sites/glass-effect"
        },
        {
          hex: ["#A8EDEA", "#FED6E3", "#D299C2", "#FEF9D7", "#89F7FE"],
          source_url: "https://ui.glass/glassmorphism-generator"
        }
      ],
      layout_style: "半透明卡片叠加，背景模糊，营造深度感",
      year: "2026"
    },
    {
      name: "Neo-Brutalism（新粗野主义）",
      description: "大胆的色彩对比，粗线条边框，强烈的阴影效果，复古与现代结合",
      color_schemes: [
        {
          hex: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"],
          source_url: "https://brutalistwebsites.com/"
        },
        {
          hex: ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9", "#FFEAA7"],
          source_url: "https://neobrutalism.design/"
        }
      ],
      layout_style: "粗边框，强阴影，大胆色彩，不对称布局",
      year: "2026"
    }
  ];
  
  console.log('🎨 本地设计趋势学习结果：');
  trends.forEach((trend) => {
    console.log(`  趋势名称: ${trend.name}`);
    console.log(`  描述: ${trend.description}`);
    console.log(`  布局风格: ${trend.layout_style}`);
    console.log(`  年份: ${trend.year}`);
    trend.color_schemes.forEach(scheme => {
      console.log(`    配色方案: ${scheme.hex.join(', ')}`);
      console.log(`    来源: ${scheme.source_url}`);
    });
  });
  
  return trends;
}

export async function performReview(slideData: any, apiKey: string, baseUrl: string, model: string): Promise<ReviewResult> {
  if (!apiKey) {
    return performLocalReview(slideData);
  }
  
  try {
    const slideDescription = JSON.stringify(slideData, null, 2);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: REVIEWER_PROMPT
          },
          {
            role: 'user',
            content: `请评审以下PPT页面：\n${slideDescription}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error('Review API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Review returned empty content');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Review returned invalid JSON');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    console.log('👨‍💼 资深设计师评审结果：');
    console.log(`  总分: ${result.score}/100`);
    console.log(`  是否通过: ${result.passed ? '✅' : '❌'}`);
    console.log(`  问题: ${result.issues.join(', ')}`);
    console.log(`  建议: ${result.suggestions.join(', ')}`);
    console.log('  详细评分:');
    console.log(`    布局: ${result.details.layout_score}/30`);
    console.log(`    对比度: ${result.details.contrast_score}/25`);
    console.log(`    留白: ${result.details.whitespace_score}/20`);
    console.log(`    排版: ${result.details.typography_score}/20`);
    console.log(`    色彩: ${result.details.color_harmony_score}/15`);

    return result;
  } catch (error) {
    console.error('Review API failed, using local implementation:', error);
    return performLocalReview(slideData);
  }
}

function performLocalReview(slideData: any): ReviewResult {
  const content = slideData.content || '';
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  const characterCount = contentStr.length;
  
  let layoutScore = 25;
  let contrastScore = 20;
  let whitespaceScore = 16;
  let typographyScore = 17;
  let colorHarmonyScore = 12;
  
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  if (characterCount > 300) {
    layoutScore -= 5;
    issues.push('文字内容过多，建议精简');
    suggestions.push('将长文字拆分为多页，每页控制在200字以内');
  }
  
  if (characterCount < 50 && slideData.type !== 'cover' && slideData.type !== 'end') {
    whitespaceScore -= 3;
    issues.push('内容过少，留白过多');
    suggestions.push('增加更多内容或使用更大的字体和图标');
  }
  
  if (slideData.type === 'chart' || slideData.type === 'data_visual') {
    contrastScore += 3;
    suggestions.push('图表配色对比度良好，保持当前风格');
  }
  
  if (slideData.type === 'cover') {
    layoutScore += 2;
    suggestions.push('封面布局简洁大气，符合专业标准');
  }
  
  if (contentStr.includes('对比') || contentStr.includes('差异')) {
    layoutScore += 2;
    suggestions.push('对比内容布局合理，建议使用分栏设计');
  }
  
  const totalScore = layoutScore + contrastScore + whitespaceScore + typographyScore + colorHarmonyScore;
  const passed = totalScore >= 80;
  
  if (issues.length === 0) {
    issues.push('无明显问题');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('整体设计良好，建议保持当前风格');
  }
  
  const result: ReviewResult = {
    score: totalScore,
    issues: issues,
    suggestions: suggestions,
    passed: passed,
    details: {
      layout_score: layoutScore,
      contrast_score: contrastScore,
      whitespace_score: whitespaceScore,
      typography_score: typographyScore,
      color_harmony_score: colorHarmonyScore
    }
  };
  
  console.log('👨‍💼 本地评审结果：');
  console.log(`  总分: ${result.score}/100`);
  console.log(`  是否通过: ${result.passed ? '✅' : '❌'}`);
  console.log(`  问题: ${result.issues.join(', ')}`);
  console.log(`  建议: ${result.suggestions.join(', ')}`);
  console.log('  详细评分:');
  console.log(`    布局: ${result.details.layout_score}/30`);
  console.log(`    对比度: ${result.details.contrast_score}/25`);
  console.log(`    留白: ${result.details.whitespace_score}/20`);
  console.log(`    排版: ${result.details.typography_score}/20`);
  console.log(`    色彩: ${result.details.color_harmony_score}/15`);
  
  return result;
}

export function calculateDynamicLayout(content: string, brainstorm: BrainstormResult): DynamicLayoutConfig {
  const characterCount = content.length;
  const hasNumbering = /^\d+[\.\、]/.test(content) || /第一|第二|第三/.test(content);
  const hasComparison = /对比|比较|差异|区别|vs|versus|优劣/i.test(content);
  const hasData = /\d+%|\d+万|\d+亿|图表|数据|统计/i.test(content);
  
  let mode: DynamicLayoutConfig['mode'] = "standard";
  
  if (characterCount < 30) {
    mode = "golden_sentence";
  } else if (hasComparison) {
    mode = "split_column";
  } else if (hasData) {
    mode = "data_visual";
  } else if (characterCount < 100) {
    mode = "minimal";
  }
  
  const decorativeElements = Math.min(Math.max(Math.floor(characterCount / 50), 2), 5);
  
  console.log('📐 动态布局计算结果：');
  console.log(`  字符数: ${characterCount}`);
  console.log(`  布局模式: ${mode}`);
  console.log(`  包含序号: ${hasNumbering}`);
  console.log(`  包含对比: ${hasComparison}`);
  console.log(`  包含数据: ${hasData}`);
  console.log(`  装饰元素数量: ${decorativeElements}`);
  
  return {
    mode,
    character_count: characterCount,
    has_numbering: hasNumbering,
    has_comparison: hasComparison,
    has_data: hasData,
    decorative_elements: decorativeElements
  };
}

export function generateGeometricDecorations(accentColor: string, count: number): any[] {
  const shapes = ['circle', 'rect', 'triangle'];
  const decorations = [];
  
  for (let i = 0; i < count; i++) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const x = Math.random() * 8 + 1;
    const y = Math.random() * 6 + 0.5;
    const size = Math.random() * 0.5 + 0.1;
    const transparency = Math.random() * 20 + 10;
    
    decorations.push({
      type: shape,
      x: x,
      y: y,
      w: size,
      h: size,
      fill: { color: accentColor, transparency: transparency }
    });
  }
  
  return decorations;
}

export interface FailureItem {
  reason: string;
  timestamp: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  coverBg: string;
  coverText: string;
  titleColor: string;
  contentColor: string;
  accentColor: string;
  previewBg: string;
  previewText: string;
  tags: string[];
  popularity: number;
  source: string;
}

export function convertDesignTrendsToTemplates(trends: DesignTrend[]): Template[] {
  const templates: Template[] = [];
  
  trends.forEach((trend, trendIndex) => {
    trend.color_schemes.forEach((scheme, schemeIndex) => {
      const colors = scheme.hex;
      if (colors.length >= 5) {
        templates.push({
          id: `trend-${trendIndex}-${schemeIndex}`,
          name: `${trend.name} - ${schemeIndex + 1}`,
          description: `${trend.description} | ${trend.layout_style}`,
          coverBg: colors[0],
          coverText: colors[4],
          titleColor: colors[1],
          contentColor: colors[2],
          accentColor: colors[3],
          previewBg: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
          previewText: colors[4],
          tags: [trend.name.toLowerCase(), trend.layout_style.toLowerCase(), '2026-trend'],
          popularity: 90,
          source: scheme.source_url
        });
      }
    });
  });
  
  console.log(`🎨 已将 ${trends.length} 个设计趋势转换为 ${templates.length} 个模板`);
  return templates;
}

export function getFailureBlacklist(): FailureItem[] {
  const blacklist = localStorage.getItem('ppt_failure_blacklist');
  return blacklist ? JSON.parse(blacklist) : [];
}

export function addToFailureBlacklist(reason: string): void {
  const blacklist = getFailureBlacklist();
  blacklist.push({
    reason: reason,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('ppt_failure_blacklist', JSON.stringify(blacklist));
  console.log(`🚫 已添加到失败黑名单: ${reason}`);
}

export function getOptimizedPrompt(basePrompt: string, blacklist: FailureItem[]): string {
  if (blacklist.length === 0) return basePrompt;
  
  const recentFailures = blacklist.slice(-5).map(item => item.reason);
  const optimization = recentFailures.join('；');
  
  return `${basePrompt}

⚠️ 历史问题提醒（请避免）：
${recentFailures.map((failure, index) => `${index + 1}. ${failure}`).join('\n')}`;
}