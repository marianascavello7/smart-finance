
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ChatAssistant from './components/ChatAssistant'
import LifeSimulator from './components/LifeSimulator'
import InsightGenerator from './components/InsightGenerator'

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '')
  const [showApiKeyModal, setShowApiKeyModal] = useState(!apiKey)

  const handleSaveApiKey = (key) => {
    localStorage.setItem('gemini_api_key', key)
    setApiKey(key)
    setShowApiKeyModal(false)
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'chat', label: 'Conselheiro IA', icon: '💬' },
    { id: 'simulator', label: 'Simulador de Metas', icon: '🏠' },
    { id: 'insights', label: 'Gerador de Insights', icon: '✨' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header onSettingsClick={() => setShowApiKeyModal(true)} />
      
      {/* API Key Modal */}
      {showApiKeyModal && (
        <ApiKeyModal onSave={handleSaveApiKey} currentKey={apiKey} />
      )}

      {/* Tab Navigation */}
      <div className="border-b border-slate-700 bg-slate-800/50 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-4 font-medium transition whitespace-nowrap ${
                currentTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'chat' && <ChatAssistant apiKey={apiKey} />}
        {currentTab === 'simulator' && <LifeSimulator apiKey={apiKey} />}
        {currentTab === 'insights' && <InsightGenerator apiKey={apiKey} />}
      </div>
    </div>
  )
}

// Modal para inserir API Key
function ApiKeyModal({ onSave, currentKey }) {
  const [key, setKey] = useState(currentKey)
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState('')

  const validateApiKey = (apiKey) => {
    const trimmedKey = apiKey.trim()
    
    if (!trimmedKey) {
      return 'API Key não pode estar vazia'
    }
    
    if (trimmedKey.length < 20) {
      return 'API Key parece estar inválida (muito curta). Verifique se copiou corretamente.'
    }
    
    if (!trimmedKey.includes('AIza')) {
      return 'API Key do Google Gemini deve começar com "AIza". Verifique se está correta.'
    }
    
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validationError = validateApiKey(key)
    if (validationError) {
      setError(validationError)
      return
    }
    
    onSave(key.trim())
    setError('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Configurar API Key</h2>
        <p className="text-slate-300 mb-4">
          Para usar o Conselheiro IA, você precisa de uma chave de API do Google Gemini.
        </p>
        <p className="text-sm text-slate-400 mb-4">
          Obtenha sua chave gratuitamente em: <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ai.google.dev</a>
        </p>
        
        {/* Help text */}
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 mb-4">
          <p className="text-xs text-slate-300">
            💡 <strong>Dica:</strong> Sua chave é armazenada apenas no seu navegador e nunca é compartilhada.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={showKey ? 'text' : 'password'}
              value={key}
              onChange={(e) => {
                setKey(e.target.value)
                setError('')
              }}
              placeholder="Insira sua API Key (começa com AIza...)"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
              title={showKey ? 'Ocultar chave' : 'Mostrar chave'}
            >
              {showKey ? '😨' : '👁️'}
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
