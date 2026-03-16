"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import PptxGenJS from "pptxgenjs";
import { formatDate, getCurrentDate, saveToLocalStorage, loadFromLocalStorage } from "../utils/helpers";
import { 
  loadDeepSeekConfig, 
  saveDeepSeekConfig, 
  DEFAULT_DEEPSEEK_CONFIG,
  DEEPSEEK_MODELS,
  callDeepSeekAPI,
  validateDeepSeekConfig 
} from "../utils/deepseek";

export interface Slide {
  type: "cover" | "directory" | "content" | "end";
  title: string;
  subtitle?: string;
  content: string | string[];
  date?: string;
  slideNumber?: number;
}

export interface Template {
  id: string;
  name: string;
  coverBg: string;
  coverText: string;
  accentColor: string;
  titleColor: string;
  contentColor: string;
  previewBg: string;
}

export interface HistoryItem {
  id: number;
  theme: string;
  slideCount: number;
  template: string;
  timestamp: string;
}

const TEMPLATES: Template[] = [
  {
    id: "business-blue",
    name: "商务蓝",
    coverBg: "1E3A8A",
    coverText: "FFFFFF",
    accentColor: "3B82F6",
    titleColor: "1E3A8A",
    contentColor: "374151",
    previewBg: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
  },
  {
    id: "geek-black",
    name: "极客黑",
    coverBg: "1A1A1A",
    coverText: "FFFFFF",
    accentColor: "00FF00",
    titleColor: "FFFFFF",
    contentColor: "CCCCCC",
    previewBg: "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)"
  },
  {
    id: "fresh-green",
    name: "清新绿",
    coverBg: "FFFFFF",
    coverText: "2E8B57",
    accentColor: "90EE90",
    titleColor: "2E8B57",
    contentColor: "333333",
    previewBg: "linear-gradient(135deg, #FFFFFF 0%, #F0FFF0 100%)"
  }
];

const STORAGE_KEYS = {
  HISTORY: 'ppt_history',
  TEMPLATE: 'active_template',
  DEEPSEEK_CONFIG: 'deepseek_config'
} as const;

const generateSlideContent = (theme: string, pageCount: number) => {
  const slides: any[] = [];
  
  if (!theme || theme.trim().length === 0) {
    theme = "未命名主题";
  }
  
  const mainTitle = theme.includes("爱国") 
    ? `关于${theme}的主题演讲`
    : `${theme}：深度解析报告`;
  
  const dateStr = getCurrentDate();
  const middleCount = Math.max(pageCount, 1);
  
  slides.push({
    type: "cover",
    title: mainTitle,
    subtitle: "智能生成 · 专业呈现",
    content: `本演示文稿围绕"${theme}"展开，为您提供全面、深入的分析与见解。`,
    date: dateStr
  });
  
  const directoryContent = Array.from({ length: Math.min(middleCount, 6) }, (_, i) => 
    `${i + 1}. 第${i + 1}部分：${theme}的核心内容`
  );
  
  slides.push({
    type: "directory",
    title: "目录",
    content: directoryContent
  });
  
  for (let i = 0; i < middleCount; i++) {
    const contentText = `关于"${theme}"的第${i + 1}个要点：\n\n• 要点一：深入理解${theme}的核心内涵和基本概念。\n\n• 要点二：把握${theme}的发展趋势和未来走向。\n\n• 要点三：明确${theme}在实际应用中的具体价值和意义。\n\n• 要点四：探索${theme}的创新方向和改进空间。`;
    
    slides.push({
      type: "content",
      title: `第${i + 1}部分：${theme}的核心内容`,
      content: contentText,
      slideNumber: i + 1
    });
  }
  
  slides.push({
    type: "end",
    title: "总结与展望",
    content: `通过本次对"${theme}"的深入分析，我们得出以下结论：该主题具有重要的研究价值和实践意义。未来，我们将继续关注其发展动态，为相关领域贡献更多力量。`,
    date: dateStr
  });
  
  return slides;
};

