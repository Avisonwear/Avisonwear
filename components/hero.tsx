import Link from "next/link";
export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-top"
      style={{
        backgroundImage: "url('/hero-navy.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <p
  className="
  text-4xl
  md:text-5xl
  text-white/80
  mb-6
  italic
  "
>
  LIMITED DROP 001
</p>
<p className="text-green-400 tracking-[0.3em] mb-4">
  AVISON
</p>

        <h1 className="text-8xl md:text-[12rem] font-black mb-6 tracking-tight">
         Built From Ambition
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Premium Streetwear For The Relentless.
        </p>
<p className="mt-4 text-gray-500">
  400 GSM Heavyweight Cotton • Embroidered Logo • Made To Order
</p>
<Link
  href="/tracksuits"
  className="
w-[220px]
py-4
text-base
tracking-[0.15em]
rounded-full
border
border-white/20
hover:border-white
hover:bg-white
hover:text-black
transition-all
duration-300
hover:scale-105
text-center
"
>
  SHOP COLLECTION
</Link>
<div className="mt-6 text-sm text-gray-500 uppercase tracking-[0.15em]">
  Limited Quantities Available
</div>

<div className="flex flex-wrap justify-center gap-4 mt-10 mb-32 max-w-7xl">

  <Link
    href="/"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    ALL
  </Link>

  <Link
    href="/tracksuits"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    TRACKSUITS
  </Link>

  <Link
    href="/hoodies"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    HOODIES
  </Link>

  <Link
    href="/joggers"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    JOGGERS
  </Link>

  <Link
    href="/summer-sets"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    SUMMER SETS
  </Link>

  <Link
    href="/tshirts"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    T-SHIRTS
  </Link>

  <Link
    href="/shorts"
    className="px-8 py-3 min-w-[160px] text-base tracking-[0.15em] rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-center"
  >
    SHORTS
  </Link>

</div>

      </div>
    </section>
  );
}