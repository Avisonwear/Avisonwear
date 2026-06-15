import { Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
export const playfair = Playfair_Display({
  subsets: ["latin"],
});
const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVISON",
  description: "Premium Streetwear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body className={geist.className}>
  <CartProvider>
    {children}
  </CartProvider>
</body>
    </html>
  );
}