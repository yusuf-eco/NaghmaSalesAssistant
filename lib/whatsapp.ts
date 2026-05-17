export function verifyWhatsAppToken(query: URLSearchParams) {
  const mode = query.get('hub.mode');
  const token = query.get('hub.verify_token');
  const challenge = query.get('hub.challenge');
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === expected) {
    return challenge ?? 'OK';
  }

  return null;
}

export async function sendWhatsAppText(to: string, text: string) {
  const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!whatsappToken || !phoneNumberId) {
    throw new Error('WhatsApp credentials are not configured.');
  }

  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
      preview_url: false,
      body: text
    }
  };

  const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${whatsappToken}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`WhatsApp API error: ${error}`);
  }

  return response.json();
}