const generatePPT = async (slides: any[], activeTemplate: string, input: string) => {
  const pptx = new PptxGenJS();
  const template = TEMPLATES.find(t => t.id === activeTemplate) || TEMPLATES[0];
  
  slides.forEach((slide) => {
    const slideObj = pptx.addSlide();
    
    if (slide.type === "cover") {
      slideObj.background = { color: template.coverBg };
      slideObj.addText(slide.title, {
        x: 0.5, y: 2, w: 9, h: 1.5, fontSize: 36, bold: true, color: template.coverText, align: "center"
      });
      slideObj.addText(slide.subtitle, {
        x: 0.5, y: 3.5, w: 9, h: 0.6, fontSize: 18, color: template.coverText, align: "center"
      });
      slideObj.addText(slide.content, {
        x: 0.5, y: 4.5, w: 9, h: 0.8, fontSize: 14, color: template.coverText, align: "center"
      });
      if (slide.date) {
        slideObj.addText(slide.date, {
          x: 0.5, y: 5.6, w: 9, h: 0.4, fontSize: 12, color: template.coverText, align: "center"
        });
      }
    } else if (slide.type === "directory") {
      slideObj.background = { color: "FFFFFF" };
      slideObj.addText(slide.title, {
        x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 28, bold: true, color: template.titleColor, align: "center"
      });
      const content = Array.isArray(slide.content) ? slide.content : [slide.content];
      content.forEach((item: string, i: number) => {
        slideObj.addText(item, {
          x: 1.5, y: 1.5 + i * 0.6, w: 7, h: 0.5, fontSize: 16, color: template.contentColor
        });
      });
    } else if (slide.type === "content") {
      slideObj.background = { color: "FFFFFF" };
      slideObj.addText(slide.title, {
        x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 28, bold: true, color: template.titleColor, align: "center"
      });
      if (slide.slideNumber) {
        slideObj.addText(`第 ${slide.slideNumber} 页`, {
          x: 8.5, y: 0.3, w: 1, h: 0.3, fontSize: 10, color: "#999999", align: "right"
        });
      }
      const content = Array.isArray(slide.content) ? slide.content : [slide.content];
      content.forEach((item: string, i: number) => {
        slideObj.addText(item, {
          x: 0.8, y: 1.5 + i * 0.5, w: 8.4, h: 0.4, fontSize: 14, color: template.contentColor
        });
      });
    } else if (slide.type === "end") {
      slideObj.background = { color: template.coverBg };
      slideObj.addText(slide.title, {
        x: 0.5, y: 2, w: 9, h: 1.5, fontSize: 32, bold: true, color: template.coverText, align: "center"
      });
      slideObj.addText(slide.content, {
        x: 0.5, y: 3.8, w: 9, h: 1.8, fontSize: 16, color: template.coverText, align: "center"
      });
      if (slide.date) {
        slideObj.addText(slide.date, {
          x: 0.5, y: 5.8, w: 9, h: 0.4, fontSize: 12, color: template.coverText, align: "center"
        });
      }
    }
  });
  
  await pptx.writeFile({ fileName: `${input}.pptx` });
};

const generateSlidesFromDeepSeek = async (theme: string, pageCount: number, config: any) => {
  try {
    const prompt = `请为"${theme}"生成一个包含${pageCount}页的专业PPT内容。要求：
1. 生成封面页，包含主题标题和副标题
2. 生成目录页，列出所有章节
3. 生成${pageCount - 2}个内容页，每页包含详细要点
4. 生成总结页，总结核心观点
5. 使用专业、简洁的语言
6. 确保内容逻辑清晰、层次分明`;

    const content = await callDeepSeekAPI(prompt, config);
    
    const slides: any[] = [];
    const dateStr = getCurrentDate();
    
    slides.push({
      type: "cover",
      title: `${theme}：深度解析报告`,
      subtitle: "AI 智能生成 · 专业呈现",
      content: `本演示文稿围绕"${theme}"展开，为您提供全面、深入的分析与见解。`,
      date: dateStr
    });
    
    slides.push({
      type: "directory",
      title: "目录",
      content: Array.from({ length: Math.min(pageCount - 2, 6) }, (_, i) => 
        `${i + 1}. 第${i + 1}部分：${theme}的核心内容`
      )
    });
    
    for (let i = 0; i < pageCount - 2; i++) {
      slides.push({
        type: "content",
        title: `第${i + 1}部分：${theme}的核心内容`,
        content: content,
        slideNumber: i + 1
      });
    }
    
    slides.push({
      type: "end",
      title: "总结与展望",
      content: `通过本次对"${theme}"的深入分析，我们得出以下结论：该主题具有重要的研究价值和实践意义。未来，我们将继续关注其发展动态，为相关领域贡献更多力量。`,
      date: dateStr
    });
    
    return slides;
  } catch (error) {
    console.error('DeepSeek生成失败:', error);
    return [];
  }
};

