// 步骤配置

import type { StepConfig } from '@/types';

export const STEPS: StepConfig[] = [
  {
    id: 'idea',
    title: '创意输入',
    description: '输入你的灵感或主题',
    canSkip: false,
    requiresPreviousData: false,
  },
  {
    id: 'novel',
    title: '小说大纲',
    description: 'AI 扩展成完整小说',
    canSkip: true,
    requiresPreviousData: true,
  },
  {
    id: 'script',
    title: '剧本改编',
    description: '改编成标准短剧剧本',
    canSkip: true,
    requiresPreviousData: true,
  },
  {
    id: 'assets',
    title: '资产提取',
    description: '提取人物、场景、道具',
    canSkip: true,
    requiresPreviousData: true,
  },
  {
    id: 'image-prompts',
    title: '生图提示词',
    description: '生成 AI 绘画提示词',
    canSkip: true,
    requiresPreviousData: true,
  },
  {
    id: 'video-prompts',
    title: '生视频提示词',
    description: '生成 AI 视频提示词',
    canSkip: true,
    requiresPreviousData: true,
  },
  {
    id: 'complete',
    title: '完成',
    description: '所有步骤已完成',
    canSkip: false,
    requiresPreviousData: false,
  },
];

// 平台列表
export const IMAGE_PLATFORMS = [
  { id: 'jiming', name: '即梦', color: 'bg-blue-500' },
  { id: 'vidu', name: 'VIDU', color: 'bg-purple-500' },
  { id: 'keling', name: '可灵', color: 'bg-green-500' },
  { id: 'hailuo', name: '海螺', color: 'bg-orange-500' },
  { id: 'midjourney', name: 'Midjourney', color: 'bg-pink-500' },
] as const;

export const VIDEO_PLATFORMS = [
  { id: 'jiming', name: '即梦', color: 'bg-blue-500' },
  { id: 'keling', name: '可灵', color: 'bg-green-500' },
  { id: 'hailuo', name: '海螺', color: 'bg-orange-500' },
  { id: 'vidu', name: 'VIDU', color: 'bg-purple-500' },
] as const;
