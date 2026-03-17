// AI 提示词模板

export const PROMPTS = {
  // 1. 主题扩展成小说
  NOVEL: `你是一位专业的网络小说作家。请根据用户提供的主题/灵感，扩展成一个完整的短篇小说大纲和前3章详细内容。

要求：
1. 大纲包含：故事梗概、主要人物、世界观设定
2. 前3章每章 2000-3000 字
3. 节奏紧凑，适合改编成短剧
4. 输出 JSON 格式

用户主题：{theme}

输出格式（必须是纯JSON，不要有其他文字）：
{
  "outline": "故事大纲...",
  "characters": [
    {"name": "人物名", "role": "主角/配角", "description": "..."}
  ],
  "chapters": [
    {
      "chapter": 1,
      "title": "章节标题",
      "content": "章节内容..."
    }
  ]
}`,

  // 2. 小说转剧本
  SCRIPT: `你是一位专业短剧编剧。请将以下小说内容改编成标准的短剧剧本格式。

要求：
1. 按场景拆分，每场戏包含：场景号、场景描述、人物、对话、动作
2. 对话口语化，适合拍摄
3. 标注镜头建议（特写/中景/全景等）
4. 输出 JSON 格式

小说内容：{novelContent}

输出格式（必须是纯JSON，不要有其他文字）：
{
  "episodes": [
    {
      "episode": 1,
      "scenes": [
        {
          "scene": 1,
          "location": "咖啡馆 - 日景",
          "characters": ["男主角", "女主角"],
          "shots": [
            {
              "type": "中景",
              "action": "男主角坐在窗边",
              "dialogue": {"character": "男主角", "line": "..."}
            }
          ]
        }
      ]
    }
  ]
}`,

  // 3. 资产提取
  ASSETS: `请从以下剧本中提取所有资产清单（人物、场景、道具），并生成详细的描述。

剧本内容：{scriptContent}

输出格式（必须是纯JSON，不要有其他文字）：
{
  "characters": [
    {
      "name": "人物名",
      "age": "年龄",
      "style": "着装风格",
      "appearance": "外貌特征",
      "personality": "性格特点"
    }
  ],
  "scenes": [
    {
      "location": "场景地点",
      "type": "室内/室外",
      "time": "日景/夜景",
      "atmosphere": "氛围描述",
      "details": "细节描述"
    }
  ],
  "props": [
    {
      "name": "道具名",
      "quantity": 数量,
      "description": "详细描述"
    }
  ]
}`,

  // 4. 分镜生图提示词
  IMAGE_PROMPT: `你是一位专业的分镜设计师和 AI 绘画提示词专家。请根据以下剧本片段，生成详细的分镜生图提示词。

要求：
1. 每个镜头生成一段详细的 AI 绘画提示词（中英文双语）
2. 提示词包含：人物描述、场景描述、镜头角度、光影、风格参考
3. 适合 Stable Diffusion / Midjourney 使用

剧本片段：{sceneScript}

输出格式（必须是纯JSON，不要有其他文字）：
{
  "prompts": [
    {
      "sceneNumber": 1,
      "prompt": "中文详细提示词...",
      "promptEnglish": "Detailed English prompt for AI image generation..."
    }
  ]
}`,

  // 5. 分镜生视频提示词
  VIDEO_PROMPT: `你是一位专业的分镜设计师和 AI 视频提示词专家。请根据以下剧本片段，生成详细的图生视频提示词。

要求：
1. 每个镜头生成一段详细的 AI 视频提示词（中英文双语）
2. 提示词重点描述：镜头运动、人物动作、场景变化、转场效果
3. 适合 Runway Gen-3 / Pika / 可灵AI 使用

剧本片段：{sceneScript}

输出格式（必须是纯JSON，不要有其他文字）：
{
  "prompts": [
    {
      "sceneNumber": 1,
      "prompt": "中文详细提示词，包含镜头运动、动作描述...",
      "promptEnglish": "Camera movement, character action, scene transition..."
    }
  ]
}`
};

export function getPrompt(type: keyof typeof PROMPTS, params: Record<string, string>): string {
  let prompt = PROMPTS[type];
  for (const [key, value] of Object.entries(params)) {
    prompt = prompt.replace(`{${key}}`, value);
  }
  return prompt;
}
