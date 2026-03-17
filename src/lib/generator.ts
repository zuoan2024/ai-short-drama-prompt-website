// 漫剧生成核心逻辑

import { getPrompt } from './prompts';
import { callDeepSeekWithJSON } from './deepseek';
import type {
  Novel,
  Script,
  Assets,
  ImagePrompt,
  VideoPrompt,
  Project,
} from '@/types';

export async function generateNovel(theme: string): Promise<Novel> {
  const prompt = getPrompt('NOVEL', { theme });
  return await callDeepSeekWithJSON<Novel>(prompt, 0.8);
}

export async function generateScript(novelContent: string): Promise<Script> {
  const prompt = getPrompt('SCRIPT', { novelContent });
  return await callDeepSeekWithJSON<Script>(prompt, 0.7);
}

export async function extractAssets(scriptContent: string): Promise<Assets> {
  const prompt = getPrompt('ASSETS', { scriptContent });
  return await callDeepSeekWithJSON<Assets>(prompt, 0.6);
}

export async function generateImagePrompts(sceneScript: string): Promise<ImagePrompt[]> {
  const prompt = getPrompt('IMAGE_PROMPT', { sceneScript });
  const response = await callDeepSeekWithJSON<{ prompts: ImagePrompt[] }>(prompt, 0.7);
  return response.prompts;
}

export async function generateVideoPrompts(sceneScript: string): Promise<VideoPrompt[]> {
  const prompt = getPrompt('VIDEO_PROMPT', { sceneScript });
  const response = await callDeepSeekWithJSON<{ prompts: VideoPrompt[] }>(prompt, 0.7);
  return response.prompts;
}

export async function generateFullProject(
  idea: string,
  onProgress?: (step: string, progress: number) => void
): Promise<Project> {
  const projectId = Date.now().toString();
  const project: Project = {
    id: projectId,
    idea,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    // Step 1: 生成小说
    onProgress?.('正在生成小说大纲...', 10);
    const novel = await generateNovel(idea);
    project.novel = novel;

    // Step 2: 生成剧本
    onProgress?.('正在改编成短剧剧本...', 30);
    const novelContent = novel.chapters.map(ch => ch.content).join('\n\n');
    const script = await generateScript(novelContent);
    project.script = script;

    // Step 3: 提取资产
    onProgress?.('正在提取人物、场景、道具...', 50);
    const scriptContent = JSON.stringify(script, null, 2);
    const assets = await extractAssets(scriptContent);
    project.assets = assets;

    // Step 4: 生成分镜提示词（图片）
    onProgress?.('正在生成AI绘画面提示词...', 70);
    const imagePrompts = await generateImagePrompts(scriptContent);
    project.imagePrompts = imagePrompts;

    // Step 5: 生成分镜提示词（视频）
    onProgress?.('正在生成AI视频提示词...', 90);
    const videoPrompts = await generateVideoPrompts(scriptContent);
    project.videoPrompts = videoPrompts;

    onProgress?.('完成！', 100);

    return project;
  } catch (error) {
    console.error('Generation failed:', error);
    throw error;
  }
}
