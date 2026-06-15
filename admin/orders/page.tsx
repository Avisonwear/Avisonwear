import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function OrdersPage() {
  const { data: orders } = await supabase
    .from("orders_new")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-black mb-8">
        Orders Dashboard
      </h1>

      <div className="space-y-4">
        {orders?.map((order: any) => (
          <div
            key={order.id}
            className="border border-white/20 rounded-xl p-4"
          >
            <p>
              <strong>Email:</strong>{" "}
              {order.customer_email}
            </p>

            <p>
              <strong>Amount:</strong>{" "}
              CHF {order.amount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

            <p>
              <strong>Referral:</strong>{" "}
              {order.referral_email}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {order.created_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}