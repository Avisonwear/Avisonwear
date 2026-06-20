import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProductCard from "@/components/productcard";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: products, error } = await supabase
  .from("products")
  .select("*")
  .eq("drop", 1);

console.log("PRODUCTS:", products);

if (error) {
  console.error(error);
}

return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <section className="border-y border-white/10 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-6 py-20 text-center">

    <p className="uppercase tracking-[0.4em] text-gray-500 mb-4">
      New Drop
    </p>

    <h2 className="text-5xl md:text-7xl font-black mb-6">
      SUMMER SETS
    </h2>

    <p className="text-gray-400 max-w-2xl mx-auto mb-10">
      Lightweight essentials designed for summer.
      Premium cotton. Limited quantities.
    </p>

    <a
      href="/summer-sets"
      className="inline-block px-10 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition"
    >
      SHOP SUMMER SETS →
    </a>

  </div>
</section>
      <div className="border-y border-white/10 py-4 text-center text-sm tracking-[0.2em] text-gray-300">
  LIMITED DROP 001 • 400 GSM PREMIUM COTTON • WORLDWIDE SHIPPING
</div>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-gray-500 mb-3">
            Collection
          </p>

          <h2 className="text-5xl md:text-6xl font-black">
  FEATURED TRACKSUITS
</h2>
<p className="text-gray-400 mt-4 max-w-xl mx-auto">
  Premium heavyweight tracksuits designed for everyday wear.
</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">

          {products?.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={`CHF ${product.price}`}
              image={product.image}
              link={`/products/${product.slug}`}
            />
          ))}

        </div>
      </section>

      <section className="py-32 px-10 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="border border-white/10 rounded-3xl p-10 text-center hover:border-white/30 transition">
            <h3 className="text-2xl font-bold mb-4">
              FREE SHIPPING OVER CHF 150
            </h3>

            <p className="text-gray-400">
              Fast worldwide delivery on every order.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-10 text-center hover:border-white/30 transition">
            <h3 className="text-2xl font-bold mb-4">
              PREMIUM QUALITY
            </h3>

            <p className="text-gray-400">
              400 GSM Premium Cotton.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-10 text-center hover:border-white/30 transition">
            <h3 className="text-2xl font-bold mb-4">
              LIMITED DROPS
            </h3>

            <p className="text-gray-400">
              Exclusive drops. Limited quantities only.
            </p>
          </div>

        </div>
      </section>
<section className="max-w-7xl mx-auto px-6 py-24">

  <div className="text-center mb-16">
    <h2 className="text-5xl md:text-6xl font-black">
      TRUSTED BY CUSTOMERS
    </h2>

    <p className="text-gray-400 mt-4">
      Premium quality. Built to last.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="border border-white/10 rounded-3xl p-8">
      <p className="text-2xl mb-4">★★★★★</p>
      <p className="text-gray-300">
        Amazing quality and perfect fit.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        — Luca
      </p>
    </div>

    <div className="border border-white/10 rounded-3xl p-8">
      <p className="text-2xl mb-4">★★★★★</p>
      <p className="text-gray-300">
        Best tracksuit I have ever owned.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        — Kevin
      </p>
    </div>

    <div className="border border-white/10 rounded-3xl p-8">
      <p className="text-2xl mb-4">★★★★★</p>
      <p className="text-gray-300">
        Heavyweight cotton and premium feel.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        — Amir
      </p>
    </div>

  </div>

</section>
      <Footer />
    </main>
  );
}