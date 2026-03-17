// 项目数据类型定义

export interface Character {
  name: string;
  age: string;
  style: string;
  appearance: string;
  personality: string;
}

export interface SceneAsset {
  location: string;
  type: '室内' | '室外';
  time: '日景' | '夜景';
  atmosphere: string;
  details: string;
}

export interface Prop {
  name: string;
  quantity: number;
  description: string;
}

export interface Assets {
  characters: Character[];
  scenes: SceneAsset[];
  props: Prop[];
}

// 剧本格式（按照用户提供的格式）
export interface ScriptScene {
  sceneHeader: string;  // 例如：1-1 废弃仓库 [内] [夜]
  characters: string[];  // 出场人物
  actions: string[];     // 画面/动作（每行以△开头）
  dialogue: string[];    // 对白
  effects: string[];     // 特殊音效与视觉
}

export interface Script {
  scenes: ScriptScene[];
}

export interface PlatformPrompts {
  jiming?: string;      // 即梦
  vidu?: string;        // VIDU
  keling?: string;      // 可灵
  hailuo?: string;      // 海螺
  midjourney?: string;  // Midjourney
}

// 会话数据
export interface Session {
  sessionId: string;
  currentStep: Step;
  createdAt: Date;
  updatedAt: Date;

  // 可选的数据（不一定都有）
  idea?: string;
  novel?: string;
  script?: string;
  assets?: Assets;
  imagePrompts?: PlatformPrompts;
  videoPrompts?: PlatformPrompts;
}

export type Step =
  | 'idea'
  | 'novel'
  | 'script'
  | 'assets'
  | 'image-prompts'
  | 'video-prompts'
  | 'complete';

export interface StepConfig {
  id: Step;
  title: string;
  description: string;
  canSkip: boolean;
  requiresPreviousData: boolean;
}
