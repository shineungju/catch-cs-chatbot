import { motion } from 'framer-motion'

type Props = {
  text: string
  role: 'user' | 'system' | 'loading'
}

export default function ChatBubble({ text, role }: Props) {
  const isUser = role === 'user'
  const isSystem = role === 'system'
  const isLoading = role === 'loading'

  const bubbleClass = isUser
    ? 'bg-brand text-white rounded-br-none'
    : isSystem
    ? 'bg-white text-[#333] border rounded-bl-none'
    : 'bg-white text-[#888] italic border rounded-bl-none'

  const bubbleContent = isLoading ? <TypingLoader /> : text

  return (
    <div className={\`flex \${isUser ? 'justify-end' : 'justify-start'}\`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={\`px-4 py-2 rounded-xl max-w-[75%] text-sm whitespace-pre-wrap \${bubbleClass}\`}
      >
        {bubbleContent}
      </motion.div>
    </div>
  )
}

function TypingLoader() {
  return (
    <div className="flex gap-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
    </div>
  )
}
