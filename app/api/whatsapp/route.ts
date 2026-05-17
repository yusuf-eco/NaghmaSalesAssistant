import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../../lib/supabase';
import { verifyWhatsAppToken, sendWhatsAppText } from '../../../lib/whatsapp';
import { getAssistantResponse } from '../../../lib/openai';
import { detectLanguage } from '../../../lib/lang';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const challenge = verifyWhatsAppToken(searchParams);

  if (challenge) {
    return new Response(challenge);
  }

  return NextResponse.json({ error: 'Invalid webhook verification' }, { status: 403 });
}

async function saveCustomer(supabase: ReturnType<typeof getSupabaseClient>, phone: string, name: string, city: string, preferred_language: string) {
  const { data } = await supabase
    .from('customers')
    .select('id')
    .eq('phone', phone)
    .limit(1)
    .single();

  if (data?.id) {
    await supabase.from('customers').update({ name, city, preferred_language }).eq('id', data.id);
    return data.id;
  }

  const createResult = await supabase.from('customers').insert({
    name,
    phone,
    city,
    preferred_language
  }).select('id').single();

  return createResult.data?.id;
}

async function saveConversation(supabase: ReturnType<typeof getSupabaseClient>, customerId: string, message: string, sender: 'customer' | 'assistant') {
  await supabase.from('conversations').insert({
    customer_id: customerId,
    message,
    sender,
    timestamp: new Date().toISOString()
  });
}

async function handleOrderIntent(supabase: ReturnType<typeof getSupabaseClient>, customerId: string, message: string) {
  const lower = message.toLowerCase();
  const selected = ['naghma gold', 'naghma velvet', 'naghma noir'].find((name) => lower.includes(name.toLowerCase()));
  const quantityMatch = lower.match(/(\d+)/);
  const quantity = quantityMatch ? Number(quantityMatch[1]) : 1;

  if (!selected) return null;

  await supabase.from('orders').insert({
    customer_id: customerId,
    perfume_name: selected,
    quantity,
    status: 'pending',
    created_at: new Date().toISOString()
  });

  return { selected, quantity };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const entry = body.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];
  const phone = message?.from;
  const text = message?.text?.body?.trim();

  if (!phone || !text) {
    return NextResponse.json({ status: 'ignored' });
  }

  const language = detectLanguage(text);
  const name = 'Client Naghma';
  const city = 'Unknown';
  const supabase = getSupabaseClient();
  const customerId = await saveCustomer(supabase, phone, name, city, language);

  await saveConversation(supabase, customerId, text, 'customer');

  const orderIntent = await handleOrderIntent(supabase, customerId, text);
  let reply = '';

  if (orderIntent) {
    reply = `✅ شكراً ${name}! طلبك على ${orderIntent.selected} (${orderIntent.quantity}) تّم تسجيله. الدفع عند التسليم و التوصيل داخل المغرب خلال 24-72 ساعة.`;
  } else {
    const aiAnswer = await getAssistantResponse(text, language);
    reply = aiAnswer;
  }

  await saveConversation(supabase, customerId, reply, 'assistant');
  await sendWhatsAppText(phone, reply);

  return NextResponse.json({ status: 'sent' });
}
