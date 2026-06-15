import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminPage() {
  const { data: orders } = await supabase
    .from("orders_new")
    .select("*");

  const { data: referrals } = await supabase
    .from("referrals")
    .select("*");

  const totalOrders = orders?.length || 0;

  const totalRevenue =
    orders?.reduce(
      (sum: number, order: any) =>
        sum + Number(order.amount || 0),
      0
    ) || 0;

  const totalReferrals =
    referrals?.length || 0;

  const freeHoodies =
    referrals?.filter(
      (r: any) =>
        r.reward_earned === "free_hoodie"
    ).length || 0;

  const freeTracksuits =
    referrals?.filter(
      (r: any) =>
        r.reward_earned === "free_tracksuit"
    ).length || 0;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-6xl font-black mb-10">
        AVISON ADMIN
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

        <div className="border border-white/20 rounded-3xl p-6">
          <p className="text-gray-400">
            Orders
          </p>
          <h2 className="text-4xl font-black">
            {totalOrders}
          </h2>
        </div>

        <div className="border border-white/20 rounded-3xl p-6">
          <p className="text-gray-400">
            Revenue
          </p>
          <h2 className="text-4xl font-black">
            CHF {totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="border border-white/20 rounded-3xl p-6">
          <p className="text-gray-400">
            Referrals
          </p>
          <h2 className="text-4xl font-black">
            {totalReferrals}
          </h2>
        </div>

        <div className="border border-white/20 rounded-3xl p-6">
          <p className="text-gray-400">
            Free Hoodies
          </p>
          <h2 className="text-4xl font-black">
            {freeHoodies}
          </h2>
        </div>

        <div className="border border-white/20 rounded-3xl p-6">
          <p className="text-gray-400">
            Free Tracksuits
          </p>
          <h2 className="text-4xl font-black">
            {freeTracksuits}
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <a
          href="/admin/orders"
          className="border border-white/20 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold">
            Orders
          </h2>
        </a>

        <a
          href="/admin/referrals"
          className="border border-white/20 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold">
            Referrals
          </h2>
        </a>

      </div>
    </main>
  );
}