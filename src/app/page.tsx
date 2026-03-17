'use client';

import { useState } from 'react';

export default function HomePage() {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('请输入创意主题');
      return;
    }

    setIsGenerating(true);
    setError('');
    setProgress(0);
    setProgressMessage('正在准备...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      // 跳转到结果页面
      setProjectId(data.data.id);
      window.location.href = `/result/${data.data.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
      setProgress(0);
      setProgressMessage('');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎬 AI 漫剧工具
          </h1>
          <p className="text-xl text-gray-600">
            输入一个创意主题，AI 自动生成小说、剧本、资产和提示词
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Input Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                你的创意主题
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="例如：一个普通程序员突然获得了读心术，发现暗恋多年的女同事其实也喜欢他..."
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Progress Bar */}
            {isGenerating && (
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {progressMessage}
                  </span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !idea.trim()}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                isGenerating || !idea.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? '🤖 正在生成中...' : '🚀 开始生成'}
            </button>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📖</div>
                <div className="font-semibold text-gray-900">生成小说</div>
                <div className="text-sm text-gray-600">AI 扩展成完整故事</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎭</div>
                <div className="font-semibold text-gray-900">改编剧本</div>
                <div className="text-sm text-gray-600">标准短剧剧本格式</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎨</div>
                <div className="font-semibold text-gray-900">生成提示词</div>
                <div className="text-sm text-gray-600">AI 绘画/视频提示词</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>💡 提示：创意主题可以是一个想法、一句话、或者一个简单的故事梗概</p>
          </div>
        </div>
      </div>
    </div>
  );
}
