# Smart Finance 💰

Aplicação web de educação financeira com IA Generativa (BootCamp Santander)

## 🎯 Sobre o Projeto

Smart Finance é uma plataforma inovadora que utiliza inteligência artificial generativa (Google Gemini) para oferecer educação financeira personalizada. A aplicação combina:

- **Dashboard Financeiro**: Visualização de dados financeiros em tempo real
- **Conselheiro IA**: Assistente inteligente para dúvidas sobre finanças
- **Simulador de Metas**: Planejamento de objetivos financeiros
- **Gerador de Insights**: Análise automática de dados financeiros

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Chave de API do Google Gemini (obtenha em [ai.google.dev](https://ai.google.dev))

### Instalação

```bash
# Clone o repositório
git clone https://github.com/marianascavello7/smart-finance.git
cd smart-finance

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Build para Produção

```bash
npm run build

# Visualizar build localmente
npm run preview
```

## 🔑 Configuração da API Key

1. Acesse [ai.google.dev](https://ai.google.dev)
2. Crie uma nova chave de API do Google Gemini
3. Na aplicação, clique em ⚙️ (Configurações)
4. Cole sua chave de API e salve

A chave é armazenada localmente no seu navegador (localStorage) e nunca é enviada para servidores externos além da API do Gemini.

## 📁 Estrutura do Projeto

```
smart-finance/
├── src/
│   ├── components/
│   │   ├── ChatAssistant.jsx      # Chat com IA
│   │   ├── Dashboard.jsx           # Dashboard principal
│   │   ├── Header.jsx              # Cabeçalho
│   │   ├── InsightGenerator.jsx     # Gerador de insights
│   │   └── LifeSimulator.jsx        # Simulador de metas
│   ├── services/
│   │   └── geminiService.js         # Integração com API Gemini
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Ponto de entrada
│   └── index.css                   # Estilos globais
├── index.html                      # HTML principal
├── vite.config.js                  # Configuração Vite
├── tailwind.config.js              # Configuração Tailwind CSS
├── postcss.config.js               # Configuração PostCSS
├── .env.example                    # Variáveis de ambiente exemplo
└── package.json                    # Dependências do projeto
```

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework UI
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de estilos
- **Google Gemini API**: IA para respostas inteligentes
- **Lucide React**: Ícones

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (porta 5173)
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza build localmente

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

Ou configure a chave diretamente na interface da aplicação.

## ⚠️ Segurança

- Nunca compartilhe sua API Key publicamente
- A chave é armazenada apenas no localStorage do seu navegador
- Para ambiente de produção, considere usar um backend proxy para proteger a chave
- Não adicione `.env.local` ao controle de versão

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📊 Funcionalidades

### Dashboard
- Visualização de saldo disponível
- Rastreamento de despesas mensais
- Metas de economia
- Resumo financeiro detalhado
- Dicas rápidas de finanças

### Conselheiro IA
- Chat interativo com IA
- Perguntas sobre investimentos, orçamento, inflação, câmbio
- Respostas personalizadas e didáticas
- Histórico de conversas durante a sessão

### Simulador de Metas
- Simulação de objetivos financeiros
- Planejamento de longo prazo
- Análise de cenários

### Gerador de Insights
- Análise automática de padrões financeiros
- Recomendações personalizadas
- Insights baseados em IA

## 📄 Licença

Este projeto é parte do BootCamp Santander.

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma issue descrevendo:
- O que você tentou fazer
- O que aconteceu
- O que você esperava que acontecesse

## 👨‍💻 Autor

Mariana Scavello

---

**Desenvolvido com ❤️ para educação financeira acessível**
