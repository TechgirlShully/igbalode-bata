import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export const metadata: Metadata = {
  title: "IGBALODE BATA | Walk With Confidence",
  description:
    "Discover timeless footwear and bags for men and women by IGBALODE BATA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
  <CartProvider>
    <WishlistProvider>{children}</WishlistProvider>
  </CartProvider>
</body>
    </html>
  );
}