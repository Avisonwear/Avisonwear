import Link from "next/link";
export default function TshirtsPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <Link
  href="/"
  className="
  absolute
  top-8
  left-8
  px-6
  py-3
  border
  border-white/20
  rounded-full
  hover:border-white
  transition
  "
>
 ← Return Home
</Link>
      <div className="text-center">
        <p className="text-green-400 tracking-[0.3em] mb-4">
          DROP 002
        </p>

        <h1 className="text-7xl font-black mb-4">
          T-SHIRTS
        </h1>

        <p className="text-2xl text-gray-400">
          Releasing in Drop 002.
        </p>
      </div>
    </main>
  );
}