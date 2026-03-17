// 项目数据类型定义

export interface Character {
  name: string;
  age: string;
  style: string;
  appearance: string;
  personality: string;
}

export interface Scene {
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
  scenes: Scene[];
  props: Prop[];
}

export interface Shot {
  type: string;
  action: string;
  dialogue?: {
    character: string;
    line: string;
  };
}

export interface ScriptScene {
  scene: number;
  location: string;
  characters: string[];
  shots: Shot[];
}

export interface Episode {
  episode: number;
  scenes: ScriptScene[];
}

export interface Script {
  episodes: Episode[];
}

export interface Chapter {
  chapter: number;
  title: string;
  content: string;
}

export interface Novel {
  outline: string;
  characters: Character[];
  chapters: Chapter[];
}

export interface ImagePrompt {
  sceneNumber: number;
  prompt: string;
  promptEnglish: string;
}

export interface VideoPrompt {
  sceneNumber: number;
  prompt: string;
  promptEnglish: string;
}

export interface Project {
  id: string;
  idea: string;
  novel?: Novel;
  script?: Script;
  assets?: Assets;
  imagePrompts?: ImagePrompt[];
  videoPrompts?: VideoPrompt[];
  createdAt: Date;
  updatedAt: Date;
}