export default function Home() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [slideCount, setSlideCount] = useState(5);
  const [activeTemplate, setActiveTemplate] = useState("business-blue");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [deepSeekConfig, setDeepSeekConfig] = useState(DEFAULT_DEEPSEEK_CONFIG);
  const [useDeepSeek, setUseDeepSeek] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedHistory = loadFromLocalStorage<HistoryItem[]>(STORAGE_KEYS.HISTORY, []);
    setHistory(savedHistory);
    const savedTemplate = loadFromLocalStorage<string>(STORAGE_KEYS.TEMPLATE, "business-blue");
    if (savedTemplate) {
      setActiveTemplate(savedTemplate);
    }
    const savedDeepSeekConfig = loadDeepSeekConfig();
    setDeepSeekConfig(savedDeepSeekConfig);
    setUseDeepSeek(savedDeepSeekConfig.enabled);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveToLocalStorage(STORAGE_KEYS.HISTORY, history);
    }
  }, [history, mounted]);

  useEffect(() => {
    if (mounted) {
      saveToLocalStorage(STORAGE_KEYS.TEMPLATE, activeTemplate);
    }
  }, [activeTemplate, mounted]);

  useEffect(() => {
    if (mounted) {
      saveToLocalStorage(STORAGE_KEYS.DEEPSEEK_CONFIG, deepSeekConfig);
    }
  }, [deepSeekConfig, mounted]);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("请输入主题内容");
      return;
    }

    setIsGenerating(true);
    toast.loading("正在生成PPT，请稍候...", { id: "generating" });
    
    try {
      let slides: any[];
      
      if (useDeepSeek && deepSeekConfig.enabled) {
        slides = await generateSlidesFromDeepSeek(input, slideCount, deepSeekConfig);
      } else {
        slides = generateSlideContent(input, slideCount);
      }
      
      await generatePPT(slides, activeTemplate, input);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        theme: input,
        slideCount: slides.length,
        template: activeTemplate,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 20));
      
      toast.dismiss("generating");
      toast.success("✅ PPT生成成功！");
    } catch (error) {
      console.error('生成PPT失败:', error);
      toast.dismiss("generating");
      toast.error("❌ 生成PPT失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setInput(item.theme);
    setSlideCount(item.slideCount);
    setActiveTemplate(item.template);
    saveToLocalStorage(STORAGE_KEYS.TEMPLATE, item.template);
    toast.success(`✅ 已加载历史记录：${item.theme}`);
  };

  const handleDeleteHistory = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.success("已删除历史记录");
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success("已清空历史记录");
  };

  const handleSaveConfig = () => {
    const validation = validateDeepSeekConfig(deepSeekConfig);
    
    if (!validation.valid) {
      toast.error(`配置错误：${validation.errors.join(', ')}`);
      return;
    }
    
    saveDeepSeekConfig(deepSeekConfig);
    setUseDeepSeek(deepSeekConfig.enabled);
    setShowSettings(false);
    toast.success("✅ 配置已保存");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI PPT 智能生成器
          </h1>
          <p className="text-gray-600">
            输入主题，一键生成专业演示文稿
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题内容
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入PPT主题，例如：人工智能的发展、商业计划书、爱国教育等..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                页数设置
              </label>
              <input
                type="range"
                min="3"
                max="35"
                value={slideCount}
                onChange={(e) => setSlideCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600 mt-1">
                {slideCount} 页
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择模板
              </label>
              <button
                onClick={() => setActiveTemplate(activeTemplate === "business-blue" ? "geek-black" : "business-blue")}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-left ${
                  activeTemplate === "business-blue" ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                {TEMPLATES.find(t => t.id === activeTemplate)?.name || "商务蓝"}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                操作
              </label>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full px-6 py-2 rounded-lg font-medium ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isGenerating ? '生成中...' : '生成 PPT'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              历史记录
            </h2>
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-600 hover:text-red-700"
            >
              清空历史
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleLoadHistory(item)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {item.theme}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.slideCount} 页 · {formatDate(item.timestamp)}
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteHistory(item.id, e)}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              AI 设置
            </h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showSettings ? '收起设置' : '展开设置'}
            </button>
          </div>
          
          {showSettings && (
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useDeepSeek}
                    onChange={(e) => setUseDeepSeek(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    启用 DeepSeek AI 生成
                  </span>
                </label>
                <p className="text-xs text-gray-500">
                  使用 DeepSeek API 智能生成更高质量的 PPT 内容
                </p>
              </div>

              {useDeepSeek && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API 密钥
                    </label>
                    <input
                      type="password"
                      value={deepSeekConfig.apiKey}
                      onChange={(e) => setDeepSeekConfig({ ...deepSeekConfig, apiKey: e.target.value })}
                      placeholder="请输入您的 DeepSeek API 密钥"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      模型选择
                    </label>
                    <select
                      value={deepSeekConfig.model}
                      onChange={(e) => setDeepSeekConfig({ ...deepSeekConfig, model: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {DEEPSEEK_MODELS.map(model => (
                        <option key={model.id} value={model.id}>
                          {model.name} - {model.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      最大 Token 数
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="8000"
                      value={deepSeekConfig.maxTokens}
                      onChange={(e) => setDeepSeekConfig({ ...deepSeekConfig, maxTokens: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      温度参数
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={deepSeekConfig.temperature}
                      onChange={(e) => setDeepSeekConfig({ ...deepSeekConfig, temperature: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={handleSaveConfig}
                    className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    保存配置
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}