export interface DeepSeekConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  enabled: boolean;
  maxTokens: number;
  temperature: number;
}

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
}

export const DEFAULT_DEEPSEEK_CONFIG: DeepSeekConfig = {
  apiKey: "",
  baseUrl: "https://api.deepseek.com",
  model: "deepseek-chat",
  enabled: false,
  maxTokens: 2000,
  temperature: 0.7
};

export const DEEPSEEK_MODELS = [
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    description: "通用对话模型，适合大多数场景",
    maxTokens: 4000,
    costPer1kTokens: 0.001
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    description: "代码生成和优化模型",
    maxTokens: 8000,
    costPer1kTokens: 0.002
  }
];

export function saveDeepSeekConfig(config: DeepSeekConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('deepseek_config', JSON.stringify(config));
  }
}

export function loadDeepSeekConfig(): DeepSeekConfig {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('deepseek_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse DeepSeek config:', e);
        return DEFAULT_DEEPSEEK_CONFIG;
      }
    }
  }
  return DEFAULT_DEEPSEEK_CONFIG;
}

export async function callDeepSeekAPI(
  prompt: string,
  config: DeepSeekConfig
): Promise<string> {
  if (!config.enabled || !config.apiKey) {
    throw new Error('DeepSeek API 未配置或未启用');
  }

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: '你是一个专业的PPT内容生成专家。请根据用户提供的主题生成高质量的PPT内容，包括封面、目录、内容页和总结页。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: config.temperature,
        max_tokens: config.maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API 请求失败: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('DeepSeek API 返回空响应');
    }

    console.log('DeepSeek API 使用情况:', data.usage);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    throw error;
  }
}

export function calculateCost(config: DeepSeekConfig, tokens: number): number {
  const model = DEEPSEEK_MODELS.find(m => m.id === config.model);
  if (!model) return 0;
  
  return (tokens / 1000) * model.costPer1kTokens;
}

export function validateDeepSeekConfig(config: DeepSeekConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (config.enabled && !config.apiKey) {
    errors.push('API 密钥不能为空');
  }
  
  if (config.apiKey && config.apiKey.length < 10) {
    errors.push('API 密钥格式不正确');
  }
  
  if (config.maxTokens < 100 || config.maxTokens > 8000) {
    errors.push('Token 数量超出范围 (100-8000)');
  }
  
  if (config.temperature < 0 || config.temperature > 2) {
    errors.push('温度参数超出范围 (0-2)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}