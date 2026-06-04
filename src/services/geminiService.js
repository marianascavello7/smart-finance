export async function callGeminiAPI(apiKey, message, systemPrompt = '') {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: systemPrompt || 'Você é um assistente útil e amigável.',
              },
            ],
          },
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Erro na API Gemini')
    }

    const data = await response.json()

    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content
n      if (content && content.parts && content.parts.length > 0) {
        return content.parts[0].text
      }
    }

    throw new Error('Resposta vazia da API')
  } catch (error) {
    console.error('Erro ao chamar Gemini API:', error)
    throw error
  }
}
