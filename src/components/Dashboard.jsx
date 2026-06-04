export default function Dashboard() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Saldo disponível', value: 'R$ 12.450,00', change: '+4,2%', color: 'from-emerald-500 to-emerald-400' },
          { title: 'Despesas este mês', value: 'R$ 3.820,00', change: '-1,4%', color: 'from-red-500 to-red-400' },
          { title: 'Meta de economia', value: 'R$ 8.200,00', change: '+18%', color: 'from-sky-500 to-cyan-400' },
        ].map((card) => (
          <article key={card.title} className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/70">
            <div className={`bg-gradient-to-r ${card.color} p-6`}>
              <p className="text-sm font-medium text-white/90">{card.title}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
            </div>
            <div className="bg-white p-6">
              <p className="text-sm text-slate-500">Performance</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{card.change}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Resumo financeiro</h2>
              <p className="mt-2 text-sm text-slate-500">Visão geral das suas finanças.</p>
            </div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">Atualizado agora</span>
          </div>

          <div className="mt-8 space-y-4">
            {[
              { label: 'Receitas', amount: 'R$ 6.750,00', color: 'text-emerald-600' },
              { label: 'Investimentos', amount: 'R$ 2.320,00', color: 'text-sky-600' },
              { label: 'Poupança', amount: 'R$ 3.380,00', color: 'text-violet-600' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">{item.label}</p>
                <p className={`text-sm font-semibold ${item.color}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-xl font-semibold text-slate-900">Dicas rápidas</h2>
          <ul className="mt-6 space-y-4 text-sm text-slate-600">
            <li className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Automatize suas economias</p>
              <p className="mt-1">Configure regras para poupar automaticamente todos os meses.</p>
            </li>
            <li className="rounded-3xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Revise seus gastos</p>
              <p className="mt-1">Use categorias para identificar hábitos de consumo e cortar custos.</p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
