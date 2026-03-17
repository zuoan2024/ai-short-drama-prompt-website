// DeepSeek API 集成

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function callDeepSeek(
  messages: DeepSeekMessage[],
  temperature: number = 0.7
): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not set');
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`DeepSeek API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('DeepSeek API call failed:', error);
    throw error;
  }
}

export async function callDeepSeekWithJSON<T>(
  prompt: string,
  temperature: number = 0.7
): Promise<T> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个专业的助手，请严格按照用户要求的JSON格式输出，不要有任何额外的文字说明。',
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  const content = await callDeepSeek(messages, temperature);

  // 尝试解析 JSON
  try {
    // 清理可能存在的 markdown 代码块标记
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.slice(7);
    }
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.slice(3);
    }
    if (cleanContent.endsWith('```')) {
      cleanContent = cleanContent.slice(0, -3);
    }
    cleanContent = cleanContent.trim();

    return JSON.parse(cleanContent) as T;
  } catch (error) {
    console.error('Failed to parse DeepSeek response as JSON:', content);
    console.error('Parse error:', error);
    throw new Error('Failed to parse AI response as JSON');
  }
}
