export type CategoryId = "all" | "design" | "ai" | "dev" | "inspiration" | "productivity" | "knowledge";

export type Site = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Exclude<CategoryId, "all">;
  tags: string[];
  accent: string;
  mark: string;
  featured?: boolean;
};

export const categories: { id: CategoryId; label: string; glyph: string }[] = [
  { id: "all", label: "全部收藏", glyph: "⌘" },
  { id: "design", label: "设计与审美", glyph: "◐" },
  { id: "ai", label: "AI 工具", glyph: "✦" },
  { id: "dev", label: "开发者", glyph: "⌁" },
  { id: "inspiration", label: "灵感与发现", glyph: "◎" },
  { id: "productivity", label: "效率工具", glyph: "✓" },
  { id: "knowledge", label: "知识阅读", glyph: "≋" },
];

// 添加收藏只需复制一项并修改字段；图标会根据 url 自动获取。
export const sites: Site[] = [
  { id: "are-na", name: "Are.na", url: "https://www.are.na", description: "安静地收集、连接和分享灵感。", category: "inspiration", tags: ["灵感", "收藏"], accent: "#DDE8D5", mark: "A", featured: true },
  { id: "readwise", name: "Readwise Reader", url: "https://readwise.io/read", description: "把稍后读、标注和知识回顾放在一起。", category: "knowledge", tags: ["阅读", "知识库"], accent: "#F3D7B9", mark: "R", featured: true },
  { id: "linear", name: "Linear", url: "https://linear.app", description: "为高效率团队打造的项目与问题追踪工具。", category: "productivity", tags: ["项目管理", "团队"], accent: "#D9D5F2", mark: "L", featured: true },
  { id: "cosmos", name: "Cosmos", url: "https://www.cosmos.so", description: "从全网发现并整理视觉灵感。", category: "inspiration", tags: ["视觉", "发现"], accent: "#CFE7E4", mark: "C", featured: true },

  { id: "figma", name: "Figma", url: "https://www.figma.com", description: "从想法、设计到交付的一站式协作空间。", category: "design", tags: ["UI", "协作"], accent: "#F6D2C7", mark: "F" },
  { id: "mobbin", name: "Mobbin", url: "https://mobbin.com", description: "真实产品界面与交互模式参考库。", category: "design", tags: ["UI", "移动端"], accent: "#DCE5F6", mark: "M" },
  { id: "fontshare", name: "Fontshare", url: "https://www.fontshare.com", description: "高质量、可免费商用的字体集合。", category: "design", tags: ["字体", "资源"], accent: "#E8DDD0", mark: "Ft" },
  { id: "coolors", name: "Coolors", url: "https://coolors.co", description: "快速生成、探索和检查配色方案。", category: "design", tags: ["配色", "工具"], accent: "#F4D6A8", mark: "Co" },
  { id: "behance", name: "Behance", url: "https://www.behance.net", description: "探索全球创意作品与设计师。", category: "design", tags: ["作品集", "社区"], accent: "#D5E2F8", mark: "Be" },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com", description: "设计作品、过程与视觉趋势社区。", category: "design", tags: ["视觉", "社区"], accent: "#F6D5E3", mark: "D" },
  { id: "typewolf", name: "Typewolf", url: "https://www.typewolf.com", description: "网页字体搭配与排版灵感。", category: "design", tags: ["字体", "排版"], accent: "#E8DFC9", mark: "T" },
  { id: "landbook", name: "Land-book", url: "https://land-book.com", description: "精选落地页与网站设计画廊。", category: "design", tags: ["网页", "画廊"], accent: "#D9E6DF", mark: "Lb" },

  { id: "chatgpt", name: "ChatGPT", url: "https://chatgpt.com", description: "写作、分析、学习与创作的 AI 助手。", category: "ai", tags: ["对话", "通用"], accent: "#CDE5DB", mark: "G" },
  { id: "claude", name: "Claude", url: "https://claude.ai", description: "擅长长文本理解、推理和编程协作。", category: "ai", tags: ["对话", "写作"], accent: "#EAD6C6", mark: "Cl" },
  { id: "perplexity", name: "Perplexity", url: "https://www.perplexity.ai", description: "带来源引用的 AI 搜索与研究工具。", category: "ai", tags: ["搜索", "研究"], accent: "#C9E5E4", mark: "P" },
  { id: "huggingface", name: "Hugging Face", url: "https://huggingface.co", description: "模型、数据集与机器学习社区。", category: "ai", tags: ["模型", "社区"], accent: "#F9E49F", mark: "HF" },

  { id: "github", name: "GitHub", url: "https://github.com", description: "构建、分享和协作开发软件。", category: "dev", tags: ["代码", "协作"], accent: "#D8DADF", mark: "GH" },
  { id: "vercel", name: "Vercel", url: "https://vercel.com", description: "面向前端开发者的部署与云平台。", category: "dev", tags: ["部署", "前端"], accent: "#DADADA", mark: "V" },
  { id: "mdn", name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "可靠、全面的 Web 技术参考文档。", category: "dev", tags: ["文档", "Web"], accent: "#D7E5F4", mark: "M" },
  { id: "codepen", name: "CodePen", url: "https://codepen.io", description: "在浏览器中编写和展示前端创意。", category: "dev", tags: ["前端", "实验"], accent: "#E0DFEF", mark: "CP" },

  { id: "pinterest", name: "Pinterest", url: "https://www.pinterest.com", description: "从海量图片中探索创意和生活灵感。", category: "inspiration", tags: ["图片", "创意"], accent: "#F2CFCC", mark: "P" },
  { id: "awwwards", name: "Awwwards", url: "https://www.awwwards.com", description: "获奖网站、趋势与数字设计人才。", category: "inspiration", tags: ["网页", "趋势"], accent: "#D9E4D2", mark: "W" },

  { id: "notion", name: "Notion", url: "https://www.notion.so", description: "笔记、文档、项目和知识库工作空间。", category: "productivity", tags: ["笔记", "协作"], accent: "#E4E0DA", mark: "N" },
  { id: "raycast", name: "Raycast", url: "https://www.raycast.com", description: "快速、可扩展的桌面效率启动器。", category: "productivity", tags: ["桌面", "快捷"], accent: "#F3D0D1", mark: "R" },
  { id: "raindrop", name: "Raindrop.io", url: "https://raindrop.io", description: "美观、跨平台的全能书签管理器。", category: "productivity", tags: ["书签", "整理"], accent: "#CDE5F3", mark: "Ra" },

  { id: "substack", name: "Substack", url: "https://substack.com", description: "发现值得长期订阅的独立写作者。", category: "knowledge", tags: ["写作", "订阅"], accent: "#F5D2B5", mark: "S" },
  { id: "wikipedia", name: "Wikipedia", url: "https://www.wikipedia.org", description: "自由、协作且不断生长的百科全书。", category: "knowledge", tags: ["百科", "学习"], accent: "#DFE2E4", mark: "W" },
  { id: "aeon", name: "Aeon", url: "https://aeon.co", description: "关于哲学、科学与人类经验的深度文章。", category: "knowledge", tags: ["长文", "思想"], accent: "#DCE4C7", mark: "Ae" },
  { id: "medium", name: "Medium", url: "https://medium.com", description: "来自不同领域作者的观点与故事。", category: "knowledge", tags: ["文章", "社区"], accent: "#DCE5DC", mark: "Me" },
  { id: "hackernews", name: "Hacker News", url: "https://news.ycombinator.com", description: "技术、创业与互联网社区讨论。", category: "knowledge", tags: ["科技", "社区"], accent: "#F3D4BF", mark: "HN" },
  { id: "quanta", name: "Quanta Magazine", url: "https://www.quantamagazine.org", description: "数学、物理、生命科学与计算机科学。", category: "knowledge", tags: ["科学", "深度"], accent: "#CFE1EB", mark: "Q" },
  { id: "marginalian", name: "The Marginalian", url: "https://www.themarginalian.org", description: "文学、艺术、哲学与如何更好地生活。", category: "knowledge", tags: ["文化", "长文"], accent: "#E5D5C6", mark: "TM" },
];
