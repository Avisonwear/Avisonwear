import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function ReferralsPage() {
  const { data: referrals } = await supabase
    .from("referrals")
    .select("*")
    .order("successful_orders", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-6xl font-black mb-10">
        Referrals Dashboard
      </h1>

      <div className="space-y-4">
        {referrals?.map((ref) => (
          <div
            key={ref.id}
            className="border border-white/20 rounded-2xl p-5"
          >
            <p>Email: {ref.email}</p>
            <p>Orders: {ref.successful_orders}</p>
            <p>Reward: {ref.reward_earned}</p>
          </div>
        ))}
      </div>
    </main>
  );
}