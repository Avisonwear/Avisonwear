"use client";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import Navbar from "@/components/navbar";
export default function CartPage() {
  const {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = useCart();

const total = cart.reduce(
  (sum: number, item: any) =>
    sum + item.price * item.quantity,
  0
);
const shipping = total >= 150 ? 0 : 6.9;

const finalTotal = total + shipping;
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
<Navbar />
      <div className="max-w-6xl mx-auto">

       <h1 className="text-6xl font-black mb-4">
  ORDER REVIEW
</h1>

<p className="text-gray-400 mb-12">
  {cart.length} item(s)
</p>
<Link
  href="/"
  className="
  inline-flex
  items-center
  gap-2
  mb-8
  px-6
  py-3
  border
  border-white/20
  rounded-full
  hover:border-white
  transition
  "
>
  ← Continue Shopping
</Link>
        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 border border-white/10 rounded-3xl p-8">

            {cart.length === 0 ? (
              <div className="text-center py-20">

                <h2 className="text-3xl font-bold mb-4">
                  Your cart is empty
                </h2>

                <p className="text-gray-400">
                  Add products to start building your order.
                </p>

                <a
                  href="/"
                  className="
                  inline-block
                  mt-8
                  px-8
                  py-4
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  "
                >
                  Continue Shopping
                </a>

              </div>
            ) : (
              <div className="space-y-6">

                {cart.map((item: any, index: number) => (
                  <div
                    key={index}
                   className="
flex
items-center
gap-8
border
border-white/10
bg-zinc-950
rounded-3xl
p-8
hover:border-white/20
transition-all
duration-300
"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 rounded-2xl"
                    />

                   <div className="flex-1">

  <h3 className="text-2xl font-bold">
    {item.name}
  </h3>

  <p className="text-gray-400 mt-2">
    Size: {item.size}
  </p>

  <p className="text-gray-400">
   CHF {(item.price * item.quantity).toFixed(2)}
  </p>

  <div className="flex items-center gap-4 mt-4">

    <button
      onClick={() => decreaseQuantity(index)}
      className="w-10 h-10 border border-white/20 rounded-full"
    >
      -
    </button>

    <span className="font-bold text-lg">
      {item.quantity}
    </span>

    <button
      onClick={() => increaseQuantity(index)}
      className="w-10 h-10 border border-white/20 rounded-full"
    >
      +
    </button>

  </div>

</div>

<button
  onClick={() => removeFromCart(index)}
  className="
  px-5
  py-2
  rounded-full
  border
  border-red-500
  text-red-500
  "
>
  Remove
</button>

                  </div>
                ))}

              </div>
            )}

          </div>

          <div className="border border-white/10 rounded-3xl p-8 h-fit bg-zinc-950">

  <h2 className="text-2xl font-bold mb-8">
    Order Summary
  </h2>

  <div className="mb-8 p-5 rounded-2xl border border-white/10">

    {total < 150 ? (
      <p className="text-gray-300">
        Add CHF {(150 - total).toFixed(2)} more for FREE SHIPPING.
      </p>
    ) : (
      <p className="text-green-400 font-semibold">
        FREE SHIPPING UNLOCKED ✓
      </p>
    )}

  </div>

  <div className="flex justify-between mb-4">
    <span className="text-gray-400">
      Subtotal
    </span>

    <span>
      CHF {total.toFixed(2)}
    </span>
  </div>

  <div className="flex justify-between mb-4">
    <span className="text-gray-400">
      Shipping
    </span>

    <span>
      {shipping === 0
        ? "FREE"
        : `CHF ${shipping.toFixed(2)}`}
    </span>
  </div>

  <div className="border-t border-white/10 pt-6 flex justify-between text-xl font-bold">

    <span>Total</span>

    <span>
      CHF {finalTotal.toFixed(2)}
    </span>

  </div>

  <div className="mt-8 p-5 rounded-2xl border border-white/10">

    <p className="font-bold mb-2 tracking-[0.15em]">
      MADE TO ORDER
    </p>

    <p className="text-gray-400 text-sm">
      Production: 8 Days
    </p>

    <p className="text-gray-400 text-sm">
      Shipping: 7 Days
    </p>

  </div>

 <Link
  href="/checkout"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    color: "black",
    padding: "20px",
    borderRadius: "999px",
    fontWeight: "900",
    marginTop: "20px",
    fontSize: "20px",
  }}
>
 SECURE CHECKOUT →
</Link>
<div className="mt-6 text-center text-sm text-gray-400">
  ✓ Secure Checkout
  <br />
  ✓ Fast Worldwide Shipping
  <br />
  ✓ Premium Quality Guarantee
  </div>
</div> {/* Order Summary */}

</div> {/* Grid */}

</div> {/* Container */}

</main>
);
}