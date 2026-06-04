import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { callGeminiAPI } from '../services/geminiService'

function ChatAssistant({ apiKey }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou seu conselheiro financeiro inteligente. Posso ajudar com dúvidas sobre investimentos, planejamento orçamentário, inflação, câmbio e muito mais. Como posso te ajudar hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || !apiKey) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await callGeminiAPI(
        apiKey,
        inputValue,
        'Você é um educador financeiro empático e didático. Responda de forma clara, simples e prática, usando exemplos do dia a dia quando possível. Seu objetivo é democratizar a educação financeira.'
      )

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: `Desculpe, houve um erro: ${error.message}. Verifique sua API Key nas configurações.`,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!apiKey) {
    return (
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8 text-center">
        <p className="text-slate-300 mb-4">Configure sua API Key nas configurações para usar o Conselheiro IA</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px] bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden my-6">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
            <div
              className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : msg.isError
                  ? 'bg-red-600/20 border border-red-600 text-red-200'
                  : 'bg-slate-800 text-slate-100'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="flex gap-1">
                <div className="loading" />
                <div className="loading" />
                <div className="loading" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-slate-600 p-4 bg-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Faça uma pergunta sobre finanças..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white p-2 rounded-lg transition"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatAssistant
