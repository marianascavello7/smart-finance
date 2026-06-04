import { useState } from 'react'
import { callGeminiAPI } from '../services/geminiService'

function LifeSimulator({ apiKey }) {
  const [formData, setFormData] = useState({
    goal: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    targetAmount: '',
    timeline: '',
    context: '',
  })
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!apiKey) return

    setIsLoading(true)
    try {
      const prompt = `Você é um planejador financeiro especializado. Analise o seguinte cenário de vida e crie um plano detalhado e prático:

Meta: ${formData.goal}
Renda Mensal: R$ ${formData.monthlyIncome}
Despesas Mensais: R$ ${formData.monthlyExpenses}
Valor-alvo: R$ ${formData.targetAmount}
Prazo: ${formData.timeline}
Contexto adicional: ${formData.context}

Por favor, gere:
1. Análise da viabilidade da meta
2. Valor exato que precisa economizar por mês
3. Estratégias específicas de corte de gastos
4. Recomendações de investimentos
5. Passo a passo mensal para os próximos 3 meses

Seja empático, prático e realista.`

      const response = await callGeminiAPI(
        apiKey,
        prompt,
        'Você é um planejador financeiro especializado em criar planos personalizados.'
      )
      setResult(response)
    } catch (error) {
      setResult(`Erro: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (!apiKey) {
    return (
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-8 text-center">
        <p className="text-slate-300 mb-4">Configure sua API Key nas configurações para usar o Simulador</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Simule Sua Meta Financeira</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Qual é sua meta?</label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="Ex: Imigrar para Portugal em 2 anos"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Renda mensal (R$)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="3500"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Despesas mensais (R$)</label>
              <input
                type="number"
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={handleChange}
                placeholder="2150"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Valor-alvo (R$)</label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="15000"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Prazo</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="">Selecione...</option>
                <option value="6 meses">6 meses</option>
                <option value="1 ano">1 ano</option>
                <option value="2 anos">2 anos</option>
                <option value="3 anos">3 anos</option>
                <option value="5 anos">5 anos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Contexto adicional</label>
              <textarea
                name="context"
                value={formData.context}
                onChange={handleChange}
                placeholder="Ex: Tenho filho, trabalho em home office, prefiro não cortar lazer..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary px-4 py-3 text-white font-semibold transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Gerando plano...' : 'Gerar Simulação'}
            </button>
          </form>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 min-h-[420px] overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Resultado do Simulador</h2>
          {result ? (
            <div className="whitespace-pre-line text-slate-200 text-sm leading-7">{result}</div>
          ) : (
            <p className="text-slate-400">Preencha o formulário e clique em &quot;Gerar Simulação&quot; para receber o plano.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LifeSimulator
