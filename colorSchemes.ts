export interface ColorScheme {
  id: string;
  name: string;
  source: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    title: string;
    content: string;
  };
  preview: string;
  tags: string[];
  popularity: number;
  createdAt: string;
}

export interface ColorSchemeSource {
  name: string;
  url: string;
  type: "api" | "static";
  description: string;
}

export const COLOR_SOURCES: ColorSchemeSource[] = [
  {
    name: "Coolors.co",
    url: "https://coolors.co",
    type: "static",
    description: "流行的配色方案生成器"
  },
  {
    name: "ColorHunt",
    url: "https://colorhunt.co",
    type: "static",
    description: "每日更新的配色方案"
  },
  {
    name: "Colormind",
    url: "http://colormind.io",
    type: "api",
    description: "AI驱动的配色方案生成"
  },
  {
    name: "Adobe Color",
    url: "https://color.adobe.com",
    type: "static",
    description: "Adobe官方配色工具"
  }
];

export const TRENDING_COLOR_SCHEMES: ColorScheme[] = [
  {
    id: "trend-1",
    name: "Neon Dreams",
    source: "Coolors.co",
    colors: {
      primary: "FF006E",
      secondary: "8338EC",
      accent: "3A86FF",
      background: "0F0F0F",
      text: "FFFFFF",
      title: "FF006E",
      content: "E0E0E0"
    },
    preview: "linear-gradient(135deg, #FF006E 0%, #8338EC 50%, #3A86FF 100%)",
    tags: ["neon", "vibrant", "modern"],
    popularity: 95,
    createdAt: "2024-01-15"
  },
  {
    id: "trend-2",
    name: "Ocean Breeze",
    source: "ColorHunt",
    colors: {
      primary: "0077B6",
      secondary: "00B4D8",
      accent: "90E0EF",
      background: "CAF0F8",
      text: "03045E",
      title: "0077B6",
      content: "023E8A"
    },
    preview: "linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #90E0EF 100%)",
    tags: ["ocean", "calm", "professional"],
    popularity: 92,
    createdAt: "2024-01-14"
  },
  {
    id: "trend-3",
    name: "Sunset Vibes",
    source: "Coolors.co",
    colors: {
      primary: "FF6B6B",
      secondary: "FFA06B",
      accent: "FFD93D",
      background: "FFF8E7",
      text: "2D3436",
      title: "FF6B6B",
      content: "636E72"
    },
    preview: "linear-gradient(135deg, #FF6B6B 0%, #FFA06B 50%, #FFD93D 100%)",
    tags: ["warm", "energetic", "friendly"],
    popularity: 88,
    createdAt: "2024-01-13"
  },
  {
    id: "trend-4",
    name: "Forest Green",
    source: "ColorHunt",
    colors: {
      primary: "2D6A4F",
      secondary: "40916C",
      accent: "52B788",
      background: "D8F3DC",
      text: "1B4332",
      title: "2D6A4F",
      content: "081C15"
    },
    preview: "linear-gradient(135deg, #2D6A4F 0%, #40916C 50%, #52B788 100%)",
    tags: ["nature", "calm", "eco"],
    popularity: 85,
    createdAt: "2024-01-12"
  },
  {
    id: "trend-5",
    name: "Royal Purple",
    source: "Coolors.co",
    colors: {
      primary: "6B4C9A",
      secondary: "9D4EDD",
      accent: "C77DFF",
      background: "E0AAFF",
      text: "240046",
      title: "6B4C9A",
      content: "3C096C"
    },
    preview: "linear-gradient(135deg, #6B4C9A 0%, #9D4EDD 50%, #C77DFF 100%)",
    tags: ["royal", "elegant", "creative"],
    popularity: 82,
    createdAt: "2024-01-11"
  },
  {
    id: "trend-6",
    name: "Midnight Blue",
    source: "ColorHunt",
    colors: {
      primary: "0A192F",
      secondary: "112240",
      accent: "64FFDA",
      background: "0A192F",
      text: "CCD6F6",
      title: "64FFDA",
      content: "8892B0"
    },
    preview: "linear-gradient(135deg, #0A192F 0%, #112240 50%, #64FFDA 100%)",
    tags: ["dark", "tech", "minimal"],
    popularity: 80,
    createdAt: "2024-01-10"
  },
  {
    id: "trend-7",
    name: "Coral Reef",
    source: "Coolors.co",
    colors: {
      primary: "FF7F50",
      secondary: "FF6347",
      accent: "FFD700",
      background: "FFF5EE",
      text: "2F4F4F",
      title: "FF7F50",
      content: "708090"
    },
    preview: "linear-gradient(135deg, #FF7F50 0%, #FF6347 50%, #FFD700 100%)",
    tags: ["warm", "vibrant", "energetic"],
    popularity: 78,
    createdAt: "2024-01-09"
  },
  {
    id: "trend-8",
    name: "Slate Gray",
    source: "ColorHunt",
    colors: {
      primary: "475569",
      secondary: "64748B",
      accent: "94A3B8",
      background: "F1F5F9",
      text: "1E293B",
      title: "475569",
      content: "334155"
    },
    preview: "linear-gradient(135deg, #475569 0%, #64748B 50%, #94A3B8 100%)",
    tags: ["professional", "minimal", "clean"],
    popularity: 75,
    createdAt: "2024-01-08"
  },
  {
    id: "trend-9",
    name: "Lavender Dreams",
    source: "Coolors.co",
    colors: {
      primary: "7C3AED",
      secondary: "A78BFA",
      accent: "C4B5FD",
      background: "EDE9FE",
      text: "4C1D95",
      title: "7C3AED",
      content: "5B21B6"
    },
    preview: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)",
    tags: ["soft", "dreamy", "creative"],
    popularity: 72,
    createdAt: "2024-01-07"
  },
  {
    id: "trend-10",
    name: "Golden Hour",
    source: "ColorHunt",
    colors: {
      primary: "F59E0B",
      secondary: "FBBF24",
      accent: "FCD34D",
      background: "FFFBEB",
      text: "78350F",
      title: "F59E0B",
      content: "92400E"
    },
    preview: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)",
    tags: ["warm", "optimistic", "bright"],
    popularity: 70,
    createdAt: "2024-01-06"
  }
];

