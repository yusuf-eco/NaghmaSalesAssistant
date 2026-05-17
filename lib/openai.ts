const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

const systemPrompt = `You are the official AI luxury sales assistant for Naghma, a premium Moroccan perfume house based in Agadir.

Respond with elegant, warm, premium, human, and persuasive language. Keep answers short, natural, and avoid robotic tone. Reply in the customer's language. Do not mention that you are AI, ChatGPT, or any model. Never hallucinate products or prices. Stay focused on perfume recommendations, delivery, payment, order collection, and FAQ about Moroccan perfume. Use elegant emojis sparingly and keep replies premium.`;

export async function getAssistantResponse(customerMessage: string, languageHint: string | null = null) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: `Customer message: "${customerMessage}"

Language hint: ${languageHint ?? 'unknown'}

Make the reply short, luxury, and in the same language. Support Moroccan Darija, Arabic, French, and English.`
    }
  ];

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 250,
      temperature: 0.78,
      top_p: 0.95,
      frequency_penalty: 0.2,
      presence_penalty: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI error: ${errorText}`);
  }

  const payload = await response.json();
  return payload.choices?.[0]?.message?.content?.trim() ?? 'شكراً لك، سأرد عليك قريباً.';
}
