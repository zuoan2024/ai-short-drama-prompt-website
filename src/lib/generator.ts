// 漫剧生成核心逻辑

import { getPrompt } from './prompts';
import { callClaudeWithJSON } from './claude';
import type {
  Assets,
  ImagePrompt,
  VideoPrompt,
} from '@/types';

export async function generateNovel(theme: string): Promise<string> {
  const prompt = getPrompt('NOVEL', { theme });
  const response = await fetch('/api/generate/novel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.content;
}

export async function generateScript(novelContent: string): Promise<string> {
  const prompt = getPrompt('SCRIPT', { novelContent });
  const response = await fetch('/api/generate/script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.content;
}

export async function extractAssets(scriptContent: string): Promise<Assets> {
  const prompt = getPrompt('ASSETS', { scriptContent });
  return await callClaudeWithJSON<Assets>(prompt, 0.6);
}

export async function generateImagePrompts(scriptContent: string): Promise<Record<string, string>> {
  const prompt = getPrompt('IMAGE_PROMPTS', { scriptContent });
  return await callClaudeWithJSON<Record<string, string>>(prompt, 0.7);
}

export async function generateVideoPrompts(scriptContent: string): Promise<Record<string, string>> {
  const prompt = getPrompt('VIDEO_PROMPTS', { scriptContent });
  return await callClaudeWithJSON<Record<string, string>>(prompt, 0.7);
}
