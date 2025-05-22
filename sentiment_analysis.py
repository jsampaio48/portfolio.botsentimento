import sys
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from googletrans import Translator

# Configuração para UTF-8 (evita erros no Windows)
sys.stdout.reconfigure(encoding='utf-8')

# Inicializa o analisador de sentimento
analyzer = SentimentIntensityAnalyzer()

# Inicializa o tradutor
translator = Translator()

def analyze_sentiment(text):
    try:
        # Tradução do texto para inglês
        translated = translator.translate(text, src='pt', dest='en')
        text_en = translated.text

        # print(f"Frase original: {text}")
        # print(f"Frase traduzida: {text_en}")

        # Análise de sentimento da frase traduzida
        score = analyzer.polarity_scores(text_en)['compound']

        # print(f"Score: {score}")  # Exibe o score numérico

        if score >= 0.05:
            return "Positivo ✅"
        elif score <= -0.05:
            return "Negativo ❌"
        else:
            return "Neutro 😐"

    except Exception as e:
        return f"Erro na análise: {str(e)}"

if __name__ == "__main__":
    text = sys.argv[1] if len(sys.argv) > 1 else ""
    if text:
        result = analyze_sentiment(text)
        print(result)
    else:
        print("Nenhum texto fornecido.")
