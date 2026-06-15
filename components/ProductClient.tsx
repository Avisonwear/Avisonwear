"use client";

import Navbar from "@/components/navbar";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function ProductClient({
  product,
}: {
  product: any;
}) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-20">
      <Navbar />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        <div className="border border-white/10 rounded-3xl overflow-hidden bg-zinc-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition"
          >
            ← Back
          </Link>

          <p className="text-sm tracking-[0.4em] text-gray-500 uppercase">
            AVISON
          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-4 leading-none">
            {product.name}
          </h1>

          <p className="text-5xl font-black mt-8">
  CHF {Number(product.price).toFixed(2)}
</p>

<div className="mt-3 text-green-400 text-sm tracking-[0.15em]">
  LOW STOCK
</div>

<div className="inline-block mt-4 px-4 py-2 rounded-full border border-white/20 text-sm tracking-[0.2em]">
  LIMITED DROP 001
</div>
<div className="mt-8 space-y-3 text-gray-300">

  <p>• 400 GSM Heavyweight Cotton</p>

  <p>• Oversized Streetwear Fit</p>

  <p>• Embroidered AVISON Logo</p>

<p>• 100% Premium Cotton</p>
<p>• Pre-Shrunk Fabric</p>
<p>• Designed in Switzerland</p>

</div>

          <div className="mt-10">

            <p className="uppercase tracking-[0.2em] text-gray-500 mb-4">
              Select Size
            </p>

            <div className="flex gap-4 mt-6">
  {["S", "M", "L", "XL"].map((size) => (
    <button
      key={size}
      onClick={() => setSelectedSize(size)}
      className={`px-8 py-4 rounded-full transition ${
        selectedSize === size
          ? "bg-white text-black border border-white scale-110 shadow-lg"
          : "border border-white/20 hover:bg-white hover:text-black"
      }`}
    >
      {size}
    </button>
  ))}
</div>

<p className="mt-4 text-sm text-gray-500">
  True to size. Size up for an oversized fit.
</p>

          </div>
<div className="mt-10 border border-white/10 rounded-3xl p-6 bg-zinc-950">

  <p className="font-bold mb-3 tracking-[0.15em]">
    MADE TO ORDER
  </p>

  <p className="text-gray-400">
    Production: 8 Days
  </p>

  <p className="text-gray-400">
    Shipping: 7 Days
  </p>

  <p className="text-gray-400">
    Estimated Delivery: 2-3 Weeks
  </p>

</div>
          <button
            onClick={() => {
              if (!selectedSize) {
                alert("Select a size first");
                return;
              }

              addToCart({
                name: product.name,
                price: product.price,
                size: selectedSize,
                image: product.image,
              });
            }}
            className="
w-full
mt-10
py-5
rounded-full
bg-white
text-black
font-black
tracking-[0.2em]
text-lg
hover:scale-[1.02]
transition-all
duration-300
shadow-[0_0_30px_rgba(255,255,255,0.15)]
"
          >
            ADD TO CART →
          </button>
<div className="mt-6 text-center text-sm text-gray-400">
  ✓ Secure Checkout
  <br />
  ✓ Premium Quality Guarantee
  <br />
  ✓ Worldwide Shipping
</div>
        </div>

      </div>
    </main>
  );
}