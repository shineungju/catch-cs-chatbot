'use client'
import { useState } from 'react'
import ChatBubble from './ChatBubble'

type Message = {
  role: 'user' | 'system' | 'loading'
  text: string
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user' as const, text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    setMessages((prev) => [...prev, { role: 'loading', text: '' }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'system' as const,
          text: '안녕하세요. 즐거운 미식생활의 시작, 캐치테이블입니다.\n예약 관련 문의는 [내 예약] 메뉴를 확인해주세요.',
        },
      ])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[600px] bg-[#f8f8f8]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <ChatBubble key={i} text={msg.text} role={msg.role} />
        ))}
      </div>
      <div className="p-3 border-t bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="문의 내용을 입력해주세요"
            className="w-full p-2 border rounded-lg text-sm focus:outline-none"
          />
        </form>
      </div>
    </div>
  )
}
