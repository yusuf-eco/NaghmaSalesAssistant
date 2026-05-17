import Link from 'next/link';
import { products } from '../data/products';

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-20">
      <section className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-black/80 p-10 shadow-glow backdrop-blur-xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-gold">Naghma Perfume House</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              AI-powered WhatsApp sales assistant for premium Moroccan perfume.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Welcome to Naghma. This system brings your luxury fragrance collection to WhatsApp shoppers with human tone, multilingual support, order collection, and admin analytics.
            </p>
          </div>
          <Link href="/admin" className="inline-flex rounded-full border border-gold/60 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold">
            View Admin Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">WhatsApp Sales Flow</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/80">
              <li>• Detect customer language automatically (Darija, Arabic, French, English).</li>
              <li>• Answer questions, recommend perfumes, collect orders, and confirm delivery.</li>
              <li>• Store leads, conversations, and orders in Supabase.</li>
              <li>• Use OpenAI GPT with a premium brand prompt.</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">Perfect for luxury audiences</h2>
            <p className="mt-5 text-sm leading-7 text-white/80">
              Designed for rich, warm replies with elegant emojis, short French and Arabic phrasing, and sales guidance that feels human and premium.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <div key={product.name} className="rounded-3xl border border-white/10 bg-black/70 p-4">
                  <p className="text-sm uppercase tracking-[0.32em] text-gold">{product.name}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{product.style}</p>
                  <p className="mt-2 text-sm text-white/70">{product.notes.join(' • ')}</p>
                  <p className="mt-3 text-sm font-semibold text-gold">{product.price} DH</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
