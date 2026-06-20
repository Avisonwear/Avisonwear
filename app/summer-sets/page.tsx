import Navbar from "@/components/navbar";
import ProductCard from "@/components/productcard";
import { supabase } from "@/lib/supabase";

export default async function SummerSetsPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "summer-set")
    .eq("drop", 1);

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-black mb-12">
          SUMMER SETS
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
          {products?.map((product: any) => (
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
    </main>
  );
}