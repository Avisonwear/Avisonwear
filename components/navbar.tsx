"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
<nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-6 border-b border-white/10 bg-black/90 backdrop-blur">
     <Link href="/">
  <Image
    src="/avison-logo.png"
    alt="Avison"
    width={180}
    height={60}
    priority
    className="h-auto w-[90px] md:w-[180px]"
  />
</Link>

      <div className="hidden md:flex gap-16 text-base uppercase font-medium tracking-wider">
        <Link href="/tracksuits">Tracksuits</Link>
        <Link href="/hoodies">Hoodies</Link>
        <Link href="/tshirts">T-Shirts</Link>
        <Link href="/shorts">Shorts</Link>
        <Link
  href="/summer-sets"
  className="hover:text-white transition"
>
  SUMMER SETS
</Link>
<Link href="/joggers">
  JOGGERS
</Link>
      </div>

      <Link
        href="/cart"
        className="px-8 py-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Cart ({cart.length})
      </Link>

    </nav>
  );
}