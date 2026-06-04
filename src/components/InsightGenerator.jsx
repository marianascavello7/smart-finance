import { useState } from 'react'
import { callGeminiAPI } from '../services/geminiService'

function InsightGenerator({ apiKey }) {
  const [inputType, setInputType] = useState('text')
  const [csvData, setCsvData] = useState('')
  const [financialText, setFinancialText] = useState('')
  const [insights, setInsights] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setCsvData(event.target?.result || '')
    }
    reader.readAsText(file)
  }

  const generateInsights = async () => {
    if (!apiKey) return
    setIsLoading(true)

    try {
      let prompt = ''

      if (inputType === 'csv' && csvData) {
        prompt = `Analise os seguintes dados de gastos (CSV):\n\n${csvData}\n\nPor favor, gere:\n1. Resumo dos padrões de gasto\n2. Categorias com maior gasto\n3. Oportunidades de economia\n4. Recomendações personalizadas\n5. Dicas práticas de curto e longo prazo\n\nSeja empático e motivador.`
      } else if (inputType === 'text' && financialText) {
        prompt = `Você é um educador financeiro. Simplifique e explique o seguinte texto sobre finanças de forma clara e acessível:\n\n${financialText}\n\nForneça:\n1. Resumo simples\n2. Conceitos-chave explicados\n3. Exemplos práticos\n4. Ações que o leitor pode tomar\n5. Recursos adicionais sugeridos`
      }

      if (!prompt) return

      const response = await callGeminiAPI(
        apiKey,
        prompt,
        'Você é um especialista em educação financeira e análise de dados.'
      )
      setInsights(response)
    } catch (error) {
      setInsights(`Erro: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (!apiKey) {
    return (
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8 text-center">
        <p className="text-slate-300 mb-4">Configure sua API Key nas configurações para usar o Gerador de Insights</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Gerador de Insights</h2>

          <div className="flex gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="csv"
                checked={inputType === 'csv'}
                onChange={(e) => setInputType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-white">Planilha de Gastos (CSV)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="text"
                checked={inputType === 'text'}
                onChange={(e) => setInputType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-white">Texto Financeiro</span>
            </label>
          </div>

          {inputType === 'csv' && (
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Envie seu arquivo CSV</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 file:bg-primary file:text-white file:border-0 file:rounded file:px-4 file:py-1 cursor-pointer"
              />
              {csvData && (
                <div className="mt-4 bg-slate-800 p-3 rounded-lg text-xs text-slate-300 max-h-32 overflow-y-auto">
                  <pre>{csvData.substring(0, 300)}...</pre>
                </div>
              )}
            </div>
          )}

          {inputType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Cole o texto financeiro</label>
              <textarea
                value={financialText}
                onChange={(e) => setFinancialText(e.target.value)}
                placeholder="Cole uma notícia, artigo ou conceito financeiro que quer entender melhor..."
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary h-40"
              />
            </div>
          )}

          <button
            type="button"
            onClick={generateInsights}
            disabled={isLoading || (inputType === 'csv' ? !csvData : !financialText)}
            className="w-full mt-6 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {isLoading ? 'Gerando insights...' : 'Gerar Insights'}
          </button>
        </div>

        {insights && (
          <div className="bg-slate-700/50 border border-primary/30 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold text-white mb-4">Insights Gerados</h3>
            <div className="text-slate-100 text-sm whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {insights}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InsightGenerator
