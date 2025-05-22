const API_URL = 'http://localhost:3000';

// Mostrar/ocultar seções
document.getElementById('writeText').addEventListener('click', () => {
  document.getElementById('inputSection').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
});

// Análise de texto
document.getElementById('analyze').addEventListener('click', async () => {
  const text = document.getElementById('userInput').value;
  const resultDiv = document.getElementById('result');
  
  // Limpa o resultado anterior e exibe "Analisando..."
  resultDiv.innerHTML = '<div class="loading">Analisando...</div>';
  resultDiv.classList.remove('hidden');

  if (!text.trim()) {
    resultDiv.innerHTML = '<div class="error">❌ Digite um texto para análise!</div>';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/analyze-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error('Falha na análise');
    }

    const data = await response.json();
    resultDiv.innerHTML = `<div class="success">🔍 Resultado: <strong>${data.result}</strong></div>`;
  
  } catch (err) {
    resultDiv.innerHTML = `<div class="error">❌ Erro: ${err.message}</div>`;
  }
});