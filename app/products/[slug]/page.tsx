import { supabase } from "@/lib/supabase";
import ProductClient from "@/components/ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("URL SLUG =", slug);

 const { data: product, error } = await supabase
  .from("products")
  .select("*")
  .eq("slug", slug)
  .single();

console.log("slug:", slug);
console.log("product:", product);
console.log("error:", error);

  if (error || !product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </main>
    );
  }

  return <ProductClient product={product} />;
}