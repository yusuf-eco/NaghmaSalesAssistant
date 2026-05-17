import { createClient } from '@supabase/supabase-js';

async function getDashboardStats() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { customers: 0, orders: 0, conversations: 0, recentOrders: [] };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { global: { fetch } });
  const [customersRes, ordersRes, conversationsRes, recentOrdersRes] = await Promise.all([
    supabase.from('customers').select('id', { count: 'exact' }),
    supabase.from('orders').select('id', { count: 'exact' }),
    supabase.from('conversations').select('id', { count: 'exact' }),
    supabase.from('orders').select('id,perfume_name,quantity,status,created_at').order('created_at', { ascending: false }).limit(5)
  ]);

  return {
    customers: customersRes.count ?? 0,
    orders: ordersRes.count ?? 0,
    conversations: conversationsRes.count ?? 0,
    recentOrders: recentOrdersRes.data ?? []
  };
}

export default async function AdminPage() {
  const stats = await getDashboardStats();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(201,165,109,0.12),_transparent_30%),_linear-gradient(180deg,_#050505,_#070707)] px-6 py-10 text-white sm:px-10 lg:px-20">
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-[36px] border border-white/10 bg-black/80 p-10 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="uppercase tracking-[0.32em] text-gold">Admin Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold">Naghma Sales & CRM Insights</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70">
                Monitor conversations, orders, customers, and luxury lead flow across WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-gold">Customers</p>
              <p className="mt-5 text-4xl font-semibold">{stats.customers}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-gold">Orders</p>
              <p className="mt-5 text-4xl font-semibold">{stats.orders}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-gold">Conversations</p>
              <p className="mt-5 text-4xl font-semibold">{stats.conversations}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
          <div className="rounded-[36px] border border-white/10 bg-black/80 p-8 shadow-glow backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Recent orders</h2>
            <div className="mt-6 space-y-4">
              {stats.recentOrders.length === 0 ? (
                <p className="text-sm text-white/60">No orders yet. The WhatsApp assistant is ready to start selling.</p>
              ) : (
                stats.recentOrders.map((order) => (
                  <div key={order.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-white">{order.perfume_name}</p>
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-sm text-gold">{order.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70">Qty: {order.quantity} • {new Date(order.created_at).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-black/80 p-8 shadow-glow backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Brand pulse</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Every interaction is stored as a conversation and matched with customers. Use this dashboard to support orders, update statuses, and scale your premium service.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold">Conversion focus</p>
                <p className="mt-2 text-sm text-white/70">Guide shoppers gently with recommendations, explain notes, and confirm delivery within 24–72h.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold">Language coverage</p>
                <p className="mt-2 text-sm text-white/70">Supports Darija, Arabic, French, and English with personalized tone and premium phrasing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
