"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/navbar";
import { useCart } from "@/app/context/CartContext";
export default function CheckoutPage() {
    const { cart } = useCart();
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [referralEmail, setReferralEmail] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [street, setStreet] = useState("");
const [zip, setZip] = useState("");
const [city, setCity] = useState("");
const [country, setCountry] = useState("Switzerland");
const [notes, setNotes] = useState("");
const stripePromise = loadStripe(
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const total = cart.reduce(
    
  (sum: number, item: any) =>
    sum + item.price * item.quantity,
  0
);
const shipping = total >= 150 ? 0 : 6.9;
const finalTotal = total + shipping;
const inputStyle = `
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/40
focus:bg-zinc-800
transition-all
duration-300
outline-none
`;
  const handleCheckout = async () => {
  const stripe = await stripePromise;

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
body: JSON.stringify({
  cart,
  referralEmail,
  email,
  firstName,
  lastName,
  phone,
  street,
  zip,
  city,
  country,
  notes,
}),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  }
};
return (
   <main className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
        <Navbar />
       <div className="absolute inset-0 overflow-hidden pointer-events-none">


  <div
    className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[900px]
    h-[900px]
    rounded-full
    bg-white/[0.04]
    blur-[220px]
    "
  />

 <div
  className="
  absolute
  inset-0
  flex
  items-center
  justify-center
 text-[34rem]
  font-black
  text-white/[0.08]
  select-none
  "
  style={{
  textShadow:
    "0 0 50px rgba(255,255,255,0.25), 0 0 120px rgba(255,255,255,0.15)"
}}
>
  AV
</div>

</div>

      <div className="relative z-10 max-w-7xl mx-auto">

        <h1 className="text-6xl md:text-7xl font-black mb-4">
          Secure Checkout
        </h1>

        <p className="text-gray-400 mb-16 text-lg">
          Complete your AVISON order.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="border border-white/20 rounded-3xl p-8 bg-zinc-950/95 backdrop-blur-xl h-fit">
          

            <h2 className="text-3xl font-black tracking-[0.15em] mb-8">
  SHIPPING DETAILS
</h2>

            <div className="space-y-5">

              <input
                 placeholder="First Name"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
               className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"
              />

              <input
                placeholder="Last Name"
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"              />

              <input
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"
/>
              <input
                 placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"              />

              <input
                 placeholder="Street Address"
  value={street}
  onChange={(e) => setStreet(e.target.value)}
className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  placeholder="ZIP Code"
  value={zip}
  onChange={(e) => setZip(e.target.value)}
className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"                />

                <input
                   placeholder="City"
  value={city}
  onChange={(e) => setCity(e.target.value)}
className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"                />

              </div>

             <label className="block text-sm text-gray-400 mb-2">
  Who referred you? (Optional)
</label>

<input
  placeholder="Referral Email"
  value={referralEmail}
  onChange={(e) => setReferralEmail(e.target.value)}
  className="
  w-full
  h-12
  px-4
  bg-zinc-800/80
  backdrop-blur-xl
  rounded-xl
  border
  border-white/20
  text-white
  placeholder:text-gray-500
  focus:border-white/30
  focus:bg-zinc-900/60
  transition-all
  duration-300
  outline-none
  "
/>

<p className="text-xs text-gray-500 mt-2">
  Enter the email address of the person who recommended AVISON.
</p>
<input
  placeholder="Country"
value={country}
onChange={(e) => setCountry(e.target.value)}
 className="
w-full
h-12
px-4
bg-zinc-800/80
backdrop-blur-xl
rounded-xl
border
border-white/20
text-white
placeholder:text-gray-500
focus:border-white/30
focus:bg-zinc-900/60
transition-all
duration-300
outline-none
"
/>

<div>
  <label className="block text-sm text-gray-400 mb-2">
    Order Notes
  </label>

  <textarea
    placeholder="Additional information..."
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
    className="
    w-full
    min-h-[140px]
    px-4
    py-4
    bg-zinc-800/80
    backdrop-blur-xl
    rounded-xl
    border
    border-white/20
    text-white
    placeholder:text-gray-500
    focus:border-white/40
    transition-all
    duration-300
    outline-none
    "
  />
</div>

</div> {/* space-y-5 */}

</div> {/* shipping card */}

<div className="border border-white/20 rounded-3xl p-8 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black backdrop-blur-xl h-fit">

            <h2 className="text-3xl font-black tracking-[0.15em] mb-8">
  ORDER SUMMARY
</h2>

            <div className="space-y-4 mb-8">

  {cart.map((item: any, index: number) => (
    <div
      key={index}
className="
flex
items-center
gap-4
border
border-white/15
bg-black/40
backdrop-blur-xl
rounded-2xl
p-4
"    >
      <img
        src={item.image}
        alt={item.name}
        className="w-36 h-36 rounded-2xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-bold">
          {item.name}
        </h3>

        <p className="text-gray-400 text-sm">
          Size: {item.size}
        </p>

        <p className="text-gray-400 text-sm">
          Qty: {item.quantity}
        </p>
      </div>

      <span className="font-bold">
        CHF {(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  ))}

</div>

            <div className="flex justify-between mb-4">
  <span className="text-gray-400">
    Subtotal
  </span>

  <span>
    CHF {total.toFixed(2)}
  </span>
</div>

<div className="flex justify-between mb-6">
  <span className="text-gray-400">
    Shipping
  </span>

  <span>
    {shipping === 0
      ? "FREE"
      : `CHF ${shipping.toFixed(2)}`}
  </span>
</div>

<div className="border-t border-white/10 pt-6 flex justify-between text-3xl font-black">
  <span>Total</span>

  <span>
    CHF {finalTotal.toFixed(2)}
  </span>
</div>

<div className="border border-white/10 rounded-2xl p-5 bg-black mt-6">

  <p className="font-bold mb-2">
    PRE-ORDER INFORMATION
  </p>

  <p className="text-gray-400 text-sm">
    Production time: 8 days
    <br />
    Shipping time: 7 days
    <br />
    Estimated delivery: 2-3 weeks
  </p>

</div>
           <button
  onClick={handleCheckout}
  className="
  w-full
  mt-8
  py-5
  rounded-full
  bg-white
  text-black
  font-black
  tracking-[0.2em]
  text-lg
  hover:scale-[1.03]
hover:bg-zinc-100
  transition-all
  duration-300
  shadow-[0_0_30px_rgba(255,255,255,0.15)]
  "
>
  SECURE CHECKOUT →
</button>
            <p className="text-center text-gray-500 text-sm mt-6">
              Secure checkout powered by AVISON.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}