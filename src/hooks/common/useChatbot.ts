import { useMutation } from '@tanstack/react-query';

interface ChatMessage {
  role: string;
  content: string;
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
