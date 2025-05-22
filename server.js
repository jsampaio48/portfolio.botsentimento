require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração dinâmica da URL
const API_URL = process.env.RENDER_EXTERNAL_URL 
  ? `https://${process.env.RENDER_EXTERNAL_URL}` 
  : `http://localhost:${PORT}`;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rota para análise de texto
app.post('/api/analyze', (req, res) => {
  const { text } = req.body;
  exec(`python sentiment_analysis.py "${text}"`, (error, stdout) => {
    if (error) return res.status(500).json({ error: 'Erro na análise' });
    res.json({ 
      result: stdout.trim(),
      apiUrl: API_URL // Envia a URL dinâmica para o frontend
    });
  });
});

// Servir o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${API_URL}`);
});