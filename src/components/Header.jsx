import { Settings } from 'lucide-react'

function Header({ onSettingsClick }) {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-3xl">💰</div>
          <div>
            <h1 className="text-2xl font-bold text-white">SmartFinance AI</h1>
            <p className="text-sm text-slate-300">Educação Financeira Inteligente</p>
          </div>
        </div>
        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white"
          title="Configurações"
        >
          <Settings size={24} />
        </button>
      </div>
    </header>
  )
}

export default Header
