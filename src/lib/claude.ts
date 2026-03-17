// Claude API 集成

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export async function callClaude(
  messages: ClaudeMessage[],
  temperature: number = 0.7
): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Claude API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data: ClaudeResponse = await response.json();
    return data.content[0]?.text || '';
  } catch (error) {
    console.error('Claude API call failed:', error);
    throw error;
  }
}

export async function callClaudeWithJSON<T>(
  prompt: string,
  temperature: number = 0.7
): Promise<T> {
  const messages: ClaudeMessage[] = [
    {
      role: 'user',
      content: `${prompt}\n\n请严格按照上述格式输出，必须是纯JSON格式，不要有任何额外的文字说明。`,
    },
  ];

  const content = await callClaude(messages, temperature);

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
    console.error('Failed to parse Claude response as JSON:', content);
    console.error('Parse error:', error);
    throw new Error('Failed to parse AI response as JSON');
  }
}
