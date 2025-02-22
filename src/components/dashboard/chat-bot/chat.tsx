'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    const botMessage = { role: 'bot', content: data.response };
    setMessages((prev) => [...prev, botMessage]);

    setInput('');
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto mb-4 p-3 border border-gray-200 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg ${msg.role === 'user'
              ? 'bg-blue-100 text-blue-900 ml-auto max-w-xs'
              : 'bg-gray-100 text-gray-900 mr-auto max-w-xs'
              }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu pregunta..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}