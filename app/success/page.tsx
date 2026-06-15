import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">

        <p className="text-green-400 tracking-[0.3em] mb-4">
          AVISON
        </p>

        <h1 className="text-6xl font-black mb-6">
          Order Confirmed
        </h1>

        <p className="text-zinc-400 mb-10">
          Thank you for your purchase.
          <br />
          Your order has been received successfully.
        </p>

        <Link
          href="/"
          className="px-8 py-4 bg-white text-black rounded-full font-bold"
        >
          RETURN HOME
        </Link>

      </div>
    </main>
  );
}