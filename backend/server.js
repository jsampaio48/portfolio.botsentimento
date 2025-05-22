const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
const Twit = require('twit');
require('dotenv').config({ path: './backend/.env' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));


// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rota para análise de texto
app.post('/analyze-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Texto não pode estar vazio' });
    }

    exec(`python backend/sentiment_analysis.py "${text.replace(/"/g, '\\"')}"`, 
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.error('Erro na análise:', error || stderr);
          return res.status(500).json({ 
            error: 'Falha ao analisar o texto',
            details: error?.message || stderr 
          });
        }
        res.json({ result: stdout.trim() });
      }
    );
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));