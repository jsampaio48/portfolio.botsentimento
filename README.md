# Bot Sentimento 🎬
Chatbot de análise de sentimento utilizando biblioteca Python vaderSentiment.

## Funcionalidades
- Aplicação busca texto, traduz através da biblioteca googletrans já que a vander só possui inglês nativo
- Após tradução, aplicação busca score de sentimento e avalia como positivo, negativo ou neutro.

## Tecnologias
- Node.js
- Express
- Python
- HTML/CSS/JS

## Como Executar
1. Clone o repositório:
```bash
git clone https://github.com/jsampaio48/portfolio.botsentimento.git
```

2. Instale as dependências:
```bash
npm install
```

3. Instale bibliotecas python:
```
pip install vaderSentiment googletrans==4.0.0-rc1
```

4. Inicie o servidor:
```bash
node server.js
```

Acesse: `http://localhost:3000`