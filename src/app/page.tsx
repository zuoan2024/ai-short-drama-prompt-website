'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const routes = [
    {
      id: 'idea',
      title: '📝 从灵感开始',
      description: '有一个创意想法，让 AI 帮你扩展成完整故事',
      route: '/start-from-idea',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'novel',
      title: '📖 从小说开始',
      description: '已有小说内容，需要改编成剧本',
      route: '/start-from-novel',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'script',
      title: '🎭 从剧本开始',
      description: '已有剧本，需要提取资产或生成提示词',
      route: '/start-from-script',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 'assets',
      title: '🔍 只提取资产',
      description: '从剧本中提取人物、场景、道具',
      route: '/extract-assets',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'image',
      title: '🎨 生图提示词',
      description: '从剧本生成 AI 绘画提示词',
      route: '/generate-image-prompts',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'video',
      title: '🎬 生视频提示词',
      description: '从剧本生成 AI 视频提示词',
      route: '/generate-video-prompts',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎬 AI 漫剧工具
          </h1>
          <p className="text-xl text-gray-600">
            选择你的起点，开始创作之旅
          </p>
        </div>

        {/* Route Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => router.push(route.route)}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${route.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {route.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {route.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  <span>开始使用</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p className="mb-2">💡 提示：你可以从任意环节开始，不需要按顺序完成所有步骤</p>
          <p>💾 所有数据保存在浏览器本地，不会上传到服务器</p>
        </div>
      </div>
    </div>
  );
}
