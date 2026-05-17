# Naghma Sales Assistant

A luxury WhatsApp sales assistant for Naghma, built with Next.js 14 App Router, TypeScript, TailwindCSS, Supabase, and OpenAI.

## Features

- Multilingual WhatsApp chatbot (Darija, Arabic, French, English)
- Premium sales assistant for perfume recommendations
- Order collection and Supabase storage
- Admin dashboard with customers, orders, and conversations
- Meta WhatsApp Cloud webhook support
- Edge-ready API route and fast responses

## Setup

1. Copy `.env.example` to `.env.local`
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_ACCESS_TOKEN`, and `WHATSAPP_PHONE_NUMBER_ID`
3. Install dependencies:

```bash
npm install
```

4. Run locally:

```bash
npm run dev
```

## WhatsApp webhook

Configure your WhatsApp Cloud webhook endpoint to:

`https://<your-domain>/api/whatsapp`

Use the same token for `WHATSAPP_VERIFY_TOKEN`.

## Supabase schema

Create tables:

- `customers`
- `conversations`
- `orders`

See the project code for the expected fields.
