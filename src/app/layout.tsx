import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";


export const metadata: Metadata = {
  
metadataBase: new URL("https://igbalode-bata.vercel.app"),

verification: {
  google: "WUfdu1ocHhWJ-UF1d4qyo3CqS7zdFwTWMZb6h2n7V3w",
},

alternates: {
  canonical: "/",
},

  title: {
  default: "IGBALODE BATA | Premium Footwear in Lagos, Nigeria",
  template: "%s | IGBALODE BATA",
},
description:
  "Shop timeless footwear from IGBALODE BATA, a Nigerian footwear brand offering men's mules, loafers and half shoes, plus women's slippers. Discover your next pair.",
  keywords: [
    "IGBALODE BATA",
    "footwear in Nigeria",
    "men's mules in Nigeria",
    "men's loafers",
    "men's half shoes",
    "women's slippers",
    "leather footwear",
    "Nigerian footwear brand",
    "shoes in Lagos",
  ],
  openGraph: {
    title: "IGBALODE BATA | Premium Footwear in Nigeria",
    description:
      "Explore timeless footwear for men and women, designed for comfort, style, and every occasion.",
    siteName: "IGBALODE BATA",
    locale: "en_NG",
    type: "website",
    url: "https://igbalode-bata.vercel.app",
    images: [
      {
        url: "/brand/story.jpg",
        alt: "IGBALODE BATA footwear collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IGBALODE BATA | Premium Footwear in Nigeria",
    description:
      "Discover timeless footwear for men and women from IGBALODE BATA.",
    images: ["/brand/story.jpg"],
  },
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