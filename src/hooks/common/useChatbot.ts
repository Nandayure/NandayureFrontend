import { useMutation } from '@tanstack/react-query';

interface ChatMessage {
  role: string;
  content: string;
}

export interface RateLimitError {
  isRateLimit: true;
  message: string;
  retryAfter: number;
}

export const useChatbot = () => {
  const sendMessage = async (prompt: string): Promise<ChatMessage> => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    // Manejo específico para errores de rate limit
    if (response.status === 429) {
      const data = await response.json();
      const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10);
      throw {
        isRateLimit: true,
        message: data.message,
        retryAfter
      } as RateLimitError;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch response from the chatbot');
    }

    const data = await response.json();
    return { role: 'bot', content: data.response };
  };

  return useMutation({
    mutationFn: sendMessage,
  });
};
