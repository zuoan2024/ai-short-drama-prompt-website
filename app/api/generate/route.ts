// API 路由：生成漫剧

import { NextRequest, NextResponse } from 'next/server';
import { generateFullProject } from '@/lib/generator';

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();

    if (!idea || typeof idea !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的创意主题' },
        { status: 400 }
      );
    }

    // 生成项目（带进度回调）
    const project = await generateFullProject(idea);

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '生成失败，请重试',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
export const maxDuration = 300; // 5 minutes
