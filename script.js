// Detecta a URL da API automaticamente
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

document.getElementById('analyze').addEventListener('click', async () => {
  const text = document.getElementById('userInput').value;
  const resultDiv = document.getElementById('result');
  
  resultDiv.innerHTML = '<div class="loading">Analisando...</div>';
  resultDiv.classList.remove('hidden');

  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    const data = await response.json();
    const emoji = data.result.includes('Positivo') ? '😊' : 
                 data.result.includes('Negativo') ? '😠' : '😐';
    
    resultDiv.innerHTML = `<div class="result">${data.result} ${emoji}</div>`;
  } catch (err) {
    resultDiv.innerHTML = `<div class="error">❌ Erro: ${err.message}</div>`;
  }
});