export async function fetchColorSchemesFromAPI(): Promise<ColorScheme[]> {
  try {
    const response = await fetch('http://colormind.io/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "default"
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    if (data.result && Array.isArray(data.result)) {
      const colors = data.result.map((color: number[]) => {
        const hex = color.map((c: number) => c.toString(16).padStart(2, '0')).join('');
        return hex.toUpperCase();
      });

      return [{
        id: `api-${Date.now()}`,
        name: "AI Generated",
        source: "Colormind API",
        colors: {
          primary: colors[0],
          secondary: colors[1],
          accent: colors[2],
          background: colors[3],
          text: colors[4],
          title: colors[0],
          content: colors[1]
        },
        preview: `linear-gradient(135deg, #${colors[0]} 0%, #${colors[1]} 50%, #${colors[2]} 100%)`,
        tags: ["ai-generated", "unique"],
        popularity: 100,
        createdAt: new Date().toISOString()
      }];
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch color schemes from API:', error);
    return [];
  }
}

export function getAllColorSchemes(): ColorScheme[] {
  return [...TRENDING_COLOR_SCHEMES];
}

export function getColorSchemeById(id: string): ColorScheme | undefined {
  return TRENDING_COLOR_SCHEMES.find(scheme => scheme.id === id);
}

export function getColorSchemesByTag(tag: string): ColorScheme[] {
  return TRENDING_COLOR_SCHEMES.filter(scheme => 
    scheme.tags.includes(tag.toLowerCase())
  );
}

export function getPopularColorSchemes(limit: number = 5): ColorScheme[] {
  return [...TRENDING_COLOR_SCHEMES]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getRecentColorSchemes(limit: number = 5): ColorScheme[] {
  return [...TRENDING_COLOR_SCHEMES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function searchColorSchemes(query: string): ColorScheme[] {
  const lowerQuery = query.toLowerCase();
  return TRENDING_COLOR_SCHEMES.filter(scheme =>
    scheme.name.toLowerCase().includes(lowerQuery) ||
    scheme.tags.some(tag => tag.includes(lowerQuery)) ||
    scheme.source.toLowerCase().includes(lowerQuery)
  );
}

export function convertColorSchemeToTemplate(scheme: ColorScheme): any {
  return {
    id: scheme.id,
    name: scheme.name,
    coverBg: scheme.colors.background,
    coverText: scheme.colors.text,
    accentColor: scheme.colors.accent,
    titleColor: scheme.colors.title,
    contentColor: scheme.colors.content,
    previewBg: scheme.preview,
    source: scheme.source,
    tags: scheme.tags
  };
}

export function getRandomColorScheme(): ColorScheme {
  const randomIndex = Math.floor(Math.random() * TRENDING_COLOR_SCHEMES.length);
  return TRENDING_COLOR_SCHEMES[randomIndex];
}