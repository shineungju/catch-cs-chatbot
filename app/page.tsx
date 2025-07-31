
'use client';
import { useState, useEffect } from 'react';

type Message = {
  type: 'user' | 'bot';
  text: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: '무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');
  const [data, setData] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const findAnswer = (question: string) => {
    const found = data.find((d) => question.includes(d.question));
    return found ? found.answer : '죄송해요, 이해하지 못했어요.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const answer = findAnswer(input);
      const botResponse = { type: 'bot', text: answer };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx}
  className={
    `max-w-[70%] p-3 rounded-2xl text-sm shadow-md whitespace-pre-wrap ` +
    (msg.type === 'bot'
      ? 'bg-gray-100 text-gray-800 self-start'
      : 'bg-blue-500 text-white self-end')
  }
>
  {msg.text}
</div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none"
          placeholder="질문을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-black text-white text-sm px-4 py-2 rounded-xl"
          onClick={handleSend}
        >
          전송
        </button>
      </div>
    </div>
  );
}
